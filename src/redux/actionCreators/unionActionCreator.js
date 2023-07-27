import axios from "axios";
import { config } from "../../config/config";

export const addUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}friend/api/group/add`,
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

export const getUnionList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/partOfGroup/${data}`
    );
    dispatch({
      type: "UNION_LIST",
      payload: response.data,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getMyUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/getGroups/${data}`
    );
    dispatch({
      type: "GET_MY_UNION",
      payload: response.data,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getUnions = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/getGroups/${data}`
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

export const getUnionMembers = (data) => async (dispatch) => {
  // GET http://3.233.82.34:8080/friend/api/group/getFriends/6491c1f30e83591195655221
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/getFriends/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_UNION_MEMBER",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const inviteMember = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${config.API_URI}friend/api/group/addInGroup`,
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

export const removeUserFromUnion = (data) => async (dispatch) => {
  const { groupId, profileId } = data;
  try {
    const response = await axios.delete(
      `${config.API_URI}friend/api/group/deleteFromGroup/${groupId}/${profileId}`
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

export const getInviteeList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/getInvitedMembers/${data}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${config.API_URI}friend/api/group/deleteGroup/${data}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelInvitation = (data) => async (dispatch) => {
  const { groupId, profileId } = data;
  try {
    const response = await axios.get(
      `${config.API_URI}friend/api/group/deleteFromGroup/${groupId}/${profileId}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const exitFromUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${config.API_URI}friend/api/group/exitGroup`, data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};



export const getPartOfUnions = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://3.233.82.34:8080/friend/api/group/partOfGroup/${data}`
    );
    dispatch({
      type: "GET_PART_OF_UNIONS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};