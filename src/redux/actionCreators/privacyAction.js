import axios from "axios";
import { config } from "../../config/config";

export const addProfilePrivacy = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/profile/privacy/add`,
      data
    );
    console.log("addProfilePrivacy", response);
    dispatch({
      type: "",
      payload: response?.data,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getBlockedUser = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/friend/getblockedlistprofile/${data}`
    );
    console.log(response?.data?.data, 'blockedUsers')
    dispatch({
      type: "GET_BLOCKED_USERS",
      payload: response?.data?.data,
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = (data) => async (dispatch) => {
  const { uemail, confirmPassword, newPassword } = data;
  try {
    const response = axios.post(
      `${config.API_URI}login/api/user/changepassword/${uemail}/${newPassword}/${confirmPassword}`
    );
    dispatch({
      type: "",
      payload: "",
    });
    console.log("sucess______=======",response);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const checkOldPassword = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://3.233.82.34:8080/api/user/authenticate`,
      data
    );
    dispatch({
      type: "",
      payload: "",
    });
    console.log("suhgiuehieur", response);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

