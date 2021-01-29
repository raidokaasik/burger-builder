import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ingredientsReducer from "./redux/reducers/ingredientsReducer.js";
import priceReducer from "./redux/reducers/priceReducer.js";
import orderReducer from "./redux/reducers/orderReducer.js";
import authReducer from "./redux/reducers/authReducer.js";
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const rootReducer = combineReducers({
  ath: authReducer,
  ordr: orderReducer,
  ingrd: ingredientsReducer,
  prc: priceReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
