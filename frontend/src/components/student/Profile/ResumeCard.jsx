import { useRef, useState } from "react";
import {
  HiDocumentArrowDown,
  HiCloudArrowUp,
} from "react-icons/hi2";

import { uploadResume } from "../../../services/studentService";

function ResumeCard({ profile, refreshProfile }) {
  const fileRef = useRef();

  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      await uploadResume(file);

      alert("Resume Uploaded Successfully");

      refreshProfile();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          Resume

        </h2>

        <input
          type="file"
          hidden
          ref={fileRef}
          accept=".pdf,.doc,.docx"
          onChange={upload}
        />

        <button
          onClick={() =>
            fileRef.current.click()
          }
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          <HiCloudArrowUp />

          Upload Resume
        </button>

      </div>

      {loading && (

        <div className="py-10 text-center">

          Uploading Resume...

        </div>

      )}

      {!loading && profile.resume && (

        <div className="border rounded-xl p-5 flex justify-between items-center">

          <div>

            <h3 className="font-semibold">

              Resume Uploaded

            </h3>

            <p className="text-gray-500">

              {profile.resume}

            </p>

          </div>

          <a
            href={`http://localhost:5000/uploads/resumes/${profile.resume}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            <HiDocumentArrowDown />

            View Resume

          </a>

        </div>

      )}

      {!loading && !profile.resume && (

        <div className="text-center py-10">

          <div className="text-6xl">

            📄

          </div>

          <h2 className="text-xl font-bold mt-4">

            No Resume Uploaded

          </h2>

          <p className="text-gray-500 mt-2">

            Upload your latest resume.

          </p>

        </div>

      )}

    </div>
  );
}

export default ResumeCard;