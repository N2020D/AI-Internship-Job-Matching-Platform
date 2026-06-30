import axios from "axios";

const API = "http://localhost:5000/api/admin";

const authHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAdminDashboard = async () => {
  const response = await axios.get(`${API}/dashboard`, authHeaders());
  return response.data;
};

export const getAdminStudents = async (params = {}) => {
  const response = await axios.get(`${API}/students`, {
    ...authHeaders(),
    params,
  });

  return response.data;
};

export const getAdminRecruiters = async (params = {}) => {
  const response = await axios.get(`${API}/recruiters`, {
    ...authHeaders(),
    params,
  });

  return response.data;
};

export const getAdminJobs = async (params = {}) => {
  const response = await axios.get(`${API}/jobs`, {
    ...authHeaders(),
    params,
  });

  return response.data;
};

export const getAdminApplications = async () => {
  const response = await axios.get(`${API}/applications`, authHeaders());
  return response.data;
};

export const getAdminReports = async () => {
  const response = await axios.get(`${API}/reports`, authHeaders());
  return response.data;
};

export const getAdminSettings = async () => {
  const response = await axios.get(`${API}/settings`, authHeaders());
  return response.data;
};

export const getAdminStudent = async (studentId) => {
  const response = await axios.get(`${API}/students/${studentId}`, authHeaders());
  return response.data;
};

export const getAdminRecruiter = async (recruiterId) => {
  const response = await axios.get(`${API}/recruiters/${recruiterId}`, authHeaders());
  return response.data;
};

export const getAdminJob = async (jobId) => {
  const response = await axios.get(`${API}/jobs/${jobId}`, authHeaders());
  return response.data;
};
