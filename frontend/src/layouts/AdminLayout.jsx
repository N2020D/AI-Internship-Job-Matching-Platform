import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HiArrowRightOnRectangle,
  HiBriefcase,
  HiBuildingOffice2,
  HiChartBarSquare,
  HiCog6Tooth,
  HiDocumentText,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";

const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: HiChartBarSquare },
  { name: "Students", path: "/admin/students", icon: HiUserGroup },
  { name: "Recruiters", path: "/admin/recruiters", icon: HiBuildingOffice2 },
  { name: "Jobs", path: "/admin/jobs", icon: HiBriefcase },
  { name: "Applications", path: "/admin/applications", icon: HiDocumentText },
  { name: "Reports", path: "/admin/reports", icon: HiDocumentText },
  { name: "Settings", path: "/admin/settings", icon: HiCog6Tooth },
];

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <HiShieldCheck size={24} />
            </span>
            <div>
              <p className="font-bold text-gray-900">Nextern Admin</p>
              <p className="text-sm text-gray-500">Control center</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            <HiArrowRightOnRectangle size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-white rounded-lg shadow p-4 h-fit">
          <nav className="space-y-2">
            {adminLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
