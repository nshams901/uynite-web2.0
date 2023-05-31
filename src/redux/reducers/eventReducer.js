const initialState = {
  eventData: {},
  total_participant_count: null,
  defaultRootData:{},
  defaultEventData: {},
  allEventsPost: [],
  allTrendingPost:[]
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECIVED_EVENT_DATA":
      return {
        ...state,
        eventData: action.payload.postData,
        total_participant_count: action.payload.total_participant_count,
      };
    case "DEFAULT_ROOT_SCREEN":
      return {
        ...state,
        defaultRootData:action.payload,
      };
    case "DEFAULT_EVENT_SCREEN":
      return {
        ...state,
        defaultEventData: action.payload,
      };

    case "GET_ALL_EVENTS_POST_LIST":
      return {
        ...state,
        allEventsPost: [...state.allEventsPost, action.payload],
      };
    case "TRENDING_EVENTS_POST_LIST":
      return {
        ...state,
        allTrendingPost: [...state.allTrendingPost, action.payload],
      };
    default:
      return state;
  }
};
