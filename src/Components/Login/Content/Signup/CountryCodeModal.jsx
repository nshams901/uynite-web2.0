import React, { useState } from "react";
import countryLists from "./countryList";
import ReactCountryFlag from "react-country-flag";

const CountryCodeModal = ({
  countryList,
  setCountryData,
  closeCountryModal,
}) => {

  const [searchCountry,setSearchCountry] = useState("")
  // const countryData = Object.values(countryLists);
  // // const resultCCountList = Object.values(countryData);
  // // console.log("countryData", countryData);

  // // console.log("resultCCountList", resultCCountList);
  // // const filterCountry = (event)=>{

  // // }
  return (
    <div
      className="w-[95%] sm:w-[50%] lg:w-[30%] h-[74%] bg-white rounded-lg px-4 flex flex-col gap-2 pt-2 fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1>Select a country</h1>

      <input
        type="text"
        placeholder="Search..."
        value={searchCountry}
        className="border-b-2 border-[#48B2DB] text-[#7E8082] outline-none"
      />

      <div className="overflow-y-scroll flex flex-col gap-1">
        {Object.values(countryLists).map((elem) =>
          Object.values(elem).map((itemsss) => (
            <div
              className="w-full mb-1 flex cursor-pointer"
              onClick={() => {
                setCountryData(itemsss);
                closeCountryModal();
              }}
            >
              <div className="flex flex-1">
                <span className="">{itemsss?.name}</span>
              </div>
              <div>
                <ReactCountryFlag svg countryCode={itemsss.iso2} />
                <span className="px-2"> +{itemsss?.code}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountryCodeModal;
