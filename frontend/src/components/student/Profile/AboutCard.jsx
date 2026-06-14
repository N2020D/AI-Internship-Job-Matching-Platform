function AboutCard({ profile }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">

        About Me

      </h2>

      <p className="text-gray-700 leading-8">

        {profile.bio || "No bio available."}

      </p>

    </div>

  );

}

export default AboutCard;