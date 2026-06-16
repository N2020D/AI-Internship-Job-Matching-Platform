import { useState } from "react";

function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your application for Frontend Intern was viewed", read: false },
    { id: 2, text: "New recommended job: React Developer", read: false },
  ]);

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Notifications</h1>
      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <p className="text-gray-700">{n.text}</p>
              {!n.read && <button onClick={() => markRead(n.id)} className="text-sm text-blue-600">Mark read</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentNotificationsPage;
