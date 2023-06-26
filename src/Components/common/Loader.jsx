import React from "react";
import Icon from "../../Assets/Images/Logo.png";

const Loader = () => {
  return (
    <>
      <div className="flex ring-1 items-center justify-center absolute inset-0 h-full z-50 bg-gray-300 opacity-50">
      </div>
      <div className="opacity-100 z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img className="w-full" src={Icon} />
      </div> 
    </>
  );
};

export default Loader;
