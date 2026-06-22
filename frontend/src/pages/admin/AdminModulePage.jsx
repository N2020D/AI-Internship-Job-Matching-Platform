import {
  HiAdjustmentsHorizontal,
  HiBriefcase,
  HiBuildingOffice2,
  HiChartBarSquare,
  HiClipboardDocumentList,
  HiUserGroup,
} from "react-icons/hi2";

const moduleDetails = {
  students: {
    title: "Students",
    description: "Manage student accounts, profiles, resumes, and profile completion.",
    icon: HiUserGroup,
    items: ["Student profile review", "Resume status", "Skills and education data"],
  },
  recruiters: {
    title: "Recruiters",
    description: "Manage recruiter accounts, company profiles, and hiring activity.",
    icon: HiBuildingOffice2,
    items: ["Recruiter account review", "Company information", "Job posting activity"],
  },
  jobs: {
    title: "Jobs",
    description: "Review platform jobs, categories, status, and hiring pipeline coverage.",
    icon: HiBriefcase,
    items: ["Open and closed jobs", "Job categories", "Application counts"],
  },
  reports: {
    title: "Reports",
    description: "View platform reports for users, jobs, applications, and matching flow.",
    icon: HiClipboardDocumentList,
    items: ["User reports", "Job reports", "Application reports"],
  },
  analytics: {
    title: "Analytics",
    description: "Track platform growth, role activity, and matching performance.",
    icon: HiChartBarSquare,
    items: ["User activity", "Hiring trends", "Matching insights"],
  },
  settings: {
    title: "Settings",
    description: "Configure admin preferences and platform management options.",
    icon: HiAdjustmentsHorizontal,
    items: ["Account settings", "Platform defaults", "Access settings"],
  },
};

function AdminModulePage({ module }) {
  const details = moduleDetails[module] || moduleDetails.students;
  const Icon = details.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Icon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{details.title}</h1>
            <p className="text-gray-600 mt-1">{details.description}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {details.items.map((item) => (
          <section key={item} className="bg-white rounded-lg shadow p-5">
            <p className="text-sm font-semibold text-blue-700 mb-2">Admin module</p>
            <h2 className="font-bold text-gray-900">{item}</h2>
            <p className="text-sm text-gray-600 mt-2">
              This page is ready to connect to backend admin data.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default AdminModulePage;
