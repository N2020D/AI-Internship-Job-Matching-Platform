import axios from "axios";

const API = "http://localhost:5000/api/recruiter";

// ======================
// GET RECRUITER PROFILE
// ======================
export const getRecruiterProfile = async () => {
  const token = localStorage.getItem("token");
  
  const response = await axios.get(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ======================
// UPDATE RECRUITER PROFILE
// ======================
export const updateRecruiterProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// GET MY POSTED JOBS
// ======================
export const getMyJobs = async (filters = {}) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);
  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);

  const response = await axios.get(
    `${API}/jobs?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// POST A NEW JOB
// ======================
export const postNewJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/jobs`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// UPDATE JOB STATUS
// ======================
export const updateJobStatus = async (jobId, status) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/jobs/${jobId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// GET JOB APPLICANTS
// ======================
export const getJobApplicants = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/jobs/${jobId}/applicants`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// GET JOB STATISTICS
// ======================
export const getJobStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
