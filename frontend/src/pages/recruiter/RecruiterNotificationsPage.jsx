function RecruiterNotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New applicant received",
      message: "A student has applied to your latest internship posting.",
      time: "10:25 AM",
    },
    {
      id: 2,
      title: "Job performance update",
      message: "Your posted job is now visible to more matching students.",
      time: "11:15 AM",
    },
    {
      id: 3,
      title: "Company profile reminder",
      message: "Complete your company profile to improve recruiter trust.",
      time: "12:00 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Recruiter updates, applicant alerts, and platform reminders.</p>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {notifications.map((item) => (
          <div key={item.id} className="p-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.message}</p>
            </div>
            <span className="text-xs font-semibold text-gray-500 shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruiterNotificationsPage;
