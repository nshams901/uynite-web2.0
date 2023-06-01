import React, { useMemo, useState } from "react";
import Input from "../../input/input";
import Dropdown from "../../Login/Content/Modal/Dropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Accordion from "../../Accordion/Accordion";
import Dropdown2 from "../../Login/Content/Modal/Dropdown2";
import { useSelector } from "react-redux";
import AutocompletePlace from "../../googlemap/AutocompletePlace";

const PersonalAccount = ({
  states ,
  education,
  handleEducation,
}) => {
  const { state, district, assembly, loksabha } = states;
  const {
    // pgadress,
    pgbranch,
    pgdegree,
    pgpassyear,
    schooladdress,
    schoolname,
    schoolpass,
    collegenameug,
    ugaddress,
    ugbranch,
    ugdegree,
    ugpassyear,
    graduationDegree,
    collegenamepg,
    graduationBranch,
    graduationYear,
    pgaddress,
    PGbranch,
    PGdegree,
    PGyear,
    schoolYear,
  } = education;
  const reducerData = useSelector((state) => {
    return {
      countryList: state.authReducer.countryList,
      stateList: state.authReducer.stateList,
      districtList: state.authReducer.districtList,
      loksabhaList: state.authReducer.loksabhaList,
      assemblyList: state.authReducer.assemblyList,
      ugdegreeList: state.profileReducer.ugdegreeList,
      pgdegreeList: state.profileReducer.pgdegreeList,
    };
  });
  const {
    ugdegreeList,
    pgdegreeList,
  } = reducerData;

  const year = [
    { year: "2025" },
    { year: "2024" },
    { year: "2023" },
    { year: "2022" },
    { year: "2021" },
    { year: "2020" },
    { year: "2019" },
    { year: "2018" },
    { year: "2016" },
    { year: "2015" },
    { year: "2014" },
    { year: "2013" },
    { year: "2012" },
    { year: "2011" },
    { year: "2010" },
    { year: "2009" },
    { year: "2008" },
    { year: "2007" },
  ];
  const getGraduation = () => {

  }
  const countryName = ['India']
console.log(ugaddress, education, "???????????????");
  return (
    <>
      <div className="mb-6 text-white ps-4 py-2 mt-6 text-[20px] bg-[#7991bd]">
        Education Detail:
      </div>
      <p>Let's start with school</p>
      <div className="flex w-full my-2 gap-3">
        <div className="w-full">
          <AutocompletePlace
            livePlace={(schoolLocation) =>
              handleEducation("schoolname", schoolLocation)
            }
            value={`${schoolname || "" } ${schooladdress || ""}`}
            handleChangeLocation={(value) => handleEducation('schoolname', value)}
            placeholder={"Enter your school"}
          />
        </div>
        {/* <Input
          attributes={{
            name: "school",
            placeholder: "School Name",
            type: "text",
            onChange: (e) => handleEducation(e.target.name, e.target.value),
            value: `${schoolname || ""} ${schooladdress || ""}`,
          }}
        /> */}

        <Dropdown
          name={"Choose Year"}
          style={"w-full"}
          options={year}
          keyName={"year"}
          handleChange={(value) => handleEducation("schoolpass", value.year)}
          selectedValue={schoolpass}
        />
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <Accordion
            handleClick={getGraduation}
            title={
              <p className="flex gap-3 items-center justify-between">
                <span>Graduation</span>
                <AiOutlinePlusCircle />
              </p>
            }
          >
            <Input
              attributes={{
                name: "collegenameug",
                type: "text",
                onChange: (e) => handleEducation(e.target.name, e.target.value),
                value: `${collegenameug||""} ${ugaddress}`,
                placeholder: "College Name",
              }}
            />
            <div className="">
              <Dropdown
                up={true}
                style={"my-2 w-full"}
                options={ugdegreeList}
                keyName={"degree"}
                name={"Select Degree"}
                handleChange={(value) =>
                  handleEducation("ugdegree", value.degree)
                }
                selectedValue={ugdegree}
              />
              <Dropdown
                up={true}
                style={" w-full"}
                options={ugdegreeList}
                keyName="branch"
                name={"Select Branch"}
                handleChange={(value) =>
                  handleEducation("ugbranch", value.branch)
                }
                selectedValue={ugbranch}
              />
            </div>
            <Dropdown
              up={true}
              style={"my-2 w-full"}
              options={year}
              keyName="year"
              name={"Select Year"}
              handleChange={(value) =>
                handleEducation("ugpassyear", value.year)
              }
              selectedValue={ugpassyear}
            />
          </Accordion>
        </div>
        <div className="w-1/2">
          <Accordion
            title={
              <p className="flex ms-2 gap-3 items-center justify-between">
                <span>Post Graduation</span>
                <AiOutlinePlusCircle />
              </p>
            }
          >
            <Input
              attributes={{
                name: "collegenamepg",
                type: "text",
                onChange: (e) => handleEducation(e.target.name, e.target.value),
                value: `${collegenamepg||""} ${pgaddress}`,
                placeholder: "College Name",
              }}
            />
            <div className="">
              <Dropdown
                up={true}
                style={"my-2 w-full"}
                name={"Select Degree"}
                keyName={"degree"}
                options={pgdegreeList}
                handleChange={(value) =>
                  handleEducation("pgdegree", value.degree)
                }
                selectedValue={pgdegree}
              />
              <Dropdown
                up={true}
                style={" w-full"}
                options={pgdegreeList}
                keyName="branch"
                name={"Select Branch"}
                handleChange={(value) =>
                  handleEducation("pgbranch", value.branch)
                }
                selectedValue={pgbranch}
              />
            </div>
            <Dropdown
              up={true}
              style={"my-2 w-full"}
              name={"Select Year"}
              options={year}
              keyName="year"
              handleChange={(value) =>
                handleEducation("pgpassyear", value.year)
              }
              selectedValue={pgpassyear}
            />
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default PersonalAccount;
