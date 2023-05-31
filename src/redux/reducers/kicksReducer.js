const initialState = {
  latestKicks: [],
  trendingKicks: [],
  followingKicks: [],
  comments: [],
  reply: [],
  segment: "Following",
};

const kicksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LATEST_KICKS":
      return { ...state, latestKicks: action.payload.data };
    case "GET_TRENDING_KICKS":
      return { ...state, trendingKicks: action.payload.data };
    case "GET_FOLLOWING_KICKS":
      return { ...state, followingKicks: action.payload.data };

    case "INCREASE_LIKE":
      const { followingKicks, latestKicks, trendingKicks } = state;
      if (state.segment === "Following") {
        const liked = followingKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });

        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKicks, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKicks, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latestKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKicks, content: liked },
        };
      }

    case "INCREASE_LIKE":
      const { followingKicks: followingKick, latestKicks: latestKick, trendingKicks: trendingKick } = state;
      if (state.segment === "Following") {
        const liked = followingKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKick, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKick, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latestKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKick, content: liked },
        };
      }
    case "COMMENTS_LIST":
      return { ...state, comments: action.payload.data };
    case "COMMENTS_REPLY_LIST":
      return { ...state, reply: action.payload.data };
    case "KICKS_SEGMENT":
      return { ...state, segment: action.payload };
    default:
      return state;
  }
};

export default kicksReducer;
