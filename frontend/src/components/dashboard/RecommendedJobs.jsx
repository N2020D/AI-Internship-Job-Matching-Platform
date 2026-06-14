function RecommendedJobs() {
  const jobs = [
    {
      title: "Frontend Intern",
      company: "99X",
    },
    {
      title: "QA Engineer Intern",
      company: "IFS",
    },
    {
      title: "React Developer",
      company: "Dialog",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4">
        Recommended Jobs
      </h2>

      {jobs.map((job, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          <h3 className="font-semibold">
            {job.title}
          </h3>

          <p className="text-gray-500">
            {job.company}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecommendedJobs;