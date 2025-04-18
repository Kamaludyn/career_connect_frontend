import { BsChevronLeft } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import useChatRoom from "../hooks/useChatRoom";

const ChatRoom = () => {
  const {
    user,
    receiverName,
    messages,
    loading,
    messageRef,
    handleSendMessage,
    messagesEndRef,
    selectedChat,
    handleClick,
  } = useChatRoom();

  return (
    <section
      className={`w-full md:h-[80vh] md:w-3/4 p-4 ${
        selectedChat ? "block" : "hidden md:block"
      }`}
    >
      <div>
        <div className="flex items-center mb-4">
          <button
            className="md:hidden mr-2 p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
            onClick={handleClick}
          >
            <BsChevronLeft />
          </button>
          <h2 className="text-xl font-bold">Chat with {receiverName}</h2>
        </div>
        {loading ? (
          <div className="flex w-full justify-center h-[70vh] md:h-[60vh] overflow-x-auto">
            <ClipLoader color="#4f46e5" size={30} />
          </div>
        ) : (
          <div className="h-[65vh] md:h-96 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg overflow-y-auto">
            {messages?.map((msg, index) => (
              <div key={index}>
                <div
                  className={`p-2 rounded-lg ${
                    msg?.sender === user?._id
                      ? "bg-blue-500 w-4/5 text-white self-end ml-auto"
                      : "bg-gray-300 w-4/5 dark:bg-gray-600"
                  }`}
                >
                  <p>{msg?.text}</p>
                </div>
                <p
                  className={`mb-3 rounded-lg text-xs ${
                    msg?.sender === user?._id
                      ? "text-blue-500 w-1/4 ml-auto text-right"
                      : "text-gray-500 w-fit"
                  }`}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(msg?.createdAt))}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        <form
          onSubmit={handleSendMessage}
          className="mt-4 flex justify-between md:gap-2 mx-auto text-base"
        >
          <input
            name="message"
            type="text"
            ref={messageRef}
            placeholder="Type a message..."
            className="min-w-[74%] md:flex-grow p-2 rounded-lg border dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
            required
          />
          <button
            type="submit"
            className="min-w-[24%] p-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatRoom;
