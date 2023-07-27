import axios from "axios";
import { getQueryParams } from "../../Components/Utility/utility";
import { config } from "../../config/config";

export const createPost = (postData) => async (dispatch) => {
  const postDataResult = await axios.post(
    "${config.API_URI}post/api/post/add",
    postData,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  console.log("postDataResult", postDataResult);
  dispatch({
    type: "SET_POST_DATA",
    payload: postDataResult.data,
  });
  return postDataResult;
};

export const updatePost = (postData) => async (dispatch) => {
  const postDataResult = await axios.put(
    `${config.API_URI}post/api/post/updatePost`,
    postData,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  console.log("postDataResult", postDataResult);
  dispatch({
    type: "SET_POST_DATA",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};

export const getPostHistory = (postData) => async (dispatch) => {
  const postDataResult = await axios.get(
    `${config.API_URI}post/api/post/posthistory/${postData}`,
    postData,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  console.log("postDataResult", postDataResult);
  dispatch({
    type: "GET_POST_HISTORY",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};

export const getHistory = (postData) => async (dispatch) => {
  const postDataResult = await axios.get(
    `${config.API_URI}post/api/post/posthistory/${postData}`,
    postData,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  dispatch({
    type: "",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};

export const getPostLike = (postid, params) => async (dispatch) => {
  const postDataResult = await axios.get(
    `${config.API_URI}post/api/like/${postid}?${getQueryParams(params)}`,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  console.log("postDataResult", postDataResult);
  dispatch({
    type: "",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};


export const getPostById = (postid) => async (dispatch) => {
  const postDataResult = await axios.get(
    `${config.API_URI}post/api/post/getbyid/${postid}`,
    {
      headers: {
        "Accept-Language": "en",
        // "Authorization" : `Bearer ${postData.token}`
      },
    }
  );
  
  dispatch({
    type: "",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};

export const sharePost = (data) => async (dispatch) => {
  const postDataResult = await axios.post(
    `${config.API_URI}post/api/share/add`, data,
  );
  
  dispatch({
    type: "",
    payload: postDataResult.data,
  });
  return postDataResult.data;
};

export const setLikes = (likeObject) => (dispatch) => {
  dispatch({
    type: "SET_LIKES_DATA",
    payload: likeObject,
  });
};


