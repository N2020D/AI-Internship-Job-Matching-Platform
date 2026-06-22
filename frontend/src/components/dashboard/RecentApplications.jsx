function RecentApplications({ applications = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4">
        Recent Applications
      </h2>

      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
          No applications yet.
        </div>
      ) : (
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
                key={app._id || index}
                className="border-b"
              >
                <td className="py-3">
                  {app.company || "Unknown company"}
                </td>

                <td>{app.title || app.job || "Untitled role"}</td>

                <td>{app.applicationStatus || app.status || "Applied"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentApplications;
