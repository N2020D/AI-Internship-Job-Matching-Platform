function RecentApplications() {
  const applications = [
    {
      company: "99X",
      job: "Software Engineer Intern",
      status: "Pending",
    },
    {
      company: "IFS",
      job: "QA Engineer",
      status: "Interview",
    },
    {
      company: "Dialog",
      job: "React Developer",
      status: "Reviewed",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4">
        Recent Applications
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Company</th>
            <th className="text-left">Position</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, index) => (
            <tr
              key={index}
              className="border-b"
            >
              <td className="py-3">
                {app.company}
              </td>

              <td>{app.job}</td>

              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentApplications;