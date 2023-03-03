import React, { useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
const AdminAnalyticsPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [calendarStatus, setCalendarStatus] = useState(false);

  function handleSelect(ranges) {
    setStartDate(ranges?.selection?.startDate);
    setEndDate(ranges?.selection?.endDate);
  }

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

  const pageData = {
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
        <div className="w-[80%] h-full mx-auto py-5">
          {/* filter */}
          <div>
            {/* date range */}
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
                <div className="w-fit absolute top-[110%] left-0 border rounded-lg overflow-hidden shadow-2xl">
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
          </div>

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
              {/* nps overall */}
              <div className="border bg-white rounded-lg p-5 flex-1 min-h-[350px]">
                <h1 className="text-xl font-semibold ">NPS Summary</h1>
              </div>

              {/* average nps */}
              <div className="border bg-white rounded-lg p-5 flex-1 min-h-[350px]">
                <h1 className="text-xl font-semibold ">Average NPS</h1>
              </div>
            </div>

            {/* nps over time */}
            <div className="mt-5 border bg-white rounded-lg p-5 flex-1 min-h-[350px]">
              <h1 className="text-xl font-semibold "> NPS Over Time</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
