import { useEffect, useState } from "react";
import {
  HiBriefcase,
  HiBuildingOffice2,
  HiClipboardDocumentList,
  HiUserGroup,
  HiClock,
} from "react-icons/hi2";
import { getAdminDashboard } from "../../services/adminService";

const metricCards = [
  { key: "totalStudents", label: "Total Students", icon: HiUserGroup, color: "text-blue-700 bg-blue-50" },
  { key: "totalRecruiters", label: "Total Recruiters", icon: HiBuildingOffice2, color: "text-emerald-700 bg-emerald-50" },
  { key: "totalJobs", label: "Total Jobs", icon: HiBriefcase, color: "text-indigo-700 bg-indigo-50" },
  { key: "totalApplications", label: "Total Applications", icon: HiClipboardDocumentList, color: "text-orange-700 bg-orange-50" },
  { key: "activeJobs", label: "Active Jobs", icon: HiClock, color: "text-purple-700 bg-purple-50" },
];

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({ metrics: {}, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getAdminDashboard();
        setDashboard(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform overview for students, recruiters, jobs, applications, and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="bg-white rounded-2xl shadow p-5">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${card.color}`}>
                <Icon size={22} />
              </div>
              <p className="text-sm text-gray-500 mt-4">{card.label}</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {loading ? "-" : dashboard.metrics?.[card.key] ?? 0}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="py-3">Time</th>
                <th className="py-3">Activity</th>
              </tr>
            </thead>
            <tbody>
              {(dashboard.recentActivity || []).map((item, index) => (
                <tr key={`${item.time}-${index}`} className="border-b last:border-0">
                  <td className="py-3 text-sm font-medium text-gray-900">{item.time}</td>
                  <td className="py-3 text-sm text-gray-600">{item.activity}</td>
                </tr>
              ))}
              {!loading && (dashboard.recentActivity || []).length === 0 && (
                <tr>
                  <td className="py-4 text-sm text-gray-500" colSpan={2}>No recent activity found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
