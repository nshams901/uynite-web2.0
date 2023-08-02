import axios from "axios";
import { getUserDataFromLocalStorage } from "../../Components/Utility/utility";
import { getQueryParams } from "../../Components/Utility/utility";
import { config } from "../../config/config";

// -----------------------------------------------FOR ALL POST RELATED API------------------------------------------------------------

// GET KICKS VIDEOS WITH LIMITS
export const getKicksVideosWithLimit = (data) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const getAllKicksVideos = await axios.post(
      `${config.API_URI}instance/api/fetch/kicks?&index=0&size=10`,
      data,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_ALL_KICKS_VIDEOS_WITH_LIMITS",
      payload: getAllKicksVideos?.data?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// GET POST BY POST ID
export const getAllPostWithLimit = (profileId, params) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const getAllPost = await axios.post(
      `${config.API_URI}post/api/v2/fetch/home/posts/${profileId}?index=0&size=10`,
      {},
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_POST_LIST",
      payload: getAllPost?.data,
    });
    return getAllPost.data;
  } catch (error) {
    console.log(error.message);
  }
};

// GET POST BY POST ID
export const getPostByPostId = (postId) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const getPostbyid = await axios.get(
      `${config.API_URI}post/api/post/getpostbypostid/${postId}`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_POST_BY_POST_ID",
      payload: getPostbyid?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostList = (data) => async (dispatch) => {
  const getStoredData = await getUserDataFromLocalStorage();
  try {
    const response = await axios.get(
      `${config.API_URI}post/api/post/getposts/${data}`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_POST_LIST",
      payload: response.data,
    });
  } catch (err) {
    throw err;
  }
};

// ADD ALL POST COMMENTS
export const addCommentOnPost = (commentDetails) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const getCommentResult = await axios.post(
      `${config.API_URI}post/api/comment/add`,
      commentDetails,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("getCommentResult", getCommentResult);
    dispatch({
      type: "GET_POST_BY_POST_ID",
      payload: getCommentResult?.data,
    });
    return getCommentResult.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentByPostid = (data, payload) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}post/api/comment/${data}?${getQueryParams(
        payload
      )}`,
      payload
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

// GET POST HISTORY
export const getPostHistoryByPostId = (postId) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const getPostHistory = await axios.get(
      `${config.API_URI}post/api/post/posthistory/${postId}`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("getPostHistory", getPostHistory);
    dispatch({
      type: "GET_POST_HISTORY_BY_POST_ID",
      payload: getPostHistory?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// SET POST REPORT
export const setPostReport = (reportResult) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const postReportResult = await axios.post(
      `${config.API_URI}post/api/post/report`,
      reportResult,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("postReportResult", postReportResult);
    dispatch({
      type: "POST_REPORT",
      payload: postReportResult?.data,
    });
    return postReportResult.data;
  } catch (error) {
    throw error;
    console.log(error.message);
  }
};

// GET LIKES INCRESED BY POST ID PROFILE ID
export const getLikesById = (postDetails) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const likesResult = await axios.post(
      `${config.API_URI}post/api/like/add`,
      postDetails,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("likesResult", likesResult);
    dispatch({
      type: "ADD_POST_LIKE",
      payload: likesResult?.data,
    });
    return likesResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// GET LIKES DECREASE BY POST ID PROFILE ID
export const decreaseLikeByLikeId = (profileId, likeId) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const disLikesResult = await axios.delete(
      `${config.API_URI}post/api/like/dislike/${profileId}/${likeId}`,

      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("disLikesResult", disLikesResult);
    dispatch({
      type: "DECREASE_LIKE_BY_LIKE_ID",
    });
    return disLikesResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// -----------------------------------------------FOR POST MADE BY USER RELATED API------------------------------------------------------------

// export const getLikesByUserOnPost = (profileid, postid) => async (dispatch) => {
//   try {
//     const getStoredData = await getUserDataFromLocalStorage();
//     const likesResult = await axios.get(
//       `${config.API_URI}post/api/like/add`,
//       reportResult,
//       {
//         headers: {
//           "Accept-Language": "en",
//           Authorization: `Bearer ${getStoredData?.token}`,
//         },
//       }
//     );
//     console.log("likesResult", likesResult);
//     dispatch({
//       type: "POST_REPORT",
//       payload: likesResult?.data,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// -----------------------------------------------IMAGE UPLOAD BY USER RELATED API------------------------------------------------------------

//SINGLE IMAGE UPLOAD API
export const imageUploadApi = (file) => async (dispatch) => {
  try {
    //
    console.log("Files", config.UPLOAD_URI);
    const getStoredData = await getUserDataFromLocalStorage();
    const body = { file: file };
    const getUploadedResult = await axios.post(
      `${config.UPLOAD_URI}`,
      body,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("getUploadedResult", getUploadedResult);
    dispatch({
      type: "GET_IMAGE_UPLOAD",
    });

    return getUploadedResult?.data;
  } catch (error) {
    return error;
  }
};

//MULTIPLE IMAGE UPLOAD API
export const multipleImageUpload = (image) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const multipleImageResult = await axios.post(
      `${config.API_URI}fileservice/files`,
      image,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_IMAGE_UPLOAD",
      payload: multipleImageResult,
    });
    return multipleImageResult;
  } catch (error) {
    console.log(error.message);
  }
};

//GET LIST OF IMAGES BY PROFILE ID AND PROFILE TYPE (DOUBT IN URL)
export const getListOfImagesByPiPT = () => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    // doubt in this api
    const getImageListResult = await axios.get(
      `http://35.183.76.174:9098/post/api/image/getbyid/${profileid}/${profiletype}`,
      image,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_LIST_OF_IMAGE_UPLOAD",
      payload: getImageListResult,
    });
    return getImageListResult;
  } catch (error) {
    console.log(error.message);
  }
};

