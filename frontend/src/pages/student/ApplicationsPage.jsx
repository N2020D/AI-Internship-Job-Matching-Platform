import { useEffect, useState } from "react";
import { HiBriefcase, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { getMyAppliedJobs, withdrawApplication } from "../../services/jobService";

function ApplicationsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  const loadAppliedJobs = async () => {
    try {
      setLoading(true);
      const data = await getMyAppliedJobs();
      setJobs(data || []);
      setSelectedJob((data && data[0]) || null);
    } catch (err) {
      console.error("Failed to load applied jobs", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (jobId) => {
    if (!window.confirm("Withdraw application for this job?")) return;
    try {
      setWithdrawing(jobId);
      await withdrawApplication(jobId);
      setJobs(jobs.filter((j) => j._id !== jobId));
      if (selectedJob?._id === jobId) setSelectedJob(null);
      alert("Application withdrawn");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to withdraw");
    } finally {
      setWithdrawing(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Jobs you've applied to. Withdraw anytime.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 overflow-y-auto max-h-[60vh]">
              {loading ? (
                <div className="text-center p-6">Loading...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center p-6 text-gray-600">
                  <HiBriefcase size={40} className="mx-auto mb-3 text-gray-400" />
                  No applications yet
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition border ${
                      selectedJob?._id === job._id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{job.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{job.company}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {!selectedJob ? (
                <div className="text-center p-10 text-gray-600">Select a job to view details</div>
              ) : (
                <>
                  <div className="flex justify-between items-start gap-4 mb-4 flex-col sm:flex-row">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedJob.title}</h2>
                      <p className="text-gray-600">{selectedJob.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWithdraw(selectedJob._id)}
                        disabled={withdrawing === selectedJob._id}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        {withdrawing === selectedJob._id ? "Withdrawing..." : "Withdraw"}
                      </button>
                    </div>
                  </div>

                  <div className="prose max-w-none text-gray-700">
                    <h3 className="text-lg font-semibold">Job Description</h3>
                    <p>{selectedJob.description}</p>

                    {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                      <>
                        <h4 className="mt-4 font-semibold">Requirements</h4>
                        <ul>
                          {selectedJob.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;
