import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsCheckCircleFill, BsTrashFill } from "react-icons/bs";

const mockReports = [
  {
    id: 1,
    reporter: "John Doe",
    reportedUser: "Fraudulent Employer",
    reason: "Scam Job Posting",
    status: "Pending",
  },
  {
    id: 2,
    reporter: "Alice Smith",
    reportedUser: "MentorX",
    reason: "Inappropriate Behavior",
    status: "Resolved",
  },
  {
    id: 3,
    reporter: "David Brown",
    reportedUser: "CompanyY",
    reason: "Fake Job Offer",
    status: "Pending",
  },
];

const Reports = () => {
  const [reports, setReports] = useState(mockReports);

  const statusBodyTemplate = (rowData) => (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
        rowData.status === "Resolved" ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      {rowData.status}
    </span>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      {rowData.status === "Pending" && (
        <button
          title="Resolve"
          className="text-green-500 hover:text-green-700"
          onClick={() => handleResolve(rowData.id)}
        >
          <BsCheckCircleFill />
        </button>
      )}
      <button
        title="Delete"
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDelete(rowData.id)}
      >
        <BsTrashFill />
      </button>
    </div>
  );

  const handleResolve = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "Resolved" } : report
      )
    );
  };

  const handleDelete = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Reports Management
      </h2>
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
        <DataTable
          value={reports}
          paginator
          rows={5}
          className="dark:text-white"
        >
          <Column field="id" header="Report ID" sortable></Column>
          <Column field="reporter" header="Reporter" sortable></Column>
          <Column field="reportedUser" header="Reported User" sortable></Column>
          <Column field="reason" header="Reason" sortable></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
          ></Column>
          <Column header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Reports;
