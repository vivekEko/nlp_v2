import React, { useEffect } from "react";
import { useState } from "react";

import { motion } from "framer-motion";

// assets
import logo from "../assets/global/header/company_logo.svg";
import company_logo from "../assets/global/header/company_logo.svg";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { VITE_BASE_LINK } from "../BASE_LINK";
import { useParams } from "react-router-dom";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#17286d",
  },
  "& .MuiRating-iconHover": {
    color: "#17286d",
  },
});

const PublicSurveys = () => {
  const [surveyStartStatus, setSurveyStartStatus] = useState("welcome_screen");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [pageData, setPageData] = useState();
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const location = useParams();

  const pageData2 = {
    config: {
      bg_image: "",
      primary_color: "#17286d",
      secondary_color: "",
      total_time: 5000,
    },

    welcome_screen: {
      logo: "",
      heading: "Net Promoter Score Survey",
      sub_text: "",
      start_button_text: "Start Survey",
    },

    survey: [
      {
        question: "Name",
        type: "small_text",
        answer: "",
        important: true,
      },
      {
        question: "Gender",
        type: "list",
        options: ["Male", "Female", "Other", "Prefer not to say"],
        answer: "",
        important: true,
      },
      {
        question: "Email",
        type: "email",
        answer: "",
        important: true,
      },
      {
        question: "Age",
        type: "number",
        answer: "",
        important: true,
      },
      {
        question: "Phone Number",
        type: "number",
        answer: "",
        important: true,
      },
      {
        question:
          "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
        type: "range",
        start_and_end_word: ["Not likely at all", "Extremely likely"],
        answer: "",
      },
      {
        question:
          " In your opinion, what improvements could the company make that would warrant a higher rating from you? ",
        type: "textarea",
        answer: "",
      },
      {
        question: "How well our service meets your needs?",
        type: "list",
        options: [
          "Extremely well",
          "Very well",
          "Somewhat well",
          "Not so well",
          "Not at all well",
        ],
        answer: "",
      },
      {
        question: "How would you rate our quality of service?",
        type: "star",
        answer: "",
      },
    ],

    thank_you_screen: {
      message: "Thank you for your time!",
    },
  };

  useEffect(() => {
    axios
      .get(VITE_BASE_LINK + "/publicSurvey?survey_id=" + location?.survey_id)
      ?.then((res) => {
        console.log("res", res?.data);
        // console.log(pageData2);
        setPageData(res?.data);
      });
  }, []);

  // useEffect(() => {
  //   console.log("activeQuestionIndex:", activeQuestionIndex);
  // }, [activeQuestionIndex]);

  const handleUserKeyPress = (e) => {
    if (e.code == "ArrowUp" || e.code == "Escape") {
      // jump to previous question
      if (activeQuestionIndex > 0) {
        setActiveQuestionIndex(activeQuestionIndex - 1);
      }
    } else if (e.code == "ArrowDown" || e.code == "Enter") {
      // jump to next question
      if (activeQuestionIndex < pageData?.survey?.length - 1) {
        setActiveQuestionIndex(activeQuestionIndex + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  const rangeData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const publicSurveyResponse = () => {
    axios
      ?.post(
        VITE_BASE_LINK +
          "/publicSurveyResponse?survey_id=" +
          location?.survey_id,
        pageData
      )
      ?.then((res) => {
        // setPageData()
        console.log("publicSurveyResponse=", res?.data);
        setSurveyStartStatus("thanks");
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url(../template_1_bg.svg)",
      }}
      className={` ${
        surveyStartStatus === "survey" ? "justify-between flex-col" : ""
      } h-screen bg-fixed bg-cover bg-center bg-no-repeat w-full flex justify-center items-center gap-5 `}
    >
      {surveyStartStatus === "welcome_screen" && (
        <div className="">
          <img
            src={logo}
            alt="company logo"
            className="mx-auto w-full max-w-[200px]"
          />
          <h1
            className={`text-[${pageData?.config?.primary_color}] text-3xl font-semibold my-10`}
          >
            {pageData?.welcome_screen?.heading}
          </h1>
          <button
            onClick={() => setSurveyStartStatus("survey")}
            style={{ backgroundColor: pageData?.config?.primary_color }}
            className={`px-10 py-3 rounded-lg mx-auto block   text-lg font-medium tracking-widest text-white transition-all active:scale-95`}
          >
            {pageData?.welcome_screen?.start_button_text}
          </button>
        </div>
      )}

      {surveyStartStatus === "survey" && (
        <>
          {/* survey header */}
          <div className="flex justify-between items-center gap-5 p-5 w-full">
            <div>
              <img src={company_logo} alt="company logo" />
            </div>

            <div
              style={{ color: pageData?.config?.primary_color }}
              className={`text-sm `}
            >
              Time remaining: 05:00
            </div>
          </div>
          {/* survey questions */}
          <div className="w-full p-5 max-w-[800px]">
            <div className="">
              {pageData?.survey?.map((data, index) => {
                if (activeQuestionIndex === index) {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                    >
                      <div className="flex gap-5 w-full ">
                        <span
                          style={{ color: pageData?.config?.primary_color }}
                          className={`font-semibold text-xl `}
                        >
                          {index + 1}.
                        </span>
                        <h1
                          style={{ color: pageData?.config?.primary_color }}
                          className={`  font-semibold text-xl `}
                        >
                          <span>{data?.question}</span>
                          {data?.important && <span>*</span>}
                        </h1>
                      </div>
                      {/* types of answers */}
                      <div className="ml-10 mt-5">
                        {data?.type === "small_text" && (
                          <input
                            type="text"
                            autoFocus
                            placeholder="Please enter your response"
                            style={{
                              border:
                                `1px solid ` + pageData?.config?.primary_color,
                            }}
                            className={`outline-none bg-transparent focus:shadow-[0px_0px_1px_4px_rgba(0,0,0,0.1)]  p-3 rounded-lg w-full`}
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                survey: pageData?.survey?.map(
                                  (c_data, c_index) => {
                                    if (activeQuestionIndex === c_index) {
                                      return {
                                        ...c_data,
                                        answer: e?.target?.value,
                                      };
                                    } else {
                                      return c_data;
                                    }
                                  }
                                ),
                              });
                            }}
                          />
                        )}

                        {data?.type === "mcq" && (
                          <div autoFocus className="grid grid-cols-2 gap-x-3">
                            {data?.options?.map((o_data, o_index) => {
                              return (
                                <button
                                  key={o_index}
                                  style={{
                                    outlineColor: `  ${pageData?.config?.primary_color}`,
                                  }}
                                  className={`mb-3 p-2 rounded-lg flex gap-5 py-3 items-center w-full cursor-pointer outline outline-1  hover:outline-2 hover:bg-black hover:bg-opacity-5 transition-all `}
                                  onClick={() => {
                                    setPageData({
                                      ...pageData,
                                      survey: pageData?.survey?.map(
                                        (c_data, c_index) => {
                                          if (c_index === activeQuestionIndex) {
                                            return {
                                              ...c_data,
                                              answer: o_data,
                                            };
                                          } else {
                                            return c_data;
                                          }
                                        }
                                      ),
                                    });
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor:
                                        data?.answer === o_data
                                          ? pageData?.config?.primary_color
                                          : "",

                                      border:
                                        data?.answer === o_data
                                          ? ""
                                          : ` 1px solid ${pageData?.config?.primary_color} `,
                                    }}
                                    className={` ${
                                      data?.answer === o_data
                                        ? "outline outline-offset-2"
                                        : ""
                                    } w-4 rounded-full aspect-square transition-all `}
                                  ></div>
                                  <h1 className="text-lg">{o_data}</h1>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {data?.type === "email" && (
                          <input
                            type="email"
                            placeholder="Please enter an email address"
                            autoFocus
                            style={{
                              border:
                                `1px solid ` + pageData?.config?.primary_color,
                            }}
                            className={`outline-none bg-transparent focus:shadow-[0px_0px_1px_4px_rgba(0,0,0,0.1)]  p-3 rounded-lg w-full`}
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                survey: pageData?.survey?.map(
                                  (c_data, c_index) => {
                                    if (activeQuestionIndex === c_index) {
                                      return {
                                        ...c_data,
                                        answer: e?.target?.value,
                                      };
                                    } else {
                                      return c_data;
                                    }
                                  }
                                ),
                              });
                            }}
                          />
                        )}

                        {data?.type === "number" && (
                          <input
                            type="number"
                            placeholder="Please enter a number"
                            autoFocus
                            style={{
                              border:
                                `1px solid ` + pageData?.config?.primary_color,
                            }}
                            className={`outline-none bg-transparent focus:shadow-[0px_0px_1px_4px_rgba(0,0,0,0.1)]  p-3 rounded-lg w-full`}
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                survey: pageData?.survey?.map(
                                  (c_data, c_index) => {
                                    if (activeQuestionIndex === c_index) {
                                      return {
                                        ...c_data,
                                        answer: e?.target?.value,
                                      };
                                    } else {
                                      return c_data;
                                    }
                                  }
                                ),
                              });
                            }}
                          />
                        )}

                        {data?.type === "range" && (
                          <div>
                            <div className="flex gap-5  items-center" autoFocus>
                              {rangeData?.map((o_data, o_index) => {
                                return (
                                  <button
                                    key={o_index}
                                    style={{
                                      outlineColor: `  ${pageData?.config?.primary_color}`,
                                      backgroundColor:
                                        data?.answer === o_data
                                          ? pageData?.config?.primary_color
                                          : "",
                                      color:
                                        data?.answer === o_data ? "white" : "",
                                    }}
                                    className={`mb-3 p-2 rounded-lg flex justify-center  gap-5 py-3 items-center w-full cursor-pointer outline outline-1  hover:outline-2 hover:bg-black hover:bg-opacity-5 transition-all aspect-square
                                
                                  
                                  `}
                                    onClick={() => {
                                      setPageData({
                                        ...pageData,
                                        survey: pageData?.survey?.map(
                                          (c_data, c_index) => {
                                            if (
                                              c_index === activeQuestionIndex
                                            ) {
                                              return {
                                                ...c_data,
                                                answer: o_data,
                                              };
                                            } else {
                                              return c_data;
                                            }
                                          }
                                        ),
                                      });
                                    }}
                                  >
                                    <h1 className="text-lg">{o_data}</h1>
                                  </button>
                                );
                              })}
                            </div>

                            <div
                              className={`w-full flex justify-between items-center text-[${pageData?.config?.primary_color}]`}
                            >
                              <h1>{data?.start_and_end_word[0]}</h1>
                              <h1>{data?.start_and_end_word[1]}</h1>
                            </div>
                          </div>
                        )}

                        {data?.type === "textarea" && (
                          <textarea
                            rows={10}
                            placeholder="Please enter your response"
                            autoFocus
                            style={{
                              border:
                                `1px solid ` + pageData?.config?.primary_color,
                            }}
                            className={`outline-none bg-transparent focus:shadow-[0px_0px_1px_4px_rgba(0,0,0,0.1)]  p-3 rounded-lg w-full`}
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                survey: pageData?.survey?.map(
                                  (c_data, c_index) => {
                                    if (activeQuestionIndex === c_index) {
                                      return {
                                        ...c_data,
                                        answer: e?.target?.value,
                                      };
                                    } else {
                                      return c_data;
                                    }
                                  }
                                ),
                              });
                            }}
                          />
                        )}

                        {data?.type === "list" && (
                          <div className="" tabIndex={0} autoFocus>
                            {data?.options?.map((o_data, o_index) => {
                              return (
                                <div
                                  key={o_index}
                                  style={{
                                    outlineColor: `  ${pageData?.config?.primary_color}`,
                                  }}
                                  className={`mb-3 p-2 rounded-lg flex gap-5 py-3 items-center w-full cursor-pointer outline outline-1  hover:outline-2 hover:bg-black hover:bg-opacity-5 transition-all `}
                                  onClick={() => {
                                    setPageData({
                                      ...pageData,
                                      survey: pageData?.survey?.map(
                                        (c_data, c_index) => {
                                          if (c_index === activeQuestionIndex) {
                                            return {
                                              ...c_data,
                                              answer: o_data,
                                            };
                                          } else {
                                            return c_data;
                                          }
                                        }
                                      ),
                                    });
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor:
                                        data?.answer === o_data
                                          ? pageData?.config?.primary_color
                                          : "",

                                      border:
                                        data?.answer === o_data
                                          ? ""
                                          : ` 1px solid ${pageData?.config?.primary_color} `,
                                    }}
                                    className={` ${
                                      data?.answer === o_data
                                        ? "outline outline-offset-2"
                                        : ""
                                    } w-4 rounded-full aspect-square transition-all `}
                                  ></div>
                                  <h1 className="text-lg">{o_data}</h1>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {data?.type === "star" && (
                          <div
                            className="flex justify-start items-center gap-10"
                            autoFocus
                          >
                            <button
                              className={`mb-3 rounded-lg ml-8 outline-none items-center cursor-pointer transition-all scale-150 `}
                            >
                              <StyledRating
                                name="customized-color"
                                defaultValue={0}
                                precision={0.5}
                                icon={<StarIcon fontSize="large" />}
                                emptyIcon={<StarBorderIcon fontSize="large" />}
                                onChange={(event, newValue) => {
                                  setPageData({
                                    ...pageData,
                                    survey: pageData?.survey?.map(
                                      (c_data, c_index) => {
                                        if (activeQuestionIndex === c_index) {
                                          return {
                                            ...c_data,
                                            answer: newValue,
                                          };
                                        } else {
                                          return c_data;
                                        }
                                      }
                                    ),
                                  });
                                }}
                              />
                            </button>
                          </div>
                        )}

                        {pageData?.survey?.length - 1 === index && (
                          <button
                            style={{
                              backgroundColor: pageData?.config?.primary_color,
                            }}
                            className="px-5 py-2 rounded-lg mt-5  text-white"
                            onClick={publicSurveyResponse}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                }
              })}
            </div>
          </div>
          {/* survey footer */}
          <div className="text-white flex justify-end  w-full gap-1 p-5">
            <div className="relative">
              <button
                style={{ backgroundColor: pageData?.config?.primary_color }}
                className={`  p-1 rounded-md  active:scale-95 transition-all`}
                title="Question List"
                onClick={() => setShowAllQuestions(true)}
              >
                <ListAltRoundedIcon fontSize="large" />
              </button>

              {showAllQuestions && (
                <div
                  onClick={() => setShowAllQuestions(false)}
                  className="fixed inset-0 bg-black bg-opacity-5 z-50 transition-all "
                ></div>
              )}

              {showAllQuestions && (
                <div className="absolute bottom-[110%] right-0 bg-white  z-[55] rounded-lg min-w-[300px] text-black">
                  <h1 className="p-3 font-semibold">Questions</h1>
                  {pageData?.survey?.map((data, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveQuestionIndex(index);
                        }}
                        className={` ${
                          activeQuestionIndex === index
                            ? "bg-gray-200"
                            : "hover:bg-gray-200"
                        }  p-3 flex items-start text-sm gap-2  cursor-pointer transition-all w-full text-left`}
                      >
                        <h1 className="">{index + 1}.</h1>
                        <h1>{data?.question}</h1>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              style={{ backgroundColor: pageData?.config?.primary_color }}
              className={`  p-1 rounded-md `}
            >
              {/* previous */}
              <button
                className="border-r border-r-gray-400 group"
                title="Previous"
                onClick={() => {
                  if (activeQuestionIndex > 0) {
                    setActiveQuestionIndex(activeQuestionIndex - 1);
                  }
                }}
              >
                {activeQuestionIndex === 0 ? (
                  <KeyboardArrowUpRoundedIcon
                    fontSize="large"
                    className=" text-gray-500 cursor-not-allowed"
                  />
                ) : (
                  <KeyboardArrowUpRoundedIcon
                    fontSize="large"
                    className="group-active:scale-90 transition-all"
                  />
                )}
              </button>

              {/* next */}
              <button
                className="group"
                title="Next"
                onClick={() => {
                  if (activeQuestionIndex < pageData?.survey?.length - 1) {
                    setActiveQuestionIndex(activeQuestionIndex + 1);
                  }
                }}
              >
                {activeQuestionIndex === pageData?.survey?.length - 1 ? (
                  <KeyboardArrowDownRoundedIcon
                    fontSize="large"
                    className=" text-gray-500 cursor-not-allowed"
                  />
                ) : (
                  <KeyboardArrowDownRoundedIcon
                    fontSize="large"
                    className="group-active:scale-90 transition-all"
                  />
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {surveyStartStatus === "thanks" && (
        <div className="">
          <h1
            className={`text-[${pageData?.config?.primary_color}] text-3xl font-semibold my-10`}
          >
            {pageData?.thank_you_screen?.message}
          </h1>

          <h3 className="text-sm text-gray-500 mb-5 text-center">Powered by</h3>
          <img
            src={logo}
            alt="company logo"
            className="mx-auto w-full max-w-[60px]"
          />
        </div>
      )}
    </div>
  );
};

export default PublicSurveys;
