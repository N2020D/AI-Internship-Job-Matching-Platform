import axios from "axios";

const API = "http://localhost:5000/api/jobs";

// ======================
// GET ALL JOBS
// ======================
export const getAllJobs = async (filters = {}) => {
  const token = localStorage.getItem("token");
  
  const params = new URLSearchParams();
  
  if (filters.search) params.append("search", filters.search);
  if (filters.location) params.append("location", filters.location);
  if (filters.type) params.append("type", filters.type);
  if (filters.category) params.append("category", filters.category);
  if (filters.salary_min) params.append("salary_min", filters.salary_min);
  if (filters.salary_max) params.append("salary_max", filters.salary_max);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);
  if (filters.sort) params.append("sort", filters.sort);

  const response = await axios.get(
    `${API}?${params.toString()}`,
    {
      headers: token ? {
        Authorization: `Bearer ${token}`,
      } : {},
    }
  );

  return response.data;
};

// ======================
// GET JOB BY ID
// ======================
export const getJobById = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/${jobId}`,
    {
      headers: token ? {
        Authorization: `Bearer ${token}`,
      } : {},
    }
  );

  return response.data;
};

// ======================
// CREATE JOB
// ======================
export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API,
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
// UPDATE JOB
// ======================
export const updateJob = async (jobId, jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/${jobId}`,
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
// DELETE JOB
// ======================
export const deleteJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// APPLY FOR JOB
// ======================
export const applyJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/${jobId}/apply`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// WITHDRAW APPLICATION
// ======================
export const withdrawApplication = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/${jobId}/withdraw`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// GET MY APPLIED JOBS
// ======================
export const getMyAppliedJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/applied/my-jobs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
