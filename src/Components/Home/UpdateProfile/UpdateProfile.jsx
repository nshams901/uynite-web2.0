import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Login/Content/Modal/Dropdown";
import {
  checkingIsEmailExist,
  getAssenbly,
  getCountryList,
  getDistrict,
  getLoksabha,
  getOrgCategory,
  getStateList,
} from "../../../redux/actionCreators/authActionCreator";
import AutocompletePlace from "../../googlemap/AutocompletePlace";
import Dropdown2 from "../../Login/Content/Modal/Dropdown2";
import { addGraduation, getGraduationList, getPgList, getProfileById, graduationBranch, pgBranch, updateEducation, updateProfile } from "../../../redux/actionCreators/profileAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../input/input";
import PersonalAccount from "./PersonalAccount";
import OrganizationAccount from "./OrganizationAccount";
import { getEducationDetail } from "../../../redux/actionCreators/profileAction";
import { Button, Typography } from "@material-tailwind/react";
import { getUserDataFromLocalStorage, isEmpty } from "../../Utility/utility";
import Locations from "./Locations";
import { imageUploadApi } from "../../../redux/actionCreators/rootsActionCreator";
import DropdownComp from "../../common/DropdownComp";
import countryList from "../../Login/Content/Signup/countryList";
import CountryCodeDropdown from "../../profile/CountryCodeDropdown";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const captchaEl = useRef()

  const reducerData = useSelector((state) => {
    return {
      profileDetail: state?.profileReducer?.profileDetail?.data || state.profileReducer.profile,
      educationDetails: state?.profileReducer?.educationDetails,
      profile: state?.profileReducer?.profile || {},
    };
  });
  const { educationDetails, profile } = reducerData;
  const [states, setState] = useState( {
    ...profile,
    gender: {name: profile.gender},
    state : { state: profile.state},
    city : { distric : profile.city},
    loksabha :  {loksabha: profile?.loksabha},
    assembly : { assembly: profile.assembly},
  });
  const [country, setCountry] = useState({country : profile?.country});
  const [education, setEducation] = useState(educationDetails || {});
  const [orgDetail, setOrgDetail] = useState({
    ...profile,
    fname: profile?.fname,
    orgname: profile.orgname,
    businesscategory: profile.businesscategory,
  });

  const {
    fname = profile?.fname,
    lname = profile?.lname,
    email = profile?.email,
    dob = profile?.dob,
    gender ,
    profiletype = profile.profiletype,
    userid = profile.userid,
    id = profile.id,
    profilePic ,
    coverPic ,
    pimage, 
    pcoverimage,
    code = profile.code,
    location = profile?.city,
    mobile,
    orgname,
    businesscategory,
    others_address,
    personalname,
    personalLastName,
    job= profile.job,
    company,
    countrycode,
    otpSent,
    otp,
  } = states;

  const isPersonal = profiletype === "Personal";

  useEffect(() => {
     dispatch(getCountryList());
    isPersonal ? getPersonalDetail() : dispatch(getOrgCategory());
  }, [profiletype]);

  const getPersonalDetail = () => {
    console.log(educationDetails.ugdegree, educationDetails);
    dispatch(getEducationDetail(id)).then((res) => {
       dispatch(graduationBranch( res.ugdegree));
       dispatch(pgBranch( res.pgdegree))
     });
     dispatch(getPgList());
     dispatch(getGraduationList());
  }
  const handleUpload = (name, value) => {
    if (name === "profile") {
      const profileImg = URL.createObjectURL(value);
      setState({ ...states, pimage: profileImg, profilePic: value });
    } else if ("cover") {
      const profileImg = URL.createObjectURL(value);
      setState({ ...states, pcoverimage: profileImg, coverPic: value });
    }
  };

  const handleCountry = (val) => {
    setCountry(val);
    dispatch(getStateList(val.code));
  };
  const handleChange = (name, value) => {
    console.log(name, value);
    const obj = {
      state: getDistrict(value.statecode),
      city: getLoksabha(value.did),
      loksabha: getAssenbly(value.lid),
    };
    obj[name] && dispatch(obj[name]);
    if(name === 'state'){
      setState({...states, [name]: value, district: "", loksabha: "", assembly: ""})
    }else 
    setState({ ...states, [name]: value });
  };

  const handleCountryCode = (value) => {
    setState({ ...states, countrycode: value })
  }

  const handleVerify = () =>{
    if(!countrycode.code){
     return toast.error('Please select country')
    }
    signIn("+"+countrycode.code+mobile)
  }

  const submitOtp = () => {
    confirmationResult.confirm(otp).then((res) => {
      toast.success(res.message)
      setState({ ...states, otpSent: false})
    }).catch((err)=> {
      toast.error(err.message)
    })
  }

  function configureRecaptcha(phoneNumber, auth) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  }

  function signIn(phoneNumber) {
    const auth = getAuth();
    try {
      configureRecaptcha(phoneNumber, auth);
    } catch (err) {
      captchaEl.current.innerHTML = null;
      console.log(err, "captcha error");
    }

    // const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        captchaEl.current.innerHTML = "";
        setState({ ...states, otpSent: true })
        // navigate(`/auth/verification/signup?${profileType}`);
      })
      .catch((err) => {
        captchaEl.current.innerHTML = null;
        // window.location.reload()
        // console.log(err);
        toast.error(err.message);
      });
  }

  const handleOrganization = (name, value) => {
    setOrgDetail({...orgDetail, [name]: value})
  }
  const handleSubmit = async () => {
    if ((email !== profile?.email ) || (mobile !== profile?.mobile)) {
      const checkEmail = await dispatch(checkingIsEmailExist(email));
      console.log(checkEmail, );
      if(checkEmail?.status){
        return toast.error("Email id is already registered with us")
      }
    }
    const payloads = {
      id: id,
      assembly: states.assembly?.assembly, //default value.
      celibrity: false,
      countrycode: "+91", //default selected in signup screen..
      country: country?.country || "",
      dob: moment(dob).format("YYYY-MM-DD"), //from user input
      email: email, //from signup screen.
      fname: fname, //from user input BUSINESS NAME
      gender: gender?.name,
      mobile: mobile,
      job: states.job,
      company: states.company,
      pimage: pimage, //if profile image is there, add the URL here.
      loksabha: states.loksabha?.loksabha,
      state: states.state?.state || "",
      city: states.city.distric,
      hometown: states.hometown,
      pcoverimage: pcoverimage,
      lname: lname, //from user input – profile lnamein SLIDE 4
      personalname: !isPersonal ?  personalname : "", //from user input – profilefnamein SLIDE 4
      personalLastName: !isPersonal ? personalLastName : "",
      profiletype: isPersonal ? "Personal" : "Organization", //profile type, while we passing in signup screen
      updatedate: Date.now(), //Current UTC time in milliseconds
      userid: userid, // stored User ID from (Slide 3)
      ...(!isPersonal && {
        businesscategory: orgDetail?.businesscategory,
        orgname: orgDetail.orgname,
        others_address: orgDetail.others_address,
        orgemail: orgDetail.orgemail,
        others_website: orgDetail.others_website,
        fname: orgDetail.fname
      }),
    };
    if (profilePic) {
      let response = await dispatch(imageUploadApi(profilePic));
      payloads.pimage = response.path;
    }
    if (coverPic) {
      let response = await dispatch(imageUploadApi(coverPic));
      payloads.pcoverimage = response.path;
    }
    education.isEditEdu ? isPersonal ? addEducation() : addProfession() : ""
    dispatch(updateProfile(payloads))
      .then((res) => {
        if (res.status) {
          navigate("/profile");
          dispatch(getProfileById(getUserDataFromLocalStorage().id))
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {});
  };
// ------------------- for organization account ----------------
  function addProfession(){

  }
  // ---------------- for personal account ----------------------
 async function addEducation (){
  Promise.all([
    dispatch(updateEducation(education)),
    dispatch(addGraduation(education)),
  ]).then((res) => {
    if(res[0]?.status){
      dispatch(getEducationDetail(id))
    }
  });
  }
  const handleEducation = (name, value) => {
    console.log(name, value);
    if(name === 'ugdegree') {
      dispatch(graduationBranch(value))
    }else if(name=== 'pgdegree'){
      dispatch(pgBranch(value))
    }
    setEducation({...education, isEditEdu: true, [name]: value})}
  const checkDisable = () => {
    return !(fname || lname)
  }
    const handleLocation = (location) => {
      setState({...states, hometown: location})
    };
  return (
    <div className="bg-[#E4E7EC] w-[100%]  p-6">
      <div className="updateTitle text-center rounded-xl flex-wrap mt-2 mb-6 bg-[#FFFFFF] text-[#000] text-xl ">
        <h3 className="p-2 font-bold">Let's update your profile</h3>
        <h4 className=" text-[#666567]">
          This will help others to get to know you better!
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center rounded-2xl md:grid-cols-2 ">
        <div className="bg-[#fff] rounded-2xl ">
          <h3 className="p-2 font-bold text-center text-[20px]">
            Cover Picture:
          </h3>
          <img
            src={pcoverimage}
            alt=""
            className="mb-4 object-cover border border-gray-500 w-[400px]  h-[200px] text center m-auto rounded-2xl"
          />
          <i class="bi bi-exclamation-circle m-12   text-[#707070] "></i>
          <div className="flex justify-center mb-6">
            <input
              id="coverPic"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload("cover", e.target.files[0])}
            />
            <label
              htmlFor="coverPic"
              className="bg-[#7991BD] p-2 w-[210.7px] text-[#fff] text-center rounded-2xl "
            >
              Change Picture
            </label>
            <button
              onClick={() => setState({ ...states, pcoverimage: "" })}
              className="text-[#7991BD] w-[100.7px] "
            >
              remove
            </button>
          </div>
        </div>
        <div className="bg-[#fff] rounded-2xl ">
          <h3 className="p-2 font-bold text-center text-[20px]">
            Profile Picture
          </h3>
          <img
            src={pimage}
            alt=""
            className="h-[200px] w-[250px] border border-gray-500 object-cover text center m-auto rounded-2xl"
          />
          <div className="flex content-center  justify-center mt-8">
            <input
              className="hidden"
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={(e) => handleUpload("profile", e.target.files[0])}
            />
            <label
              role="button"
              htmlFor="profilePic"
              className="bg-[#7991BD] p-2 w-[210.7px] text-[#fff] rounded-2xl ml-[120px] text-center  items-center content-center"
            >
              Change Picture
            </label>
            <button
              onClick={() => setState({ ...states, pimage: "" })}
              className="text-[#7991BD] w-[100.7px]"
            >
              remove
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center  flex-row">
        <div className="m-2 p-6">
          <div action="">
            <div className="mb-3 text-white ps-4 py-2 mt-6 text-[20px] bg-[#7991bd]">
              Personal Info
            </div>

            <div>
              <div className="flex gap-2">
                <Input
                  classes={"my-2 w-1/2"}
                  label={"First Name"}
                  attributes={{
                    name: isPersonal ? "fname" : 'personalname',
                    onChange: (e) => e.target.value?.length < 16 &&
                      handleChange(e.target.name, e.target.value),
                    type: "text",
                    placeholder: "First Name",
                    value: isPersonal ? fname : personalname,
                  }}
                />
                <Input
                  classes={"my-2 w-1/2"}
                  label={"Last Name"}
                  attributes={{
                    name: isPersonal ? "lname" : "personalLastName",
                    onChange: (e) => e.target.value?.length < 16 &&
                      handleChange(e.target.name, e.target.value),
                    type: "text",
                    placeholder: "Last Name",
                    value: isPersonal ? lname : personalLastName,
                  }}
                />
              </div>
              {fname || lname ? (
                ""
              ) : (
                <div className="-mt-2 flex gap-2">
                  {fname ? (
                    <></>
                  ) : (
                    <Typography className="w-1/2" variant="small" color="red">
                      {" "}
                      Enter first name
                    </Typography>
                  )}
                  {lname ? (
                    <></>
                  ) : (
                    <Typography variant="small" color="red">
                      {" "}
                      Enter last name
                    </Typography>
                  )}
                </div>
              )}
              {
                isPersonal ?
                <div className="flex gap-2">
                <Input
                  classes={"my-2 w-1/2"}
                  label={"Job"}
                  attributes={{
                    name: 'job',
                    onChange: (e) => handleChange(e.target.name, e.target.value),
                    type: "text",
                    placeholder: "Job",
                    value: job
                  }}
                />
                <Input
                  classes={"my-2 w-1/2"}
                  label={"Company"}
                  attributes={{
                    name: 'company',
                    onChange: (e) => e.target.value?.length < 16 &&
                      handleChange(e.target.name, e.target.value),
                    type: "text",
                    placeholder: 'Company Name',
                    value: company
                  }}
                />
              </div>
              : <></>
              }
              <Input
                classes={"flex my-2"}
                label={"Email"}
                attributes={{
                  name: "email",
                  onChange: (e) => handleChange(e.target.name, e.target.value),
                  type: "text",
                  placeholder: "Email",
                  value: email,
                }}
              />
              <div className="my-3 gap-2 flex w-full items-center justify-between">
                <div>
                <CountryCodeDropdown
                  label={'Phone'}
                  name={'code'}
                  handleChange={handleCountryCode}
                  selectedValue={countrycode}
                  keyName={'code'}
                />
                </div>
                <Input
                  labelclass={'w-1/4'}
                  classes={"w-full"}
                  //   label={"First Name"}
                  attributes={{
                    value: mobile,
                    name: "mobile",
                    onChange: (e) => e.target.value.length < 12 && handleChange(e.target.name, e.target.value),
                    type: "text",
                    placeholder: "Phone Number",
                  }}
                />
                {
                mobile !== profile.mobile && 
                <div>
                <div ref={ captchaEl } id="sign-in-button"></div>
                <Button onClick={ handleVerify } variant="text" className="m-0 p-0" >Verify</Button>

                </div>
              }
              </div>
              { otpSent &&
                <div className=" flex justify-end">
                <div className="flex gap-2">
                  <Input 
                    attributes={{
                      value: otp,
                      placeholder: 'Enter Code',
                      onChange: (e) => e.target.value?.length<7 && handleChange('otp', e.target.value),
                      type: 'text'
                    }}
                  />
                  <div><Button onClick={submitOtp } className={`py-2 bg-[#7991bd]`} >Confirm</Button></div>
                </div>
                </div>
              }
              <div className=" gap-2 my-2 ">
                <div className="">
                  <Input
                    labelclass={'w-1/4'}
                    classes={"flex"}
                    label={"Date of birth*"}
                    attributes={{
                      name: "dob",
                      onChange: (e) =>
                        handleChange(e.target.name, e.target.value),
                      type: "date",
                      placeholder: "",
                      value: dob ? dob : null,
                    }}
                  />
                </div>
                <div className="flex items-center mt-3">
                  {/* <label className="block me-6 text-gray-900">
                    Gender
                  </label> */}
                  {/* <Dropdown
                    label={"Gender"}
                    style={"w-full"}
                    name={"Gender"}
                    options={[{ name: "Male" }, { name: "Female" }]}
                    selectedValue={gender}
                    keyName={"name"}
                    handleChange={(value) => handleChange("gender", value)}
                  /> */}

                  <DropdownComp
                    label={'Gender'}
                    name={'Gender'}
                    options={[{ name: "Male" }, { name: "Female" }]}
                    selectedValue={gender}
                    keyName={'name'}
                    handleChange={(value) => handleChange('gender', value)}
                  />
                </div>
              </div>
              {
                <Locations
                  states={states}
                  handleCountry={handleCountry}
                  country={country}
                  handleChange={handleChange}
                  handleLocation={handleLocation}
                  location={location}
                />
              }
              {isPersonal ? (
                <PersonalAccount
                  states={states.id || profile}
                  education={isEmpty(education) ? educationDetails: education}
                  handleChange={handleChange}
                  handleEducation={handleEducation}
                />
              ) : (
                <OrganizationAccount
                  states={states}
                  orgDetail={{...profile, ...orgDetail, }}
                  handleChange={handleOrganization}
                />
              )}
              {/* form button */}
              <div className="flext w-full text-center">
                <button
                  disabled={checkDisable()}
                  onClick={handleSubmit}
                  className="w-[180px] pr-3 bg-[#7991BD] p-1 px-2 rounded-lg text-white mt-4"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-[180px] ml-3 border-solid border border-[#7991BD] p-1 inline-block rounded-lg text-[#7991BD]"
                >
                  Cancel
                </button>
              </div>
              {/* <AutocompletePlace/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
