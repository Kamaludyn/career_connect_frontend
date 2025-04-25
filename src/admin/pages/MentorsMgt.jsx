import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPersonCircle, BsTrashFill } from "react-icons/bs";
import { useAdminData } from "../context/AdminDataContext";
import adminApi from "../services/AdminAxiosInstance";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const MentorsMgt = () => {
  const { users } = useAdminData();

  // Filter the list of users to extract only those with the role of "mentor"
  const mentor_list = users?.filter((user) => user.role === "mentor");

  // Initialize state to manage the list of mentors
  const [mentors, setMentors] = useState(mentor_list);
  const [loading, setLoading] = useState({});

  // Component to render a placeholder profile picture using an icon
  const ProfilePicBodyTemplate = () => (
    <BsPersonCircle className="w-10 h-10 text-center mx-auto" />
  );

  // Function to handle deletion of a mentor
  const deleteMentor = async (rowData) => {
    // Confirm deletion
    const confirmDelete = confirm(
      `Are you sure you want to delete this mentor "${
        rowData.surname + " " + rowData.othername
      }"?`
    );
    // If user cancels the confirmation, exit the function
    if (!confirmDelete) return;

    setLoading((prev) => ({ ...prev, [rowData._id]: true }));

    try {
      // Make DELETE request to the backend API to remove the mentor by ID
      await adminApi.delete(`/users/${rowData._id}`);

      // Update the mentor state to remove the deleted mentor
      setMentors((prev) => prev.filter((mentor) => mentor._id !== rowData._id));

      // Show success message to the admin
      toast.success("Mentor Deleted Succefully");
    } catch (error) {
      // Show error message if deletion fails
      toast.error("Failed To Delete Mentor");
    } finally {
      setLoading((prev) => ({ ...prev, [rowData._id]: false }));
    }
  };

  // Template for rendering delete button in the table
  const actionBodyTemplate = (rowData) => (
    <button
      className="rounded-xl text-error font-semibold"
      onClick={() => deleteMentor(rowData)}
    >
      {loading[rowData._id] ? (
        <ClipLoader color="#ffffff" size={18} />
      ) : (
        <BsTrashFill title="Delete" />
      )}
    </button>
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Mentor Management
      </h2>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-none p-4 shadow-md rounded-md">
        <DataTable
          value={mentors}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          showGridlines
          tableStyle={{
            minWidth: "100%",
          }}
          rowHover
          className="w-full dark:text-white mb-4"
        >
          <Column
            field="ProfilePic"
            header="Profile Pic"
            body={ProfilePicBodyTemplate}
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="name"
            header="Name"
            body={(rowData) => `${rowData.surname} ${rowData.othername}`}
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="email"
            header="Email"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="yearOfGraduation"
            header="Year Of Graduation"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="department"
            header="Department"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default MentorsMgt;
