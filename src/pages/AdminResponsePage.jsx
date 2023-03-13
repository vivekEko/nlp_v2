import React from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import axios from "axios";
import { VITE_BASE_LINK } from "../BASE_LINK";
import { useState } from "react";
import { useEffect } from "react";

const AdminResponsePage = () => {
  const [pageData, setPageData] = useState();
  const location = useParams();
  const header_data = {
    survey_name: "Survey Name",
    links_list: [
      {
        link_name: "Edit",
        link_path: "/admin/edit/",
      },

      {
        link_name: "Share",
        link_path: "/admin/share/",
      },

      {
        link_name: "Responses",
        link_path: "/admin/response/",
      },

      {
        link_name: "Analytics",
        link_path: "/admin/analytic/",
      },
    ],
  };

  const pageData2 = {
    responseData: {
      config: {
        rows: 24,
        column: 30,
      },
      questions: [
        "Name",
        "Gender",
        "Email",
        "Age",
        "Phone Number",
        "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
        "In your opinion, what improvements could the company make that would warrant a higher rating from you?",
        "How well our service meets your needs?",
        "How would you rate our quality of service?",
      ],

      answers: [
        {
          id: 1,
          all_answers: [
            "Vivek",
            "Male",
            "vivek.k@ekoinfomatics.com",
            "26",
            "+918638165779",
            "6",
            "Lorem Ipsum dolor sit amet",
            "Extremely well",
            "3.2",
          ],
        },
        {
          id: 2,
          all_answers: [
            "Vidushi",
            "Female",
            "vidushi.k@ekoinfomatics.com",
            "24",
            "+918011361190",
            "4",
            "Lorem Ipsum dolor sit amet2",
            "Very well",
            "5",
          ],
        },
      ],
    },
  };

  useEffect(() => {
    const formData = new FormData();
    formData?.append("token", localStorage?.getItem("token"));
    formData?.append("survey_id", location?.survey_id);
    axios?.post(VITE_BASE_LINK + "/viewResponseData", formData)?.then((res) => {
      setPageData(res?.data);
    });
  }, []);

  return (
    <div>
      {/* response header */}
      <header className="flex justify-between items-center px-10 border-b">
        <div className="w-full">
          <Link to="/admin/surveys">
            <ArrowBackIosNewRoundedIcon className="text-gray-600" />
          </Link>
          <h1 className="inline px-3 py-2   outline-none   rounded-xl text-lg ml-5">
            NPS Survey
          </h1>
        </div>

        <div className="flex items-center gap-10 w-full justify-center     ">
          {header_data?.links_list?.map((data, index) => {
            return (
              <Link
                key={index}
                to={data?.link_path + location?.survey_id}
                className={` ${
                  data?.link_name === "Responses" ? "border-b-[#1e1e1e]" : ""
                } flex-1 border-b-2  h-[50px]  flex justify-center items-center font-semibold translate-y-[2px]  `}
              >
                <span>{data?.link_name}</span>
              </Link>
            );
          })}
        </div>

        <div className="w-full flex justify-end gap-5 py-1">
          <div className="bg-gray-100 flex items-center gap-2 text-gray-800 px-5 py-2 rounded-lg">
            <LockRoundedIcon className="text-gray-600" />
            <span>Results end-to-end encryption</span>
          </div>
        </div>
      </header>

      {/* main body */}
      <div className="w-[80%] mx-auto mb-10">
        {/* all responses */}
        <div className="overflow-x-scroll  border rounded-lg mt-10">
          {/* headings / question list */}
          <div className={` flex   `}>
            {pageData?.questions?.map((questions_data, questions_index) => {
              return (
                <div
                  key={questions_index}
                  title={questions_data}
                  className="flex gap-2 text-sm text-gray-500 w-full min-w-[300px] bg-gray-100 p-2 py-5 "
                >
                  <h1>{questions_index + 1}.</h1>
                  <h1 className="truncate">{questions_data}</h1>
                </div>
              );
            })}
          </div>

          <div className="min-h-[75vh] relative">
            {/* all answers  */}
            <div>
              {pageData?.answers?.map((answers_data, answers_index) => {
                return (
                  <div className="flex" key={answers_index}>
                    {answers_data?.all_answers?.map(
                      (all_answers_data, all_answers_index) => {
                        return (
                          <div
                            key={all_answers_index}
                            className="flex gap-2 text-sm text-gray-800 w-full min-w-[300px] border-b p-2"
                          >
                            <h1 className="truncate">
                              {all_answers_data?.answer ? (
                                all_answers_data?.answer
                              ) : (
                                <p className="text-gray-400 ">No response</p>
                              )}
                            </h1>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* rows and colums count */}
        <div className="bg-gray-100 rounded-b-lg  flex justify-end items-center gap-5 py-5 px-5">
          <div className="flex gap-1 items-center ">
            <h1 className="text-gray-500">Rows : </h1>
            <h2 className=" text-black font-semibold">24</h2>
          </div>

          <div className="flex gap-1 items-center ">
            <h1 className="text-gray-500">Columns : </h1>
            <h2 className=" text-black font-semibold">30</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResponsePage;
