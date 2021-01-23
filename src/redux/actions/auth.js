import * as actionType from "./actionTypes.js";
import axios from "axios";

const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = authData => {
  return {
    type: actionType.AUTH_SUCCESS,
    data: authData,
  };
};

const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};
const logout = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

const checkAuthTimer = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, pw, signin) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: pw,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh2XfV1PhekVqmUEdzMTKWap22t5rP5z4";
    if (signin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh2XfV1PhekVqmUEdzMTKWap22t5rP5z4";
    }
    axios
      .post(url, authData)
      .then(res => {
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimer(res.data.expiresIn));
        console.log(res.data);
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};
