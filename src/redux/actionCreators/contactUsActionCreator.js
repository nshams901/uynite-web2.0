import axios from "axios";
import { config } from "../../config/config";

export const addContactDetails = (data) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const eventResult = await axios.post(
      `${config.API_URI}post/api/post/add`,
      data,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "ADD_EVENT_POST_DATA",
    });
    return eventResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};
