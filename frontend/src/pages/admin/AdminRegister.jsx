import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
      await registerUser({
        ...formData,
        role: "admin",
      });

      alert(
        "Registration Successful"
      );

      navigate(
        "/admin/login"
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
      title="Admin Registration"
      subtitle="Create your admin account"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>




      
    </AuthLayout>
  );
}

export default AdminRegister;