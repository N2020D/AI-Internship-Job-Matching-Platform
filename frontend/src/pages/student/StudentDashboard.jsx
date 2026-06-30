import { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import RecentApplications from "../../components/dashboard/RecentApplications";
import AISuggestions from "../../components/dashboard/AISuggestions";
import { getDashboardSummary } from "../../services/studentService";
import { calculateProfileCompletion } from "../../utils/profileCompletion";

import {
  HiBriefcase,
  HiDocumentText,
  HiAcademicCap,
} from "react-icons/hi2";

function StudentDashboard() {
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState(storedUser);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardSummary();

        setProfile(data.profile);
        setApplications(data.applications || []);
      } catch (error) {
        console.log(error);
        setApplications([]);
      }
    };

    loadDashboard();

    window.addEventListener("student-profile-updated", loadDashboard);

    return () => {
      window.removeEventListener("student-profile-updated", loadDashboard);
    };
  }, []);

  const profileCompletion = calculateProfileCompletion(profile);

  return (
    <div className="space-y-6">

      <WelcomeCard profile={profile} />

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="Applications"
          value={applications.length}
          icon={<HiBriefcase />}
          color="border-blue-500"
        />

        <DashboardCard
          title="Resume Score"
          value={`${profile?.atsScore || 0}%`}
          icon={<HiDocumentText />}
          color="border-green-500"
        />

        <DashboardCard
          title="Profile"
          value={`${profileCompletion}%`}
          icon={<HiAcademicCap />}
          color="border-yellow-500"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <RecommendedJobs

profile={profile}

/>

        <AISuggestions profile={profile} />

      </div>

      <RecentApplications applications={applications.slice(0, 5)} />

    </div>
  );
}

export default StudentDashboard;
