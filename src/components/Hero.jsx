import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <section className="w-full h-72 bg-blue-600 dark:bg-blue-800 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold">Your Career Journey Starts Here</h1>
      <p className="text-lg mt-2 ">
        Find mentors, explore job opportunities, and grow your skills
      </p>
      {!user && (
        <div className="px-6 py-2 mt-5 md:mt-10 bg-white text-blue-600 dark:text-blue-800 font-semibold rounded-lg shadow">
          <button
            className="hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>
          /
          <button
            className="hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
