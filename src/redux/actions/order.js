import * as actionType from "./actionTypes.js";
import axios from "../../AxiosOrders.js";

// Succesful Order Submit. Gets Id and Data as a payload from the async function and saves them to Redux store.

export const orderSubmit = (orderId, orderData) => {
  return {
    type: actionType.ORDER_SUBMIT,
    orderId: orderId,
    orderData: orderData,
  };
};

// Ordering has failed.

export const orderFailed = error => {
  return {
    type: actionType.ORDER_FAILED,
    error: error,
  };
};

// Starting to submit a new order. Shows loading and a spinner while at it.

export const orderSubmitStart = () => {
  return {
    type: actionType.ORDER_SUBMIT_START,
  };
};

// Resets the Purchasing state

export const resetPurchasing = () => {
  return {
    type: actionType.RESET_PURCHASING,
  };
};

// Submitting a new order to the database. Gets the filled order, with ingredients, price and customer data.

export const orderSubmitAttempt = (orderData, token) => {
  return dispatch => {
    dispatch(orderSubmitStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        dispatch(orderSubmit(res.data.name, orderData));
      })
      .catch(error => {
        dispatch(orderFailed(error));
      });
  };
};

// Initiates fetching and shows loading + spinner, while at it.

const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START,
  };
};

// Fetch orders is dispatched inside async function and gets res.data as a payload from AXIOS request

const fetchOrders = data => {
  return {
    type: actionType.FETCH_ORDERS,
    fetchedOrders: data,
  };
};

// Fetching orders failed. Gets and Error object as a param

const fetchOrdersFail = error => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error,
  };
};

// Fetching orders for a logged in user and dispatching the DATA with fetchOrders, which stores the orders to Redux store

export const fetchOrdersAsync = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const params =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + params)
      .then(res => {
        const fetchedData = [];
        for (let i in res.data) {
          fetchedData.push({
            id: i,
            ...res.data[i],
          });
        }
        dispatch(fetchOrders(fetchedData));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};

// DELETE an ORDER

const orderDeleteStart = () => {
  return {
    type: actionType.ORDER_DELETE_START,
  };
};

// Order has been

export const orderDeleteProcessed = orderId => {
  return {
    type: actionType.ORDER_DELETE_PROCESSED,
    deletedOrders: orderId,
  };
};

//Order delete start + loading spinner
export const orderDelete = (id, token) => {
  return dispatch => {
    dispatch(orderDeleteStart());
    //AXIOS DEL here
    axios
      .delete(`/orders/${id}.json`)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };
};
