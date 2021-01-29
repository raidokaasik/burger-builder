import * as actionType from "./actionTypes.js";
import axios from "axios";

// Beginning of authentication. It only displays loading and loading spinner while in process.

const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

// Successful authentication + takes a token and userId as parameters and stores to redux state

export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

// In case of auth failure

const authFail = (error, status) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
    errorStatus: status,
  };
};

// Logging out and removing tokens from redux store and localStore

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTime");
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

// Dynamic path - not working properly.

// export const setAuthRedirect = path => {
//   return {
//     type: actionType.SET_AUTH_REDIRECT,
//     path: path,
//   };
// };

// Checks the Token expiration timer and logs out if time has passed

const checkAuthTimer = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// On page reload check and maintain Token and Authentication if not Expired

export const checkAuthStatus = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const expirationTime = new Date(+localStorage.getItem("expirationTime"));
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logout());
    } else {
      if (expirationTime > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimer(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

// Async Authentication

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
        const expirationTime = new Date().getTime() + res.data.expiresIn * 1000;
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("token", res.data.idToken);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimer(res.data.expiresIn));
      })
      .catch(error => {
        dispatch(
          authFail(
            error.response.data.error.message,
            error.response.data.error.code
          )
        );
      });
  };
};
