import React, { useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AdminSharePage = () => {
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

    response_data: [{}],
  };

  const [composeStatus, setComposeStatus] = useState(false);

  function copyText(entryText) {
    navigator.clipboard.writeText(entryText);
  }
  return (
    <div className="">
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
                to={data?.link_path}
                className={` ${
                  data?.link_name === "Share" ? "border-b-[#1e1e1e]" : ""
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
      <div className="bg-gray-100  min-h-[98vh]">
        <div className="w-[60%] mx-auto p-5">
          <div>
            <h1 className="text-2xl mb-3">Share to collect responses</h1>
            <p>
              Just copy the URL and send it to your participants to start
              collecting data
            </p>

            <div className="mt-5 text-gray-600">
              <div className="p-5 mb-5 bg-white rounded-lg ">
                <h1 className="text-gray-500">Web URL to share</h1>

                <div className=" border rounded-lg flex gap-2 items-center">
                  <h1 className="flex-1 p-3">https://ekonlp/nps_survey/123</h1>
                  <Link
                    to="/public/survey/123"
                    className="p-3 border-x-2"
                    title="Open Survey"
                  >
                    <OpenInNewRoundedIcon />
                  </Link>

                  <button
                    className="p-3"
                    onClick={() => copyText("https://ekonlp/nps_survey/123")}
                    title="copy"
                  >
                    <ContentCopyRoundedIcon />
                  </button>
                </div>
              </div>

              <div>
                <div className="p-10 bg-white rounded-lg  flex flex-col justify-center items-center gap-5">
                  <h1 className="flex justify-center items-center gap-10">
                    <span>
                      <ForwardToInboxRoundedIcon className="scale-150" />
                    </span>

                    <span className="text-xl ">Compose Email</span>
                  </h1>
                  <p>
                    Send your survey through email using default or custom
                    templates to multiple audiences in your contacts.
                  </p>

                  <div className="relative">
                    <button
                      onClick={() => setComposeStatus(true)}
                      className="px-5 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all"
                    >
                      Compose
                    </button>

                    {composeStatus && (
                      <div
                        onClick={() => setComposeStatus(false)}
                        className="fixed inset-0 bg-black bg-opacity-20"
                      ></div>
                    )}

                    {composeStatus && (
                      <div className="fixed bg-white rounded-lg translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] min-w-[600px]">
                        <div className="flex justify-between items-center text-xl border-b p-5 ">
                          <h1>Compose Email</h1>

                          <button
                            className=""
                            onClick={() => setComposeStatus(false)}
                          >
                            <CloseRoundedIcon />
                          </button>
                        </div>

                        {/* inputs */}
                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <h1 className="w-full">To*</h1>
                            <input
                              type="email"
                              placeholder="Enter an email"
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <h1 className="w-full">Sender </h1>
                            <input
                              type="text"
                              placeholder="Enter a name"
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <h1 className="w-full">Reply To*</h1>
                            <input
                              type="email"
                              placeholder="Enter an email"
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <h1 className="w-full">Subject*</h1>
                            <input
                              type="text"
                              placeholder="NPS survey"
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <textarea
                              placeholder="Write your email here..."
                              rows={10}
                              defaultValue="https://ekonlp/nps_survey/123"
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="p-5 flex justify-end items-center gap-2">
                          <button
                            onClick={() => setComposeStatus(false)}
                            className="px-5 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setComposeStatus(false)}
                            className="px-5 py-2 border border-black rounded-lg bg-black text-white transition-all"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSharePage;
