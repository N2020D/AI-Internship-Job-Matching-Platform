import { useState } from "react";

function StudentSettingsPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    showProfileToRecruiters: true,
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : e.target.value });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Email Alerts</p>
            <p className="text-sm text-gray-600">Receive email updates about new jobs and application status</p>
          </div>
          <input type="checkbox" name="emailAlerts" checked={settings.emailAlerts} onChange={handleChange} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Profile visibility</p>
            <p className="text-sm text-gray-600">Allow recruiters to view your public profile</p>
          </div>
          <input type="checkbox" name="showProfileToRecruiters" checked={settings.showProfileToRecruiters} onChange={handleChange} />
        </div>

        <div className="flex gap-3">
          <button onClick={() => alert('Settings saved')} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
          <button onClick={() => alert('Changes discarded')} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default StudentSettingsPage;
