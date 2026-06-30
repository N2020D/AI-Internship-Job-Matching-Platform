import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiBriefcase,
  HiMapPin,
  HiClock,
  HiCurrencyDollar,
  HiChevronLeft,
  HiChevronRight,
  HiCheckCircle,
  HiMinus,
} from "react-icons/hi2";
import { getAllJobs, applyJob, withdrawApplication, getMyAppliedJobs } from "../../services/jobService";

function JobsPage() {
  const navigate = useNavigate();

  // State Management
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const jobTypes = ["Full-time", "Part-time", "Internship", "Freelance"];
  const jobCategories = ["IT", "Finance", "Marketing", "Sales", "Operations", "HR", "Other"];

  // Load jobs and applied jobs on mount and filter changes
  useEffect(() => {
    loadJobs();
    loadAppliedJobs();
  }, [page, searchTerm, locationFilter, typeFilter, categoryFilter, salaryMin, salaryMax]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const filters = {
        search: searchTerm || undefined,
        location: locationFilter || undefined,
        type: typeFilter || undefined,
        category: categoryFilter || undefined,
        salary_min: salaryMin || undefined,
        salary_max: salaryMax || undefined,
        page,
        limit: 10,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

      const data = await getAllJobs(filters);
      setJobs(data.jobs || []);
      setTotalPages(data.pages || 1);
      
      if (data.jobs && data.jobs.length > 0) {
        setSelectedJob(data.jobs[0]);
      } else {
        setSelectedJob(null);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAppliedJobs = async () => {
    try {
      const data = await getMyAppliedJobs();
      setAppliedJobs((data || []).map(job => job._id));
    } catch (error) {
      console.error("Error loading applied jobs:", error);
    }
  };

  const isJobApplied = (jobId) => appliedJobs.includes(jobId);

  const handleApply = async (jobId) => {
    try {
      setApplying(jobId);
      await applyJob(jobId);
      setAppliedJobs([...appliedJobs, jobId]);
      window.dispatchEvent(new Event("student-profile-updated"));
      alert("Applied successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(null);
    }
  };

  const handleWithdraw = async (jobId) => {
    if (!window.confirm("Are you sure you want to withdraw your application?")) {
      return;
    }

    try {
      setApplying(jobId);
      await withdrawApplication(jobId);
      setAppliedJobs(appliedJobs.filter(id => id !== jobId));
      window.dispatchEvent(new Event("student-profile-updated"));
      alert("Application withdrawn");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to withdraw");
    } finally {
      setApplying(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setTypeFilter("");
    setCategoryFilter("");
    setSalaryMin("");
    setSalaryMax("");
    setPage(1);
    setSelectedJob(null);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handleLocationChange = (value) => {
    setLocationFilter(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handleSalaryMinChange = (value) => {
    setSalaryMin(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handleSalaryMaxChange = (value) => {
    setSalaryMax(value);
    setPage(1);
    setSelectedJob(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedJob(null);
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Jobs</h1>
          <p className="text-gray-600">Find your perfect internship or job opportunity</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Filters</h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Search Jobs
                  </label>
                  <input
                    type="text"
                    placeholder="Job title or company"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City or country"
                    value={locationFilter}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Job Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Categories</option>
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Salary Range
                  </label>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={salaryMin}
                      onChange={(e) => handleSalaryMinChange(e.target.value)}
                      className="w-full min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <HiMinus className="text-gray-400" />
                    <input
                      type="number"
                      placeholder="Max"
                      value={salaryMax}
                      onChange={(e) => handleSalaryMaxChange(e.target.value)}
                      className="w-full min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Jobs List and Details */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            {/* Jobs List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="max-h-96 sm:max-h-125 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Loading jobs...</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="p-8 text-center">
                    <HiBriefcase size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No jobs found matching your criteria</p>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div
                      key={job._id}
                      onClick={() => setSelectedJob(job)}
                      className={`p-3 sm:p-4 border-b cursor-pointer transition ${
                        selectedJob?._id === job._id
                          ? "bg-blue-100 border-l-4 border-l-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm truncate">{job.company}</p>
                          <div className="flex gap-2 mt-1 text-gray-500 text-xs flex-wrap">
                            {job.location && (
                              <span className="flex items-center gap-1">
                                <HiMapPin size={12} />{job.location}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <HiClock size={12} />{job.type}
                            </span>
                          </div>
                        </div>
                        {isJobApplied(job._id) && (
                          <HiCheckCircle className="text-green-600 shrink-0" size={20} />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-between items-center p-3 sm:p-4 border-t bg-gray-50 flex-wrap gap-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-3 sm:px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <HiChevronLeft size={16} /> Prev
                  </button>

                  <span className="text-gray-600 font-semibold text-xs sm:text-sm">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 px-3 sm:px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next <HiChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Job Details */}
            {selectedJob && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-start gap-4 mb-4 flex-col sm:flex-row">
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {selectedJob.title}
                      </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4">{selectedJob.company}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${
                        selectedJob?.status === "Open"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedJob?.status}
                    </span>
                  </div>

                  {/* Job Meta Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-gray-600 text-xs sm:text-sm">Job Type</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedJob.type}</p>
                    </div>
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-gray-600 text-xs sm:text-sm">Location</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedJob.location}</p>
                    </div>
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-gray-600 text-xs sm:text-sm">Experience</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedJob.experience}</p>
                    </div>
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-gray-600 text-xs sm:text-sm">Views</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedJob.views}</p>
                    </div>
                  </div>

                  {/* Salary */}
                  {selectedJob?.salary && selectedJob.salary.min > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center gap-3">
                      <HiCurrencyDollar size={24} className="text-green-600 shrink-0" />
                      <div>
                        <p className="text-gray-600 text-sm">Salary Range</p>
                        <p className="font-bold text-gray-900">
                          {selectedJob.salary?.currency || "USD"} {(selectedJob.salary?.min || 0).toLocaleString()} -{" "}
                          {(selectedJob.salary?.max || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <div className="flex gap-3 mb-6">
                    {isJobApplied(selectedJob._id) ? (
                      <button
                        onClick={() => handleWithdraw(selectedJob._id)}
                        disabled={applying === selectedJob._id}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 text-sm sm:text-base"
                      >
                        {applying === selectedJob._id ? "Withdrawing..." : "Withdraw Application"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(selectedJob._id)}
                        disabled={applying === selectedJob._id || selectedJob?.status !== "Open"}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 text-sm sm:text-base"
                      >
                        {applying === selectedJob._id ? "Applying..." : "Apply Now"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                {selectedJob?.requirements && selectedJob.requirements.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Requirements</h2>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                          <HiCheckCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedJob?.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Responsibilities</h2>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                          <HiCheckCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {selectedJob?.skills && selectedJob.skills.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
