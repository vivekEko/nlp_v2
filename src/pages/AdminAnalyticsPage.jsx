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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { useScreenshot, createFileName } from "use-react-screenshot";

const AdminAnalyticsPage = () => {
  // local variables
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [calendarStatus, setCalendarStatus] = useState(false);
  const [activeGraph, setActiveGraph] = useState({
    nps: true,
    promoters: false,
    passives: false,
    detractors: false,
  });
  const [selectGraphStatus, setSelectGraphStatus] = useState({
    avg_nps: false,
    nps_over_time: false,
  });
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
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
        { name: "Promoters", color: "#00AC69", status: false },
        { name: "Passives", color: "#4D5552", status: false },
        { name: "Detractors", color: "#DB2B39", status: true },
        { name: "Overall", color: "#0094E0", status: true },
      ],

      nps_over_time: [
        { name: "Promoters", color: "#00AC69", status: false },
        { name: "Passives", color: "#4D5552", status: false },
        { name: "Detractors", color: "#DB2B39", status: true },
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
  };
  const [pageData, setPageData] = useState({});

  // functions
  function handleSelect(ranges) {
    setStartDate(ranges?.selection?.startDate);
    setEndDate(ranges?.selection?.endDate);
  }

  // Lifecycle calls
  useEffect(() => {
    setPageData(pageData2);
  }, []);

  const createPDF = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    const data = await html2canvas(document.querySelector("#nps_summary"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shipping_label.pdf");
  };

  const npsSummary = useRef();

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

      <div className="bg-gray-50 ">
        <div className="w-[80%] h-full mx-auto py-5 pt-0">
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

          {/* cards */}
          <div className="bg-white rounded-lg border mt-5 flex justify-between items-center divide-x text-gray-900">
            {pageData?.cards?.map((data, index) => {
              return (
                <div className="w-full flex flex-col justify-center items-center p-5 gap-2">
                  <h2 className=" text-gray-500 ">{data?.title}</h2>
                  <h1 className="text-3xl  ">{data?.value}</h1>
                </div>
              );
            })}
          </div>

          {/* graphs */}
          <div className=" mt-5 text-gray-900">
            <div className="flex items-center gap-5">
              {/* nps summary */}
              <div
                ref={npsSummary}
                className="border bg-white rounded-lg p-5 flex-1"
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold ">
                    Net Promoter Score{" "}
                  </h1>

                  {/* <button onClick={() => {
                    exportComponentAsPDF(npsSummary)
                    }}> */}

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
                          <p className="opacity-80 text-[24px] font-semibold  ">
                            {pageData?.graphs?.nps_pie_bar?.nps_score}
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
                          key={pageData?.graphs?.nps_pie_bar}
                        >
                          <Tooltip cursor={false} content={<CustomTooltip />} />

                          <Pie
                            data={pageData?.graphs?.nps_pie}
                            dataKey="percentage"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            strokeWidth={5}
                            innerRadius="60%"
                            outerRadius="100%"
                            cornerRadius={6}
                            paddingAngle={-1}
                            startAngle={-270}
                            endAngle={-630}
                            minAngle={15}
                            fill="#1e1e1e1e"
                          >
                            {pageData?.graphs?.nps_pie?.map((entry, index) => (
                              <Cell key={index} fill={entry?.color} />
                            ))}
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
                                pageData?.graphs?.nps_pie_bar?.promoters +
                                "%)"}
                            </h4>
                          </div>

                          <div className="text-gray-400 flex gap-2 ">
                            <h3>
                              {pageData?.graphs?.nps_pie_bar?.total_promoters}
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
                                pageData?.graphs?.nps_pie_bar?.promoters + "%",
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
                                pageData?.graphs?.nps_pie_bar?.passive +
                                "%)"}
                            </h4>
                          </div>

                          <div className="text-gray-400 flex gap-2 ">
                            <h3>
                              {pageData?.graphs?.nps_pie_bar?.total_passive}
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
                                pageData?.graphs?.nps_pie_bar?.passive + "%",
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
                                pageData?.graphs?.nps_pie_bar?.detractors +
                                "%)"}
                            </h4>
                          </div>

                          <div className="text-gray-400 flex gap-2 ">
                            <h3>
                              {pageData?.graphs?.nps_pie_bar?.total_detractors}
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
                                pageData?.graphs?.nps_pie_bar?.detractors + "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* average nps */}
              <div className="border bg-white rounded-lg p-5  flex-1 ">
                <div className="flex justify-between items-center gap-5 ">
                  <h1 className="text-xl font-semibold">Average NPS</h1>

                  {/* select , download and reset */}
                  <div className="flex gap-2 items-center text-gray-700">
                    <button title="Download">
                      <DownloadRoundedIcon />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setSelectGraphStatus({
                            avg_nps: !selectGraphStatus?.avg_nps,
                          });
                        }}
                        className="flex items-center gap-2 border px-2 py-1 rounded-lg"
                      >
                        <span>Select graph</span>
                        <span>
                          <KeyboardArrowDownRoundedIcon />
                        </span>
                      </button>

                      {selectGraphStatus?.avg_nps && (
                        <div className="absolute top-[110%] border  z-50 bg-white shadow-xl rounded-b-lg left-0 right-0">
                          {pageData?.legends?.avg_nps?.map((data, index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-2 items-center p-2  text-sm hover:bg-gray-100 transition-all cursor-pointer"
                                onClick={() => {
                                  setPageData({
                                    ...pageData,
                                    legends: {
                                      // ...pageData?.legends,
                                      avg_nps: pageData?.legends?.avg_nps?.map(
                                        (a_data, a_index) => {
                                          if (a_index === index) {
                                            return {
                                              ...a_data,
                                              status: !a_data?.status,
                                            };
                                          } else return a_data;
                                        }
                                      ),
                                    },
                                  });
                                }}
                              >
                                <div
                                  style={{ backgroundColor: data?.color }}
                                  className="w-[8px] aspect-square  rounded-full"
                                ></div>
                                <div>{data?.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <button className="scale-x-[-1]" title="Reset">
                      <ReplayRoundedIcon />
                    </button>
                  </div>
                </div>

                {/* legend */}
                <div className="flex items-center gap-5 justify-end my-5">
                  {pageData?.legends?.avg_nps?.map((data, index) => {
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
                <div className="relative mt-5">
                  <ResponsiveContainer width="100%" height={220} className="">
                    <ComposedChart
                      data={pageData?.graphs?.avg_nps}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
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
                      </defs>

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

                      {pageData?.legends?.avg_nps[0]?.status && (
                        <Bar
                          barSize={20}
                          name="Promoters"
                          dataKey="promoter"
                          // fill="#00AC69"
                          fill="url(#promoterGradient)"
                          radius={[20, 20, 0, 0]}
                        />
                      )}

                      {pageData?.legends?.avg_nps[1]?.status && (
                        <Bar
                          barSize={20}
                          name="Passives"
                          dataKey="passive"
                          // fill="#4D5552"
                          fill="url(#passiveGradient)"
                          radius={[20, 20, 0, 0]}
                        />
                      )}
                      {pageData?.legends?.avg_nps[2]?.status && (
                        <Bar
                          barSize={20}
                          name="Detractors"
                          dataKey="detractor"
                          // fill="#DB2B39"
                          fill="url(#detractorGradient)"
                          radius={[20, 20, 0, 0]}
                        />
                      )}
                      {pageData?.legends?.avg_nps[3]?.status && (
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
            <div className="mt-5 border bg-white rounded-lg p-5 flex-1 min-h-[350px]">
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-xl font-semibold "> NPS Over Time</h1>

                {/* legend */}
                <div className="flex items-center gap-5 justify-end my-5">
                  {pageData?.legends?.nps_over_time?.map((data, index) => {
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

                {/* select , download and reset */}
                <div className="flex gap-2 items-center ">
                  <button title="Download">
                    <DownloadRoundedIcon />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setSelectGraphStatus({
                          nps_over_time: !selectGraphStatus?.nps_over_time,
                        });
                      }}
                      className="flex items-center gap-2 border px-2 py-1 rounded-lg"
                    >
                      <span>Select graph</span>
                      <span>
                        <KeyboardArrowDownRoundedIcon />
                      </span>
                    </button>

                    {selectGraphStatus?.nps_over_time && (
                      <div className="absolute top-[110%] border  z-50 bg-white shadow-xl rounded-b-lg left-0 right-0">
                        {pageData?.legends?.nps_over_time?.map(
                          (data, index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-2 items-center p-2  text-sm hover:bg-gray-100 transition-all cursor-pointer"
                                onClick={() => {
                                  setPageData({
                                    ...pageData,
                                    legends: {
                                      // ...pageData?.legends,
                                      nps_over_time:
                                        pageData?.legends?.nps_over_time?.map(
                                          (a_data, a_index) => {
                                            if (a_index === index) {
                                              return {
                                                ...a_data,
                                                status: !a_data?.status,
                                              };
                                            } else return a_data;
                                          }
                                        ),
                                    },
                                  });
                                }}
                              >
                                <div
                                  style={{ backgroundColor: data?.color }}
                                  className="w-[8px] aspect-square  rounded-full"
                                ></div>
                                <div>{data?.name}</div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>

                  <button className="scale-x-[-1]" title="Reset">
                    <ReplayRoundedIcon />
                  </button>
                </div>
              </div>

              {/* Graph */}
              <div className="relative mt-5">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    key={new Date()}
                    data={pageData?.graphs?.nps_over_time}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    {/* <defs>
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
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#009DFF"
                          stopOpacity={0.05}
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
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00AC69"
                          stopOpacity={0.05}
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
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4D5552"
                          stopOpacity={0.05}
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
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#DB2B39"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs> */}
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

                    {pageData?.legends?.avg_nps[0]?.status && (
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

                    {pageData?.legends?.avg_nps[1]?.status && (
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

                    {pageData?.legends?.avg_nps[2]?.status && (
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

                    {pageData?.legends?.avg_nps[3]?.status && (
                      <Area
                        type="monotone"
                        name="NPS"
                        dataKey="NPS"
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
    </div>
  );
};

export default AdminAnalyticsPage;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function CustomTooltip({ active, payload, label }) {
  console.log("payload", payload);
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000] ">
        {payload[0]?.payload?.month && (
          <h1 className="capitalize mr-2 text-lg mb-2 font-bold ">
            {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
          </h1>
        )}

        {payload?.map((data) => (
          <div key={Math.random()} className="">
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
