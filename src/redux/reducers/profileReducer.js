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
  graduationBranchList: [],
  pgBranchList: []
};


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FOLLOWING":
      return { ...state, following: action.payload.data };
    case "GET_FOLLOWER":
      return { ...state, followers: action.payload.data };
    case "GET_PROFILE_DETAILS":
      // localStorage.setItem("profileid", action.payload?.data?.id);

      return { ...state, profileDetail: action.payload, profile: action.payload.data };
    case "CHECK_FRIENDS":
      return { ...state, friendDetail: { ...state.friendDetail, isFriend: action.payload?.data?.isFriend } }
    case "GET_SCHOOL_DETAIL":
      return { ...state, educationDetails: action.payload };
    case "GET_BLOCKED_USERS":
      return { ...state, blockedUsers: action.payload };
    case "GET_PRIVACY_DETAILS":
      return { ...state, privacyDetails: action.payload };
    case "GET_UG_DEGREE":
      return { ...state, ugdegreeList: action.payload.data };
    case "GET_PG_LIST":
      return { ...state, pgdegreeList: action.payload.data }
    case "GET_USERS_POST":
      return { ...state, userPostsList: action.payload.data }
    case "GET_FRIEND_DETAILS":
      return { ...state, friendDetail: action.payload.data }
    case "INCREASE_COMMENT_COUNT":
      const { userPostsList } = state;
      const newData = userPostsList?.map((item) => {
        return item?.id === action.payload
          ? { ...item, commentcount: item.commentcount + 1 }
          : item;
      });
      return { ...state, userPostsList: newData };

    case "INCREASE_LIKE_COUNT":
      const { userPostsList: allPost } = state;
      const newPostList = allPost?.map((item) => {
        return item?.id === action.payload
          ? { ...item, likecount: item.likecount + 1, isliked: true }
          : item;
      });
      return { ...state, userPostsList: newPostList };

    case "DECREASE_LIKE_COUNT":
      const { userPostsList: allPostList } = state;
      const desliked = allPostList.map((item) => {
        return item?.id === action.payload
          ? { ...item, likecount: item.likecount - 1, isliked: false }
          : item;
      });
      return { ...state, userPostsList: desliked };

    case "ADD_POST_LIKE":
      const { userPostsList: allPostLists } = state
      const resp = action.payload.data
      const list = allPostLists.map((post) => post.id === resp.postid ? { ...post, likeid: resp.id } : post)
      return {
        ...state,
        userPostsList: list
      }

    case "GET_GRADUATION_BRANCH":
      return { ...state, graduationBranchList: action.payload.data }

    case "GET_PG_BRANCH":
      return { ...state, pgBranchList: action.payload.data }
    default:
      return state;
  }
}

export default profileReducer;