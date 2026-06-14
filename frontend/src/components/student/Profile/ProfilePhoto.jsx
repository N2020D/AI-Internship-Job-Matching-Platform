function ProfilePhoto({ profile }) {
  return (
    <div className="flex flex-col items-center">

      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">

        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

      </div>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Change Photo
      </button>

    </div>
  );
}

export default ProfilePhoto;