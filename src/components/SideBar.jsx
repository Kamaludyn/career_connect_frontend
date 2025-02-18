import React from "react";
import MyNetwork from "./MyNetwork";
import JobNotifications from "./JobNotifications";

const SideBar = () => {
  return (
    <section className="hidden w-[40%] border">
      <MyNetwork />
      <JobNotifications />
    </section>
  );
};

export default SideBar;
