const initialState = {
    activeUser: {}
};

export const chatReducer = ( state = initialState, action) => {
    switch (action.type){
        case "ACTIVE_CHAT_USER":
            return { ...state, activeUser: action.payload};
        
        default:
            return state
    }
}