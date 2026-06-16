import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiDocumentArrowDown,
  HiCloudArrowUp,
  HiTrash,
  HiArrowLeft,
  HiCheckCircle,
} from "react-icons/hi2";
import { getProfile, uploadResume, deleteResume } from "../../services/studentService";

function ResumePage() {
  const navigate = useNavigate();
  const fileRef = useRef();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading profile:", error);
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC file");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      await uploadResume(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      await loadProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your resume?")) {
      return;
    }

    try {
      setDeleting(true);
      await deleteResume();
      alert("Resume deleted successfully");
      await loadProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profi-tole...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <HiArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Management</h1>
          <p className="text-gray-600">Upload, view, and manage your resume</p>
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <HiCheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-800">Success!</h3>
              <p className="text-green-700">Your resume has been uploaded successfully.</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Resume</h2>
              
              <input
                type="file"
                hidden
                ref={fileRef}
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                disabled={uploading}
              />

              {!profile?.resume ? (
                <div
                  onClick={() => fileRef.current.click()}
                  className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {uploading ? "Uploading..." : "Click to upload resume"}
                  </h3>
                  <p className="text-gray-600 mb-4">or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF or DOC files up to 5MB</p>
                  {uploading && (
                    <div className="mt-4">
                      <div className="inline-block">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Current Resume */}
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">📄</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Current Resume</h3>
                        <p className="text-gray-600 text-sm">{profile.resume}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`http://localhost:5000/uploads/resumes/${profile.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                      >
                        <HiDocumentArrowDown size={20} />
                        View Resume
                      </a>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                      >
                        <HiTrash size={20} />
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {/* Upload New Version */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Upload New Version</h3>
                    <button
                      onClick={() => fileRef.current.click()}
                      disabled={uploading}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                      <HiCloudArrowUp size={20} />
                      {uploading ? "Uploading..." : "Upload New Resume"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Tips */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resume Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Keep your resume to 1-2 pages</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Use clear, professional formatting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Include relevant skills and experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Proofread for spelling and grammar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Ensure contact information is current</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Tailor your resume to the job description</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar - Resume Stats */}
          <div className="space-y-6">
            {/* Resume Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resume Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    profile?.resume 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {profile?.resume ? "Uploaded" : "Pending"}
                  </span>
                </div>
                {profile?.resume && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">File Name</span>
                      <span className="text-gray-900 font-semibold text-right text-sm truncate">
                        {profile.resume}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-gray-600">Profile Completion</span>
                      <span className="text-blue-600 font-semibold text-lg">✓</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* File Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">File Requirements</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Supported: PDF, DOC, DOCX</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Max size: 5MB</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Clear file naming</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Recent and updated</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/student/profile/edit")}
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/student/profile")}
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;
