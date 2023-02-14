import React from "react";
import { useLocation } from "react-router-dom";
// assets
import logo from "../../../assets/global/header/company_logo.svg";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";

const AdminSidebar = () => {
  // local variables
  const location = useLocation();
  const sidebarData = [
    {
      link_name: "Surveys",
      link_path: "/admin/surveys",
      icon: <NewspaperRoundedIcon />,
    },

    {
      link_name: "Templates",
      link_path: "/admin/templates",
      icon: <WebAssetRoundedIcon />,
    },

    {
      link_name: "Responses",
      link_path: "/admin/responses",
      icon: <StickyNote2RoundedIcon />,
    },
  ];
  return (
    <aside className="fixed w-[200px] border bg-gray-100 h-[100vh] ">
      <div className="p-5 flex">
        <img src={logo} alt="logo" />
      </div>

      <div className="mt-10">
        <div>
          {" "}
          {sidebarData?.map((data, index) => {
            return (
              <div
                key={index}
                className={` ${
                  location?.pathname === data?.link_path ? "bg-gray-300" : ""
                } flex gap-5 p-3 text-sm hover:bg-gray-300 cursor-pointer transition-all`}
              >
                <span>{data?.icon}</span>
                <h1>{data?.link_name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
