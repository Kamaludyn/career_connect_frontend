import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsTrashFill } from "react-icons/bs";
import { useAdminData } from "../context/AdminDataContext";
import adminApi from "../services/AdminAxiosInstance";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const JobsMgt = () => {
  const { jobs, setJobs } = useAdminData();
  const [loading, setLoading] = useState({});

  // Function to handle deletion of a job
  const deleteJob = async (rowData) => {
    // Confirm deletion
    const confirmDelete = confirm(
      `Are you sure you want to delete this job "${rowData.title}"?`
    );
    // If user cancels the confirmation, exit the function
    if (!confirmDelete) return;
    setLoading((prev) => ({ ...prev, [rowData._id]: true }));
    try {
      // Make DELETE request to the backend API to remove the job by ID
      console.log("rowdata id", rowData._id);
      await adminApi.delete(`/admin/jobs/${rowData._id}`);

      // Update the jobs state to remove the deleted job
      setJobs((prev) => prev.filter((job) => job._id !== rowData._id));

      // Show success message to the admin
      toast.success("Job Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Job");
    } finally {
      setLoading((prev) => ({ ...prev, [rowData._id]: false }));
    }
  };

  // Template for rendering delete button in the table
  const actionBodyTemplate = (rowData) => (
    <button
      title="Delete"
      className="rounded-xl text-error font-semibold"
      onClick={() => deleteJob(rowData)}
    >
      {loading[rowData._id] ? (
        <ClipLoader color="#ffffff" size={18} />
      ) : (
        <BsTrashFill />
      )}
    </button>
  );

  return (
    <div className="pt-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Jobs Management
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-none shadow-md rounded-md">
        <DataTable
          value={jobs}
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
            field="title"
            header="Job Title"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="company"
            header="Company"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="location"
            header="Location"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="currency"
            header="Currency"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="minSalary"
            header="Minimum Salary"
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
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default JobsMgt;
