import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsBellFill, BsTrashFill } from "react-icons/bs";

const mockNotifications = [
  {
    id: 1,
    message: "New mentorship request from Jane Doe",
    type: "Mentorship",
    date: "2025-02-28",
    status: "Unread",
  },
  {
    id: 2,
    message: "Job post pending approval: 'Senior Developer'",
    type: "Job Approval",
    date: "2025-02-27",
    status: "Read",
  },
  {
    id: 3,
    message: "New user report submitted",
    type: "Report",
    date: "2025-02-26",
    status: "Unread",
  },
];

const NotificationsMgt = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const statusBodyTemplate = (rowData) => (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
        rowData.status === "Read" ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      {rowData.status}
    </span>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      {rowData.status === "Unread" && (
        <button
          title="Mark as Read"
          className="text-green-500 hover:text-green-700"
          onClick={() => handleMarkAsRead(rowData.id)}
        >
          <BsBellFill />
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

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "Read" }
          : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Notifications Management
      </h2>
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
        <DataTable
          value={notifications}
          paginator
          rows={5}
          className="dark:text-white"
        >
          <Column field="id" header="ID" sortable></Column>
          <Column field="message" header="Message" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
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

export default NotificationsMgt;
