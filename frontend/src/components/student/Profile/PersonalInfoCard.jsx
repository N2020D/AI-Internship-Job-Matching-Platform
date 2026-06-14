function PersonalInfoCard({ profile }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        Personal Information

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label className="text-gray-500">

            Full Name

          </label>

          <p>{profile.name}</p>

        </div>

        <div>

          <label className="text-gray-500">

            Email

          </label>

          <p>{profile.email}</p>

        </div>

        <div>

          <label className="text-gray-500">

            Phone

          </label>

          <p>{profile.phone}</p>

        </div>

        <div>

          <label className="text-gray-500">

            Gender

          </label>

          <p>{profile.gender}</p>

        </div>

        <div>

          <label className="text-gray-500">

            University

          </label>

          <p>{profile.university}</p>

        </div>

        <div>

          <label className="text-gray-500">

            Degree

          </label>

          <p>{profile.degree}</p>

        </div>

        <div>

          <label className="text-gray-500">

            Academic Year

          </label>

          <p>{profile.academicYear}</p>

        </div>

        <div>

          <label className="text-gray-500">

            GPA

          </label>

          <p>{profile.gpa}</p>

        </div>

      </div>

    </div>

  );

}

export default PersonalInfoCard;