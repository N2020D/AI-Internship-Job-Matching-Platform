import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiBriefcase,
  HiCheckCircle,
  HiXCircle,
  HiUserGroup,
  HiArrowTrendingUp,
} from "react-icons/hi2";
import { getJobStats, getMyJobs } from "../../services/recruiterService";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const statsData = await getJobStats();
      const jobsData = await getMyJobs({ page: 1, limit: 5 });

      setStats(statsData);
      setRecentJobs(jobsData.jobs || []);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Manage your job postings and applicants</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => navigate("/recruiter/post-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Post New Job
        </button>
        <button
          onClick={() => navigate("/recruiter/jobs")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
        >
          Manage Jobs
        </button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalJobs}</p>
              </div>
              <HiBriefcase size={32} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Open Jobs</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.openJobs}</p>
              </div>
              <HiCheckCircle size={32} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Closed Jobs</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.closedJobs}</p>
              </div>
              <HiXCircle size={32} className="text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalApplications}</p>
              </div>
              <HiUserGroup size={32} className="text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Per Job</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.avgApplicationsPerJob}</p>
              </div>
              <HiArrowTrendingUp size={32} className="text-orange-500" />
            </div>
          </div>
        </div>
      )}

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentJobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-600">
                    No jobs posted yet
                  </td>
                </tr>
              ) : (
                recentJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.type}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {job.applicants?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;