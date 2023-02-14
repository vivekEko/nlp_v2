import React from "react";
import { Link, useLocation } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const AdminEditSurvey = () => {
  const location = useLocation();
  const header_data = {
    survey_name: "Survey Name",
    links_list: [
      {
        link_name: "Edit",
        link_path: "/admin/edit/123",
      },

      {
        link_name: "Responses",
        link_path: "/admin/response/123",
      },

      {
        link_name: "Analytics",
        link_path: "/admin/analytic/123",
      },
    ],
  };
  return (
    <div>
      {/* edit header */}
      <header className="flex justify-between items-center px-10 border-b">
        <div className="w-full">
          <ArrowBackIosNewRoundedIcon className="text-gray-600" />
          <input
            type="text"
            defaultValue="Survey Name"
            className="px-3 py-2 border hover:border-gray-500 outline-none border-[#1e1e1e00]  rounded-xl text-lg ml-5"
          />
        </div>

        <div className="flex items-center gap-10 w-full justify-center     ">
          {header_data?.links_list?.map((data, index) => {
            return (
              <Link
                to={data?.link_path}
                className={` ${
                  data?.link_name === "Edit" ? "border-b-[#1e1e1e]" : ""
                } flex-1 border-b-2  h-[50px]  flex justify-center items-center font-semibold translate-y-[2px]  `}
              >
                <span>{data?.link_name}</span>
              </Link>
            );
          })}
        </div>

        <div className="w-full flex justify-end ">
          <div className="bg-gray-100 flex items-center gap-2 text-gray-800 px-5 py-2 rounded-lg">
            <LockRoundedIcon className="text-gray-600" />
            <span>Results end-to-end encryption</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminEditSurvey;
