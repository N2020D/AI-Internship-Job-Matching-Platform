import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiBriefcase, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { getMyJobs, updateJobStatus } from "../../services/recruiterService";

function ManageJobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updatingJob, setUpdatingJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, [page, searchTerm, statusFilter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getMyJobs({
        page,
        limit: 10,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      });

      setJobs(data.jobs || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Failed to load jobs", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      setUpdatingJob(jobId);
      await updateJobStatus(jobId, newStatus);
      
      setJobs(jobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      ));
      
      alert("Job status updated");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingJob(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
        <p className="text-gray-600">View and manage all your posted jobs</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by job title or company"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            onClick={handleSearchReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-3 rounded-lg font-semibold transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-8 text-center">
            <HiBriefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No jobs found</p>
            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Job Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Applicants</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{job.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.type}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {job.applicants?.length || 0}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job._id, e.target.value)}
                          disabled={updatingJob === job._id}
                          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                            job.status === "Open"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Applicants
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiChevronLeft size={16} /> Prev
                </button>

                <span className="text-gray-600 font-semibold">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <HiChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Post Job Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/recruiter/post-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          + Post New Job
        </button>
      </div>
    </div>
  );
}

export default ManageJobsPage;
