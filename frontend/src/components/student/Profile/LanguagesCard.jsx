import { HiLanguage } from "react-icons/hi2";

function LanguagesCard({ profile }) {
  const languages = profile.languages || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Languages
        </h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Language
        </button>

      </div>

      {languages.length === 0 ? (

        <div className="text-center py-8 text-gray-500">

          No languages added.

        </div>

      ) : (

        <div className="space-y-4">

          {languages.map((language, index) => (

            <div
              key={index}
              className="flex justify-between items-center border rounded-xl p-4 hover:shadow-md transition"
            >

              <div className="flex items-center gap-3">

                <HiLanguage className="text-2xl text-blue-600" />

                <div>

                  <h3 className="font-semibold text-lg">

                    {language.name}

                  </h3>

                  <p className="text-gray-500">

                    {language.level}

                  </p>

                </div>

              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                {language.level}

              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default LanguagesCard;