import { HiPlus } from "react-icons/hi2";

function EducationCard({ profile, onEdit }) {
  const education = profile.education || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Education
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <HiPlus />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No education records added.
        </div>
      ) : (
        <div className="space-y-5">
          {education.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    {item.degree}
                  </h3>

                  <p className="text-blue-600">
                    {item.institute}
                  </p>

                  <p className="text-gray-500">
                    {item.field}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-gray-500">
                    {item.startYear} - {item.endYear}
                  </p>

                  <p className="font-semibold text-green-600">
                    GPA : {item.grade}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationCard;
