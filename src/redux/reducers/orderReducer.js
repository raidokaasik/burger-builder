import * as actionType from "../actions/actionTypes.js";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  errors: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ORDER_SUBMIT_START:
      return {
        ...state,
        loading: true,
      };

    case actionType.ORDER_SUBMIT:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionType.ORDER_FAILED:
      return {
        ...state,
      };
    case actionType.RESET_REDIRECT:
      return {
        ...state,
        purchased: false,
      };
    case actionType.FETCH_ORDERS:
      return {
        ...state,
        loading: false,
        errors: null,
        orders: action.fetchedOrders,
      };
    case actionType.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.error,
      };
    case actionType.ORDER_DELETE_PROCESSED:
      const copyOrders = [...state.orders];
      const newOrders = copyOrders.filter(item => item.id !== action.orderId);
      console.log(newOrders);
      return {
        ...state,
        orders: newOrders,
      };
    default:
      return state;
  }
};

export default orderReducer;
