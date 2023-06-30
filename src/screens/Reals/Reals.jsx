import React, { useState } from "react";
import RealTabs from "../../Components/reals/RealTabs";
import RealContent from "../../Components/reals/RealContent";
import { useParams } from "react-router-dom";
import RealsLocation from "../../Components/reals/RealsLocation";

const Reals = () => {
  const params = useParams()
  const [state, setState] = useState({
    selectedValue: { name: 'Map' }
  });
  const { selectedValue, locat } = state
  const handleMenu = (value) => {
    setState({ ...state, selectedValue: value })
  }

  const handleLivePlace = ( location, locat) => {
    setState({ ...state, locat})
  }

  return (
    <div className="md:flex w-full min-h-full h-auto pt-3 bg-gray-300">
      {/* <h1 className="text-2xl font-bold"> Coming Soon</h1> */}
      <div className="lg:w-1/2">
        <RealTabs handleMenu={handleMenu} selectedValue={selectedValue}
        handleLivePlace={handleLivePlace} />
      </div>
      {
        params?.state
          ?
          <RealsLocation location={ locat} />
          :
          <RealContent location={locat} type={selectedValue} />

      }
    </div>
  );
};

export default Reals;
