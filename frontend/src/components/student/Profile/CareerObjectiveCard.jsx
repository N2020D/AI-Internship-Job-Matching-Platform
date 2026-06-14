function CareerObjectiveCard({ profile }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          Career Objective

        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

          Edit

        </button>

      </div>

      {profile.careerObjective ? (

        <div className="leading-8 text-gray-700">

          {profile.careerObjective}

        </div>

      ) : (

        <div className="text-center py-8">

          <p className="text-gray-500">

            No career objective added.

          </p>

          <p className="text-sm mt-2 text-gray-400">

            Add your career goals to improve AI job recommendations.

          </p>

        </div>

      )}

    </div>

  );

}

export default CareerObjectiveCard;