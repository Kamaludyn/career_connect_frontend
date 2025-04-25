import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPersonCircle, BsTrashFill } from "react-icons/bs";
import { useAdminData } from "../context/AdminDataContext";
import adminApi from "../services/AdminAxiosInstance";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const StudentsMgt = () => {
  const { users } = useAdminData();

  // Filter the list of users to extract only those with the role of "student"
  const student_list = users?.filter((user) => user.role === "student");

  // Initialize state to manage the list of students
  const [students, setStudents] = useState(student_list);
  const [loading, setLoading] = useState({});

  // Function to handle deletion of a student
  const deleteStudent = async (rowData) => {
    // Confirm deletion
    const confirmDelete = confirm(
      `Are you sure you want to delete this student "${
        rowData.surname + " " + rowData.othername
      }"?`
    );
    if (!confirmDelete) return;

    setLoading((prev) => ({ ...prev, [rowData._id]: true }));

    try {
      // Make DELETE request to the backend API to remove the student by ID
      await adminApi.delete(`/users/${rowData._id}`);

      // Update the students state to remove the deleted student
      setStudents((prev) =>
        prev.filter((employer) => employer._id !== rowData._id)
      );

      // Show success message to the admin
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed To Delete Student");
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
      onClick={() => deleteStudent(rowData)}
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
      <h2 className="text-2xl font-semibold dark:text-white mb-4">Students</h2>

      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-none p-4 shadow-md rounded-md">
        <DataTable
          value={students}
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
            header="Name of Students"
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
            field="level"
            header="Level"
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

export default StudentsMgt;
