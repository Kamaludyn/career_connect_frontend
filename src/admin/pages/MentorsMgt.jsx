import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPersonCircle, BsLock, BsTrashFill } from "react-icons/bs";

const mockMentors = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    expertise: "Software Engineering",
    department: "Info Tech",
    yearOfGraduation: 2024,
  },
  {
    id: 2,
    name: "David Smith",
    email: "david@example.com",
    expertise: "Data Science",
    department: "Bio Tech",
    yearOfGraduation: 2020,
  },
  {
    id: 3,
    name: "Emily Brown",
    email: "emily@example.com",
    expertise: "Cybersecurity",
    department: "SLT",
    yearOfGraduation: 2018,
  },
];

const MentorsMgt = () => {
  const [mentors, setMentors] = useState(mockMentors);

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
      <button className="rounded-xl text-error font-semibold">
        <BsTrashFill title="Delete" />
      </button>
    </div>
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
          rows={5}
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
            field="name"
            header="Name"
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
            field="expertise"
            header="Expertise"
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
