import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { VITE_BASE_LINK } from "../BASE_LINK";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const AdminSharePage = () => {
  const location = useParams();
  const headerData = {
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
    share_data: {
      survey_url: "https://nlp.andaal.com/public/survey/",
    },
  };
  const pageData2 = {
    email_list: [
      "vivek@gmail.com",
      "amrit@gmail.com",
      "aayan@gmail.com",
      "simran@gmail.com",
    ],
  };

  const [pageData, setPageData] = useState({});
  const [composeStatus, setComposeStatus] = useState(false);
  const [emailToAdd, setEmailToAdd] = useState("");
  const [emailToStatus, setEmailToStatus] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState();

  // functions
  function copyText(entryText) {
    navigator.clipboard.writeText(entryText);
  }

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }
  // life cycle
  useEffect(() => {
    const formData = new FormData();
    formData?.append("token", localStorage?.getItem("token"));
    axios
      .post(VITE_BASE_LINK + "/getEmailListOfUser", formData)
      ?.then((res) => {
        setPageData(res?.data);

        setEmailMessage(
          headerData?.share_data?.survey_url + location?.survey_id
        );
      });
  }, []);

  useEffect(() => {
    console.log("selectedEmail", selectedEmail);
  }, [selectedEmail]);

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
          {headerData?.links_list?.map((data, index) => {
            return (
              <Link
                key={index}
                to={data?.link_path + location?.survey_id}
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
        <div className="w-[80%] mx-auto mb-10">
          <div>
            <h1 className="text-2xl mb-3">Share to collect responses</h1>
            <p>
              Just copy the URL and send it to your participants to start
              collecting data
            </p>

            <div className="mt-5 text-gray-600">
              {/* url */}
              <div className="p-5 mb-5 bg-white rounded-lg ">
                <h1 className="text-gray-500">Web URL to share</h1>

                <div className=" border rounded-lg flex gap-2 items-center">
                  <h1 className="flex-1 p-3">
                    {headerData?.share_data?.survey_url + location?.survey_id}
                  </h1>
                  <Link
                    to={
                      headerData?.share_data?.survey_url + location?.survey_id
                    }
                    className="p-3 border-x-2"
                    title="Open Survey"
                  >
                    <OpenInNewRoundedIcon />
                  </Link>

                  <button
                    className="p-3"
                    onClick={() =>
                      copyText(
                        headerData?.share_data?.survey_url +
                          +location?.survey_id
                      )
                    }
                    title="copy"
                  >
                    <ContentCopyRoundedIcon />
                  </button>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-5 ">
                {/* compose email */}
                <div className="p-10 bg-white rounded-lg  flex flex-col justify-center items-center gap-5 w-full">
                  <h1 className="flex justify-center items-center gap-10">
                    <span>
                      <ForwardToInboxRoundedIcon className="scale-150" />
                    </span>

                    <span className="text-xl ">Compose Email</span>
                  </h1>
                  <p className="text-center">
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
                          <div className="flex  gap-5 items-start">
                            <h1 className="w-full">To*</h1>
                            <div className="w-full flex items-center gap-1 relative">
                              <div className="w-full">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {selectedEmail?.map((data, index) => {
                                    return (
                                      <div
                                        className="bg-gray-100 p-1 px-2 rounded-lg cursor-pointer"
                                        key={index}
                                        title={data}
                                        onClick={() => {
                                          if (selectedEmail?.includes(data)) {
                                            setSelectedEmail((selectedEmail) =>
                                              arrayRemove(selectedEmail, data)
                                            );
                                          } else {
                                            setSelectedEmail([
                                              ...selectedEmail,
                                              data,
                                            ]);
                                          }
                                        }}
                                      >
                                        {data?.split("@")[0]}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div
                                  onClick={() => setEmailToStatus(true)}
                                  className="p-2 border w-full rounded-lg text-gray-400 flex justify-between items-center cursor-pointer"
                                >
                                  <h1>Select Email</h1>
                                  <div>
                                    <KeyboardArrowDownRoundedIcon />
                                  </div>
                                </div>
                              </div>

                              {emailToStatus && (
                                <div
                                  onClick={() => {
                                    setEmailToStatus(false);
                                  }}
                                  className="fixed inset-0"
                                ></div>
                              )}

                              {emailToStatus && (
                                <div className="absolute top-[105%] left-0 right-0 bg-white border rounded-b-lg shadow-2xl overflow-hidden">
                                  {pageData?.email_list?.map((data, index) => {
                                    return (
                                      <button
                                        key={index}
                                        className=" p-2 hover:bg-gray-100 transition-all w-full  text-left flex gap-2 items-center"
                                        onClick={() => {
                                          if (selectedEmail?.includes(data)) {
                                            setSelectedEmail((selectedEmail) =>
                                              arrayRemove(selectedEmail, data)
                                            );
                                          } else {
                                            setSelectedEmail([
                                              ...selectedEmail,
                                              data,
                                            ]);
                                          }
                                        }}
                                      >
                                        {selectedEmail?.includes(data) ? (
                                          <CheckCircleRoundedIcon
                                            fontSize="small"
                                            className="text-blue-500"
                                          />
                                        ) : (
                                          <CircleRoundedIcon
                                            fontSize="small"
                                            className="text-white border rounded-full border-gray-500"
                                          />
                                        )}

                                        <h1> {data}</h1>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* subject */}
                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <h1 className="w-full">Subject*</h1>
                            <input
                              type="text"
                              placeholder="NPS survey"
                              value={emailSubject}
                              onChange={(e) =>
                                setEmailSubject(e?.target?.value)
                              }
                              className="p-2 border w-full rounded-lg"
                            />
                          </div>
                        </div>
                        {/* mesage */}
                        <div className="p-5 border-b">
                          <div className="flex gap-5 items-center">
                            <textarea
                              placeholder="Write your email here..."
                              rows={10}
                              defaultValue={emailMessage}
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
                            onClick={() => {
                              setComposeStatus(false);
                              const formData = new FormData();
                              formData?.append(
                                "token",
                                localStorage?.getItem("token")
                              );
                              formData?.append(
                                "emails",
                                selectedEmail?.toString()
                              );
                              formData?.append("subject", emailSubject);
                              formData?.append("message", emailMessage);
                              axios
                                .post(VITE_BASE_LINK + "/sendEmail", formData)
                                ?.then((res) => {
                                  console.log(res?.data);
                                  alert(res?.data?.message);
                                });
                            }}
                            className="px-5 py-2 border border-black rounded-lg bg-black text-white transition-all"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* email ids */}
                <div className="p-10 bg-white rounded-lg  w-full">
                  <div className="flex justify-between items-center gap-2">
                    <h1>Email List</h1>

                    <div className="flex gap-2 items-center">
                      <div>
                        <input
                          type="email"
                          value={emailToAdd}
                          onChange={(e) => {
                            setEmailToAdd(e?.target?.value);
                          }}
                          placeholder="Enter email to add"
                          className="text-sm rounded-lg border border-gray-500 p-2"
                        />
                      </div>
                      <button
                        onClick={async () => {
                          const formData = new FormData();
                          formData?.append(
                            "token",
                            localStorage?.getItem("token")
                          );
                          formData?.append("email", emailToAdd);
                          await axios
                            ?.post(VITE_BASE_LINK + "/addEmailToUser", formData)
                            ?.then((res) => {
                              !res?.data?.status && alert(res?.data?.message);
                            });

                          await axios
                            .post(
                              VITE_BASE_LINK + "/getEmailListOfUser",
                              formData
                            )
                            ?.then((res) => {
                              setPageData(res?.data);
                            });

                          setEmailToAdd("");
                        }}
                        className="bg-black text-white active:scale-95 transition-all text-sm p-2 rounded-lg"
                      >
                        Add Email
                      </button>
                    </div>
                  </div>

                  {/* email list */}
                  <div className="h-[200px] overflow-y-scroll mt-2">
                    {pageData?.email_list?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="group flex items-center justify-between gap-2 p-2 hover:bg-gray-100 transition-all "
                        >
                          <h1>
                            <span>{index + 1}. </span>
                            <span>{data}</span>
                          </h1>

                          <button
                            title="Delete"
                            className=" hover:text-red-500"
                            onClick={async () => {
                              const formData = new FormData();
                              formData?.append(
                                "token",
                                localStorage?.getItem("token")
                              );
                              formData?.append("email", data);
                              await axios
                                ?.post(
                                  VITE_BASE_LINK + "/deleteEmailFromUser",
                                  formData
                                )
                                ?.then((res) => {
                                  alert(res?.data?.message);
                                });

                              await axios
                                .post(
                                  VITE_BASE_LINK + "/getEmailListOfUser",
                                  formData
                                )
                                ?.then((res) => {
                                  setPageData(res?.data);
                                });
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      );
                    })}
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
