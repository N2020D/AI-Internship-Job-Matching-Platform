import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterSettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    profileVisibility: "public",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/recruiter/login");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications about new applicants</p>
            </div>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Email Alerts</p>
              <p className="text-sm text-gray-600">Receive email notifications about applicants</p>
            </div>
            <input
              type="checkbox"
              name="emailAlerts"
              checked={settings.emailAlerts}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Visibility</h2>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-3">Profile Visibility</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="public"
                  checked={settings.profileVisibility === "public"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Public - Visible to all candidates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="private"
                  checked={settings.profileVisibility === "private"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Private - Only visible to applied candidates</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-900 mb-6">Danger Zone</h2>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={() => alert("Settings saved!")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default RecruiterSettingsPage;
