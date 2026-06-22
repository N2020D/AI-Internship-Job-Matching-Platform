import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../../../services/studentService";

import ProfileHeader from "../../../components/student/Profile/ProfileHeader";
import ProfileCompletion from "../../../components/student/Profile/ProfileCompletion";
import PersonalInfoCard from "../../../components/student/Profile/PersonalInfoCard";
import AboutCard from "../../../components/student/Profile/AboutCard";
import ProfileStats from "../../../components/student/Profile/ProfileStats";
import CareerObjectiveCard from "../../../components/student/Profile/CareerObjectiveCard";
import EducationCard from "../../../components/student/Profile/EducationCard";
import LanguagesCard from "../../../components/student/Profile/LanguagesCard"; 
import ProjectsCard from "../../../components/student/Profile/ProjectsCard";
import ResumeCard from "../../../components/student/Profile/ResumeCard"; 
import SkillsCard from "../../../components/student/Profile/SkillsCard";
import SocialLinksCard from "../../../components/student/Profile/SocialLinksCard";

function StudentProfile() {

  const navigate = useNavigate();
  const goToEditProfile = () => navigate("/student/profile/edit");

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

 



const loadProfile = async () => {
  try {
    const data = await getProfile();

    setProfile(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};



  if (loading) {

    return (

      <div className="text-center text-xl">

        Loading Profile...

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <ProfileHeader

        profile={profile}

        onEdit={() => navigate("/student/profile/edit")}

        refreshProfile={loadProfile}

      />

      <ProfileCompletion

        profile={profile}

      />

      <ProfileStats

        profile={profile}

      />

      <PersonalInfoCard

        profile={profile}

      />

      <AboutCard

        profile={profile}

      />

      <CareerObjectiveCard

        profile={profile}
        onEdit={goToEditProfile}

      />
  
      <EducationCard

        profile={profile}
        onEdit={goToEditProfile}

      />
  
      <LanguagesCard

        profile={profile}
        onEdit={goToEditProfile}

      />
  
      <ProjectsCard

        profile={profile}
        onEdit={goToEditProfile}

      />   
      <ResumeCard

profile={profile}

refreshProfile={loadProfile}

/>
  
      <SkillsCard

        profile={profile}
        onEdit={goToEditProfile}

      />
  
      <SocialLinksCard

        profile={profile}
        onEdit={goToEditProfile}

      />

    </div>

  );

}

export default StudentProfile;
