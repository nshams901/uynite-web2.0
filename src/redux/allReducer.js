import { combineReducers } from "redux"
import userReducer from "./reducers/userReducer";
import authReducer from './reducers/authReducer';
import postReducer from "./reducers/postReducer";
import profileReducer from "./reducers/profileReducer";
import friendReducer from "./reducers/friendReducer";
import kicksReducer from "./reducers/kicksReducer";
import umeetReducer from "./reducers/umeetReducer";
import { eventReducer } from './reducers/eventReducer';
import unionReducer from "./reducers/unionReducer";
import rootsReducer from './reducers/rootsReducer';
import settingReducer from './reducers/settingsReducer';
import { chatReducer } from "./reducers/chatReducer";


const allReducer = combineReducers({
  userReducer,
  authReducer,
  eventReducer,
  postReducer,
  rootsReducer,
  profileReducer,
  friendReducer,
  kicksReducer,
  unionReducer,
  umeetReducer,
  settingReducer,
  chatReducer,
});


export default allReducer;