import React from "react";
import { Link } from "react-router-dom";
// assets
import logo from "../../assets/global/header/company_logo.svg";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center py-5 w-[95%] mx-auto">
        <div>
          <img src={logo} alt="comapny logo" />
        </div>
        <div className="text-sm flex items-center gap-5">
          <Link
            to="/login"
            className="py-2 rounded-xl px-5 min-w-[100px] active:scale-95 transition-all font-semibold border border-[#747474] text-center"
          >
            Login
          </Link>
          <button className="hidden sm:block py-2 rounded-xl px-5 min-w-[100px]  text-white font-medium shadow-[#038bfe] shadow-md  bg-[#038BFE] active:scale-95 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
