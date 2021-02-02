import * as actionType from "./actionTypes.js";
import axios from "../../AxiosOrders.js";

// Adds ingredients to the Burger

export const addIngredient = type => {
  return {
    type: actionType.ADD_INGREDIENT,
    payload: type,
  };
};

// Removes ingredients from the Burger

export const removeIngredient = type => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    payload: type,
  };
};

// SetIngredients gets dispatched when ingredients get fetched from the database. Sets the ingredients to their default value
// during the frontpage loading

const setIngredients = ingredients => {
  return {
    type: actionType.INIT_INGREDIENT,
    payload: ingredients,
  };
};

// Reports errors
const reportError = () => {
  return {
    type: actionType.REPORT_ERROR,
  };
};

// Async fetch of the default ingredients from firebase

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
