import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiClipboardDocumentList,
  HiSparkles,
  HiCog6Tooth,
} from "react-icons/hi2";

function RecruiterSidebar() {
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

  return (
    <aside className="w-64 bg-slate-800 text-white h-[calc(100vh-81px)] sticky top-20.25 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">Recruiter Hub</h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {recruiterMenu.map((item) => (
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

export default RecruiterSidebar;
