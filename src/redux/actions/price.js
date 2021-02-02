import * as actionType from "./actionTypes.js";

// Adds component value to the initial price

export const addValue = type => {
  return {
    type: actionType.ADD_VALUE,
    payload: type,
  };
};

// Removes component value from the initial price

export const removeValue = type => {
  return {
    type: actionType.REMOVE_VALUE,
    payload: type,
  };
};

// Resets the price after order has been successful

export const resetPrice = () => {
  return {
    type: actionType.RESET_PRICE,
  };
};
