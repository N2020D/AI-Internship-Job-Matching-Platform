import { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import RecentApplications from "../../components/dashboard/RecentApplications";
import AISuggestions from "../../components/dashboard/AISuggestions";
import { getProfile } from "../../services/studentService";
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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();

    window.addEventListener("student-profile-updated", loadProfile);

    return () => {
      window.removeEventListener("student-profile-updated", loadProfile);
    };
  }, []);

  const profileCompletion = calculateProfileCompletion(profile);

  return (
    <div className="space-y-6">

      <WelcomeCard profile={profile} />

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
          value={`${profileCompletion}%`}
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
