import { HiCodeBracket, HiPlus } from "react-icons/hi2";

function ProjectsCard({ profile, onEdit }) {

  const projects = profile.projects || [];

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          Projects

        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          <HiPlus />

          Add Project

        </button>

      </div>

      {projects.length === 0 ? (

        <div className="text-center py-8 text-gray-500">

          No projects added.

        </div>

      ) : (

        <div className="space-y-5">

          {projects.map((project, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-2">

                    <HiCodeBracket className="text-blue-600 text-2xl" />

                    <h3 className="text-xl font-semibold">

                      {project.title}

                    </h3>

                  </div>

                  <p className="text-gray-600 mt-3 leading-7">

                    {project.description}

                  </p>

                </div>

              </div>

              {project.github && (

                <div className="mt-5">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >

                    {project.github}

                  </a>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default ProjectsCard;
