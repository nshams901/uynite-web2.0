import React from "react";


const Topbar = () => {
  return (
    <div className="w-[100vw] h-[73px] flex flex-col items-center justify-end">
      <h1 className="font-bold text-center text-[20px] md:text-[26px]  lg:text-[34px] py-1">
        Welcome to <span className="text-[#24B9BF]">Uynite</span>
      </h1>

      {/* font weight changed into bold to semi-bold & padding added */}

      <p className="w-[90%] font-semibold text-center md:text-sm text-[10px]">
        A one stop place for connecting back to your personal world.
      </p>
    </div>
  );
};

export default Topbar;
