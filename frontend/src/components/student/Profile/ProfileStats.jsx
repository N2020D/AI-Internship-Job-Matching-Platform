import {
  HiUser,
  HiBriefcase,
  HiDocumentText,
  HiAcademicCap,
} from "react-icons/hi2";

function ProfileStats({ profile }) {

  const stats = [

    {
      title: "Applications",
      value: profile.totalApplications || 0,
      icon: <HiBriefcase className="text-3xl text-blue-600" />,
      color: "bg-blue-50",
    },

    {
      title: "Saved Jobs",
      value: profile.savedJobs || 0,
      icon: <HiDocumentText className="text-3xl text-green-600" />,
      color: "bg-green-50",
    },

    {
      title: "Profile Views",
      value: profile.profileViews || 0,
      icon: <HiUser className="text-3xl text-purple-600" />,
      color: "bg-purple-50",
    },

    {
      title: "Resume Score",
      value: `${profile.resumeScore || 0}%`,
      icon: <HiAcademicCap className="text-3xl text-yellow-600" />,
      color: "bg-yellow-50",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className={`${item.color} rounded-xl shadow-lg p-6 hover:shadow-xl transition`}
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">

                {item.title}

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {item.value}

              </h2>

            </div>

            <div>

              {item.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default ProfileStats;