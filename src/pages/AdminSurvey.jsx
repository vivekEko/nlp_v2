import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import AdminSidebar from "../components/globals/admin/AdminSidebar";
import AdminHeader from "../components/globals/admin/AdminHeader";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { VITE_BASE_LINK } from "../BASE_LINK";
import axios from "axios";

const AdminSurvey = () => {
  // local variables
  const [searchText, setSearchText] = useState("");
  const [pageData, setPageData] = useState({});
  const survey_list_data = {
    headings: ["Title", "Status", "Responses", "Created", "Actions"],
    contents: [
      {
        id: 1,
        title: "Net Promoter Score survey 1",
        status: "LIVE",
        responses: 5,
        created: "11-Feb-2023",
      },
      {
        id: 2,
        title: "Net Promoter Score survey 2",
        status: "CLOSED",
        responses: 8,
        created: "12-Feb-2023",
      },

      {
        id: 3,
        title: "Net Promoter Score survey 3",
        status: "LIVE",
        responses: 10,
        created: "13-Feb-2023",
      },
      {
        id: 4,
        title: "Net Promoter Score survey 4",
        status: "LIVE",
        responses: 45,
        created: "14-Feb-2023",
      },

      {
        id: 5,
        title: "Net Promoter Score survey 5",
        status: "LIVE",
        responses: 12,
        created: "15-Feb-2023",
      },
      {
        id: 6,
        title: "Net Promoter Score survey 6",
        status: "CLOSED",
        responses: 8,
        created: "16-Feb-2023",
      },
    ],
  };

  // lifecycle calls
  useEffect(() => {
    const formData = new FormData();
    formData?.append("token", localStorage?.getItem("token"));
    axios
      ?.post(VITE_BASE_LINK + "/userListViewSurvey", formData)
      ?.then((res) => {
        setPageData(res?.data);
      });
  }, []);

  return (
    <div className="bg-gray-50  min-h-screen">
      <AdminSidebar />

      <div className="pl-[200px] bg-white min-h-screen">
        <AdminHeader />

        <div className=" h-full">
          <div className="w-[90%] mx-auto py-5">
            {/* search  and filters*/}
            <div className="">
              <label
                htmlFor="search_survey"
                onClick={() => {
                  search_survey?.current?.focus();
                }}
                className="text-lg px-5  flex items-center gap-2 w-full max-w-[400px] border rounded-xl"
              >
                <SearchRoundedIcon
                  className="text-gray-500"
                  fontSize="medium"
                />
                <input
                  id="search_survey"
                  type="text"
                  placeholder="search surveys..."
                  onChange={(e) => {
                    setSearchText(e?.target?.value);
                  }}
                  className="p-3 w-full outline-none"
                />
              </label>
            </div>

            {/* survey array data */}

            <div className="px-5">
              <div className="grid grid-cols-6 mt-5 pb-5">
                {pageData?.headings?.map((data, index) => {
                  return (
                    <div
                      className={` ${
                        data === "Title" ? "col-span-2" : ""
                      } w-full  text-gray-500 text-sm `}
                      key={index}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>

              <div>
                {pageData?.content
                  ?.filter((filterValue) => {
                    if (searchText === "") {
                      return filterValue;
                    } else if (
                      filterValue?.title
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase()) ||
                      filterValue?.status
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())
                    ) {
                      return filterValue;
                    }
                  })
                  ?.map((data, index) => {
                    return (
                      <div
                        className="grid grid-cols-6  border-b text-gray-800 text-base hover:bg-gray-100"
                        key={index}
                      >
                        <Link
                          to={"/admin/edit/" + data?.id}
                          className="w-full col-span-2 group overflow-hidden cursor-pointer pl-3 py-3"
                        >
                          <div>
                            <div className="-translate-x-9 transition-all duration-500 group-hover:translate-x-0">
                              <span>
                                <ModeEditOutlineOutlinedIcon className="mr-3 text-gray-500 " />
                              </span>
                              <span className="truncate">{data?.title}</span>
                            </div>
                          </div>
                        </Link>
                        <div className="w-full font-semibold py-3">
                          {data?.status}
                        </div>
                        <div className="w-full text-gray-400 py-3">
                          {data?.responses
                            ? data?.responses
                            : "No responses yet"}
                        </div>
                        <div className="w-full text-gray-400 py-3">
                          {data?.created}
                        </div>
                        <div className="w-full flex items-center gap-5 text-gray-500">
                          {/* edit */}
                          <div className="group  relative inline-block  border-gray-400  text-center">
                            <button className="">
                              <EditRoundedIcon />
                            </button>
                            <div className="opacity-0  bg-[#1e1e1e] text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2  px-3 pointer-events-none">
                              <span>Edit</span>
                              <svg
                                className="absolute text-[#1e1e1e] h-2 w-full left-0 top-full"
                                x="0px"
                                y="0px"
                                viewBox="0 0 255 255"
                              >
                                <polygon
                                  className="fill-current"
                                  points="0,0 127.5,127.5 255,0"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* view */}
                          <div className="group  relative inline-block  border-gray-400  text-center">
                            <button className="">
                              <LaunchRoundedIcon />
                            </button>
                            <div className="opacity-0  bg-[#1e1e1e] text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2  px-3 pointer-events-none">
                              <span>View</span>
                              <svg
                                className="absolute text-[#1e1e1e] h-2 w-full left-0 top-full"
                                x="0px"
                                y="0px"
                                viewBox="0 0 255 255"
                              >
                                <polygon
                                  className="fill-current"
                                  points="0,0 127.5,127.5 255,0"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* copy */}
                          <div className="group  relative inline-block  border-gray-400  text-center">
                            <button className="">
                              <ContentCopyRoundedIcon />
                            </button>
                            <div className="opacity-0  bg-[#1e1e1e] text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2  px-3 pointer-events-none ">
                              <span>Copy link</span>
                              <svg
                                className="absolute text-[#1e1e1e] h-2 w-full left-0 top-full"
                                x="0px"
                                y="0px"
                                viewBox="0 0 255 255"
                              >
                                <polygon
                                  className="fill-current"
                                  points="0,0 127.5,127.5 255,0"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* responses */}
                          <div className="group  relative inline-block  border-gray-400  text-center ">
                            <button className="">
                              <DescriptionRoundedIcon />
                            </button>
                            <div className="opacity-0 bg-[#1e1e1e] text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-0  px-3 pointer-events-none ">
                              <span>Response</span>
                              <svg
                                className="absolute text-[#1e1e1e] h-2 w-full left-0 top-full"
                                x="0px"
                                y="0px"
                                viewBox="0 0 255 255"
                              >
                                <polygon
                                  className="fill-current"
                                  points="0,0 127.5,127.5 255,0"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSurvey;
