import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const analyzeResume = async (file, jobDescription) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);

  const response = await axios.post(
    `${API}/analyze-resume`,
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