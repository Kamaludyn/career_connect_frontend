import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "mentorship", message: "John Doe accepted your mentorship request.", time: "2 hours ago", read: false },
    { id: 2, type: "job_alert", message: "New job matching your profile: Frontend Developer at Google.", time: "5 hours ago", read: false },
    { id: 3, type: "event", message: "Reminder: 'Tech Networking Event' starts in 1 hour!", time: "1 day ago", read: true },
    { id: 4, type: "system", message: "Password changed successfully.", time: "2 days ago", read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button onClick={markAllAsRead} className="text-blue-600">Mark All as Read</button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-start gap-3 ${notification.read ? 'opacity-70' : 'font-semibold'}`}
          >
            <span className="text-xl">
              {notification.type === "mentorship" ? "🔵" : 
               notification.type === "job_alert" ? "🟢" : 
               notification.type === "event" ? "🟠" : "🔴"}
            </span>
            <div>
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
