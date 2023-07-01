import { sortList } from "../../Components/Utility/utility";

const initialState = {
  usersList: [],
  requestList: [],
  friends: [],
  mutualFriends: [],
  myFriendsList: [],
  friendProfileId: null,
  friendsIds: []
};

const  friendReducer= (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, usersList: action.payload.data };
    case "GET_REQUEST_LIST":
      const data = action.payload.data
      const request = data?.filter(item => item.friend.requesttype !== 'Accepted');
      const sortedRequest = request?.sort(( a, b) => a.profile.fname > b.profile.fname);
      return { ...state, requestList: sortedRequest };
    case "FRIEND_LIST":
      const sorted = action.payload.data?.sort(( a, b) => a.profile.fname > b.profile.fname);
      const friendsIds = action.payload.data.map(( friend) => friend.profile.id );
      return { ...state, friends: sorted, friendsIds: friendsIds };
    case "GET_MUTUAL_FRIEND":
      return { ...state, mutualFriends: action.payload.data };
    case "MY_FRIEND_LIST":
      return { ...state, myFriendsList: action.payload.data };
    case "SET_FRIEND_PROFILE":
      return { ...state, friendProfileId: action.payload };
    default:
      return state;
  }
};

export default friendReducer
