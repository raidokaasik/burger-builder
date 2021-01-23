import * as actionType from "./actionTypes.js";

export const addValue = type => {
  return {
    type: actionType.ADD_VALUE,
    payload: type,
  };
};

export const removeValue = type => {
  return {
    type: actionType.REMOVE_VALUE,
    payload: type,
  };
};

export const resetPrice = () => {
  return {
    type: actionType.RESET_PRICE,
  };
};
