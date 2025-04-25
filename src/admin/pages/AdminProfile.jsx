import { BsPersonCircle } from "react-icons/bs";

const AdminProfile = () => {
  const profile = JSON.parse(localStorage.getItem("admin"));

  return (
    <section className="pt-5">
      <h2 className="w-full text-center mx-auto text-2xl font-semibold dark:text-white mb-4">
        Admin Profile
      </h2>
      <div className="bg-white text-lightText dark:text-darkText dark:bg-gray-800 border border-gray-100 dark:border-none shadow-md rounded-md p-5 flex items-center justify-center flex-col">
        <div className="flex justify-center mb-4">
          <BsPersonCircle size={80} />
        </div>
        <h2 className="text-xl font-semibold">
          {profile?.othername} {profile?.surname}
        </h2>
        <p>{profile?.phone}</p>
        <p className="text-gray-500">{profile?.email}</p>
      </div>
    </section>
  );
};

export default AdminProfile;
