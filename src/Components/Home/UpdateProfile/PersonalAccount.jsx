import React, { useMemo, useState } from "react";
import Input from "../../input/input";
import Dropdown from "../../Login/Content/Modal/Dropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Accordion from "../../Accordion/Accordion";
import Dropdown2 from "../../Login/Content/Modal/Dropdown2";
import { useDispatch, useSelector } from "react-redux";
import AutocompletePlace from "../../googlemap/AutocompletePlace";
import DropdownComp from "../../common/DropdownComp";
import { useEffect } from "react";

const PersonalAccount = ({
  states ,
  education,
  handleEducation,
}) => {
  const dispatch = useDispatch()
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
  } = education || {};
  const reducerData = useSelector((state) => {
    return {
      ugbranchList: state.profileReducer.graduationBranchList ,
      pgbranchList: state.profileReducer.pgBranchList,
      ugdegreeList: state.profileReducer.ugdegreeList,
      pgdegreeList: state.profileReducer.pgdegreeList,

    };
  });
  const {
    ugdegreeList,
    pgdegreeList,
    ugbranchList,
    pgbranchList
  } = reducerData;

  const year = [
    { year: "2025" },{ year: "2024" },{ year: "2023" },{ year: "2022" },{ year: "2021" },{ year: "2020" },
    { year: "2019" },{ year: "2018" },{ year: '2017'},{ year: "2016" },{ year: "2015" },{ year: "2014" },{ year: "2013" },
    { year: "2012" },{ year: "2011" },{ year: "2010" },{ year: "2009" },{ year: "2008" },{ year: "2007" },
    { year: "2006" },{ year: "2005" },{ year: "2004" },{ year: "2022" },{ year: "2021" },{ year: "2020" },
    { year: "2019" },{ year: "2018" },{ year: "2016" },{ year: "2015" },{ year: "2014" },{ year: "2013" },
    { year: "2012" },{ year: "2011" },{ year: "2010" },{ year: "2009" },{ year: "2008" },{ year: "2007" },
    { year: "2006" },{ year: "2005" },{ year: "2004" },{ year: "2003" },{ year: "2002" },{ year: "2001" },
    { year: "2000" },{ year: "1999" },{ year: "1998" },{ year: "1997" },{ year: "1996" },{ year: "1995" },
    { year: "1994" },{ year: "1993" },{ year: "1992" },{ year: "1991" },{ year: "1990" },{ year: "1989" },
    { year: "1988" },{ year: "1987" },{ year: "1986" },{ year: "1985" },{ year: "1984" },{ year: "1983" },
    { year: "1982" },{ year: "1981" },{ year: "1980" },{ year: "1979" },{ year: "1978" },{ year: "1977" },
  ];
  const getGraduation = () => {

  }

  return (
    <>
      <div className="mb-6 text-white ps-4 py-2 mt-6 text-[20px] bg-[#7991bd]">
        Education Details
      </div>
      <p>Let's start with school</p>
      <div className="flex w-full my-2 gap-3">
        <div className="w-full">
          <AutocompletePlace
            livePlace={(schoolLocation) =>
              handleEducation("schooladdress", schoolLocation)
            }
            // value={`${schoolname || "" } ${schooladdress || ""}`}
            value={ schooladdress}
            handleChangeLocation={(value) => handleEducation('schooladdress', value)}
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

        <DropdownComp
          name={"Choose Year"}
          style={"w-full"}
          options={year}
          keyName={"year"}
          handleChange={(value) => handleEducation("schoolpass", value.year)}
          selectedValue={{year: schoolpass}}
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
          {
            
            <AutocompletePlace
            livePlace={(schoolLocation) =>
              handleEducation("ugaddress", schoolLocation)
            }
            // value={`${schoolname || "" } ${schooladdress || ""}`}
            value={ ugaddress }
            handleChangeLocation={(value) => handleEducation('ugaddress', value)}
            placeholder={"College Name"}
            hideIcon
          />

          }
            <div className="">
              <DropdownComp
                up={true}
                style={"my-2 w-full"}
                options={ugdegreeList}
                keyName={"degree"}
                name={"Select Degree"}
                handleChange={(value) =>
                  handleEducation("ugdegree", value.degree)
                }
                selectedValue={{degree: ugdegree}}
              />
              <DropdownComp
                up={true}
                style={" w-full"}
                options={ugbranchList}
                keyName="branch"
                name={"Select Branch"}
                handleChange={(value) =>
                  handleEducation("ugbranch", value.branch)
                }
                selectedValue={{branch: ugbranch}}
              />
            </div>
            <DropdownComp
              up={true}
              style={"my-2 w-full"}
              options={year}
              keyName="year"
              name={"Select Year"}
              handleChange={(value) =>
                handleEducation("ugpassyear", value.year)
              }
              selectedValue={{year: ugpassyear}}
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
           <AutocompletePlace
            livePlace={(schoolLocation) =>
              handleEducation("pgaddress", schoolLocation)
            }
            // value={`${schoolname || "" } ${schooladdress || ""}`}
            value={ pgaddress }
            handleChangeLocation={(value) => handleEducation('pgaddress', value)}
            placeholder={"College Name"}
            hideIcon
          />
            
            <div className="">
              <DropdownComp
                up={true}
                style={"my-2 w-full"}
                name={"Select Degree"}
                keyName={"degree"}
                options={pgdegreeList}
                handleChange={(value) =>
                  handleEducation("pgdegree", value.degree)
                }
                selectedValue={{degree: pgdegree}}
              />
              <DropdownComp
                up={true}
                style={"max-w-full"}
                options={pgbranchList}
                keyName="branch"
                name={"Select Branch"}
                handleChange={(value) =>
                  handleEducation("pgbranch", value.branch)
                }
                selectedValue={{branch: pgbranch}}
              />
            </div>
            <DropdownComp
              up={true}
              style={"my-2 w-full"}
              name={"Select Year"}
              options={year}
              keyName="year"
              handleChange={(value) =>
                handleEducation("pgpassyear", value.year)
              }
              selectedValue={{year: pgpassyear}}
            />
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default PersonalAccount;
