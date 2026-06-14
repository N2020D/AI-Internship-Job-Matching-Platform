import ProfilePhoto from "./ProfilePhoto";

function ProfileHeader({ profile, onEdit }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-8">

      <div className="flex flex-col lg:flex-row gap-8">

        <ProfilePhoto profile={profile} />

        <div className="flex-1">

          <h1 className="text-4xl font-bold">

            {profile.name}

          </h1>

          <p className="text-xl text-gray-600 mt-2">

            {profile.degree}

          </p>

          <p className="text-gray-500">

            {profile.university}

          </p>

          <p className="mt-4 text-gray-600">

            {profile.email}

          </p>

          <button

            onClick={onEdit}

            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

          >

            Edit Profile

          </button>

        </div>

      </div>

    </div>

  );

}

export default ProfileHeader;