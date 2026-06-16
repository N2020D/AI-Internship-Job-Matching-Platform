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

// ======================
// UPLOAD PROFILE PHOTO
// ======================

export const uploadProfilePhoto = async (file) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await axios.put(
    `${API}/profile/photo`,
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

// ======================
// DELETE RESUME
// ======================

export const deleteResume = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/resume`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

// ======================
// DELETE PROFILE PHOTO
// ======================

export const deleteProfilePhoto = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/profile/photo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};
