import React from "react";
import { AiTwotoneSound } from "react-icons/ai";
import {
  MdDirectionsWalk,
  MdOutlineMarkEmailUnread,
  MdWorkOutline,
} from "react-icons/md";
import { BsPhone, BsCalendarEvent } from "react-icons/bs";
import { CgOrganisation, CgProfile } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { TbBrandRedhat } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const AboutSection = ({ isOther, data }) => {
  const navigate = useNavigate();
  const {
    countrycode,
    mobile,
    country,
    state,
    loksabha,
    city,
    assembly,
    hometown,
    profiletype,
    orgname,
    businesscategory,
  } = data || {};
  const reducerData = useSelector((state) => {
    return {
      educationDetails: state.profileReducer.educationDetails || {}
    }
  });
  const { educationDetails } = reducerData;
  const {
    schoolpass,
    schooladdress,
    schoolname,
    ugbranch,
    ugdegree,
    collagenameug,
    ugaddress,
    pgpassyear,
    pgbranch,
    pgdegree,
    pgaddress,
    collagenamepg,
  } = educationDetails;
  const isPersonal = profiletype === "Personal";
  return (
    <div className="sm:mb-[80px] lg:mb-[60px] w-[95%] lg:w-[80%] xl:w-[70%] bg-white rounded-xl flex flex-col items-center ">
      {/*Head Section */}
      <section className="flex w-full justify-between my-2 px-4">
        <strong className="text-lg font-medium">About</strong>
        {!isOther && (
          <button
            onClick={() => navigate("/edit-profile")}
            className="text-md font-bold rounded-lg flex items-center text-white bg-[#6780AF] px-[10px] text-[12px]"
          >
            Edit Profile
          </button>
        )}
      </section>
      <div className="w-[93%] h-0.5 bg-gray-500"></div>

      {/* Details Section */}
      <section className="flex flex-col w-[90%] my-4 gap-2">
        <strong className="text-lg font-[800]">Personal Info :</strong>

        {/* DOB Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <BsCalendarEvent alt="" className="w-5 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Date of Birth : </strong>
            <strong>{moment(data?.dob).format("DD-MMM-YYYY")}</strong>
          </p>
        </div>

        {/* Gender Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <CgProfile alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Gender : </strong>
            <strong>{data?.gender}</strong>
          </p>
        </div>

        {/* Phone Number Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <BsPhone alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Phone : </strong>
            <strong>{`${countrycode || ""} ${mobile || ""}`}</strong>
          </p>
        </div>

        {/* Email Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <MdOutlineMarkEmailUnread
              alt=""
              className="w-6 h-6 text-[#6c6c6c]"
            />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Email : </strong>
            <strong>{data?.email}</strong>
          </p>
        </div>

        {/* Location Section */}
        <strong className="text-lg font-[800]">Location :</strong>

        {/* Living Location */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Living Location : </strong>
            <strong> {`${city ? `${city} ` : ""}`} </strong>
          </p>
        </div>

        {/*Assembly Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Assembly : </strong>
            <strong> {`${assembly ? `${assembly} ` : ""}`} </strong>
          </p>
        </div>

        {/*LokSabha Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Loksabha : </strong>
            <strong> {`${loksabha ? `${loksabha} ` : ""}`} </strong>
          </p>
        </div>

        {/*State Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">State : </strong>
            <strong> {`${state ? `${state} ` : ""}`} </strong>
          </p>
        </div>
        {/*District Section */}
        {/* <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">District : </strong>
            <strong> {`${city ? `${city} ` : ""}`} </strong>
          </p>
        </div> */}

        {/*Country Section */}
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Country : </strong>
            <strong> {`${country ? `${country} ` : ""}`} </strong>
          </p>
        </div>

        {/*Profession Section */}
        <strong className="text-lg font-[800]">Profession :</strong>
        <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm">
            <strong className="text-md font-medium">Company : </strong>
            {/* <strong> {`${profession ? `${profession} ` : ""}`} </strong> */}
          </p>
        </div>
        {isPersonal ? (
          <>
            <strong className="text-lg font-[800]">Education :</strong>
            {/* Scholling Section */}
            {schooladdress || schoolname ? (
              <div className="flex items-center gap-2">
                <div className="w-7">
                  <TbBrandRedhat alt="" className="w-6 h-6 text-[#6c6c6c]" />
                </div>
                <p className="text-sm">
                  Completed schooling from
                  <strong>
                    {" "}
                    {schoolname}, {schooladdress}
                  </strong>{" "}
                  in the year
                  <strong> {schoolpass}</strong>.
                </p>
              </div>
            ) : (
              ""
            )}
            {/* Graduation Section */}
            {collagenameug || ugaddress ? (
              <div className="flex items-center gap-2">
                <div className="w-7">
                  <TbBrandRedhat alt="" className="w-6 h-6 text-[#6c6c6c]" />
                </div>
                <p className="text-sm">
                  Graduation details :{" "}
                  <strong>
                    {collagenameug ? `${collagenameug}, ` : ""} {ugdegree},{" "}
                    {ugbranch}
                  </strong>
                  {/* , {ugaddress} */}
                </p>
              </div>
            ) : (
              ""
            )}

            {/* Graduation Section */}
            {collagenamepg || pgaddress || pgdegree || pgbranch ? (
              <div className="flex items-center gap-2">
                <div className="w-7">
                  <TbBrandRedhat alt="" className="w-6 h-6 text-[#6c6c6c]" />
                </div>
                <p className="text-sm">
                  Post Graduation Details :
                  <strong>
                    {collagenamepg} {pgdegree} {pgbranch}
                  </strong>
                  in the year <strong> {pgpassyear}</strong>
                </p>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div className="items-center gap-2">
              <div className="mb-2">
                <strong>Professional Info : </strong>
              </div>
              <p className="text-sm">
                {/* ORGANIZATION NAME */}
                <div className="flex items-center gap-2">
                  <div className="w-7">
                    <CgOrganisation alt="" className="w-6 h-6 text-[#6c6c6c]" />
                  </div>
                  Organization Name :
                  <strong className="text-sm">{orgname}</strong>
                </div>
                {/* ORGANIZATION CATEGORY */}
                <div className="flex items-center gap-2">
                  <div className="w-7">
                    <MdWorkOutline alt="" className="w-6 h-6 text-[#6c6c6c]" />
                  </div>
                  Organization Type :
                  <strong className="text-sm">{businesscategory}</strong>
                </div>
              </p>
            </div>
          </>
        )}
      </section>
      <p className="mb-4 text-sm">
        <strong>Uynited</strong> on <strong>February 2022</strong>
      </p>
    </div>
  );
};

export default AboutSection;
