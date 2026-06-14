import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  HiHome,
  HiUser,
  HiDocumentText,
  HiBriefcase,
  HiClipboardDocumentList,
  HiSparkles,
  HiBell,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/student/login");
  };

  const studentMenu = [
    {
      name: "Dashboard",
      icon: <HiHome />,
      path: "/student/dashboard",
    },
    {
      name: "Profile",
      icon: <HiUser />,
      path: "/student/profile/StudentProfile",
    },
    {
      name: "Resume",
      icon: <HiDocumentText />,
      path: "/student/resume",
    },
    {
      name: "Jobs",
      icon: <HiBriefcase />,
      path: "/student/jobs",
    },
    {
      name: "Applications",
      icon: <HiClipboardDocumentList />,
      path: "/student/applications",
    },
    {
      name: "AI Matching",
      icon: <HiSparkles />,
      path: "/student/ai",
    },
    {
      name: "Notifications",
      icon: <HiBell />,
      path: "/student/notifications",
    },
    {
      name: "Settings",
      icon: <HiCog6Tooth />,
      path: "/student/settings",
    },
  ];

  const recruiterMenu = [
    {
      name: "Dashboard",
      icon: <HiHome />,
      path: "/recruiter/dashboard",
    },
    {
      name: "Company",
      icon: <HiUser />,
      path: "/recruiter/company",
    },
    {
      name: "Post Job",
      icon: <HiBriefcase />,
      path: "/recruiter/post-job",
    },
    {
      name: "Manage Jobs",
      icon: <HiClipboardDocumentList />,
      path: "/recruiter/jobs",
    },
    {
      name: "AI Matching",
      icon: <HiSparkles />,
      path: "/recruiter/ai",
    },
    {
      name: "Settings",
      icon: <HiCog6Tooth />,
      path: "/recruiter/settings",
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      icon: <HiHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Students",
      icon: <HiUser />,
      path: "/admin/students",
    },
    {
      name: "Recruiters",
      icon: <HiBriefcase />,
      path: "/admin/recruiters",
    },
    {
      name: "Jobs",
      icon: <HiClipboardDocumentList />,
      path: "/admin/jobs",
    },
    {
      name: "Reports",
      icon: <HiDocumentText />,
      path: "/admin/reports",
    },
    {
      name: "Analytics",
      icon: <HiSparkles />,
      path: "/admin/analytics",
    },
    {
      name: "Settings",
      icon: <HiCog6Tooth />,
      path: "/admin/settings",
    },
  ];

  let menu = [];

  if (role === "student") {
    menu = studentMenu;
  } else if (role === "recruiter") {
    menu = recruiterMenu;
  } else {
    menu = adminMenu;
  }

  return (
    <aside className="w-64 bg-slate-800 text-white h-[calc(100vh-81px)] sticky top-20.25 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">
          AI Job Platform
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 bg-slate-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition"
        >
          <HiArrowLeftOnRectangle />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
