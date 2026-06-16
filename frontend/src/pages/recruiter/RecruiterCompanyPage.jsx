import { useState, useEffect } from "react";
import { getRecruiterProfile, updateRecruiterProfile } from "../../services/recruiterService";

function RecruiterCompanyPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getRecruiterProfile();
      setProfile(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        phone: data.phone || "",
        bio: data.bio || "",
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecruiterProfile(formData);
      setProfile(formData);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Profile</h1>
        <p className="text-gray-600">Manage your company information</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {!editing ? (
          <div>
            <div className="space-y-4 mb-6">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Company Name</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.company || "N/A"}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.name}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.email}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Bio</p>
                <p className="text-lg text-gray-900">{profile?.bio || "N/A"}</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Contact Person Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 cursor-not-allowed"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="bio"
              placeholder="Company Bio / Description"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RecruiterCompanyPage;
