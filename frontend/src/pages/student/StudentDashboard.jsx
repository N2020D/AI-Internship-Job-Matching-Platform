import DashboardCard from "../../components/dashboard/DashboardCard";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import RecentApplications from "../../components/dashboard/RecentApplications";
import AISuggestions from "../../components/dashboard/AISuggestions";

import {
  HiBriefcase,
  HiDocumentText,
  HiAcademicCap,
} from "react-icons/hi2";

function StudentDashboard() {
  return (
    <div className="space-y-6">

      <WelcomeCard />

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="Applications"
          value="14"
          icon={<HiBriefcase />}
          color="border-blue-500"
        />

        <DashboardCard
          title="Resume Score"
          value="88%"
          icon={<HiDocumentText />}
          color="border-green-500"
        />

        <DashboardCard
          title="Profile"
          value="92%"
          icon={<HiAcademicCap />}
          color="border-yellow-500"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <RecommendedJobs />

        <AISuggestions />

      </div>

      <RecentApplications />

    </div>
  );
}

export default StudentDashboard;