import React from "react";

// assets
import logo from "../assets/global/header/company_logo.svg";

const Dashboard = () => {
  const sidebarData = {};
  return (
    <div>
      {/* sidebar */}
      <aside className="fixed w-[300px] border bg-gray-200 h-[100vh] ">
        <div className="p-5 flex">
          <img src={logo} alt="logo" />
        </div>
      </aside>

{/* header */}
<header>
  <div></div>
  <div>
    <button className="px-3 py-2 bg-">+ Create survey</button>
  </div>
</header>

    </div>
  );
};

export default Dashboard;
