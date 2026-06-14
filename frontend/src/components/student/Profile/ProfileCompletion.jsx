import { calculateProfileCompletion } from "../../../utils/profileCompletion";

function ProfileCompletion({ profile }) {

  const progress = calculateProfileCompletion(profile);

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Profile Completion

      </h2>

      <div className="w-full h-5 bg-gray-200 rounded-full">

        <div

          className="h-5 bg-green-500 rounded-full"

          style={{

            width: `${progress}%`

          }}

        ></div>

      </div>

      <p className="mt-4 font-semibold">

        {progress}% Completed

      </p>

    </div>

  );

}

export default ProfileCompletion;
