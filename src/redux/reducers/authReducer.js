const initialState = {
  signupData: {},
  isLoggedIn: false,
  loginData: {},
  signupDataList: [],
  otp: "",
  emailExist: {},
  mailSended: {},
  countryList: [],
  isEmailOtp:false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // STORING DATA WHILE SIGNUP
    case "SET_BASIC_SIGNUP_DETAILS":
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
      // console.log(state, '------------SSSSSSSSSSSS');
      return { ...state, isLoggedIn: true };

    case "SENDING_MAIL_FOR_OTP":
      return { ...state, mailSended: action.payload };
    case "SET_USER_DATA":
      console.log("set user id", action.payload);
      return {
        ...state,
        signupData: {
          ...state.signupData,
          userId: action.payload?.data?.id,
          googleid: action.payload?.data?.googleid,
        },
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
      console.log("Action.PAylaod isEmailOtp++++", action.payload);
      return { ...state, isEmailOtp: action.payload };
    default:
      return state;
  }
};

export default authReducer;
