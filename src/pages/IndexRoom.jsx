import { useMessage } from "../context/MessageContext";
import { useAuth } from "../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const IndexRoom = () => {
  const { conversations, loading } = useMessage();
  const { user } = useAuth();

  return (
    <section className="hidden md:flex w-full justify-center items-center">
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          <ClipLoader color="#4f46e5" size={20} />
        </p>
      ) : user.role === "student" && conversations.length === 0 ? (
        <p className="text-xl text-warning text-center">
          Students cannot initiate a conversation
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a conversation to start chatting.
        </p>
      )}
    </section>
  );
};

export default IndexRoom;
