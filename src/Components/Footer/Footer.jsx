import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center h-[90px] justify-center mt-[15px] bg-[#cdd6e8]">
      <div className="flex gap-8 justify-center items-center">
        <div className="font-semibold text-xs ">
          <span>&copy;</span> 2022 Uynite.com
        </div>
        <select name="" id="" className="font-semibold text-xs bg-[#CDD6E8] outline-none">
          <option value="english">English</option>
          <option value="english">Hindi</option>
          <option value="english">French</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1">
      <span className="font-semibold text-sm">About us</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Privacy & Cookies</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Terms & Conditions</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Services</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Ads Management</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Careers</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Help</span>
      <div className="bg-black w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
      <span className="font-semibold text-sm">Admin</span>
    </div>
    
    </div>
  );
};

export default Footer;
