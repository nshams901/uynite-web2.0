import React from "react";

const UnionsFriendsList = () => {
  return (
    <div className="flex h-[50px] items-center w-full">
      <div className="">
        <img
          src="./images/events.jpg"
          alt=""
          className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
        />
      </div>
      <div className=" flex flex-1 flex-col justify-center ml-4">
        <span className="font-bold text-xs sm:text-sm">Elisa K</span>
        <em>
          <p className="text-[9px] sm:text-[10px] font-bold text-gray-500">Friend,Relative</p>
        </em>
      </div>

      <div className="flex gap-2 items-center cursor-pointer">
        <button
          className="px-5 bg-blue-400 text-white font-bold py-1 text-[10px] sm:text-xs rounded-lg"
          // onClick={onCreateUnion}
        >
          Invite +
        </button>
      </div>
    </div>
  );
};

export default UnionsFriendsList;
