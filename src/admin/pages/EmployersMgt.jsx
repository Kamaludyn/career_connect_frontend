import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPersonCircle, BsTrashFill } from "react-icons/bs";
import { useAdminData } from "../context/AdminDataContext";
import adminApi from "../services/AdminAxiosInstance";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const EmployersMgt = () => {
  const { users } = useAdminData();

  // Filter the list of users to extract only those with the role of "employer"
  const employer_list = users?.filter((user) => user.role === "employer");

  const [employers, setEmployers] = useState(employer_list);
  const [loading, setLoading] = useState({});

  // Function to handle deletion of a employer
  const deleteEmployer = async (rowData) => {
    // Confirm deletion
    const confirmDelete = confirm(
      `Are you sure you want to delete this employer "${
        rowData.surname + " " + rowData.othername
      }"?`
    );
    // If user cancels the confirmation, exit the function
    if (!confirmDelete) return;

    setLoading((prev) => ({ ...prev, [rowData._id]: true }));

    try {
      // Make DELETE request to the backend API to remove the employer by ID
      await adminApi.delete(`/users/${rowData._id}`);

      // Update the employers state to remove the deleted employer
      setEmployers((prev) =>
        prev.filter((employer) => employer._id !== rowData._id)
      );

      // Show success message to the admin
      toast.success("Employer Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Employer");
    } finally {
      setLoading((prev) => ({ ...prev, [rowData._id]: false }));
    }
  };

  // Component to render a placeholder profile picture using an icon
  const ProfilePicBodyTemplate = () => (
    <BsPersonCircle className="w-10 h-10 text-center mx-auto" />
  );

  // Template for rendering delete button in the table
  const actionBodyTemplate = (rowData) => (
    <button
      title="Delete"
      className="rounded-xl text-error font-semibold"
      onClick={() => deleteEmployer(rowData)}
    >
      {loading[rowData._id] ? (
        <ClipLoader color="#ffffff" size={18} />
      ) : (
        <BsTrashFill title="Delete" />
      )}
    </button>
  );

  return (
    <section className="pt-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Employer Management
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-none shadow-md rounded-md">
        <DataTable
          value={employers}
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
            field="companyName"
            header="Company Name"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="contactPerson"
            header="Contact Person"
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
            field="industry"
            header="Industry"
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
    </section>
  );
};

export default EmployersMgt;
