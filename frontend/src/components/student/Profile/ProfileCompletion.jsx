function ProfileCompletion({ profile }) {

  let progress = 0;

  if (profile.name) progress += 10;
  if (profile.phone) progress += 10;
  if (profile.bio) progress += 10;
  if (profile.university) progress += 15;
  if (profile.degree) progress += 15;
  if (profile.skills?.length) progress += 20;
  if (profile.resume) progress += 20;

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