import { BsExclamationTriangle } from "react-icons/bs";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
      <BsExclamationTriangle className="text-9xl text-primary mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:secondry transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
