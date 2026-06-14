import {
  HiBell,
  HiMagnifyingGlass,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/studentService";

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

  const role =
    localStorage.getItem("role");

  const profileImageUrl = getProfileImageUrl(profile.profileImage);

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

        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">

          <HiMagnifyingGlass />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full ml-2"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="relative">

            <HiBell className="text-2xl text-gray-600" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
              3
            </span>

          </button>

          <div className="text-right">

            <h2 className="font-semibold">

              {profile.name}

            </h2>

            <p className="text-xs text-gray-500 capitalize">

              {role}

            </p>

          </div>

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg overflow-hidden">

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

          </div>

          <button

            onClick={logout}

            className="text-red-600 hover:text-red-700"

          >

            <HiArrowRightOnRectangle className="text-3xl" />

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
