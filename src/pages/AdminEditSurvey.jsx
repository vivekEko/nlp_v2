import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// icons
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// images
import under_construction from "../assets/misc/under_construction.svg";
import PublicSurveys from "./PublicSurveys";
import axios from "axios";
import { VITE_BASE_LINK } from "../BASE_LINK";

const AdminEditSurvey = () => {
  // local vaiables
  const location = useParams();
  const [pageData, setPageData] = useState({});
  const header_data = {
    survey_name: "NPS Survey",
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
  // const surveyTemplateData = {
  //   config: {
  //     bg_image: "",
  //     primary_color: "#17286d",
  //     secondary_color: "",
  //     total_time: 5000,
  //   },

  //   welcome_screen: {
  //     logo: "",
  //     heading: "Net Promoter Score Survey",
  //     sub_text: "",
  //     start_button_text: "Start Survey",
  //   },

  //   contents: [
  //     {
  //       question: "Name",
  //       type: "small_text",
  //       answer: "",
  //       important: true,
  //     },
  //     {
  //       question: "Gender",
  //       type: "list",
  //       options: ["Male", "Female", "Other", "Prefer not to say"],
  //       answer: "",
  //       important: true,
  //     },
  //     {
  //       question: "Email",
  //       type: "email",
  //       answer: "",
  //       important: true,
  //     },
  //     {
  //       question: "Age",
  //       type: "number",
  //       answer: "",
  //       important: true,
  //     },
  //     {
  //       question: "Phone Number",
  //       type: "number",
  //       answer: "",
  //       important: true,
  //     },
  //     {
  //       question:
  //         "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
  //       type: "range",
  //       start_and_end_word: ["Not likely at all", "Extremely likely"],
  //       answer: "",
  //     },
  //     {
  //       question:
  //         " In your opinion, what improvements could the company make that would warrant a higher rating from you? ",
  //       type: "textarea",
  //       answer: "",
  //     },
  //     {
  //       question: "How well our service meets your needs?",
  //       type: "list",
  //       options: [
  //         "Extremely well",
  //         "Very well",
  //         "Somewhat well",
  //         "Not so well",
  //         "Not at all well",
  //       ],
  //       answer: "",
  //     },
  //     {
  //       question: "How would you rate our quality of service?",
  //       type: "star",
  //       answer: "",
  //     },
  //   ],
  // };

  useEffect(() => {
    const formData = new FormData();
    formData?.append("token", localStorage?.getItem("token"));
    formData?.append("survey_id", location?.survey_id);
    axios.post(VITE_BASE_LINK + "/userViewSurvey", formData)?.then((res) => {
      setPageData(res?.data);
    });
  }, []);

  return (
    <div className="h-[94vh]">
      {/* edit header */}
      <header className="flex justify-between items-center px-10 border-b">
        <div className="w-full">
          <Link to="/admin/surveys">
            <ArrowBackIosNewRoundedIcon className="text-gray-600" />
          </Link>
          <input
            type="text"
            defaultValue="NPS Survey"
            className="px-3 py-2 border hover:border-gray-500 outline-none border-[#1e1e1e00]  rounded-xl text-lg ml-5"
          />
        </div>

        <div className="flex items-center gap-10 w-full justify-center">
          {header_data?.links_list?.map((data, index) => {
            return (
              <Link
                key={index}
                to={data?.link_path + location?.survey_id}
                className={` ${
                  data?.link_name === "Edit" ? "border-b-[#1e1e1e]" : ""
                } flex-1 border-b-2  h-[50px]  flex justify-center items-center font-semibold translate-y-[2px]  `}
              >
                <span>{data?.link_name}</span>
              </Link>
            );
          })}
        </div>

        <div className="w-full flex justify-end gap-5 py-1">
          {/* publish btn */}
          <Link
            to={"/public/survey/" + location?.survey_id}
            // onClick={() => {
            //   setCreateSurveyOverlay(!createSurveyOverlay);
            // }}
            className="px-5 py-2 bg-[#1e1e1e] rounded-lg text-white flex items-center gap-2 active:scale-95 transition-all hover:bg-white hover:text-[#1e1e1e] duration-300 border-2 border-[#1e1e1e] group"
          >
            <span className="block font-semibold">Publish</span>
          </Link>
        </div>
      </header>

      {/* main body */}
      <div className="flex w-full">
        {/* question list */}
        <section className="w-full border">
          {pageData?.survey?.map((data, index) => {
            return (
              <div key={index}>
                <h1 className="border-b text-=gray-500 cursor-pointer p-3  hover:bg-gray-100 rounded-lg">
                  <span className="mr-2">{index + 1}.</span> {data?.question}
                </h1>
              </div>
            );
          })}
        </section>
        <section className="w-full border">
          <div className=" h-full flex justify-center items-center">
            <img
              src={under_construction}
              alt="Under Construction"
              className="w-[50%]"
            />
          </div>
        </section>
        <section className="w-full border bg-[url(/template_1_bg.svg)]">
          <PublicSurveys />
        </section>
      </div>
    </div>
  );
};

export default AdminEditSurvey;
