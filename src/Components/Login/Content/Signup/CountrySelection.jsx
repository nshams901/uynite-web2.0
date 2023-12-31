import React, { useEffect, useRef, useState } from "react";
import Dropdown2 from "./Dropdown2";
import {
  createProfile,
  getAssenbly,
  getCountryList,
  getDistrict,
  getLoksabha,
  getOrgCategory,
  getStateList,
  loginUser,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";
import moment from "moment/moment";
import AutocompletePlace from "../../../googlemap/AutocompletePlace";
import Button2 from "./../Button/Button2";
import Input from "../InputBox/Input";
import { setDataOnStorage, toasterFunction } from "../../../Utility/utility";
import axios from "axios";

const CountrySelection = ({ modalType }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orgCategory, setOrgCategory] = useState("");
  const ref = useRef();
  const countryCode = ["1"];
  const reducerData = useSelector((state) => {
    return {
      organizationCategory: state.userReducer.orgCategory,
      signupData: state.authReducer.signupData,
      countryList: state.authReducer.countryList,
      stateList: state.authReducer.stateList,
      districtList: state.authReducer.districtList,
      loksabhaList: state.authReducer.loksabhaList,
      assemblyList: state.authReducer.assemblyList,
      userInfo: state.authReducer.userInfo,
    };
  });
  const {
    organizationCategory,
    signupData,
    userInfo,
    countryList,
    stateList,
    districtList,
    loksabhaList,
    assemblyList,
  } = reducerData;
  const [states, setState] = useState({});
  const [country, setCountry] = useState("");


  const {
    imgFile,
    orgName,
    dob,
    state,
    district,
    loksabha,
    assembly,
    category,
    city,
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedLoksabha,
    selectedAssembly,
    selectedCategory,
  } = states;

  useEffect(() => {
    isPersonal ? dispatch(getCountryList()) : dispatch(getOrgCategory());
  }, []);
  const handleCountry = (val) => {
    setCountry("");
    setState({
      ...states,
      state: "",
      district: "",
      loksabha: "",
      assembly: "",
      city: "",
      selectedCountry: val,
      selectedState: "",
      selectedDistrict: "",
      selectedLoksabha: "",
      selectedAssembly : "",
    });

    dispatch(getStateList(val.code));
  };
  const orgCategoryFilteration = organizationCategory?.filter((item) => {
    if (orgCategory === "") {
      return true;
    }
    return item.category.toLowerCase().includes(orgCategory.toLowerCase());
  });
  const handleLiveLocationn = (location) => {
    setState({ ...states, city: location });
  };

  const isPersonal = modalType === "Personal";
  const handleCreateProfile = async () => {
    const userid = localStorage.getItem("userid");

    const payload = {
      celibrity: false, //default value.
      countrycode: "+91", //default selected in signup screen..
      dob: moment(userInfo.dob).format("YYYY-MM-DD"), //from user input
      email: userInfo.uemail, //from signup screen.
      fname: orgName, //from user input BUSINESS NAME
      gender: userInfo?.gender,
      lname: userInfo?.lname,
      pimage: userInfo?.imgFile, //if profile image is there, add the URL here.
      businesscategory: states?.organizationCategory?.category, //from user input selection.
      orgname: orgName,
      personalLastName: userInfo?.lname, //from user input – profile lnamein SLIDE 4
      personalname: userInfo?.fname, //from user input – profilefnamein SLIDE 4
      profiletype: isPersonal ? "Personal" : "Organization", //profile type, while we passing in signup screen
      updatedate: userInfo.datetime, //Current UTC time in milliseconds
      userid: userid, // stored User ID from (Slide 3)
    };

    const payloads = {
      assembly: states?.selectedAssembly?.assembly
        ? states.selectedAssembly.assembly
        : null, //default value.
      celibrity: false,
      countrycode: "+91", //default selected in signup screen..
      country: states?.selectedCountry?.country,
      dob: moment(userInfo?.dob).format("YYYY-MM-DD"), //from user input
      email: userInfo?.uemail.toString().includes("@") ? userInfo?.uemail : "", //from signup screen.
      fname: userInfo?.fname, //from user input BUSINESS NAME
      gender: userInfo?.gender,
      
      hometown: city,
      mobile: !userInfo?.uemail.toString().includes("@")
        ? userInfo?.uemail
        : "",
      lname: userInfo?.lname,
      state: states?.selectedState?.state,
      city: states?.selectedDistrict?.distric,
      pimage: "", //if profile image is there, add the URL here.
      loksabha: states?.selectedLoksabha?.loksabha,
      personalLastName: userInfo?.lname, //from user input – profile lnamein SLIDE 4
      personalname: userInfo?.fname, //from user input – profilefnamein SLIDE 4
      profiletype: isPersonal ? "Personal" : "Organization", //profile type, while we passing in signup screen
      updatedate: userInfo.datetime, //Current UTC time in milliseconds
      userid: userid, // stored User ID from (Slide 3)
      id:null
    };
    const file = new FormData();
    file.append("file", imgFile);
    const data = isPersonal ? payloads : payload;
    // if (
    //   isPersonal ? !(fname && dob) : !(category?.category && fname && orgName)
    // ) {
    //   toasterFunction("Please enter required field");
    //   return;
    // }
    imgFile
      ? dispatch(imageUploadApi(file)).then((res) => {
          data.pimage = res.data.path;
          dispatch(createProfile(data))
            .then(async (res) => {
              if (res.data.status) {
                toast.success(res.data.message);
                // navigate('/auth/login')
                try {
                  // dispatch(checkingIsEmailExist(email))
                  const userResponse = await dispatch(
                    loginUser({
                      uemail: userCredential.uemail,
                      password: userCredential.password,
                    })
                  );
                  console.log("userResponse", userResponse);
                  const userCredential = {
                    uemail: userResponse?.data.email,
                    isLoggedIn: userResponse?.data?.loginstatus,
                    token: userResponse?.data?.loginToken,
                    id: userResponse.data.id,
                  };
                  if (!userResponse?.status) {
                    navigate("/auth/login");
                    toast.error(userResponse.message);
                    return userResponse?.message;
                  }
                  await setDataOnStorage(userCredential);
                  navigate("/select");
                } catch (error) {
                  console.log(error);
                }
              } else toast.error(res.data.message);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })
      : dispatch(createProfile(data))
          .then(async (res) => {
            if (res.data.status) {
              toast.success(res.data.message);
              // navigate('/auth/login')
              try {
                // dispatch(checkingIsEmailExist(email))
                const userResponse = await dispatch(
                  loginUser({
                    uemail: signupData.uemail,
                    password: signupData.password,
                  })
                );
                console.log("userResponse", userResponse);
                const userCredential = {
                  uemail: userResponse?.data.email,
                  isLoggedIn: userResponse?.data?.loginstatus,
                  token: userResponse?.data?.loginToken,
                  id: userResponse.data.id,
                };
                if (!userResponse?.status) {
                  toast.error(userResponse.message);
                  return userResponse?.message;
                }
                toast.success(userResponse?.message);
                await setDataOnStorage(userCredential);
                const token = userResponse?.data?.loginToken;
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;
                axios.defaults.headers.common["Content-Type"] =
                  "application-json";
                axios.defaults.headers.common["Accept-Language"] = "en";
                navigate("/select");
              } catch (error) {
                console.log(error);
              }
            } else toast.error(res.data.message);
          })
          .catch((err) => {
            toast.error(err.message);
          });
    // console.log(response);
  };

  const handleChange = (name, value) => {
    const obj = {
      selectedState: getDistrict(value.statecode),
      selectedDistrict: getLoksabha(value.did),
      selectedLoksabha: getAssenbly(value.lid),
    };
    obj[name] && dispatch(obj[name]);
    if (value.length > 32) {
      setState({ ...states, [name]: value.slice(0, value.length - 1) });
    } else {
      setState({ ...states, [name]: value });
    }
  };
  return (
    <div className="w-full rounded-[20px] flex flex-col h-full justify-center items-center gap-1 px-2">
      {isPersonal ? (
        <>
          {isPersonal && (
            <div className="w-full text-center mt-4 text-sm text-[#7E8082]">
              <p>
                We are collecting your location details to send event
                invitations
              </p>
            </div>
          )}
          {/* <Dropdown name={"Date of birth"} options={[]} /> */}
          <Dropdown2
            style={"w-full"}
            name={"Country*"}
            // country={country}
            inputValue={country}
            options={countryList}
            handleCountry={handleCountry}
            selectedCountry={selectedCountry}
            onHandleChange={(e) => {
              setCountry(e.target.value);
            }}
            setCountry={setCountry}
            param="country"
          />

          {/* created Dropdown2 component, when selecting country new dropdowns are shown ,
                    for this local state added, a function created for
                    getting value from child componenet*/}

          {selectedCountry ? (
            <>
              <div className="flex flex-col w-[90%]">
                <div className="flex flex-col sm:flex-row  gap-[5px]">
                  <Dropdown
                    name={"State*"}
                    options={stateList}
                    selectedValue={state}
                    keyName={"state"}
                    inputValue={states?.state}
                    handleChange={(value) => {
                      handleChange("state", "");
                      handleChange("selectedState", value);
                    }}
                    selectedOption={selectedState}
                    onHandleChange={(e) =>
                      setState({
                        ...states,
                        state: e.target.value,
                      })
                    }

                    emptyMessage={'Please select country first'}
                  />

                  {countryCode?.includes(selectedCountry?.code) && (
                    <Dropdown
                      name={"District*"}
                      options={districtList}
                      selectedValue={district}
                      keyName={"distric"}
                      inputValue={states?.district}
                      handleChange={(value) => {
                        handleChange("district", "");
                        handleChange("selectedDistrict", value);
                      }}
                      onHandleChange={(e) =>
                        setState({
                          ...states,
                          district: e.target.value,
                        })
                      }
                      selectedOption={selectedDistrict}
                      emptyMessage={'Please select state first'}
                    />
                  )}
                </div>
                {countryCode?.includes(selectedCountry?.code) && (
                  <>
                    <div className="flex flex-col sm:flex-row gap-[5px]">
                      <Dropdown
                        name={"Loksabha*"}
                        keyName={"loksabha"}
                        options={loksabhaList}
                        selectedValue={loksabha}
                        selectedOption={selectedLoksabha}
                        inputValue={states?.loksabha}
                        handleChange={(value) => {
                          handleChange("loksabha", "");
                          handleChange("selectedLoksabha", value);
                        }}
                        onHandleChange={(e) =>
                          setState({
                            ...states,
                            loksabha: e.target.value,
                          })
                        }
                        emptyMessage={'Please select district first'}
                      />
                      <Dropdown
                        name={"Assembly*"}
                        keyName={"assembly"}
                        options={assemblyList}
                        selectedValue={assembly}
                        selectedOption={selectedAssembly}
                        inputValue={states?.assembly}
                        handleChange={(value) => {
                          handleChange("assembly", "");
                          handleChange("selectedAssembly", value);
                        }}
                        onHandleChange={(e) =>
                          setState({
                            ...states,
                            assembly: e.target.value,
                          })
                        }
                        emptyMessage={'Please select loksabha first'}
                      />
                    </div>
                  </>
                )}

                <div className="mt-2 relative">
                  {/* <Input id='autocomplete' title="Living Location*" className="w-full" onHandleChange={ handleLiveLocationn}/> */}
                  <AutocompletePlace
                    livePlace={handleLiveLocationn}
                    map={false}
                    placeholder={"Living location"}
                    types={"cities"}
                    value={city}
                    handleChangeLocation={handleLiveLocationn}
                  />
                  {/* <input id="autocomplete" type="text"/> */}
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div className="w-[90%] pt-8">
          <Input
            type="search"
            inputValue={states?.orgName}
            title="Organization Name*"
            onHandleChange={(e) => handleChange("orgName", e.target.value)}
          />
          <Dropdown
            name={"Organization Category*"}
            options={organizationCategory}
            handleChange={(value) => {
              handleChange("category", "");
              handleChange("selectedCategory", value);
            }}
            selectedOption={selectedCategory}
            selectedValue={category}
            keyName={"category"}
            inputValue={orgCategory}
            filteredData={orgCategoryFilteration}
            onHandleChange={(e) => setOrgCategory(e.target.value)}
          />
        </div>
      )}

      <div className="w-full mt-2">
        <Button2
           disabled={
            isPersonal ?
            !(
              selectedCountry && selectedState && 
              (countryCode.includes(selectedCountry.code) ? ( selectedDistrict && selectedLoksabha && selectedAssembly ) : true)
            )
            :
            !(states.orgName && selectedCategory?.category)
           }
          width="90%"
          title="Create Profile"
          onClick={handleCreateProfile}
        />
        {
          console.log("Create Profile", states.orgName, selectedCategory)
        }
      </div>
    </div>
  );
};

export default CountrySelection;
