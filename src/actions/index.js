import * as actionType from "./actionTypes";

//user
export const setUser = user => {
  return {
    type: actionType.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionType.CLEAR_USER
  };
};

//channel

export const setCurrentChanel = channel => {
  return {
    type: actionType.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};
