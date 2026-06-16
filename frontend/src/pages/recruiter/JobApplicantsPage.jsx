import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiArrowDownTray } from "react-icons/hi2";
import { getJobApplicants } from "../../services/recruiterService";

function JobApplicantsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = async () => {
    try {
      setLoading(true);
      const data = await getJobApplicants(jobId);
      setJobData(data.job);
      if (data.job.applicants && data.job.applicants.length > 0) {
        setSelectedApplicant(data.job.applicants[0]);
      }
    } catch (err) {
      console.error("Failed to load applicants", err);
      alert(err.response?.data?.message || "Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Failed to load applicants</p>
        <button
          onClick={() => navigate("/recruiter/jobs")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/recruiter/jobs")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <HiArrowLeft size={20} /> Back to Jobs
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Applicants for {jobData.title}
        </h1>
        <p className="text-gray-600">{jobData.company} • {jobData.totalApplicants} applicant{jobData.totalApplicants !== 1 ? 's' : ''}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Applicants List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-[70vh] overflow-y-auto">
            {jobData.applicants.length === 0 ? (
              <div className="text-center p-6 text-gray-600">
                No applicants yet
              </div>
            ) : (
              <div className="space-y-2">
                {jobData.applicants.map((applicant) => (
                  <div
                    key={applicant._id}
                    onClick={() => setSelectedApplicant(applicant)}
                    className={`p-3 rounded-lg cursor-pointer transition border ${
                      selectedApplicant?._id === applicant._id
                        ? "bg-blue-50 border-l-4 border-l-blue-600"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {applicant.profileImage && (
                        <img
                          src={applicant.profileImage}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{applicant.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Applicant Details */}
        <div className="lg:col-span-3">
          {selectedApplicant ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8 pb-8 border-b">
                {selectedApplicant.profileImage && (
                  <img
                    src={selectedApplicant.profileImage}
                    alt={selectedApplicant.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedApplicant.name}
                  </h2>
                  <p className="text-gray-600 mb-3">{selectedApplicant.email}</p>
                  {selectedApplicant.phone && (
                    <p className="text-gray-600 mb-3">Phone: {selectedApplicant.phone}</p>
                  )}
                  {selectedApplicant.resume && (
                    <a
                      href={`http://localhost:5000/${selectedApplicant.resume}`}
                      download
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <HiArrowDownTray size={18} /> Download Resume
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 break-all">{selectedApplicant.email}</p>
                  </div>
                  {selectedApplicant.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedApplicant.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={`mailto:${selectedApplicant.email}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Send Email
                </a>
                {selectedApplicant.resume && (
                  <a
                    href={`http://localhost:5000/${selectedApplicant.resume}`}
                    download
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <HiArrowDownTray size={18} /> Download Resume
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600">Select an applicant to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobApplicantsPage;
