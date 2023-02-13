import React from "react";

// assets
import logo from "../assets/global/header/company_logo.svg";

const Dashboard = () => {
  const sidebarData = {};
  return (
    <div>
      <aside className="fixed w-[300px] border bg-gray-200 h-[100vh] ">
        <div className="p-5 flex">
          <img src={logo} alt="logo" />
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
