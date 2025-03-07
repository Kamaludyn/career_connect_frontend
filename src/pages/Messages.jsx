import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const conversations = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Hey, how are you?",
      unread: 2,
    },
    {
      id: 2,
      name: "Michael Smith",
      lastMessage: "Let's schedule a call.",
      unread: 0,
    },
    {
      id: 3,
      name: "Emma Brown",
      lastMessage: "Thanks for the help!",
      unread: 1,
    },
  ];

  const messages = [
    { sender: "Alice Johnson", text: "Hey, how are you?" },
    { sender: "You", text: "I'm doing well, thanks!" },
  ];

  return (
    <div className="w-full min-h-screen flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl">
      {/* Sidebar - Show only on larger screens or when a chat is not selected on small screens */}
      <div
        className={`w-full sm:w-1/3 md:w-1/4 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700  rounded-xl sm:rounded-e-none
        ${selectedChat ? "hidden sm:block" : "block"}`}
      >
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 rounded-lg border dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
        />
        <div>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="p-3 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-between"
              onClick={() => setSelectedChat(conv.id)}
            >
              <div>
                <h3 className="font-semibold">{conv.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <span className="bg-red-500 self-start px-2 py-1 text-white text-xs  rounded-full">
                  {conv.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window - Show only on larger screens or when a chat is selected on small screens */}
      <div
        className={`w-full sm:w-2/3 md:w-3/4 p-4 ${
          selectedChat ? "block" : "hidden sm:block"
        }`}
      >
        {selectedChat ? (
          <div>
            <div className="flex items-center mb-4">
              <button
                className="sm:hidden mr-2 p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                onClick={() => setSelectedChat(null)}
              >
                Back
              </button>
              <h2 className="text-xl font-bold">
                Chat with{" "}
                {conversations.find((c) => c.id === selectedChat)?.name}
              </h2>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-500 w-4/5 text-white self-end ml-auto"
                      : "bg-gray-300 w-4/5 dark:bg-gray-600"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between sm:gap-2 mx-auto text-base">
              <input
                type="text"
                placeholder="Type a message..."
                className="min-w-[74%] md:flex-grow p-2 rounded-lg border dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
              />
              <button className="min-w-[24%] p-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Select a conversation to start chatting.
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
