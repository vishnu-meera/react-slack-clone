import * as actionType from "../actions/actionTypes";
import { combineReducers } from "redux";
const initialState = {
  currentUser: null,
  isLoading: true
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionType.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

const initialChannelState = {
  currentChannel: null
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;
