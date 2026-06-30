import {
  HiBell,
  HiMagnifyingGlass,
  HiArrowRightOnRectangle,
  HiXMark,
} from "react-icons/hi2";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/studentService";
import { getMyAppliedJobs } from "../../services/jobService";

const getProfileImageUrl = (profileImage) => {
  if (!profileImage) return "";

  if (profileImage.startsWith("http")) {
    return profileImage;
  }

  return `http://localhost:5000/uploads/profile-images/${profileImage}`;
};

function Navbar() {
  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState(storedUser);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  const role =
    localStorage.getItem("role");

  const notificationPath =
    role === "recruiter"
      ? "/recruiter/notifications"
      : role === "admin"
      ? "/admin/dashboard"
      : "/student/notifications";

  const profileImageUrl = getProfileImageUrl(profile.profileImage);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
        calculateNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

    const calculateNotifications = async (profileData) => {
      try {
        const appliedJobs = await getMyAppliedJobs();
        const profileCompletion = calculateProfileCompletion(profileData);
        
        let count = 0;
        
        // Add 1 if profile incomplete
        if (profileCompletion < 100) count++;
        
        // Add 1 if no resume
        if (!profileData?.resume) count++;
        
        // Add 1 if missing skills
        if (!profileData?.missingSkills || profileData.missingSkills.length > 0) count++;

        setNotificationCount(count);
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

  const calculateProfileCompletion = (profile) => {
    let completed = 0;
    const fields = [
      "name", "email", "phone", "university", "degree",
      "bio", "profileImage", "resume", "linkedin"
    ];

    fields.forEach(field => {
      if (profile?.[field]) completed++;
    });

    return Math.round((completed / fields.length) * 100);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/jobs?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const logout = () => {
    localStorage.clear();

    navigate(`/${role}/login`);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">

      <div className="flex justify-between items-center px-8 py-4">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-blue-700">
            AI Internship Platform
          </h1>

          <p className="text-sm text-gray-500">

            Welcome back,
            <span className="font-semibold ml-1">
              {profile.name}
            </span>

          </p>

        </div>

        {/* Search */}

        <div className="hidden md:flex relative">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="bg-gray-100 px-4 py-2 rounded-lg outline-none focus:bg-gray-50 w-72 transition-colors"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiXMark className="text-gray-600" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <HiMagnifyingGlass className="text-gray-600" />
              <span className="text-gray-600 text-sm">Search jobs...</span>
            </button>
          )}
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button 
            onClick={() => navigate(notificationPath)}
            className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >

            <HiBell className="text-2xl text-gray-600" />

            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                {notificationCount}
              </span>
            )}

          </button>

          <div className="text-right">

            <h2 className="font-semibold">

              {profile.name}

            </h2>

            <p className="text-xs text-gray-500 capitalize">

              {role}

            </p>

          </div>

          <button 
            onClick={() => navigate("/student/profile")}
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all"
          >

            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              profile.name
                ?.charAt(0)
                ?.toUpperCase()
            )}

          </button>

          <button

            onClick={logout}

            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"

          >

            <HiArrowRightOnRectangle className="text-2xl" />

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
