import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPersonCircle, BsLock, BsTrashFill } from "react-icons/bs";

const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Computer",
    level: 100,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Banking",
    level: 300,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    department: "Chemistry",
    level: 400,
  },
];

const StudentsMgt = () => {
  const [students, setStudents] = useState(mockStudents);

  const ProfilePicBodyTemplate = () => (
    <BsPersonCircle className="w-10 h-10 text-center mx-auto" />
  );

  const actionBodyTemplate = () => (
    <div className="flex gap-2">
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
      <h2 className="text-2xl font-semibold dark:text-white mb-4">Students</h2>

      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-none p-4 shadow-md rounded-md">
        <DataTable
          value={students}
          paginator
          // removableSort
          showGridlines
          rows={5}
          className="w-full dark:text-white"
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
