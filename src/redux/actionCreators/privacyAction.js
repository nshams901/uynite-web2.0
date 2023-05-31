import axios from "axios";

export const addProfilePrivacy = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/profile/api/profile/privacy/add`,
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
    const response = axios.post(
      `https://web.uynite.com/friend/api/friend/getblockedlistprofile/${data}`
    );
    dispatch({
      type: "",
      payload: "",
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = (data) => async (dispatch) => {
  const { uemail, oldPassword, newPassword } = data;
  try {
    const response = axios.post(
      `https://web.uynite.com/login/api/user/changepassword/${uemail}/${oldPassword}/${newPassword}`
    );
    dispatch({
      type: "",
      payload: "",
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};

// https://web.uynite.com/profile/api/profile/search/63074634dc8af05b8822b62e/duman
