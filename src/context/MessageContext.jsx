import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import api from "../services/api";

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const { socket } = useSocket();
  const [selectedChat, setSelectedChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(false);

  const { user } = useAuth();

  // Fetch users and conversations when the user logs in or changes
  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      setLoading(true);
      try {
        const usersRes = await api.get("/users");
        setUsers(usersRes.data);

        const convoRes = await api.get(`/conversations/${user?._id}`);

        const filteredConvos = convoRes.data.filter(
          (convo) => convo.lastMessage
        );
        setConversations(filteredConvos);

        const hasUnread = filteredConvos?.some(
          (convo) =>
            convo.lastMessage &&
            convo.lastMessage.read === false &&
            convo.lastMessage.sender !== user._id
        );

        if (hasUnread) {
          setUnreadMessages(hasUnread);
        }
      } catch (error) {
        console.error("Error Fetching Conversations");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user?._id]);

  // Listen for new messages that might create new conversations
  useEffect(() => {
    if (!socket || !user) return;

    // Event handler for a new message in a new conversation
    const handleNewConvoMessage = (data) => {
      // If this conversation doesn't exist yet, add it
      setConversations((prev) => {
        const exists = prev.some((convo) => convo._id === data.conversationId);
        if (!exists) {
          const sender = users.find((u) => u._id === data.sender);
          const newConvo = {
            _id: data.conversationId,
            participants: [
              {
                _id: user._id,
                othername: user.othername,
                surname: user.surname,
              },
              {
                _id: data.sender,
                othername: sender?.othername,
                surname: sender?.surname,
              },
            ],
            lastMessage: { ...data, read: false },
            hasUnread: true,
          };
          return [newConvo, ...prev];
        }
        // If convo already exists, do nothing
        return prev;
      });

      // Add the message to the current messages list
      setMessages((prev) => [...prev, data]);

      // If message is not sent by current user, it's unread
      if (data.sender !== user._id) {
        setUnreadMessages(true);
      }
    };

    // Register socket event listener
    socket.on("new_conversation_message", handleNewConvoMessage);

    // Cleanup listener on component unmount
    return () => socket.off("new_conversation_message", handleNewConvoMessage);
  }, [socket, user, users, setConversations]);

  // Listen for new incoming messages (in existing conversations)
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      // Check if the message belongs to the currently open chat
      const isCurrentChatOpen = data.conversationId === conversation?._id;

      // Append to message list if it's for the currently open chat
      if (isCurrentChatOpen) {
        setMessages((prev) => [...prev, data]);
      }

      // Create a version of the message with the read status based on context
      const updatedMessage = {
        ...data,
        read: isCurrentChatOpen,
      };

      // Update the conversation's last message
      setConversations((prev) => {
        const exists = prev.some((convo) => convo._id === data.conversationId);

        if (exists) {
          return prev.map((convo) => {
            if (convo._id === data.conversationId) {
              return {
                ...convo,
                lastMessage: updatedMessage,
                hasUnread: data.sender !== user._id && !isCurrentChatOpen,
              };
            }
            return convo;
          });
        } else {
          const sender = users.find((user) => user._id === data.sender);
          const newConvo = {
            _id: data.conversationId,
            participants: [
              {
                _id: user._id,
                othername: user.othername,
                surname: user.surname,
              },
              {
                _id: data.sender,
                othername: sender?.othername,
                surname: sender?.surname,
              },
            ],
            lastMessage: updatedMessage,
            hasUnread: true,
          };
          return [newConvo, ...prev];
        }
      });
      // If the message was from someone else and not being viewed, mark as unread
      if (data.sender !== user._id && !isCurrentChatOpen) {
        setUnreadMessages(true);
      }
    };

    socket.on("receive_message", handleMessage);

    return () => socket.off("receive_message", handleMessage);
  }, [socket, user?._id, users, conversation, setConversations]);

  return (
    <MessageContext.Provider
      value={{
        conversations,
        setConversations,
        conversation,
        setConversation,
        messages,
        setMessages,
        users,
        selectedChat,
        setSelectedChat,
        unreadMessages,
        setUnreadMessages,
        loading,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
