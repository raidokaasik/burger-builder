import * as actionType from "./actionTypes.js";
import axios from "../../AxiosOrders.js";

export const addIngredient = type => {
  return {
    type: actionType.ADD_INGREDIENT,
    payload: type,
  };
};

export const removeIngredient = type => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    payload: type,
  };
};

const setIngredients = ingredients => {
  return {
    type: actionType.INIT_INGREDIENT,
    payload: ingredients,
  };
};

const reportError = () => {
  return {
    type: actionType.REPORT_ERROR,
  };
};
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://builder-app-9a83c.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(reportError());
      });
  };
};
