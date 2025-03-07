import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  BsLock,
  BsPatchCheckFill,
  BsPersonCircle,
  BsTrashFill,
} from "react-icons/bs";

const mockEmployers = [
  {
    id: 1,
    company: "TechCorp",
    contactPerson: "John Doe",
    email: "hr@techcorp.com",
    industry: "Technology",
    status: "Verified",
  },
  {
    id: 2,
    company: "MediHealth",
    contactPerson: "Sarah Lee",
    email: "contact@medihealth.com",
    industry: "Healthcare",
    status: "Pending",
  },
  {
    id: 3,
    company: "FinBank",
    contactPerson: "Michael Smith",
    email: "michael@finbank.com",
    industry: "Finance",
    status: "Verified",
  },
];

const EmployersMgt = () => {
  const [employers, setEmployers] = useState(mockEmployers);

  const ProfilePicBodyTemplate = () => (
    <BsPersonCircle className="w-10 h-10 text-center mx-auto" />
  );

  const statusBodyTemplate = (rowData) => (
    <span
      className={`px-3 py-1 rounded-full ${
        rowData.status === "Verified"
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
          <BsPatchCheckFill
            title="Verify"
            className="cursor-pointer"
          />
        )}
      </button>
      <button
        title="Suspend"
        className="rounded-xl text-success font-semibold"
      >
        <BsLock />
      </button>
      <button
        title="Delete"
        className="rounded-xl text-error font-semibold"
      >
        <BsTrashFill />
      </button>
    </div>
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
          showGridlines
          // rowsPerPageOptions={[5, 10, 25, 50]}
          className="dark:text-white"
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
            field="company"
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
            field="status"
            header="Status"
            body={statusBodyTemplate}
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
