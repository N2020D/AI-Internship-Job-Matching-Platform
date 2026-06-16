import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewJob } from "../../services/recruiterService";

function PostJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: "IT",
    experience: "",
    education: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "",
    salary: {
      min: 0,
      max: 0,
      currency: "USD",
    },
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("salary")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [key]: key === "currency" ? value : parseInt(value) || 0,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements
          .split("\n")
          .filter((r) => r.trim())
          .map((r) => r.trim()),
        responsibilities: formData.responsibilities
          .split("\n")
          .filter((r) => r.trim())
          .map((r) => r.trim()),
        skills: formData.skills
          .split(",")
          .filter((s) => s.trim())
          .map((s) => s.trim()),
      };

      await postNewJob(jobData);
      alert("Job posted successfully!");
      navigate("/recruiter/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = ["Full-time", "Part-time", "Internship", "Freelance"];
  const categories = ["IT", "Finance", "Marketing", "Sales", "Operations", "HR", "Other"];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Post New Job</h1>
        <p className="text-gray-600">Create a new job listing to attract candidates</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Salary Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                name="salary.min"
                placeholder="Minimum Salary"
                value={formData.salary.min}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="salary.max"
                placeholder="Maximum Salary"
                value={formData.salary.max}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="salary.currency"
                value={formData.salary.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>

          {/* Experience & Education */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience (e.g., 2-5 years)"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="education"
                placeholder="Education Level (e.g., Bachelor's degree)"
                value={formData.education}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Required Skills (comma-separated)
            </label>
            <textarea
              name="skills"
              placeholder="e.g., JavaScript, React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Detailed job description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              placeholder="e.g.&#10;- 2+ years of experience&#10;- Strong JavaScript skills&#10;- Experience with React"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Responsibilities (one per line)
            </label>
            <textarea
              name="responsibilities"
              placeholder="e.g.&#10;- Develop web applications&#10;- Collaborate with team members&#10;- Code review"
              value={formData.responsibilities}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/recruiter/jobs")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJobPage;
