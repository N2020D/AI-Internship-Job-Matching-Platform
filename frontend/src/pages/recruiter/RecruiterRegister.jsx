import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

import {
  HiBuildingOffice2,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
} from "react-icons/hi2";

function RecruiterRegister() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerUser({
        ...formData,
        role: "recruiter",
      });

      alert("Registration Successful! Please login.");

      navigate("/recruiter/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex lg:w-1/2 bg-emerald-700 text-white p-12 flex-col justify-between">

        <div className="flex items-center gap-3">

          <div className="bg-white/15 p-3 rounded-xl">
            <HiBuildingOffice2 className="text-3xl" />
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
            Hire talented students faster using AI-powered recruitment.
          </h2>

          <p className="text-indigo-100 mt-6 text-lg max-w-lg">
            Create your recruiter account, publish internship opportunities,
            manage applicants, and discover the best candidates using intelligent matching.
          </p>

        </div>

        <p className="text-emerald-100">
          Smarter hiring starts here.
        </p>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

          {/* Mobile Logo */}

          <div className="lg:hidden flex justify-center mb-5">

            <div className="bg-emerald-700 p-3 rounded-xl">
              <HiBuildingOffice2 className="text-3xl text-white" />
            </div>

          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Recruiter Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Create your recruiter account and start posting jobs.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* Recruiter Name */}

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
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

            </div>

            {/* Email */}

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
                  onChange={handleChange}
                  placeholder="recruiter@company.com"
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

            </div>

            {/* Company */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>

              <div className="relative">

                <HiBuildingOffice2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="ABC Technologies"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+94 77 123 4567"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

            </div>

            {/* Password */}

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
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Register Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Registering..." : "Create Recruiter Account"}

              {!loading && (
                <HiArrowRight className="text-xl" />
              )}

            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">

            Already have a recruiter account?{" "}

            <Link
              to="/recruiter/login"
              className="text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RecruiterRegister;