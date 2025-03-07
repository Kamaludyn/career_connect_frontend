import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsLock, BsPatchCheckFill, BsTrashFill } from "react-icons/bs";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$60,000 - $80,000",
    status: "Approved",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "FinBank",
    location: "New York, USA",
    type: "Part-time",
    level: "Entry-Level",
    salary: "$50,000 - $65,000",
    status: "Pending",
  },
  {
    id: 3,
    title: "Cybersecurity Engineer",
    company: "MediHealth",
    location: "Hybrid",
    type: "Full-time",
    level: "Senior-Level",
    salary: "$90,000 - $120,000",
    status: "Approved",
  },
];

const JobsMgt = () => {
  const [jobs, setJobs] = useState(mockJobs);

  const statusBodyTemplate = (rowData) => (
    <span
      className={`px-3 py-1 rounded-full ${
        rowData.status === "Approved"
          ? "bg-green-500 text-white"
          : "bg-yellow-500 text-white"
      }`}
    >
      {rowData.status}
    </span>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <button className="w-5 rounded-xl text-primary font-semibold cursor-default">
        {rowData.status === "Pending" && (
          <BsPatchCheckFill title="Approve" className="cursor-pointer" />
        )}
      </button>
      <button title="Suspend" className="rounded-xl text-success font-semibold">
        <BsLock />
      </button>
      <button title="Delete" className="rounded-xl text-error font-semibold">
        <BsTrashFill />
      </button>
    </div>
  );

  return (
    <div className="pt-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Jobs Management
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-none shadow-md rounded-md">
        <DataTable value={jobs} paginator rows={5} className="dark:text-white">
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
            field="salary"
            header="Salary"
            sortable
            headerClassName="custom-header"
            style={{
              whiteSpace: "nowrap",
              padding: "4px",
            }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            headerClassName="custom-header"
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
