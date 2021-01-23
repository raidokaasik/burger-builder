import * as actionType from "./actionTypes.js";
import axios from "../../AxiosOrders.js";

export const orderSubmit = (orderId, orderData) => {
  return {
    type: actionType.ORDER_SUBMIT,
    orderId: orderId,
    orderData: orderData,
  };
};

export const orderFailed = error => {
  return {
    type: actionType.ORDER_FAILED,
    error: error,
  };
};

export const orderSubmitStart = () => {
  return {
    type: actionType.ORDER_SUBMIT_START,
  };
};

export const resetRedirect = () => {
  return {
    type: actionType.RESET_REDIRECT,
  };
};

export const orderSubmitAttempt = orderData => {
  return dispatch => {
    dispatch(orderSubmitStart());
    axios
      .post("/orders.json", orderData)
      .then(res => {
        dispatch(orderSubmit(res.data.name, orderData));
      })
      .catch(error => {
        dispatch(orderFailed(error));
      });
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START,
  };
};
const fetchOrders = data => {
  return {
    type: actionType.FETCH_ORDERS,
    fetchedOrders: data,
  };
};

const fetchOrdersFail = error => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error,
  };
};
export const fetchOrdersAsync = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json?auth=" + token)
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

// DELETE an ORDERs

export const orderDeleteProcessed = orderId => {
  return {
    type: actionType.ORDER_DELETE_PROCESSED,
    deletedOrders: orderId,
  };
};

export const orderDelete = id => {
  return dispatch => {
    //AXIOS DEL here
    axios
      .delete(`/orders/${id}.json`)
      .then(res => {
        dispatch(orderDeleteProcessed(id));
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
