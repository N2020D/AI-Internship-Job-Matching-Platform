import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        ...formData,
        role: "admin",
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );

      navigate(
        "/admin/dashboard"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message
      );
    }
  };

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Access your admin dashboard"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          New Admin?{" "}
          <Link
            to="/admin/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default AdminLogin;