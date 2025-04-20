import { Link } from "react-router-dom";
import { BsShieldLockFill, BsEnvelopeExclamation } from "react-icons/bs";

const settingsOptions = [
  {
    label: "Change Password",
    icon: <BsShieldLockFill className="w-5 h-5" />,
    path: "/change-password",
  },
  {
    label: "Forgot Password",
    icon: <BsEnvelopeExclamation className="w-5 h-5" />,
    path: "/forgot-password",
  },
];
const Settings = () => {
  return (
    <section className="flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Settings
        </h2>

        {settingsOptions.map((option, index) => (
          <Link to={option.path} key={index}>
            <div className="w-full bg-blue-500 text-white my-2 py-2 rounded p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Settings;
