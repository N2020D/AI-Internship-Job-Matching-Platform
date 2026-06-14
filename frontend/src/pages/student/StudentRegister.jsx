import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiAcademicCap,
  HiArrowRight,
  HiEnvelope,
  HiEye,
  HiEyeSlash,
  HiLockClosed,
  HiUser,
} from "react-icons/hi2";
import { registerUser } from "../../services/authService";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return "Enter your full name";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "student",
      });

      setMessage("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/student/login");
      }, 900);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-700 text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-3 rounded-xl">
            <HiAcademicCap className="text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Internship Platform</h1>
            <p className="text-blue-100">Student registration</p>
          </div>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight max-w-xl">
            Create your profile and start matching with internships.
          </h2>
          <p className="text-blue-100 mt-6 text-lg max-w-lg">
            Register as a student, complete your profile, upload your resume,
            and discover opportunities built around your skills.
          </p>
        </div>

        <p className="text-blue-100">
          Your internship journey starts with a strong profile.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="lg:hidden flex justify-center mb-5">
            <div className="bg-blue-600 p-3 rounded-xl">
              <HiAcademicCap className="text-3xl text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Register to access your student dashboard.
          </p>

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Niluka Perera"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="student@example.com"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HiEyeSlash className="text-xl" />
                  ) : (
                    <HiEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm your password"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <HiEyeSlash className="text-xl" />
                  ) : (
                    <HiEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <HiArrowRight className="text-xl" />}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/student/login"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
