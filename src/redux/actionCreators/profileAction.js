import axios from "axios";
import { getUserDataFromLocalStorage } from "../../Components/Utility/utility";
import { config } from "../../config/config";

export const getProfileById = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("userCredential")).token;
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/profile/profilebyuser/${data}`,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("profile", JSON.stringify(response?.data?.data));
    console.log(response.data, "<<<<<<<<<<????????");
    dispatch({
      type: "GET_PROFILE_DETAILS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFriendProfile = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("userCredential")).token;
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/profile/${data}`,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "<<<<<<<<<<");
    dispatch({
      type: "GET_FRIEND_DETAILS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostProfile = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("userCredential")).token;
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/profile/${data}`,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "<<<<<<<<<<");
    dispatch({
      type: "GET_POST_PROFILE",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProfileDetails = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("userCredential")).token;
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/profile/${data}`,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "<<<<<<<<<<");
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const addProfile= (data) => async (dispatch) => {
//     try{
//         const response = await axios.get(`${config.API_URI}api/profile/profilebyuser/${data}`,
//            {
//         headers: {
//           "Accept-Language": "us",
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${getUserDataFromLocalStorage().token}`
//         },
//       })        ;
//         console.log(response);
//         dispatch({
//             type: 'GET_PROFILE_DETAILS',
//             payload: response.data
//         })
//     }catch(error){

//         throw error
//     }
// }

export const getFollowing = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/follow/following/${data}`
    );
    dispatch({
      type: "GET_FOLLOWING",
      payload: response.data,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getFollower = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/follow/follower/${data}`,
      {
        headers: {
          "Accept-Language": "us",
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${getUserDataFromLocalStorage().token}`
        },
      }
    );
    dispatch({
      type: "GET_FOLLOWER",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlockedList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/friend/getblockedlistprofile/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getBlockedProfile = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/friend/getblockedlistprofile/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const checkFriend = (data) => async (dispatch) => {
  const { ownProfileId, othersProfileId } = data;
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/friend/chkfriends/${ownProfileId}/${othersProfileId}`
    );
    console.log(response, "CHKKKKKKKKKKKK");
    dispatch({
      type: "CHECK_FRIENDS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getPrivacyDetail = (data) => async (dispatch) => { 
  const othersId = data;
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/profile/privacy/${othersId}`
    );
    console.log(response?.data, 'P R I V A C Y TYPE');
    dispatch({
      type: "GET_PRIVACY_DETAILS",
      payload: response?.data?.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getFRlist = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/friend/getprofileidwithdetail/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const checkFollowing = (data) => async (dispatch) => {
  const { ownProfileId, othersProfileId } = data;
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/follow/followyesno/${ownProfileId}/${othersProfileId}`
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const startFollowing = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}friend/api/follow/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/profile/update`,
      data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ------------- Education api ----------------------------

export const addGraduation = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/graduation/addgraduations`,
      data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGraduationList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/graduation/graduation`
    );
    console.log(response);
    dispatch({
      type: "GET_UG_DEGREE",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const graduationBranch = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/graduation/graduations/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_GRADUATION_BRANCH",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addPg = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/pg/addpostgraduation`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
export const getPgList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/pg/postgraduation`
    );
    console.log(response);
    dispatch({
      type: "GET_PG_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const pgBranch = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/pg/postgraduation/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_PG_BRANCH",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addEducation = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/education/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
export const updateEducation = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/education/update`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEducationDetail = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/education/educationbyuser/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_SCHOOL_DETAIL",
      payload: response.data.data,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileByEducation = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/education/searchby/schooladd`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

// ---------------------- get friends api ---------------------------
export const getSchoolmet = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/education/getschoolfriends`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getUGfriends = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}profile/api/education/getugfriends`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
export const getPGfriends = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}profile/api/education/getpgfriends`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

// ${config.API_URI}instance/api/instancepost/getbyid/60881f9260d72c36923811ae
// export const = (data) => async (dispatch) => {
//     try{
//         const response = await axios.get(``);
//         console.log(response);
//         dispatch({
//             type: '',
//             payload: response.data
//         })
//     }catch(error){
//         throw error
//     }
// }