//ADD IMAGE USING PROFILE ID  (DOUBT IN URL WHERE to pass profile id or params to send)
export const addImageByProfileId = () => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    // doubt in this api also
    const addImageResult = await axios.post(
      `http://35.183.76.174:9098/post/api/image/add`,
      image,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "ADD_IMAGE_BY_PROFILE_ID",
      payload: addImageResult?.data,
    });
    return addImageResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// -----------------------------DELETE API-----------------------------

//DELETE POST BY PROFILE AND POST ID

export const deletePostByPostId = (profileId, postId) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const deletePostResult = await axios.delete(
      `${config.API_URI}post/api/post/deletePost/${profileId}/${postId}`,

      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("deletePostResult", deletePostResult);
    dispatch({
      type: "DELETE_POST_BY_POST_ID",
      // payload: deletePostResult?.data,
    });
    return deletePostResult.data;
  } catch (error) {
    console.log(error.message);
  }
};

// -----------------------UNION LIST API---------------------------
//

export const getUnionListByProfileId = (profileId) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const getUnionListResult = await axios.get(
      `${config.API_URI}friend/api/group/getGroups/${profileId}`,

      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "GET_UNION_LIST_BY_PROFILE_ID",
      payload: getUnionListResult?.data,
    });
    return getUnionListResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getInstancePost = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}instance/api/instancepost/getbyid/${data}`
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

export const getPostById = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}post/api/post/getbyid/${data}`
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

export const getUserPostsList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}post/api/post/getposts/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_USERS_POST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getImageList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}post/api/image/getbyid/ids/profile`
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

// add reply comments by
export const addCommentReplyOnRoots =
  (commentReplyDetails) => async (dispatch) => {
    try {
      const getCommentReplyResult = await axios.post(
        `${config.API_URI}/api/reply/add`,
        commentReplyDetails,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      dispatch({
        type: "COMMENTS_REPLY_LIST",
        payload: getCommentReplyResult?.data,
      });
      return getCommentReplyResult?.data;
    } catch (error) {
      throw error;
    }
  };

export const getCommentReplyOnRoots = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}/api/reply/${data}`
    );
    dispatch({
      type: "COMMENTS_REPLY_LIST",
    });
  } catch (error) {
    throw error;
  }
};

export const addPostReply = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}post/api/reply/add`,
      data
    );
    dispatch({
      type: "ADD_REPLY",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
