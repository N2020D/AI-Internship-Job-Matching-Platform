import axios from "axios";

const API = "http://localhost:5000/api/student";

// ======================
// GET PROFILE
// ======================

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

// ======================
// UPDATE PROFILE
// ======================

export const updateProfile = async (data) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

// ======================
// UPLOAD RESUME
// ======================

export const uploadResume = async (file) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.put(
    `${API}/resume`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};