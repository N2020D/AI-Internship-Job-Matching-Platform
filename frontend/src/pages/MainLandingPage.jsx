import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function MainLandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "student") navigate("/student/dashboard");
      else if (role === "recruiter") navigate("/recruiter/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10 grid gap-6 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold mb-6">Introducing Nextern AI</span>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nextern AI</h1>
          <p className="text-gray-600 mb-6">A next-generation internship and job matching platform for students and recruiters. Nextern AI uses intelligent profile matching, resume analysis, and recruiter workflow tools to accelerate hiring and career growth.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/student/register" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition">Student Signup</Link>
            <Link to="/recruiter/register" className="bg-gray-200 text-gray-900 px-5 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition">Recruiter Signup</Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p className="mb-2">Already part of the network?</p>
            <div className="flex gap-4">
              <Link to="/student/login" className="text-blue-700 font-semibold hover:underline">Student Login</Link>
              <Link to="/recruiter/login" className="text-blue-700 font-semibold hover:underline">Recruiter Login</Link>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-900 mb-5">Nextern AI Features</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-3 items-start">
              <span className="mt-1 h-3 w-3 rounded-full bg-blue-600"></span>
              <span>Smart job matching using AI and resume data.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 h-3 w-3 rounded-full bg-blue-600"></span>
              <span>Student profile and resume builder with application tracking.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 h-3 w-3 rounded-full bg-blue-600"></span>
              <span>Recruiter dashboard to post jobs, review applicants, and manage listings.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 h-3 w-3 rounded-full bg-blue-600"></span>
              <span>Secure login with role-based access for students and recruiters.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 h-3 w-3 rounded-full bg-blue-600"></span>
              <span>Insights and notifications to help students stay informed.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainLandingPage;
