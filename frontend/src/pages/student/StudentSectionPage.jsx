import { useLocation } from "react-router-dom";
import {
  HiBell,
  HiBriefcase,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiDocumentText,
  HiSparkles,
} from "react-icons/hi2";

const sectionDetails = {
  "/student/resume": {
    title: "Resume",
    description: "Manage your uploaded resume and resume-related details.",
    icon: <HiDocumentText />,
  },
  "/student/jobs": {
    title: "Jobs",
    description: "Browse internship and job opportunities matched to you.",
    icon: <HiBriefcase />,
  },
  "/student/applications": {
    title: "Applications",
    description: "Track the applications you have submitted.",
    icon: <HiClipboardDocumentList />,
  },
  "/student/ai": {
    title: "AI Matching",
    description: "Review AI-powered internship recommendations.",
    icon: <HiSparkles />,
  },
  "/student/notifications": {
    title: "Notifications",
    description: "View updates about applications, jobs, and your profile.",
    icon: <HiBell />,
  },
  "/student/settings": {
    title: "Settings",
    description: "Manage account preferences and dashboard settings.",
    icon: <HiCog6Tooth />,
  },
};

function StudentSectionPage() {
  const location = useLocation();
  const section = sectionDetails[location.pathname] || {
    title: "Student Section",
    description: "This student section is ready for your next feature implementation.",
    icon: <HiSparkles />,
  };

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl">
          {section.icon}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {section.title}
          </h1>
          <p className="text-gray-500 mt-1">
            {section.description}
          </p>
        </div>
      </div>

      <div className="mt-8 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
        This section is ready for your next feature implementation.
      </div>
    </div>
  );
}

export default StudentSectionPage;
