const initialState = {
  userCredential: {},
  isLoggedIn: false,
  loginData: {},
  signupDataList: [],
  otp: "",
  emailExist: {},
  mailSended: {},
  countryList: [],
  isEmailOtp: false,
  isPhoneNo: "",
  isOtpValid: {},
  userInfo:{}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // STORING DATA WHILE SIGNUP
    case "SET_USER_CREDENTIAL":
      return {
        ...state,
        signupData: action.payload,
      };

    case "SET_ALL_SIGNUP_DETAILS":
      return {
        ...state,
        signupDataList: [...action.signupDataList, action.payload],
      };
    case "SETTING_OTP":
      return {
        ...state,
        otp: action.payload,
      };
    case "IS_EMAIL_EXIST":
      return { ...state, emailExist: action.payload };

    case "SET_USER_LOGIN_DATA":
      return { ...state, loginData: action.payload };

    case "LOGIN_SUCCESSFUL":
      return { ...state, isLoggedIn: true };

    case "SENDING_MAIL_FOR_OTP":
      return { ...state, mailSended: action.payload };
    case "SET_USER_DATA":
      return {
        ...state,
          userId: action.payload?.data?.id,
          googleid: action.payload?.data?.googleid,
      };

    case "GET_COUNTRY_LIST":
      return { ...state, countryList: action.payload.data };
    case "GET_STATE_LIST":
      return { ...state, stateList: action.payload.data };
    case "GET_DISTRICT_LIST":
      return { ...state, districtList: action.payload.data };
    case "GET_LOKSABHA_LIST":
      return { ...state, loksabhaList: action.payload.data };
    case "GET_ASSEMBLY_LIST":
      return { ...state, assemblyList: action.payload.data };

    case "OTP_TYPE":
      return { ...state, isEmailOtp: action.payload };

    case "PHONE_NO":
      return { ...state, isPhoneNo: action.payload };

    case "VALID_OTP":
      return { ...state, isOtpValid: action.payload };

    case "USER_INFORMATION":
      return { ...state, userInfo: action.payload, };
    default:
      return state;
  }
};

export default authReducer;
