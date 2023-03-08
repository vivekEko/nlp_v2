import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminAnalyticsPage = () => {
  // local variables

  const [selectGraphStatus, setSelectGraphStatus] = useState({
    avg_nps: false,
    nps_over_time: false,
    nss_over_time: false,
  });
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
  const pageData2 = {
    nps: {
      cards: [
        {
          title: "Responses",
          value: 17200,
          unit: null,
        },
        {
          title: "NPS Score",
          value: 40,
          unit: null,
        },
        {
          title: "Avg NPS",
          value: 7.2,
          unit: null,
        },
        {
          title: "Promoters",
          value: 14100,
          unit: null,
        },
        {
          title: "Passives",
          value: 2100,
          unit: null,
        },
        {
          title: "Detractors",
          value: 1000,
          unit: null,
        },
      ],
      legends: {
        avg_nps: [
          { name: "Promoters", color: "#00AC69", status: true },
          { name: "Passives", color: "#4D5552", status: false },
          { name: "Detractors", color: "#DB2B39", status: false },
          { name: "Overall", color: "#0094E0", status: false },
        ],

        nps_over_time: [
          { name: "Promoters", color: "#00AC69", status: false },
          { name: "Passives", color: "#4D5552", status: false },
          { name: "Detractors", color: "#DB2B39", status: false },
          { name: "NPS", color: "#0094E0", status: true },
        ],
      },
      graphs: {
        nps_pie_bar: {
          nps_score: 49,
          promoters: 63,
          total_promoters: 1112,
          passive: 23,
          total_passive: 412,
          detractors: 14,
          total_detractors: 244,
        },
        nps_pie: [
          {
            label: "Promoters",
            percentage: 72,
            color: "url(#promoterGradient)",
          },
          {
            label: "Passives",
            percentage: 19,
            color: "url(#passiveGradient)",
          },
          {
            label: "Detractors",
            percentage: 8,
            color: "url(#detractorGradient)",
          },
        ],
        avg_nps: [
          {
            month: "Jun",
            year: "2014",
            nps: 45,
            promoter: 59,
            passive: 27,
            detractor: 14,
          },
          {
            month: "Jul",
            year: "2014",
            nps: 13,
            promoter: 46,
            passive: 21,
            detractor: 33,
          },
          {
            month: "Aug",
            year: "2014",
            nps: 10,
            promoter: 41,
            passive: 28,
            detractor: 31,
          },
          {
            month: "Sep",
            year: "2014",
            nps: 48,
            promoter: 64,
            passive: 20,
            detractor: 16,
          },
          {
            month: "Oct",
            year: "2014",
            nps: 39,
            promoter: 56,
            passive: 27,
            detractor: 17,
          },
          {
            month: "Nov",
            year: "2014",
            nps: 51,
            promoter: 60,
            passive: 32,
            detractor: 9,
          },
          {
            month: "Dec",
            year: "2014",
            nps: 51,
            promoter: 62,
            passive: 27,
            detractor: 11,
          },
          {
            month: "Jan",
            year: "2015",
            nps: 27,
            promoter: 32,
            passive: 9,
            detractor: 5,
          },
          {
            month: "Feb",
            year: "2015",
            nps: 30,
            promoter: 30,
            passive: 4,
            detractor: 0,
          },
          {
            month: "Mar",
            year: "2015",
            nps: 28,
            promoter: 35,
            passive: 14,
            detractor: 7,
          },
          {
            month: "Apr",
            year: "2015",
            nps: 48,
            promoter: 51,
            passive: 9,
            detractor: 3,
          },
          {
            month: "May",
            year: "2015",
            nps: 32,
            promoter: 33,
            passive: 12,
            detractor: 1,
          },
          {
            month: "Jun",
            year: "2015",
            nps: 30,
            promoter: 37,
            passive: 11,
            detractor: 7,
          },
        ],
        nps_over_time: [
          {
            month: "Jun",
            year: "2014",
            nps: 45,
            promoter: 59,
            passive: 27,
            detractor: 14,
          },
          {
            month: "Jul",
            year: "2014",
            nps: 13,
            promoter: 46,
            passive: 21,
            detractor: 33,
          },
          {
            month: "Aug",
            year: "2014",
            nps: 10,
            promoter: 41,
            passive: 28,
            detractor: 31,
          },
          {
            month: "Sep",
            year: "2014",
            nps: 48,
            promoter: 64,
            passive: 20,
            detractor: 16,
          },
          {
            month: "Oct",
            year: "2014",
            nps: 39,
            promoter: 56,
            passive: 27,
            detractor: 17,
          },
          {
            month: "Nov",
            year: "2014",
            nps: 51,
            promoter: 60,
            passive: 32,
            detractor: 9,
          },
          {
            month: "Dec",
            year: "2014",
            nps: 51,
            promoter: 62,
            passive: 27,
            detractor: 11,
          },
          {
            month: "Jan",
            year: "2015",
            nps: 27,
            promoter: 32,
            passive: 9,
            detractor: 5,
          },
          {
            month: "Feb",
            year: "2015",
            nps: 30,
            promoter: 30,
            passive: 4,
            detractor: 0,
          },
          {
            month: "Mar",
            year: "2015",
            nps: 28,
            promoter: 35,
            passive: 14,
            detractor: 7,
          },
          {
            month: "Apr",
            year: "2015",
            nps: 48,
            promoter: 51,
            passive: 9,
            detractor: 3,
          },
          {
            month: "May",
            year: "2015",
            nps: 32,
            promoter: 33,
            passive: 12,
            detractor: 1,
          },
          {
            month: "Jun",
            year: "2015",
            nps: 30,
            promoter: 37,
            passive: 11,
            detractor: 7,
          },
        ],
      },
    },

    sentiment: {
      cards: [
        {
          title: "Responses",
          value: 17200,
          unit: null,
        },
        {
          title: "Sentiment Score",
          value: 40,
          unit: null,
        },

        {
          title: "Positive",
          value: 14100,
          unit: null,
        },
        {
          title: "Neutral",
          value: 2100,
          unit: null,
        },
        {
          title: "Negative",
          value: 1000,
          unit: null,
        },

        {
          title: "Extreme",
          value: 500,
          unit: null,
        },
      ],
      legends: {
        nss_over_time: [
          { name: "Positive", color: "#00AC69", status: false },
          { name: "Neutral", color: "#4D5552", status: false },
          { name: "Negative", color: "#EE6123", status: false },
          { name: "Extreme", color: "#DB2B39", status: false },
          { name: "Sentiment", color: "#0094E0", status: true },
        ],
      },
      graphs: {
        nss_pie_bar: {
          nss_score: 49,
          positives: 63,
          total_positives: 1112,
          neutrals: 23,
          total_neutrals: 412,
          negative: 14,
          total_negative: 244,
          extreme: 20,
          total_extreme: 121,
        },
        sentiment_pie: [
          {
            label: "Positive",
            percentage: 60,
            color: "url(#promoterGradient)",
          },
          {
            label: "Neutral",
            percentage: 10,
            color: "url(#passiveGradient)",
          },
          {
            label: "Negative",
            percentage: 25,
            color: "url(#negativeGradient)",
          },
          {
            label: "Extreme",
            percentage: 5,
            color: "url(#detractorGradient)",
          },
        ],

        nss_over_time: [
          {
            month: "Jun",
            year: "2014",
            nss: 45,
            positive: 59,
            neutral: 27,
            negative: 14,
            extreme: 10,
          },
          {
            month: "Jul",
            year: "2014",
            nss: 13,
            positive: 46,
            neutral: 21,
            negative: 33,
            extreme: 10,
          },
          {
            month: "Aug",
            year: "2014",
            nss: 10,
            positive: 41,
            neutral: 28,
            negative: 31,
            extreme: 10,
          },
          {
            month: "Sep",
            year: "2014",
            nss: 48,
            positive: 64,
            neutral: 20,
            negative: 16,
            extreme: 10,
          },
          {
            month: "Oct",
            year: "2014",
            nss: 39,
            positive: 56,
            neutral: 27,
            negative: 17,
            extreme: 10,
          },
          {
            month: "Nov",
            year: "2014",
            nss: 51,
            positive: 60,
            neutral: 32,
            negative: 9,
            extreme: 10,
          },
          {
            month: "Dec",
            year: "2014",
            nss: 51,
            positive: 62,
            neutral: 27,
            negative: 11,
            extreme: 10,
          },
          {
            month: "Jan",
            year: "2015",
            nss: 27,
            positive: 32,
            neutral: 9,
            negative: 5,
            extreme: 10,
          },
          {
            month: "Feb",
            year: "2015",
            nss: 30,
            positive: 30,
            neutral: 4,
            negative: 0,
            extreme: 10,
          },
          {
            month: "Mar",
            year: "2015",
            nss: 28,
            positive: 35,
            neutral: 14,
            negative: 7,
            extreme: 10,
          },
          {
            month: "Apr",
            year: "2015",
            nss: 48,
            positive: 51,
            neutral: 9,
            negative: 3,
            extreme: 10,
          },
          {
            month: "May",
            year: "2015",
            nss: 32,
            positive: 33,
            neutral: 12,
            negative: 1,
            extreme: 10,
          },
          {
            month: "Jun",
            year: "2015",
            nss: 30,
            positive: 37,
            neutral: 11,
            negative: 7,
            extreme: 10,
          },
        ],
      },
    },
  };
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [calendarStatus, setCalendarStatus] = useState(false);
  const [pageData, setPageData] = useState({});
  const [selectedGraph, setSelectedGraph] = useState("NPS");
  const [selectedGraphAvgNps, setSelectedGraphAvgNps] = useState([
    "Overall",
    "Passives",
  ]);
  const [selectedGraphNPSOverTime, setSelectedGraphNPSOverTime] = useState([
    "Passives",
    "Promoters",
  ]);

  const [selectedGraphNSSOverTime, setSelectedGraphNSSOverTime] = useState([
    "Neutral",
    "Positive",
  ]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  // refs
  const npsSummary = useRef();
  const avgNps = useRef();
  const npsOverTime = useRef();

  const nssSummary = useRef();
  const nssOverTime = useRef();

  // functions

  // Using filter method to create a remove method
  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  // calendar
  function handleSelect(ranges) {
    setStartDate(ranges?.selection?.startDate);
    setEndDate(ranges?.selection?.endDate);
  }

  // take screenshot and print in pdf
  const createPDF = async () => {
    // const pdf = new jsPDF("potrait", "pt", "a4");
    // const data = await html2canvas(document.querySelector("#pdf"), {
    //   allowTaint: true,
    //   imageTimeout: 15000,
    // });
    // const img = data.toDataURL("image/png");
    // const imgProperties = pdf.getImageProperties(img);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    // pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save("shipping_label.pdf");

    const canvas = await html2canvas(document.querySelector("#pdf"), {
      allowTaint: true,
      imageTimeout: 15000,
    });
    var imgData = canvas.toDataURL("image/png");
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm", "a4");
    var position = 0; // give some top padding to first page

    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight + 10);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      // position += heightLeft - imgHeight; // top padding for other pages
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight + 10);
      heightLeft -= pageHeight;
    }
    doc.save("file.pdf");
  };

  // Lifecycle calls
  useEffect(() => {
    setPageData(pageData2);
  }, []);

  // useEffect(() => {
  //   console.log("selectedGraphNPSOverTime", selectedGraphNPSOverTime);
  // }, [selectedGraphNPSOverTime]);

  return (
    <div id="pdf">
      {/* analytics header */}
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
                  data?.link_name === "Analytics" ? "border-b-[#1e1e1e]" : ""
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
      <div className="bg-gray-50 ">
        <div className="w-[95%] 2xl:w-[80%] h-full mx-auto py-5 pt-5">
          {/* filter */}
          {/* <div>
            <div className="relative">
              <button
                className="text-sm text-gray-500 flex gap-2 items-center bg-white p-2 px-3 rounded-lg w-fit border"
                onClick={() => setCalendarStatus(!calendarStatus)}
              >
                <h1>21 Feb 22 - 30 Mar 23</h1>
                <div>
                  <CalendarMonthRoundedIcon />
                </div>
              </button>
              {calendarStatus && (
                <div className="w-fit absolute top-[110%] left-0 border rounded-lg overflow-hidden drop-shadow-[0px_100px_100px_rgba(0,0,0,0.50)]  z-50">
                  <DateRangePicker
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    // rangeColors={["#227638", "#e93008"]}
                    direction="vertical"
                    ranges={[selectionRange]}
                  />
                </div>
              )}
            </div>
          </div> */}

          {/* nps section */}
          <div>
            {/* heading */}
            <div className="flex  items-center -mb-3">
              <div className=" h-[10px] border-t rounded-tl-xl  w-full"></div>
              <h1
                className="text-gray-800 text-2xl font-semibold text-center  w-fit mx-auto  bg-gray-50  px-10
            "
              >
                NPS
              </h1>
              <div className="h-[10px] border-t rounded-tr-xl   w-full"></div>
            </div>

            {/* body */}
            <div className="p-5 mt-5 border border-t-transparent rounded-b-lg ">
              {/* cards */}
              <div className="bg-white rounded-lg border grid grid-cols-3  md:grid-cols-6 divide-y md:divide-y-0 divide-x text-gray-900">
                {pageData?.nps?.cards?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex flex-col justify-center items-center p-5 gap-2"
                    >
                      <h2 className=" text-gray-500 ">{data?.title}</h2>
                      <h1 className="text-3xl  ">{data?.value}</h1>
                    </div>
                  );
                })}
              </div>

              {/* graphs */}
              <div className=" mt-5 text-gray-900">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                  {/* nps summary */}
                  <div
                    ref={npsSummary}
                    className="border bg-white rounded-lg p-5 flex-1 w-full"
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-semibold ">
                        Net Promoter Score{" "}
                      </h1>

                      <button
                        onClick={() => exportComponentAsPNG(npsSummary)}
                        title="Download"
                        className="text-gray-600"
                      >
                        <DownloadRoundedIcon />
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flex gap-5 items-center">
                        {/* pie */}
                        <div className="flex-[0.3] relative">
                          {/* Pie graph */}
                          <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                            <div className="flex flex-col justify-center items-center">
                              <h1 className="text-[18px] opacity-80">NPS</h1>
                              <p className="opacity-80 text-[24px] font-semibold">
                                {pageData?.nps?.graphs?.nps_pie_bar?.nps_score}%
                              </p>
                            </div>
                          </div>
                          <ResponsiveContainer
                            height={250}
                            width="100%"
                            className=""
                          >
                            <PieChart
                              height={220}
                              width={250}
                              key={pageData?.nps?.graphs?.nps_pie_bar}
                            >
                              <defs>
                                <linearGradient
                                  id="npsGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#009DFF"
                                    stopOpacity={1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#009DFF"
                                    stopOpacity={0.7}
                                  />
                                </linearGradient>

                                <linearGradient
                                  id="promoterGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#00AC69"
                                    stopOpacity={1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#00AC69"
                                    stopOpacity={0.7}
                                  />
                                </linearGradient>

                                <linearGradient
                                  id="passiveGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#4D5552"
                                    stopOpacity={1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#4D5552"
                                    stopOpacity={0.7}
                                  />
                                </linearGradient>

                                <linearGradient
                                  id="detractorGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#DB2B39"
                                    stopOpacity={1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#DB2B39"
                                    stopOpacity={0.7}
                                  />
                                </linearGradient>

                                <linearGradient
                                  id="negativeGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#EE6123"
                                    stopOpacity={1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#EE6123"
                                    stopOpacity={0.7}
                                  />
                                </linearGradient>
                              </defs>
                              <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                              />

                              <Pie
                                data={pageData?.nps?.graphs?.nps_pie}
                                dataKey="percentage"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                // strokeWidth={2}
                                // stroke="#00000"
                                innerRadius="60%"
                                outerRadius="100%"
                                cornerRadius={6}
                                paddingAngle={2}
                                startAngle={-270}
                                endAngle={-630}
                                // startAngle={90}
                                // endAngle={-268}
                                minAngle={5}
                                fill="#1e1e1e1e"
                              >
                                {pageData?.nps?.graphs?.nps_pie?.map(
                                  (entry, index) => (
                                    <Cell key={index} fill={entry?.color} />
                                  )
                                )}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* pie bar */}
                        <div className="flex-[0.7] flex flex-col gap-5 justify-center ">
                          {/* promoter */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Promoters</h3>
                                <h4>
                                  {"(" +
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.promoters +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.total_promoters
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#00AC69] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.promoters + "%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* passive */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Passives</h3>
                                <h4>
                                  {"(" +
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.passive +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.total_passive
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#4D5552] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.passive + "%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* detractors */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Detractors</h3>
                                <h4>
                                  {"(" +
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.detractors +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.total_detractors
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#DB2B39] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.detractors + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* average nps */}
                  <div
                    ref={avgNps}
                    className="border bg-white rounded-lg p-5  flex-1 w-full"
                  >
                    <div className="flex justify-between items-center gap-5 ">
                      <h1 className="text-xl font-semibold">Average NPS</h1>

                      {/* select , download and reset */}
                      <div className="flex gap-2 items-center text-gray-700">
                        <button
                          title="Download"
                          onClick={() => exportComponentAsPNG(avgNps)}
                        >
                          <DownloadRoundedIcon />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => {
                              setSelectGraphStatus({
                                avg_nps: !selectGraphStatus?.avg_nps,
                              });
                            }}
                            className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                          >
                            <span>Select graph</span>
                            <span>
                              <KeyboardArrowDownRoundedIcon />
                            </span>
                          </button>
                          {/* dropdown */}
                          {selectGraphStatus?.avg_nps && (
                            <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                              {pageData?.nps?.legends?.avg_nps?.map(
                                (data, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                      onClick={() => {
                                        if (
                                          selectedGraphAvgNps?.includes(
                                            data?.name
                                          )
                                        ) {
                                          if (selectedGraphAvgNps?.length > 1) {
                                            setSelectedGraphAvgNps(
                                              (selectGraphStatus) =>
                                                arrayRemove(
                                                  selectGraphStatus,
                                                  data?.name
                                                )
                                            );
                                          }
                                        } else {
                                          setSelectedGraphAvgNps(() => [
                                            ...selectedGraphAvgNps,
                                            data?.name,
                                          ]);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          style={{
                                            backgroundColor: data?.color,
                                          }}
                                          className="w-[8px] aspect-square  rounded-full"
                                        ></div>
                                        <div>{data?.name}</div>
                                      </div>

                                      <div>
                                        {selectedGraphAvgNps?.includes(
                                          data?.name
                                        ) && (
                                          <CheckCircleRoundedIcon
                                            fontSize="small"
                                            className="text-gray-600"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                              <div className="text-sm  flex justify-between border-t">
                                <button
                                  onClick={() => {
                                    setSelectedGraphAvgNps([
                                      "Promoters",
                                      "Detractors",
                                      "Passives",
                                      "Overall",
                                    ]);
                                  }}
                                  className="hover:underline hover:text-blue-500 p-2"
                                >
                                  Select all
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedGraphAvgNps([
                                      "Overall",
                                      "Passives",
                                    ]);
                                  }}
                                  className="hover:underline hover:text-red-500 p-2"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          )}
                          {/* overlay */}
                          {selectGraphStatus?.avg_nps && (
                            <div
                              className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                              onClick={() => {
                                setSelectGraphStatus({
                                  avg_nps: false,
                                });
                              }}
                            ></div>
                          )}
                        </div>

                        {/* <button className="scale-x-[-1]" title="Reset">
                          <ReplayRoundedIcon />
                        </button> */}
                      </div>
                    </div>

                    {/* legend */}
                    <div className="flex items-center gap-5 justify-end my-5">
                      {pageData?.nps?.legends?.avg_nps?.map((data, index) => {
                        return (
                          <div key={index}>
                            <div className="flex items-center gap-1">
                              <div
                                style={{ backgroundColor: data?.color }}
                                className=" h-[8px] w-[8px] rounded-full"
                              ></div>
                              <div className="text-[12px] opacity-80">
                                {data?.name}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Graph */}
                    <div className=" w-full mt-5">
                      <ResponsiveContainer
                        width="98%"
                        height={220}
                        className=""
                      >
                        <ComposedChart
                          data={pageData?.nps?.graphs?.avg_nps}
                          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid
                            vertical={false}
                            horizontal={false}
                            opacity={0.5}
                          />

                          <XAxis
                            dataKey="month"
                            fontSize={12}
                            axisLine={false}
                            tickLine={false}
                            tickCount={10}
                            angle={0}
                            textAnchor="middle"
                          />
                          <YAxis
                            type="number"
                            // domain={["dataMin - 0.005", "dataMax + 0.0005"]}
                            axisLine={false}
                            tickLine={false}
                            fontSize={10}
                            tickFormatter={(number) => `${number.toFixed(2)}`}
                            margin={{ right: 20 }}
                          />

                          <Tooltip cursor={false} content={<CustomTooltip />} />

                          {selectedGraphAvgNps?.includes("Promoters") && (
                            <Bar
                              barSize={20}
                              name="Promoters"
                              dataKey="promoter"
                              // fill="#00AC69"
                              fill="url(#promoterGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}

                          {selectedGraphAvgNps?.includes("Passives") && (
                            <Bar
                              barSize={20}
                              name="Passives"
                              dataKey="passive"
                              // fill="#4D5552"
                              fill="url(#passiveGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                          {selectedGraphAvgNps?.includes("Detractors") && (
                            <Bar
                              barSize={20}
                              name="Detractors"
                              dataKey="detractor"
                              // fill="#DB2B39"
                              fill="url(#detractorGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                          {selectedGraphAvgNps?.includes("Overall") && (
                            <Bar
                              barSize={20}
                              name="Overall"
                              dataKey="nps"
                              // fill="#0094E0"
                              fill="url(#npsGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* nps over time */}
                <div
                  ref={npsOverTime}
                  className="mt-5 border bg-white rounded-lg p-5 flex-1 min-h-[350px]"
                >
                  <div className="flex justify-between items-center gap-2">
                    <h1 className="text-xl font-semibold "> NPS Over Time</h1>

                    {/* legend after md*/}
                    <div className="hidden md:flex items-center gap-5 justify-end my-5">
                      {pageData?.nps?.legends?.nps_over_time?.map(
                        (data, index) => {
                          return (
                            <div key={index}>
                              <div className="flex items-center gap-1">
                                <div
                                  style={{ backgroundColor: data?.color }}
                                  className=" h-[8px] w-[8px] rounded-full"
                                ></div>
                                <div className="text-[12px] opacity-80">
                                  {data?.name}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {/* select , download and reset */}
                    <div className="flex gap-2 items-center text-gray-700">
                      <button
                        title="Download"
                        onClick={() => exportComponentAsPNG(npsOverTime)}
                      >
                        <DownloadRoundedIcon />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setSelectGraphStatus({
                              nps_over_time: !selectGraphStatus?.nps_over_time,
                            });
                          }}
                          className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                        >
                          <span>Select graph</span>
                          <span>
                            <KeyboardArrowDownRoundedIcon />
                          </span>
                        </button>
                        {/* dropdown */}
                        {selectGraphStatus?.nps_over_time && (
                          <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                            {pageData?.nps?.legends?.nps_over_time?.map(
                              (data, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                    onClick={() => {
                                      if (
                                        selectedGraphNPSOverTime?.includes(
                                          data?.name
                                        )
                                      ) {
                                        if (
                                          selectedGraphNPSOverTime?.length > 1
                                        ) {
                                          setSelectedGraphNPSOverTime(
                                            (selectGraphStatus) =>
                                              arrayRemove(
                                                selectGraphStatus,
                                                data?.name
                                              )
                                          );
                                        }
                                      } else {
                                        setSelectedGraphNPSOverTime(() => [
                                          ...selectedGraphNPSOverTime,
                                          data?.name,
                                        ]);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        style={{
                                          backgroundColor: data?.color,
                                        }}
                                        className="w-[8px] aspect-square  rounded-full"
                                      ></div>
                                      <div>{data?.name}</div>
                                    </div>

                                    <div>
                                      {selectedGraphNPSOverTime?.includes(
                                        data?.name
                                      ) && (
                                        <CheckCircleRoundedIcon
                                          fontSize="small"
                                          className="text-gray-600"
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}

                            <div className="text-sm  flex justify-between border-t">
                              <button
                                onClick={() => {
                                  setSelectedGraphNPSOverTime([
                                    "Promoters",
                                    "Detractors",
                                    "Passives",
                                    "NPS",
                                  ]);
                                }}
                                className="hover:underline hover:text-blue-500 p-2"
                              >
                                Select all
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedGraphNPSOverTime([
                                    "Passives",
                                    "Promoters",
                                  ]);
                                }}
                                className="hover:underline hover:text-red-500 p-2"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        )}
                        {/* overlay */}
                        {selectGraphStatus?.avg_nps && (
                          <div
                            className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                            onClick={() => {
                              setSelectGraphStatus({
                                avg_nps: false,
                              });
                            }}
                          ></div>
                        )}
                      </div>

                      {/* <button className="scale-x-[-1]" title="Reset">
                        <ReplayRoundedIcon />
                      </button> */}
                    </div>
                  </div>

                  {/* legend before md*/}
                  <div className="flex md:hidden items-center gap-5 justify-end my-5">
                    {pageData?.nps?.legends?.nps_over_time?.map(
                      (data, index) => {
                        return (
                          <div key={index}>
                            <div className="flex items-center gap-1">
                              <div
                                style={{ backgroundColor: data?.color }}
                                className=" h-[8px] w-[8px] rounded-full"
                              ></div>
                              <div className="text-[12px] opacity-80">
                                {data?.name}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Graph */}
                  <div className="relative mt-5">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        key={selectedGraph}
                        data={pageData?.nps?.graphs?.nps_over_time}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          horizontal={false}
                          opacity={0.5}
                        />
                        <XAxis
                          dataKey="month"
                          fontSize={12}
                          axisLine={false}
                          tickLine={false}
                          tickCount={6}
                          angle={0}
                          textAnchor="middle"
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                          tickCount={4}
                          tickFormatter={(number) => `${number}`}
                          margin={{ right: 20 }}
                        />
                        <Tooltip cursor={false} content={<CustomTooltip />} />

                        {selectedGraphNPSOverTime?.includes("Promoters") && (
                          <Area
                            type="monotone"
                            name="promoter"
                            dataKey="promoter"
                            stroke="#00AC69 "
                            dot={false}
                            strokeWidth={4}
                            fill="url(#promoterGradient)"
                          />
                        )}

                        {selectedGraphNPSOverTime?.includes("Passives") && (
                          <Area
                            type="monotone"
                            name="passive"
                            dataKey="passive"
                            stroke="#4D5552 "
                            dot={false}
                            strokeWidth={4}
                            fill="url(#passiveGradient)"
                          />
                        )}

                        {selectedGraphNPSOverTime?.includes("Detractors") && (
                          <Area
                            type="monotone"
                            name="detractor"
                            dataKey="detractor"
                            stroke="#DB2B39 "
                            dot={false}
                            strokeWidth={4}
                            fill="url(#detractorGradient)"
                          />
                        )}

                        {selectedGraphNPSOverTime?.includes("NPS") && (
                          <Area
                            type="monotone"
                            name="NPS"
                            dataKey="nps"
                            stroke="#0094E0 "
                            dot={false}
                            strokeWidth={4}
                            fill="url(#npsGradient)"
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* sentiment section */}
          <div className="mt-5">
            {/* heading */}
            <div className="flex  items-center -mb-3">
              <div className=" h-[10px]  border-t rounded-tl-xl  w-full"></div>
              <h1
                className="text-gray-800 text-2xl font-semibold text-center  w-fit mx-auto  bg-gray-50  px-10
            "
              >
                <span className="w-max block">Sentiment Analysis</span>
              </h1>
              <div className="h-[10px] border-t rounded-tr-xl   w-full"></div>
            </div>

            {/* body */}
            <div className="mt-5 p-5 border border-t-transparent rounded-b-lg ">
              {/* cards */}
              <div className="bg-white rounded-lg border grid grid-cols-3  md:grid-cols-6 divide-y md:divide-y-0 divide-x text-gray-900">
                {pageData?.sentiment?.cards?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex flex-col justify-center items-center p-5 gap-2"
                    >
                      <h2 className=" text-gray-500 ">{data?.title}</h2>
                      <h1 className="text-3xl  ">{data?.value}</h1>
                    </div>
                  );
                })}
              </div>

              {/* graphs */}
              <div className=" mt-5 text-gray-900">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                  {/* nss summary */}
                  <div
                    ref={nssSummary}
                    className="border bg-white rounded-lg p-5 flex-1 w-full"
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-semibold ">Sentiments </h1>

                      <button
                        onClick={() => exportComponentAsPNG(nssSummary)}
                        title="Download"
                        className="text-gray-600"
                      >
                        <DownloadRoundedIcon />
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flex gap-5 items-center">
                        {/* pie */}
                        <div className="flex-[0.3] relative">
                          {/* Pie graph */}
                          <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                            <div className="flex flex-col justify-center items-center">
                              <h1 className="text-[18px] opacity-80">
                                Sentiments
                              </h1>
                              <p className="opacity-80 text-[24px] font-semibold">
                                {
                                  pageData?.sentiment?.graphs?.nss_pie_bar
                                    ?.nss_score
                                }
                                %
                              </p>
                            </div>
                          </div>
                          <ResponsiveContainer
                            height={250}
                            width="100%"
                            className=""
                          >
                            <PieChart
                              height={220}
                              width={250}
                              key={pageData?.sentiment?.graphs?.nss_pie_bar}
                            >
                              <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                              />

                              <Pie
                                data={
                                  pageData?.sentiment?.graphs?.sentiment_pie
                                }
                                dataKey="percentage"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                // strokeWidth={2}
                                // stroke="#00000"
                                innerRadius="60%"
                                outerRadius="100%"
                                cornerRadius={6}
                                paddingAngle={2}
                                startAngle={-270}
                                endAngle={-630}
                                // startAngle={90}
                                // endAngle={-268}
                                minAngle={5}
                                fill="#1e1e1e1e"
                              >
                                {pageData?.sentiment?.graphs?.sentiment_pie?.map(
                                  (entry, index) => (
                                    <Cell key={index} fill={entry?.color} />
                                  )
                                )}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* pie bar */}
                        <div className="flex-[0.7] flex flex-col gap-5 justify-center ">
                          {/* positive */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Positives</h3>
                                <h4>
                                  {"(" +
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.positives +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.total_positives
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#00AC69] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.positives + "%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* neutral */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Neutrals</h3>
                                <h4>
                                  {"(" +
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.neutrals +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.total_neutrals
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#4D5552] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.nps?.graphs?.nps_pie_bar
                                      ?.passive + "%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* negative */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Negative</h3>
                                <h4>
                                  {"(" +
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.negative +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.total_negative
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#EE6123] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.negative + "%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Extreme */}
                          <div>
                            {/* head  */}
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 flex gap-2 ">
                                <h3>Extreme</h3>
                                <h4>
                                  {"(" +
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.extreme +
                                    "%)"}
                                </h4>
                              </div>

                              <div className="text-gray-400 flex gap-2 ">
                                <h3>
                                  {
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.total_extreme
                                  }
                                </h3>

                                <h4>
                                  <GroupsRoundedIcon />
                                </h4>
                              </div>
                            </div>
                            {/* bar */}
                            <div className="bg-white rounded-xl border">
                              <div
                                className="bg-[#DB2B39] h-[25px] rounded-xl"
                                style={{
                                  width:
                                    pageData?.sentiment?.graphs?.nss_pie_bar
                                      ?.extreme + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* nss Over Time */}
                  <div
                    ref={nssOverTime}
                    className="border bg-white rounded-lg p-5  flex-1 w-full"
                  >
                    <div className="flex justify-between items-center gap-5 ">
                      <h1 className="text-xl font-semibold">NSS Over Time</h1>

                      {/* select , download and reset */}
                      <div className="flex gap-2 items-center text-gray-700">
                        <button
                          title="Download"
                          onClick={() => exportComponentAsPNG(nssOverTime)}
                        >
                          <DownloadRoundedIcon />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => {
                              setSelectGraphStatus({
                                nss_over_time:
                                  !selectGraphStatus?.nss_over_time,
                              });
                            }}
                            className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                          >
                            <span>Select graph</span>
                            <span>
                              <KeyboardArrowDownRoundedIcon />
                            </span>
                          </button>
                          {/* dropdown */}
                          {selectGraphStatus?.nss_over_time && (
                            <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                              {pageData?.sentiment?.legends?.nss_over_time?.map(
                                (data, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                      onClick={() => {
                                        if (
                                          selectedGraphNSSOverTime?.includes(
                                            data?.name
                                          )
                                        ) {
                                          if (
                                            selectedGraphNSSOverTime?.length > 1
                                          ) {
                                            setSelectedGraphNSSOverTime(
                                              (selectedGraphNSSOverTime) =>
                                                arrayRemove(
                                                  selectedGraphNSSOverTime,
                                                  data?.name
                                                )
                                            );
                                          }
                                        } else {
                                          setSelectedGraphNSSOverTime(() => [
                                            ...selectedGraphNSSOverTime,
                                            data?.name,
                                          ]);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          style={{
                                            backgroundColor: data?.color,
                                          }}
                                          className="w-[8px] aspect-square  rounded-full"
                                        ></div>
                                        <div>{data?.name}</div>
                                      </div>

                                      <div>
                                        {selectedGraphNSSOverTime?.includes(
                                          data?.name
                                        ) && (
                                          <CheckCircleRoundedIcon
                                            fontSize="small"
                                            className="text-gray-600"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                              <div className="text-sm  flex justify-between border-t">
                                <button
                                  onClick={() => {
                                    setSelectedGraphNSSOverTime([
                                      "Positive",
                                      "Neutral",
                                      "Negative",
                                      "Extreme",
                                      "Sentiment",
                                    ]);
                                  }}
                                  className="hover:underline hover:text-blue-500 p-2"
                                >
                                  Select all
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedGraphNSSOverTime([
                                      "Positive",
                                      "Neutral",
                                    ]);
                                  }}
                                  className="hover:underline hover:text-red-500 p-2"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          )}
                          {/* overlay */}
                          {selectGraphStatus?.nss_over_time && (
                            <div
                              className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                              onClick={() => {
                                setSelectGraphStatus({
                                  avg_nps: false,
                                });
                              }}
                            ></div>
                          )}
                        </div>

                        {/* <button className="scale-x-[-1]" title="Reset">
                          <ReplayRoundedIcon />
                        </button> */}
                      </div>
                    </div>

                    {/* legend */}
                    <div className="flex items-center gap-5 justify-end my-5">
                      {pageData?.sentiment?.legends?.nss_over_time?.map(
                        (data, index) => {
                          return (
                            <div key={index}>
                              <div className="flex items-center gap-1">
                                <div
                                  style={{ backgroundColor: data?.color }}
                                  className=" h-[8px] w-[8px] rounded-full"
                                ></div>
                                <div className="text-[12px] opacity-80">
                                  {data?.name}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {/* Graph */}
                    <div className=" w-full mt-5">
                      <ResponsiveContainer
                        width="98%"
                        height={240}
                        className=""
                      >
                        <ComposedChart
                          data={pageData?.sentiment?.graphs?.nss_over_time}
                          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid
                            vertical={false}
                            horizontal={false}
                            opacity={0.5}
                          />

                          <XAxis
                            dataKey="month"
                            fontSize={12}
                            axisLine={false}
                            tickLine={false}
                            tickCount={10}
                            angle={0}
                            textAnchor="middle"
                          />
                          <YAxis
                            type="number"
                            // domain={["dataMin - 0.005", "dataMax + 0.0005"]}
                            axisLine={false}
                            tickLine={false}
                            fontSize={10}
                            tickFormatter={(number) => `${number.toFixed(2)}`}
                            margin={{ right: 20 }}
                          />

                          <Tooltip cursor={false} content={<CustomTooltip />} />

                          {selectedGraphNSSOverTime?.includes("Positive") && (
                            <Bar
                              barSize={20}
                              name="Positive"
                              dataKey="positive"
                              // fill="#00AC69"
                              fill="url(#promoterGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}

                          {selectedGraphNSSOverTime?.includes("Neutral") && (
                            <Bar
                              barSize={20}
                              name="Neutral"
                              dataKey="neutral"
                              // fill="#4D5552"
                              fill="url(#passiveGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                          {selectedGraphNSSOverTime?.includes("Negative") && (
                            <Bar
                              barSize={20}
                              name="Negative"
                              dataKey="negative"
                              // fill="#DB2B39"
                              fill="url(#negativeGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                          {selectedGraphNSSOverTime?.includes("Extreme") && (
                            <Bar
                              barSize={20}
                              name="Extreme"
                              dataKey="extreme"
                              // fill="#DB2B39"
                              fill="url(#detractorGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                          {selectedGraphNSSOverTime?.includes("Sentiment") && (
                            <Bar
                              barSize={20}
                              name="Sentiments"
                              dataKey="nss"
                              // fill="#0094E0"
                              fill="url(#npsGradient)"
                              radius={[20, 20, 0, 0]}
                            />
                          )}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
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

export default AdminAnalyticsPage;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000] ">
        {payload[0]?.payload?.month && (
          <h1 className="capitalize mr-2 text-lg mb-2 font-bold ">
            {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
          </h1>
        )}

        {payload?.map((data, index) => (
          <div key={index} className="">
            {data?.payload?.cx && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-full items-center ">
                    <svg className="w-[10px] rounded-full overflow-hidden aspect-square ">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="5"
                        fill={data?.payload?.color}
                      />
                    </svg>
                  </div>
                  <h1 className="capitalize  text-lg  font-bold ">
                    {data?.name}
                  </h1>
                </div>

                <div className="flex justify-start items-center gap-1 ml-5">
                  <div className="flex justify-between items-center  w-full">
                    <span className="capitalize mr-2 text-base text-gray-600 font-semibold">
                      {data?.dataKey}:
                    </span>
                    <span className="text-base text-gray-600 font-semibold">
                      {data?.value}%
                    </span>
                  </div>
                </div>
              </div>
            )}
            {!data?.payload?.cx && (
              <div className="flex justify-start items-center gap-1 ">
                <div>
                  {data?.color && (
                    <svg className="w-[10px] rounded-full overflow-hidden aspect-square flex justify-center items-center">
                      <circle cx="50%" cy="50%" r="3.5" fill={data?.color} />
                    </svg>
                  )}
                </div>
                <div className="flex justify-between items-center  w-full">
                  <span className="capitalize mr-2 text-base text-gray-600 font-semibold">
                    {data?.name}:
                  </span>
                  <span className="text-base text-gray-600 font-semibold">
                    {data?.value}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}
