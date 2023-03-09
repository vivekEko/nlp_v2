import React from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const AdminResponsePage = () => {
  const header_data = {
    survey_name: "Survey Name",
    links_list: [
      {
        link_name: "Edit",
        link_path: "/admin/edit/123",
      },

      {
        link_name: "Share",
        link_path: "/admin/share/123",
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

  const pageData = {
    responseData: {
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
                to={data?.link_path}
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
      <div>
        <div className="overflow-x-scroll w-[80%] mx-auto border rounded-lg mt-10">
          {/* headings / question list */}
          <div className={` flex   `}>
            {pageData?.responseData?.questions?.map(
              (questions_data, questions_index) => {
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
              }
            )}
          </div>

          <div className="min-h-[80vh] relative">
            {/* all answers  */}
            <div>
              {pageData?.responseData?.answers?.map(
                (answers_data, answers_index) => {
                  return (
                    <div className="flex" key={answers_index}>
                      {answers_data?.all_answers?.map(
                        (all_answers_data, all_answers_index) => {
                          return (
                            <div
                              key={all_answers_index}
                              className="flex gap-2 text-sm text-gray-800 w-full min-w-[300px] border-b p-2"
                            >
                              <h1 className="truncate">{all_answers_data}</h1>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
            </div>

            {/* rows and colums count */}
            <div className="absolute left-0 right-0 bg-gray-100 rounded-b-lg bottom-0 flex justify-end items-center">
              <div className="flex gap-1 items-center ">
                <h1 className="text-gray-500">Rows : </h1>
                <h2 className=" text-black font-semibold">24</h2>
              </div>

              <div>
                <h1>Columns</h1>
                <h2>54</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResponsePage;
