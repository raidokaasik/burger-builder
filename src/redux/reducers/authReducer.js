import * as actionType from "../actions/actionTypes.js";

const initialState = {
  authData: {},
  loading: false,
  token: null,
  userId: null,
  error: null,
  isAuth: false,
  errorStatus: null,
  setRedirect: "/",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        loading: true,
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        userId: action.userId,
        isAuth: true,
      };
    case actionType.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuth: false,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        isAuth: false,
      };
    // case actionType.AUTH:
    //   return {};
    case actionType.SET_AUTH_REDIRECT:
      return {
        ...state,
        setRedirect: action.path,
      };
    default:
      return state;
  }
};

export default authReducer;
