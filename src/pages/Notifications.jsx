import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { handleNotificationNavigation } from "../utils/NotificationRouter";
import { toast } from "react-hot-toast"

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);

      try {
        const response = await api.get("/notifications");
        // Current timestamp in milliseconds which allows for time manipulation and comparison.
        const currentTime = new Date();

        const notificationTime = response.data.map((res) => {
          // Convert createdAt to a Date object which also allows for time manipulation and comparison.
          const createdTime = new Date(res.createdAt);

          // Get time difference (the result is in milliseconds)
          const timeDifference = currentTime - createdTime;

          // Divide the timeDifference(milliseconds) by 1000 to convert to seconds
          const seconds = Math.floor(timeDifference / 1000);

          // Divide the seconds by 60 to get minutes
          const minutes = Math.floor(seconds / 60);

          // Divide the minutes by 60 to get hours
          const hours = Math.floor(minutes / 60);

          // Divide the hours by 24 to get hours
          const days = Math.floor(hours / 24);

          let timeCreated;

          // Determine the timeCreated based on the time difference
          if (seconds < 60) {
            timeCreated = `${seconds} sec ago`;
          } else if (minutes < 60) {
            timeCreated = `${minutes} min ago`;
          } else if (hours < 24) {
            timeCreated = `${hours} hours ago`;
          } else {
            timeCreated = `${days} days ago`;
          }

          // Add timeCreated to each notification
          return { ...res, timeCreated };
        });
        setNotifications(notificationTime);
      } catch (error) {
        if(error?.code === "ERR_NETWORK"){
          toast.error("Network Error")
        }else{
        console.error("Error getting notifications");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to handle read all notifcation
  const markAllAsRead = async () => {
    try {
      const response = await api.put("/notifications/read-all");
      toast.success(response.data.message);
    } catch (error) {
      if (error?.code === "ERR_NETWORK") {
        toast.error("Network Connect Lost");
      } else {
        console.error("Notifications Error");
      }
    }
  };

  // Function to handle Read Notification and navigate based on notification type
  const handleNotificationClick = async (notification) => {
    try {
      const response = await api.put(`/notifications/${notification._id}/read`);
      // Call the function that handles the navigation
      handleNotificationNavigation(notification, navigate);
    } catch (error) {
      toast.error("Reading Notificationn Error");
    }
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button onClick={markAllAsRead} className="text-blue-600">
          Mark All as Read
        </button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse space-y-2"
            >
              <div className="w-full h-6 bg-gray-400 rounded"></div>
              <div className="w-1/6 h-4 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {notifications?.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-start gap-3 ${
                notification.isRead ? "opacity-70" : "font-semibold"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div>
                <p className="hover:underline cursor-pointer active:bg-red">
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.timeCreated}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
