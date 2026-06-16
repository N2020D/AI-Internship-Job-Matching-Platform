import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiDocumentText,
  HiBriefcase,
  HiClipboardDocumentList,
  HiSparkles,
  HiBell,
  HiCog6Tooth,
} from "react-icons/hi2";

function StudentSidebar() {
  const studentMenu = [
    {
      name: "Dashboard",
      icon: <HiHome />,
      path: "/student/dashboard",
    },
    {
      name: "Profile",
      icon: <HiUser />,
      path: "/student/profile",
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

  return (
    <aside className="w-64 bg-slate-800 text-white h-[calc(100vh-81px)] sticky top-20.25 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">Student Hub</h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {studentMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg mb-2 transition ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default StudentSidebar;
