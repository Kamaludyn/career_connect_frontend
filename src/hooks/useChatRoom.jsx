import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { toast } from "react-hot-toast";
import api from "../services/api";

// Custom hook to encapsulate all chat room logic
const useChatRoom = () => {
  const { id } = useParams(); // receiverId from URL
  const navigate = useNavigate();
  const {
    users,
    conversations,
    setConversations,
    conversation,
    setConversation,
    messages,
    setMessages,
    setUnreadMessages,
    selectedChat,
    setSelectedChat,
  } = useMessage();
  const { user } = useAuth();
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);

  // Ref for scrolling to the bottom of messages
  const messagesEndRef = useRef(null);

  // Ref for the input box to read/send message text
  const messageRef = useRef(null);

  // Track last initialized ID to prevent repeated fetching
  const lastInitId = useRef(null);

  // Get full user object of the receiver based on the ID from the URL
  const receiverId = users?.find((u) => u._id === id);

  // Compose the full name of the receiver for displaying in the chat
  const receiverName = `${receiverId?.othername} ${receiverId?.surname}`.trim();

  // Load messages and conversation
  useEffect(() => {
    const fetchConversationAndMessages = async () => {
      try {
        setLoading(true);

        // Prevent unnecessary re-fetch
        if (lastInitId.current === id) return;
        lastInitId.current = id;

        // Reset message list and current conversation before fetching new data
        setMessages([]);
        setConversation(null);

        // Check if the conversation exists locally
        const existingConvo = conversations.find((c) =>
          c.participants.includes(id)
        );

        let convoData = existingConvo;

        // If not found, create or fetch from API
        if (!existingConvo) {
          const convoRes = await api.post("/conversations", { receiverId: id });
          convoData = convoRes.data;
        }

        setConversation(convoData);

        // If the last message is unread and from the other user, mark it as read
        if (
          convoData.lastMessage?.sender !== user?._id &&
          convoData.lastMessage?.read === false
        ) {
          await api.patch(`/messages/${convoData.lastMessage._id}/read`);

          // Update the conversations context with the read status
          setConversations((prev) =>
            prev.map((convo) =>
              convo._id === convoData._id
                ? {
                    ...convo,
                    lastMessage: { ...convo.lastMessage, read: true },
                  }
                : convo
            )
          );
        }

        // Check if messages are already stored in localStorage
        const storedChats =
          JSON.parse(localStorage.getItem("chatMessages")) || {};

        // If cached messages exist, load them into state
        if (storedChats[convoData._id]) {
          setMessages(storedChats[convoData._id]);
        } else {
          // If not cached, fetch from API and cache them
          const mssgsRes = await api.get(`/messages/${convoData._id}`);
          setMessages(mssgsRes.data);

          storedChats[convoData._id] = mssgsRes.data;
          localStorage.setItem("chatMessages", JSON.stringify(storedChats));
        }
      } catch (error) {
        console.error("Error loading chat");
      } finally {
        setLoading(false);
      }
    };

    fetchConversationAndMessages();
  }, [id]);

  // Automatically scroll to the latest message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join socket room on conversation change
  useEffect(() => {
    if (conversation?._id && socket) {
      socket.emit("join_room", conversation._id);
    }
  }, [conversation?._id, socket]);

  // Update unread badge state
  useEffect(() => {
    const hasUnread = conversations?.some(
      (convo) =>
        convo.lastMessage &&
        convo.lastMessage.read === false &&
        convo.lastMessage.sender !== user?._id
    );
    setUnreadMessages(hasUnread);
  }, [conversations, messages, user?._id]);

  // Send Message Function
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Prevent sending empty messages
    if (!messageRef.current?.value) return;

    // Construct message payload
    const messageData = {
      conversationId: conversation._id,
      sender: user?._id,
      text: messageRef.current.value,
    };

    try {
      // Send message to backend
      const response = await api.post("/messages", messageData);

      // Check if it's a new conversation (used for notifying receiver properly)
      const isNewConversation = !conversations.find((c) =>
        c.participants.some((p) => p._id === id)
      );

      // Emit message via socket to receiver in real time
      socket.emit("send_message", {
        ...response.data,
        receiver: id,
        isNewConversation,
      });

      // Update messages state and cache locally
      setMessages((prev) => {
        const updated = [...prev, response.data];
        const storedChats =
          JSON.parse(localStorage.getItem("chatMessages")) || {};
        storedChats[conversation._id] = updated;
        localStorage.setItem("chatMessages", JSON.stringify(storedChats));
        return updated;
      });

      // Update conversation list with latest message
      setConversations((prev) => {
        const exists = prev?.some(
          (c) => c._id === response.data.conversationId
        );

        // Update existing conversation
        if (exists) {
          return prev.map((convo) =>
            convo._id === response.data.conversationId
              ? { ...convo, lastMessage: response.data }
              : convo
          );
        } else {
          // Add new conversation to top of the list
          const newConvo = {
            _id: response.data.conversationId,
            participants: [
              {
                _id: user._id,
                othername: user.othername,
                surname: user.surname,
              },
              {
                _id: id,
                othername: receiverId?.othername,
                surname: receiverId?.surname,
              },
            ],
            lastMessage: response.data,
          };
          return [newConvo, ...prev];
        }
      });
    } catch (error) {
      toast.error("Error sending message");
    } finally {
      // Clear message input
      messageRef.current.value = "";
    }
  };

  // Handle back button click in chat UI
  const handleClick = () => {
    navigate(-1);
    setSelectedChat(false); // Hide chat UI (for mobile)
  };

  return {
    user,
    receiverId,
    messages,
    messageRef,
    handleSendMessage,
    messagesEndRef,
    receiverName,
    loading,
    selectedChat,
    handleClick,
  };
};

export default useChatRoom;
