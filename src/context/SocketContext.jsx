import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  // Local state to hold the socket instance
  const [socket, setSocket] = useState(null);

  // Effect runs when the component mounts or when user._id changes
  useEffect(() => {
    // Only proceed if a user is logged in
    if (user?._id) {
      // Establish a new WebSocket connection to the backend server
      // The user's ID is passed as a query parameter for identification
      const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
        query: { userId: user._id },
      });

      // Emit a custom "register" event to the backend
      // This is often used to tell the server which user is now online
      newSocket.emit("register", user._id);

      setSocket(newSocket);

      // Cleanup function: disconnect socket when component unmounts
      // or when user logs out (user._id changes)
      return () => newSocket.disconnect();
    }
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
