import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-72 bg-blue-600 dark:bg-blue-800 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold">Your Career Journey Starts Here</h1>
      <p className="text-lg mt-2 ">
        Find mentors, explore job opportunities, and grow your skills
      </p>
      <button
        className="px-6 py-2 mt-5 md:mt-10 bg-white text-blue-600 dark:text-blue-800 font-semibold rounded-lg shadow"
        onClick={() => navigate("/sign-up")}
      >
        Sign Up/Login
      </button>
    </section>
  );
};

export default Hero;

//     <section className="w-full h-[65vh] flex flex-col justify-center items-center text-center text-lightText dark:text-white rounded-xl relative">
//       <div
//         className="rounded-xl h-[65vh] absolute inset-0 bg-cover bg-center bg-no-repeat dark:hidden dark:bg-gray-900 bg-opacity-60
// "
//         style={{ backgroundImage: `url(${heroImage})` }}
//       />
//       <div
//         className="rounded-xl absolute inset-0 bg-cover bg-center bg-no-repeat hidden dark:block"
//         style={{ backgroundImage: `url(${heroImageDark})` }}
//       />
//       <div className="z-10">
//         <h1 className="text-3xl font-bold">
//           BRIDGE THE GAP BETWEEN EDUCATION AND CAREER
//         </h1>
//         <h2 className="text-xl mt-2">
//           Connect with mentors, discover opportunities, and build your
//           professional future
//         </h2>
//       </div>
//     </section>
