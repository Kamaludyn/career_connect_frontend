import { useState } from "react";
import SidebarNav from "./SidebarNav";
import Header from "./Header";

const AdminNav = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <SidebarNav isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default AdminNav;
