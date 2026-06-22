
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiBriefcase,
  HiArrowRight,
  HiEnvelope,
  HiEye,
  HiEyeSlash,
  HiLockClosed,
} from "react-icons/hi2";

import {
  loginUser,
  forgotPassword,
} from "../../services/authService";

function RecruiterLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [resetLoading, setResetLoading] =
    useState(false);

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      setLoading(true);

      const data = await loginUser({
        ...formData,
        role: "recruiter",
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );

      localStorage.setItem(
        "userId",
        data.userId || ""
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/recruiter/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!formData.email.trim()) {
      setError("Enter your email address first");
      return;
    }

    try {
      setResetLoading(true);

      const data =
        await forgotPassword({
          email: formData.email,
          role: "recruiter",
        });

      setMessage(data.message);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Reset request failed"
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Left Side */}

      <div className="hidden lg:flex lg:w-1/2 bg-emerald-700 text-white p-12 flex-col justify-between">

        <div className="flex items-center gap-3">

          <div className="bg-white/15 p-3 rounded-xl">

            <HiBriefcase className="text-3xl" />

          </div>

          <div>

            <h1 className="text-2xl font-bold">

              AI Internship Platform

            </h1>

            <p className="text-emerald-100">

              Recruiter Portal

            </p>

          </div>

        </div>

        <div>

          <h2 className="text-5xl font-bold leading-tight max-w-xl">

            Hire talented students faster with AI-powered recruitment.

          </h2>

          <p className="text-emerald-100 mt-6 text-lg max-w-lg">

            Manage job postings, review applications,
            shortlist candidates and discover the best
            talent through intelligent matching.

          </p>

        </div>

        <p className="text-emerald-100">

          Find the right candidate with confidence.

        </p>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <div className="lg:hidden flex justify-center mb-5">

            <div className="bg-emerald-600 p-3 rounded-xl">

              <HiBriefcase className="text-3xl text-white" />

            </div>

          </div>

          <h1 className="text-3xl font-bold text-gray-900">

            Welcome Recruiter

          </h1>

          <p className="text-gray-500 mt-2">

            Login to manage your company and job postings.

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

                Email Address

              </label>

              <div className="relative">

                <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="company@example.com"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600"
                >

                  {showPassword ? (
                    <HiEyeSlash className="text-xl" />
                  ) : (
                    <HiEye className="text-xl" />
                  )}

                </button>

              </div>

            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-gray-600">

                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />

                Remember me

              </label>

              <button
                type="button"
                onClick={() =>
                  setShowForgotPassword(
                    !showForgotPassword
                  )
                }
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >

                Forgot password?

              </button>

            </div>

            {showForgotPassword && (

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">

                <p className="text-sm text-emerald-900">

                  Enter your email above and request a password reset.

                </p>

                <button
                  type="button"
                  onClick={
                    handleForgotPassword
                  }
                  disabled={resetLoading}
                  className="mt-3 text-sm font-semibold text-emerald-700 hover:text-emerald-800 disabled:opacity-60"
                >

                  {resetLoading
                    ? "Sending request..."
                    : "Send reset request"}

                </button>

              </div>

            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >

              {loading
                ? "Logging in..."
                : "Login"}

              {!loading && (
                <HiArrowRight className="text-xl" />
              )}

            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">

            New Recruiter?{" "}

            <Link
              to="/recruiter/register"
              className="text-emerald-600 font-semibold hover:text-emerald-700"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RecruiterLogin;