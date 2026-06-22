import {
  HiGlobeAlt,
  HiPencilSquare,
} from "react-icons/hi2";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function SocialLinksCard({ profile, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Social Links
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          <HiPencilSquare />
          Edit Links
        </button>

      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-4 p-4 border rounded-xl">

          <FaGithub className="text-3xl text-black" />

          <div className="flex-1">

            <h3 className="font-semibold">
              GitHub
            </h3>

            {profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all"
              >
                {profile.github}
              </a>
            ) : (
              <p className="text-gray-500">
                GitHub profile not added.
              </p>
            )}

          </div>

        </div>

        <div className="flex items-center gap-4 p-4 border rounded-xl">

          <FaLinkedin className="text-3xl text-blue-700" />

          <div className="flex-1">

            <h3 className="font-semibold">
              LinkedIn
            </h3>

            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all"
              >
                {profile.linkedin}
              </a>
            ) : (
              <p className="text-gray-500">
                LinkedIn profile not added.
              </p>
            )}

          </div>

        </div>

        <div className="flex items-center gap-4 p-4 border rounded-xl">

          <HiGlobeAlt className="text-3xl text-green-600" />

          <div className="flex-1">

            <h3 className="font-semibold">
              Portfolio
            </h3>

            {profile.portfolio ? (
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all"
              >
                {profile.portfolio}
              </a>
            ) : (
              <p className="text-gray-500">
                Portfolio website not added.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SocialLinksCard;
