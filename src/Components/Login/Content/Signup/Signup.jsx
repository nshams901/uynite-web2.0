import React, { useEffect, useRef, useState } from "react";
import Input from "../InputBox/Input";
import PasswordInput from "../InputBox/PasswordInput";
import Button2 from "../Button/Button2";
import Heading from "../Heading/Heading";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  checkingIsEmailExist,
  getCountryList,
  otpType,
  sendOtpToUser,
  settingOtp,
  savingPhoneNo,
  userSingupInformation,
  isOtpValid,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import dropdownIcon from "../../../../../public/images/dropdownIcon.png";
import "firebase/auth";
import { isEmpty, toasterFunction } from "../../../Utility/utility";
import { toast } from "react-toastify";
import CountryCodeModal from "./CountryCodeModal";
import Portals from "../../../Portals/Portals";
import Loader from "../../../common/Loader";
import ReactCountryFlag from "react-country-flag";

const Signup = () => {
  const captchaEl = useRef();
  const [profileType, setProfileType] = useState('Personal');
  const dispatch = useDispatch();
  const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { countryList } = useSelector((state) => state.authReducer);

  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };

  const validatePassword = (password) => {
    return passwordRules.test(password);
  };
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      phone: "",
      profileType: "",
    },
    validationSchema: Yup.object({
      // profile: Yup.string().profileType("Please select profile type.").required("Required"),
      email: Yup.string().when("phone", (phone, schema) => {
        if (!isEmpty(phone)) {
          return schema.notRequired();
        } else {
          return schema.required("email required");
        }
      }),
      // .email('"Email address incorrect. Please Try again"'),
      password: Yup.string()
        .min(
          8,
          "Password should be minimum of 8 length characters with one numerical value"
        )
        .matches(passwordRules, {
          message:
            "Password should be minimum of 8 length characters with one numerical value",
        }),
    }),
    onSubmit: async (event) => {
      dispatch(isOtpValid({}))
      dispatch(settingOtp(""));
      setIsLoading(true);
      const isValueExist = formik.values.email || formik.values.phone;
      const isExist = await checkUserExist(isValueExist);
      if (formik.values.email) {
        dispatch(otpType(true));
      } else {
        dispatch(otpType(false));
        // dispatch(savingPhoneNo(formik.values.email));
      }
      if (!validateEmail(formik.values.email)) {
        setIsLoading(false);
        toast.error("Enter valid email address");
        return;
      }
      if (isExist && formik.values.email) {
        setIsLoading(false);
        toast.error(
          "Your email already registered with us, please try to login"
        );
        return;
      } else if (isExist && formik.values.phone) {
        setIsLoading(false);
        toast.error(
          "Your phone number already registered with us, please try to login"
        );
        return;
      }
      captchaEl.current.innerHTML = "";
      if (!profileType) {
        setIsLoading(false);
        toasterFunction("Please select profile type");
        return;
      }
      const dataObj = {
        datetime: Date.now().toString(),
        profileType: profileType,
        uemail: formik.values.email ? formik.values.email : formik.values.phone,
        password: formik.values.password,
      };
      let response;
      if (formik.values.email || formik.values.phone) {
        response = await dispatch(sendOtpToUser(dataObj));
      }
      console.log("Response........", response);
      dispatch(userSingupInformation(dataObj));
      let result;
      if (formik.values.phone) {
        result = dispatch(savingPhoneNo(formik.values.phone));
      }
      

      if (formik.values.phone) {
        setIsLoading(false);
        signIn(
          `${formik?.values.phone}`?.startsWith("91") ||
            `${formik?.values.phone}`?.startsWith("+91")
            ? formik.values.phone
            : `+91${formik.values.phone}`
        );
      } else if (response.status === 200) {
        setIsLoading(false);
        toast.success(
          "Successfully sent code to email address-" + `${formik.values.email}`
        );
        navigate(`/auth/verification/signup?${profileType}`);
      }
    },
  });
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
        navigate(`/auth/verification/signup?${profileType}`);
      })
      .catch((err) => {
        captchaEl.current.innerHTML = null;
        // window.location.reload()
        // console.log(err);
        toast.error(err.message);
      });
  }

  const handleClick = (event) => {
    setProfileType(event.target.id);
  };
  function checkUserExist(email) {
    if (email) {
      return dispatch(checkingIsEmailExist(email)).then((res) => {
        if (res?.data?.id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  const [countryCode, setCountryCode] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [activeField, setActiveField] = useState(false);

  const closeCountryModal = () => {
    setCountryCode(false);
  };
  console.log("countryData", countryData);
  return (
    <>
      {/* padding increased */}
      <div className="w-full rounded-[20px] flex flex-col justify-center items-center gap-1 px-4 h-full">
        <Heading title="Create your profile" />
        <div className="flex w-full justify-center gap-4 mb-2">
          <span>
            <input
              type="radio"
              name="signUp"
              id="Personal"
              onChange={(e) => handleClick(e)}
              checked={ profileType === 'Personal'}
            />
            <span className="ml-1 text-[#7E8081]">Personal</span>
          </span>
          <span>
            <input
              type="radio"
              name="signUp"
              id="Organization"
              onChange={(e) => handleClick(e)}
            />
            <span className="ml-1 text-[#7E8082]">Organization</span>
          </span>
        </div>
        <Input
          title="Email"
          name="email"
          inputValue={activeField ? "" : formik.values.email}
          errorMessage={formik.errors.email}
          id="email"
          onHandleChange={(e) => {
            if (e.target.value.length > 32) {
              formik.handleChange(
                e.target.value.slice(0, e.target.value.length - 1)
              );
            } else {
              formik.handleChange(e);
            }
          }}
        />
        {/* font weight changed */}
        <h1 className="font-semibold text-[black]">Or</h1>
        <div className="flex w-full justify-center items-center cursor-pointer gap-2 rounded-[5px] relative">
          {/* textcolor, border color, height, bckground-color changed*/}
          <div
            name=""
            id=""
            className=" bg-white border-[1px] border-[#7E8082] rounded-[5px] h-full outline-none text-xs font-semibold !p-2 w-[60%] text-[#AEB2B1]"
            onClick={() => setCountryCode(true)}
          >
            <div className=" font-bold flex items-center w-[80%] justify-center">
              <ReactCountryFlag
                svg
                countryCode={countryData.iso2}
                style={{
                  width: "1.2em",
                  height: "1.2em",
                }}
              />
              {` ${
                countryData?.iso2
                  ? `${countryData?.iso2} + ${countryData?.code}`
                  : "IN +91"
              } `}
            </div>
            {/* {countryList?.map((elem) => (
              <option value="">
                {elem?.inisititete} +{elem?.code}
              </option>
            ))} */}
          </div>
          <img
            src={dropdownIcon}
            alt=""
            className="w-[10px] absolute left-[31%] sm:left-[26%] xl:left-[30%]"
          />

          <input
            placeholder="Phone number"
            className="outline-none border-[1px] border-[#7E8082] h-full rounded-[5px] w-full text-xs text-[#AEB2B1] !p-2 font-semibold disabled:bg-gray-300"
            name="phone"
            type="number"
            id="phone"
            value={formik.values.phone}
            onChange={(event) => {
              if (event.target.value.length > 12) {
                formik.handleChange(
                  event.target.value.slice(event.target.value.length - 1)
                );
              } else {
                formik.handleChange(event);
              }
            }}
          />
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-[10px] text-[red] self-start w-[80%] ">
            {formik.errors.phone}
          </p>
        ) : null}
        <p className="text-[12px] font-semibold text-[#7E8082] w-[100%] py-1">
          Password<span className="text-red-500">*</span>
        </p>

        <PasswordInput
          title="Password*"
          name="password"
          inputValue={formik.values.password}
          errorMessage={formik.errors.password}
          onHandleChange={(e) => {
            if (e.target.value.length > 50) {
              formik.handleChange(
                e.target.value.slice(0, e.target.value.length - 1)
              );
            } else {
              formik.handleChange(e);
            }
          }}
          touched={formik.touched.password}
          disabled={
            formik.values.email === ""
              ? formik.values.phone.toString().length < 10
              : !validateEmail(formik.values.email)
          }
        />
        <div ref={captchaEl} id="sign-in-button"></div>
        <Button2
          id="sign"
          title="Register"
          disabled={
            (formik.values.email === ""
              ? formik.values.phone.toString().length < 10
              : !validateEmail(formik.values.email)) ||
            formik.values.password.length < 8 ||
            !validatePassword(formik.values.password)
          }
          onClick={formik.handleSubmit}
        />
        <p className="text-[10px] font-bold text-[#7E8082] mb-2 mt-3">
          Already have an account?
          <span className="mx-2">
            <Link to="/auth/login" className="text-[#9BD9F1]">
              Sign In
            </Link>
          </span>
        </p>
      </div>
      {countryCode && (
        <Portals closeModal={closeCountryModal}>
          <CountryCodeModal
            countryList={countryList}
            setCountryData={setCountryData}
            closeCountryModal={closeCountryModal}
          />
        </Portals>
      )}
      {loading && <Loader />}
    </>
  );
};

export default Signup;
