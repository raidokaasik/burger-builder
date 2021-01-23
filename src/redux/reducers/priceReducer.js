/* eslint-disable default-case */
import axios from "../../AxiosOrders.js";
import * as actionType from "../actions/actionTypes.js";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.7,
  bacon: 1,
  meat: 2.3,
};

const initialState = {
  price: 4,
};

const priceReducer = (state = initialState, action) => {
  const oldPrice = state.price;
  switch (action.type) {
    case actionType.ADD_VALUE:
      console.log(state.price);
      return {
        ...state,
        price: oldPrice + INGREDIENT_PRICE[action.payload],
      };
    case actionType.REMOVE_VALUE:
      return {
        ...state,
        price: oldPrice - INGREDIENT_PRICE[action.payload],
      };
    case actionType.RESET_PRICE:
      return {
        price: 4,
      };
  }
  return state;
};

export default priceReducer;
