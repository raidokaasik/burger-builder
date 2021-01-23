import * as actionType from "../actions/actionTypes.js";

const initialState = {
  authData: {},
  loading: false,
  token: null,
  userId: null,
  error: null,
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
        token: action.data.idToken,
        userId: action.data.localId,
      };
    case actionType.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionType.AUTH:
      return {};
    default:
      return state;
  }
};

export default authReducer;
