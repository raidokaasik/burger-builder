/* eslint-disable default-case */
import * as actionType from "../actions/actionTypes.js";

const initialState = {
  ingredients: null,
  error: null,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
      };
    case actionType.INIT_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
        error: false,
      };
    case actionType.REPORT_ERROR:
      return {
        ...state,
        error: true,
      };
  }
  return state;
};

export default ingredientsReducer;
