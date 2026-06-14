import { useRef, useState } from "react";
import {
  deleteProfilePhoto,
  uploadProfilePhoto,
} from "../../../services/studentService";

const getProfileImageUrl = (profileImage) => {
  if (!profileImage) return "";

  if (profileImage.startsWith("http")) {
    return profileImage;
  }

  return `http://localhost:5000/uploads/profile-images/${profileImage}`;
};

function ProfilePhoto({ profile, refreshProfile }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const profileImageUrl = getProfileImageUrl(profile.profileImage);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadProfilePhoto(file);
      await refreshProfile();
      window.dispatchEvent(new Event("student-profile-updated"));
    } catch (error) {
      alert(error.response?.data?.message || "Profile photo upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    const confirmed = window.confirm("Delete your profile photo?");

    if (!confirmed) return;

    try {
      setUploading(true);

      await deleteProfilePhoto();
      await refreshProfile();
      window.dispatchEvent(new Event("student-profile-updated"));
    } catch (error) {
      alert(error.response?.data?.message || "Profile photo delete failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">

      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">

        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handlePhotoChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        {uploading ? "Uploading..." : "Change Photo"}
      </button>

      {profileImageUrl && (
        <button
          type="button"
          onClick={handleDeletePhoto}
          disabled={uploading}
          className="mt-3 border border-red-300 text-red-600 hover:bg-red-50 px-5 py-2 rounded-lg"
        >
          Delete Photo
        </button>
      )}

    </div>
  );
}

export default ProfilePhoto;
