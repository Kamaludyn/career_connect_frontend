import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { useAuth } from "../context/AuthContext";
import { BsCircleFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    conversations,
    setConversations,
    selectedChat,
    setSelectedChat,
    loading,
  } = useMessage();

  const { user } = useAuth();

  // Mark conversation as read
  const handleClick = (convoId) => {
    setConversations((prev) =>
      prev.map((convo) =>
        convo.participants.some((p) => p._id === convoId)
          ? { ...convo, hasUnread: false }
          : convo
      )
    );
    setSelectedChat(true);
  };

  // Filter conversations based on search query
  const filteredConversation = conversations.filter((convo) => {
    return (
      convo.participants.find((p) => p._id !== user?._id) &&
      (convo.participants
        .find((p) => p._id !== user?._id)
        .othername.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        convo.participants
          .find((p) => p._id !== user?._id)
          .surname.toLowerCase()
          .includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white md:-mb-20 rounded-xl">
      <div
        className={`w-full md:w-[35%] lg:w-[25%] bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700 rounded-xl md:rounded-e-none
        ${selectedChat ? "hidden md:block" : "block"}`}
      >
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 mb-4 rounded-lg border dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
        />
        {loading ? (
          <div className="flex w-full justify-center h-[70vh] md:h-[60vh] overflow-x-auto">
            <ClipLoader color="#4f46e5" size={20} />
          </div>
        ) : (
          <div className="h-[70vh] md:h-[60vh] overflow-x-auto">
            {filteredConversation?.map((convo) => {
              let receiver = convo.participants.find(
                (p) => p._id !== user?._id
              );
              let lastMessage = convo.lastMessage;

              return (
                <NavLink
                  key={receiver._id}
                  to={`/messages/${receiver._id}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 flex justify-between p-3 mb-1.5 rounded-lg cursor-pointer overflow-x-auto hover:bg-gray-200 dark:hover:bg-gray-700"
                      : "bg-transparent flex justify-between p-3 mb-1.5 rounded-lg cursor-pointer overflow-x-auto hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                  onClick={() => handleClick(receiver._id)}
                >
                  <div>
                    <h3 className="font-semibold">
                      {receiver.othername} {receiver.surname}
                    </h3>
                    <p
                      className={`${
                        convo.hasUnread ? "text-secondary" : "text-gray-500"
                      } text-sm`}
                    >
                      {lastMessage.text}
                    </p>
                  </div>
                  {!window.location.pathname.endsWith(receiver._id) &&
                    convo.hasUnread && (
                      <BsCircleFill className="text-error self-start text-xl px-1 py-.5" />
                    )}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Messages;
