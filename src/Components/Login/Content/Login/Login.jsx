import React, { useRef, useState } from "react";
import { Link } from "react-router-dom"; // import the Link component
import Input from "../InputBox/Input";
import Heading from "../Heading/Heading";
import PasswordInput from "../InputBox/PasswordInput";
import Button2 from "../Button/Button2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { settingUserLoginData } from "../../../../redux/actionCreators/userActionCreator";
import { useDispatch, useSelector } from "react-redux";
import textLogo from "./textLogo.png";
import {
  checkingIsEmailExist,
  loginUser,
  otpType,
  sendingMailForOtp,
  settingOtp,
} from "../../../../redux/actionCreators/authActionCreator";
import { setDataOnStorage, toasterFunction } from "../../../Utility/utility";
// import { auth } from "../../../../config/firebase";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";
import getErrorMessage from "../../../Utility/firbaseError";
import { getProfileById } from "../../../../redux/actionCreators/profileAction";
import axios from "axios";
import Loader from "../../../common/Loader";
// import { sendOTP } from "./firebase";
// import { onSignInSubmit } from "./firebase_login";

const Login = () => {
  const captchaEl = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
  const phoneNumberRules = /[0-9]{10}$/;
  const [loading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };

  const validatePhone = (phone) => {
    return Yup.number()
      .integer()
      .positive()
      .test((phone) => {
        return phone &&
          phone.toString().length >= 8 &&
          phone.toString().length <= 14
          ? true
          : false;
      })
      .isValidSync(phone);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        // .required("Required")
        .test("email", "Email / Phone is invalid", (value) => {
          return validateEmail(value) || validatePhone(parseInt(value ?? "0"));
        }),

      password: Yup.string()
        .min(
          8,
          "Password should be minimum of 8 length characters with one numerical value"
        )
        .matches(passwordRules, {
          message:
            "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit",
        }),
      // .required("Required"),
    }),
    onSubmit: async (e) => {
      const email = formik.values.email || formik.values.phone;
      const password = formik.values.password;
      // setIsLoading(true);

      const isExist = await dispatch(checkingIsEmailExist(email));
      if (!isExist.status) {
        setIsLoading(false);
        return toast.error("Your email/phone is not registered with us");
      }
      try {
        const userResponse = await dispatch(
          loginUser({ uemail: email, password: password })
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userResponse?.data?.loginToken}`;
        axios.defaults.headers.common["Content-Type"] = "application-json";
        axios.defaults.headers.common["Accept-Language"] = "en";
        // const profile = await dispatch(getProfileById(userResponse?.data?.id))
        if (!userResponse?.status) {
          setIsLoading(false);
          toast.error(userResponse.message);
          return userResponse?.message;
        }
        setIsLoading(false);
        toast.success(userResponse?.message);
        const userCredential = {
          uemail: email,
          isLoggedIn: userResponse?.data?.loginToken ? true : false,
          token: userResponse?.data?.loginToken,
          id: userResponse?.data?.id,
          // profileid: profile?.id
        };
        dispatch(getProfileById(userResponse?.data?.id));
        await setDataOnStorage(userCredential);
        setIsLoading(false);
        navigate("/select");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onForgetPasswordClick = async () => {
    dispatch(settingOtp(""));
    setIsLoading(true);
    let email = formik.values.email;
    if (validateEmail(email)) {
      dispatch(otpType(true));
    } else {
      dispatch(otpType(false));
    }
    if (email.trim() === "") {
      setIsLoading(false);
      return toasterFunction("Please Enter Email");
    }
    const mailStatus = await dispatch(checkingIsEmailExist(email));
    if (!mailStatus.status) {
      setIsLoading(false);
      return toasterFunction(
        "Entered email/phone number is not registered with us"
      );
    }
    const data = {
      datetime: Date.now().toString(),
      uemail: mailStatus.data.uemail,
    };
    // sendOTP(formik.values.email)
    if (phoneNumberRules.test(formik.values.email)) {
      signIn(
        formik?.values.phone?.startsWith("91") ||
          formik?.values.phone?.startsWith("+91")
          ? formik.values.email
          : `+91${formik.values.email}`
      );
    } else {
      const otpStatus = await dispatch(sendingMailForOtp(data));
      if (!otpStatus.status) {
        setIsLoading(false);
        return toasterFunction(otpStatus.message);
      }
      navigate("/auth/entercode");
      toasterFunction(otpStatus.message);
    }
  };

  function configureRecaptcha(phoneNumber, auth) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // signIn(phoneNumber);
        },
      },
      auth
    );
  }

  function signIn(phoneNumber) {
    const auth = getAuth();
    try {
      configureRecaptcha(phoneNumber, auth);
      // setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err, "captcha error");
    }

    // const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        captchaEl.current.innerHTML = "";
        navigate("/auth/entercode");
        setIsLoading(false);
      })
      .catch((err) => {
        captchaEl.current.innerHTML = "";
        setIsLoading(false);
        toast.error(err.message);
      });
  }

  const handleClick = (event) => {
    setProfileType(event.target.id);
  };
  // function checkUserExist(email) {
  //   if (email) {
  //     return dispatch(checkingIsEmailExist(email)).then((res) => {
  //       if (res?.data?.id) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // }

  const validatePassword = (password) => {
    return passwordRules.test(password);
  };
  return (
    <>
      {/* padding increased */}
      <div className="lg:w-full h-full rounded-[20px] flex flex-col justify-center items-center gap-2 px-7 py-4 sm:py-8">
        <div id="sign-in"></div>
        {/* <Heading title="Get Started" /> */}
        <img src={textLogo} alt="" className="w-[50%] mb-4" />
        <Input
          title="Email/Phone number*"
          name="email"
          inputValue={formik.values.email}
          errorMessage={formik.errors.email}
          touched={formik.touched.email}
          onHandleChange={(e) => {
            if (e.target.value.length > 32) {
              formik.handleChange(
                e.target.value.slice(0, e.target.value.length - 1)
              );
            } else {
              formik.handleChange(e);
            }
          }}
          className="w-full"
        />
        <PasswordInput
          title="Password*"
          name="password"
          inputValue={formik.values.password}
          onHandleChange={(e) => {
            if (e.target.value.length > 50) {
              formik.handleChange(
                e.target.value.slice(0, e.target.value.length - 1)
              );
            } else {
              formik.handleChange(e);
            }
          }}
          errorMessage={formik.errors.password}
          touched={formik.touched.password}
          className="w-full"
        />
        {/* font wight changed */}
        <div className="w-full">
          <div className="text-xs font-bold mb-2">
            <div
              className="text-xs font-semibold mb-2 py-1 cursor-pointer text-[#7991BD]"
              onClick={onForgetPasswordClick}
            >
              Forgot password ?
            </div>
          </div>
          <Button2
            title="Sign In"
            className="w-full"
            onClick={formik.handleSubmit}
            disabled={
              formik.values.email === "" ||
              formik.values.password.length < 8 ||
              !validatePassword(formik.values.password)
            }
          />
          {/* color of text changed */}
          <p className="text-xs font-bold text-gray-500 mt-4 text-center">
            Don't have an account?
            <Link to="/auth/signup" className="text-[#7991BD] ml-2">
              Sign Up
            </Link>
          </p>
        </div>
        <div ref={captchaEl} id="sign-in-button"></div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default Login;
