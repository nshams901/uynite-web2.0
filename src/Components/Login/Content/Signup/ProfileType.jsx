import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../InputBox/Input";
import user from "../../../../Assets/Images/user.png";
import {
  getCountryList,
  getOrgCategory,
  isOtpValid,
  userSingupInformation,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import Button2 from "../Button/Button2";

const ProfileType = ({ modalType }) => {
  console.log("Modal Type", modalType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const reducerData = useSelector((state) => {
    return {
      organizationCategory: state.userReducer.orgCategory,
      userData: state.authReducer.signupData,
      countryList: state.authReducer.countryList,
      stateList: state.authReducer.stateList,
      districtList: state.authReducer.districtList,
      loksabhaList: state.authReducer.loksabhaList,
      assemblyList: state.authReducer.assemblyList,
    };
  });
  const { userData } = reducerData;
  const [states, setState] = useState({});
  const { imgFile, fname, lname, gender, dob, orgName, checkBox } = states;

  const isPersonal = modalType === "Personal";

  useEffect(() => {
    isPersonal ? dispatch(getCountryList()) : dispatch(getOrgCategory());
  }, []);
  const handleGender = (e) => {
    setState({ ...states, gender: e.target.id });
  };
  const handleDate = (e) => {
    setState({ ...states, dob: e.target.value });
  };
  const nameRules = /^(?=.*\d).{5,}$/;

  const onNextClick = () => {
    const signupInfo = {
      imgFile,
      fname,
      lname,
      gender,
      dob,
      orgName,
      checkBox,
      profiletype: modalType,
    };
    console.log("USERRRRRRRRRRRRRRRR", userData);

    dispatch(
      userSingupInformation({
        ...userData,
        ...signupInfo,
        profileType: modalType,
      })
    );
    dispatch(isOtpValid({ validOtp: true, userInfo: true }));
  };
  return (
    <div className="w-full rounded-[20px] flex flex-col h-full justify-evenly items-center gap-1 px-2 my-2">
      <div className="relative">
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          className="hidden bg-blue-600"
          onChange={(e) => setState({ ...states, imgFile: e.target.files[0] })}
        />
        <label
          htmlFor="profilePic"
          className="flex justify-center items-center cursor-pointer w-[4rem] h-[4rem]  sm:w-[5rem] sm:h-[5rem] xl:w-[6rem] xl:h-[6rem] mx-auto rounded-full"
        >
          {imgFile ? (
            <>
              <img
                className={
                  "w-[rem] h-[rem] sm:w-[13rem] sm:h-[rem] lg:w-[rem] lg:h-[rem] xl:w-[6rem] xl:h-[6rem] mx-auto relative rounded-full block border-[2px] border-black"
                }
                src={URL.createObjectURL(imgFile)}
              />
            </>
          ) : (
            <img
              className={"w-full h-full border-[2px] border-black rounded-full"}
              src={user}
            />
          )}
        </label>
        <div className="">
          {/* bg-color, padding, font-weight of label changed */}
          <label
            htmlFor="profilePic"
            className="text-xs sm:text-sm lg:text-md opacity-1 cursor-pointer p-[4px 20px] rounded-xl text-[#6F6F6F] font-medium px-6"
          >
            {!isPersonal ? "Organization" : "Personal"}
          </label>
        </div>
      </div>

      {/* Input Fields  */}
      <div className="mx-auto w-[90%]">
        {/* last name field added */}
        <div className=" mb-1">
          <Input
            title="First Name*"
            name="fname"
            inputValue={states?.fname}
            onHandleChange={(e) => {
              if (e.target.value.length > 16) {
                setState({
                  ...states,
                  fname: e.target.value.slice(0, e.target.value.length - 1),
                });
              } else {
                setState({ ...states, fname: e.target.value });
              }
            }}
            className="w-full"
          />
        </div>
        {/* Lastname field was added */}
        <div className="mt-[2px]">
          <Input
            title="Last Name*"
            inputValue={states?.lname}
            name="lname"
            onHandleChange={(e) => {
              if (e.target.value.length > 16) {
                setState({
                  ...states,
                  lname: e.target.value.slice(0, e.target.value.length - 1),
                });
              } else {
                setState({ ...states, lname: e.target.value });
              }
            }}
            className="w-full"
            disabled={states?.fname === ""}
          />
        </div>
        {isPersonal ? (
          <>
            <input
              type="text"
              onChange={handleDate}
              className="w-full h-9 border-[1px] my-1 !p-2 text-[#AEB2B1] font-bold outline-none border-[#7E8082] rounded-[5px] text-xs"
              placeholder="Date of Birth*"
              max="2010-06-13"
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              disabled={states?.fname === "" || states?.lname === ""}
              ref={ref}
            />
            {/* size of radio button incresed, accent color of button changed,
                    margin top of rdio button removed and margin added to input component*/}

            <div className="flex justify-between my-3 items-center">
              {/* input and label grouped in a div, padding added to label*/}
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  id="Male"
                  className="h-5 w-4 accent-stone-500"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2 text-sm sm:text-md">Male</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Female"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2  text-sm sm:text-md">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Other"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2 text-sm sm:text-md">Other</label>
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              ref={ref}
              onChange={handleDate}
              className="w-full h-9 border-[1px] my-1 !p-2 text-[#AEB2B1] outline-none border-[#7E8082] rounded-[5px] text-xs font-bold"
              placeholder="Date of Birth*"
              max="2010-06-13"
            />

            <div className="flex justify-between items-center">
              {/* gender selection field, organization name added added */}
              <div className="flex my-2 justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Male"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Male</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Female"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Other"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Other</label>
              </div>
            </div>
          </>
        )}
        <div className="w-full flex flex-col mb-2">
          <div className="flex w-full gap-2 items-center justify-between relative">
            <input
              type="checkbox"
              name="checkbox"
              value={states?.checkBox}
              className="transparent"
              onChange={(e) =>
                setState({
                  ...states,
                  checkBox: !states?.checkBox,
                })
              }
              disabled={
                states?.fname === "" ||
                states?.lname === "" ||
                states?.dob === undefined ||
                states?.gender === undefined
              }
            />
            <p className="text-[10px] font-semibold text-[#7E8082] w-full">
              I agree to all
              <Link to="/auth/reals" className="text-[#05B7FD]">
                &nbsp; Terms, Data, Cookies & Privacy.
              </Link>
            </p>
            <br />
          </div>
        </div>
        <div className="w-full mb-4">
          <Button2
            title="Next"
            width="100%"
            disabled={
              states?.fname === "" ||
              states?.lname === "" ||
              states?.dob === undefined ||
              states?.gender === undefined ||
              states?.checkBox === undefined
            }
            onClick={onNextClick}
          />
        </div>
      </div>
      {console.log("Staaaaaaaaaaaeeeee", states)}
    </div>
  );
};

export default ProfileType;
