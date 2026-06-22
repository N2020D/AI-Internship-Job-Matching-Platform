import { HiPlus } from "react-icons/hi2";

function SkillsCard({ profile, onEdit }) {

  const skills = profile.skills || [];

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Skills
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <HiPlus />

          Add Skill

        </button>

      </div>

      {skills.length === 0 ? (

        <div className="text-center py-8 text-gray-500">

          No skills added.

        </div>

      ) : (

        <div className="flex flex-wrap gap-4">

          {skills.map((skill, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium hover:bg-blue-200 transition"
            >

              {skill}

            </span>

          ))}

        </div>

      )}

    </div>

  );

}

export default SkillsCard;
