const initialState = {
    followers: [],
    following: [],
    friends: [],
    profileDetail: {},
    educationDetails: {},
    profile: JSON.parse(localStorage.getItem('profile')) || {},
    userPostsList: [],
    blockedUsers: [],
    privacyDetails: null,
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_FOLLOWING":
        return { ...state, following: action.payload.data };
      case "GET_FOLLOWER":
        return { ...state, followers: action.payload.data };
      case "GET_PROFILE_DETAILS":
        // localStorage.setItem("profileid", action.payload?.data?.id);
       
        return { ...state, profileDetail: action.payload, profile: action.payload.data};
      case "CHECK_FRIENDS":
        console.log(action.payload.data, "CHLKKKKKKKKKKK");
        return {...state, friendDetail: {...state.friendDetail, isFriend: action.payload?.data?.isFriend}}
      case "GET_SCHOOL_DETAIL":
        return { ...state, educationDetails: action.payload };
      case "GET_BLOCKED_USERS":
        return { ...state, blockedUsers: action.payload };
      case "GET_PRIVACY_DETAILS":
        return { ...state, privacyDetails: action.payload };
      case "GET_UG_DEGREE":
        return { ...state, ugdegreeList: action.payload.data};
      case "GET_PG_LIST":
        return { ...state, pgdegreeList: action.payload.data}
      case "GET_USERS_POST":
        return { ...state, userPostsList: action.payload.data}
      case "GET_FRIEND_DETAILS":
        return { ...state, friendDetail: action.payload.data}
      case "INCREASE_COMMENT_COUNT":
          const { userPostList } = state;
          const newData = userPostList?.map((item) => {
            return item?.id === action.payload
              ? { ...item, commentcount: item.commentcount + 1 }
              : item;
          });
          return { ...state, userPostList: newData };
          
          case "INCREASE_LIKE_COUNT":
            const { userPostList: allPost } = state;
            const newPostList = allPost?.map((item) => {
              return item?.id === action.payload
                ? { ...item, likecount: item.likecount + 1, isliked: true }
                : item;
            });
            return { ...state, userPostList: newPostList };

    
            case "DECREASE_LIKE_COUNT":
              const { userPostList: allPostList } = state;
              const desliked = allPostList.map((item) => {
                return item?.id === action.payload
                  ? { ...item, likecount: item.likecount - 1, isliked: false}
                  : item;
              });
              return { ...state, userPostList: desliked };
      default:
        return state;
    }
}

export default profileReducer;