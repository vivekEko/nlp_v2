import React, { useState } from "react";
// assets
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BrowserUpdatedRoundedIcon from "@mui/icons-material/BrowserUpdatedRounded";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  // local variables
  const [accountDropdownStatus, setAccountDropdownStatus] = useState(false);
  const [createSurveyOverlay, setCreateSurveyOverlay] = useState(false);
  const account_dropdown = {
    user_details: {
      email: "vivek.k@ekoinfomatics.com",
      first_name: "Vivek",
      last_name: "Khanal",
    },

    link_contents: [
      {
        link_name: "Sign out",
        link_path: "/",
      },
    ],
  };

  const create_survey = [
    {
      icon: <PostAddRoundedIcon fontSize="large" />,
      heading: "Create from scratch",
      paragraph: "Jump right in and build something beautiful",
    },

    {
      icon: <WebRoundedIcon fontSize="large" />,
      heading: "Create from template",
      paragraph: "Pick a premade template and customize it as you please",
    },

    {
      icon: <PsychologyRoundedIcon fontSize="large" />,
      heading: "Create using AI",
      paragraph:
        "Tell us what you need and we will generate a survey based on that",
    },

    {
      icon: <BrowserUpdatedRoundedIcon fontSize="large" />,
      heading: "Import",
      paragraph:
        "Use this function to import a BlockSurvey-exported form or survey. Only the JSON format is supported.",
    },
  ];

  return (
    <header className="flex justify-end items-center p-5 gap-5 border-b bg-gray-50">
      <div>
        <button
          onClick={() => {
            setCreateSurveyOverlay(!createSurveyOverlay);
          }}
          className="px-3 py-2 bg-[#1e1e1e] rounded-lg text-white flex items-center gap-2 active:scale-95 transition-all hover:bg-white hover:text-[#1e1e1e] duration-300 border-2 border-[#1e1e1e] group"
        >
          <span className="text-white group-hover:text-[#1e1e1e] block text-[16px] transition-all duration-300">
            <AddRoundedIcon fontSize="medium" className="" />
          </span>{" "}
          <span className="block font-semibold">Create survey</span>
        </button>
      </div>

      <div className="flex justify-center items-center cursor-pointer relative">
        <div className="bg-gray-200 rounded-full w-[40px] aspect-square flex justify-center items-center tracking-widest font-semibold text-gray-800">
          {account_dropdown?.user_details?.first_name?.split("")[0]}
          {account_dropdown?.user_details?.last_name?.split("")[0]}
        </div>
        <button
          onClick={() => setAccountDropdownStatus(!accountDropdownStatus)}
          className=""
        >
          <KeyboardArrowDownRoundedIcon />
        </button>
        {accountDropdownStatus && (
          <div className="absolute top-[120%] right-0 shadow-xl border  bg-white rounded-lg w-[300px] overflow-hidden">
            {/* sub header */}
            <div className="flex items-center gap-5 border-b p-5">
              <div>
                <div className="bg-gray-200 rounded-full w-[40px] aspect-square flex justify-center items-center tracking-widest font-semibold text-gray-800">
                  {account_dropdown?.user_details?.first_name?.split("")[0]}
                  {account_dropdown?.user_details?.last_name?.split("")[0]}
                </div>
              </div>

              <h1 className="truncate text-gray-600">
                {account_dropdown?.user_details?.email}
              </h1>
            </div>

            {/* content map */}
            <div className="">
              {account_dropdown?.link_contents?.map((link_data, link_index) => {
                return (
                  <div
                    key={link_index}
                    className="p-5 text-gray-600 hover:bg-gray-100"
                  >
                    <h1>{link_data?.link_name}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* overlay of create survey */}
      {createSurveyOverlay && (
        <div
          className="bg-black bg-opacity-30 inset-0 fixed z-[50]"
          onClick={() => {
            setCreateSurveyOverlay(!createSurveyOverlay);
          }}
        ></div>
      )}

      {createSurveyOverlay && (
        <div className="bg-white   rounded-lg p-5 top-[50%] right-[calc(50%-600px)] translate-x-[-50%] translate-y-[-50%]   fixed z-[55] max-w-[600px] w-full ">
          <div className="grid grid-cols-2 gap-5">
            {create_survey?.map((data, index) => {
              return (
                <Link key={index} to="/admin/edit/123">
                  <div className="hover:shadow-xl transition-all duration-300 cursor-pointer p-5 border rounded-lg">
                    <div className="bg-gray-100 rounded-lg aspect-video flex justify-center items-center text-gray-600">
                      {data?.icon}
                    </div>

                    <h1 className="text-lg text-gray-800 my-2">
                      {data?.heading}
                    </h1>
                    <p className="text-sm text-gray-500">{data?.paragraph}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
