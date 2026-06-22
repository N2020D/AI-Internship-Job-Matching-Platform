import {
  HiBriefcase,
  HiBuildingOffice2,
  HiClipboardDocumentList,
  HiUserGroup,
} from "react-icons/hi2";

const adminModules = [
  {
    title: "Students",
    description: "Review student accounts, profiles, resumes, and profile completion.",
    icon: HiUserGroup,
    stat: "Student module",
  },
  {
    title: "Recruiters",
    description: "Manage recruiter accounts, company details, and hiring activity.",
    icon: HiBuildingOffice2,
    stat: "Recruiter module",
  },
  {
    title: "Jobs",
    description: "Monitor posted jobs, job status, categories, and application activity.",
    icon: HiBriefcase,
    stat: "Job module",
  },
  {
    title: "Applications",
    description: "Track platform applications and review matching workflow coverage.",
    icon: HiClipboardDocumentList,
    stat: "Application module",
  },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Load admin modules from this dashboard area after admin login.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {adminModules.map((module) => {
          const Icon = module.icon;

          return (
            <section key={module.title} className="bg-white rounded-lg shadow p-5">
              <div className="h-11 w-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <p className="text-sm font-semibold text-blue-700 mb-1">{module.stat}</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
