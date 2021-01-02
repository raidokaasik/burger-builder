import React, {Component} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Layout from "../src/containers/layout/Layout.js";
import BurgerBuilder from "./containers/burgerbuilder/BurgerBuilder";
import MyOrder from "./containers/myorder/Myorder.js";
import Backdrop from "./components/UI/backdrop/BackDrop.js";
import Orders from "./containers/orders/Orders.js";

class App extends Component {
  state = {
    showBackdrop: false,
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Backdrop />
          <Layout>
            {/* <BurgerBuilder /> */}
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder}></Route>
            <Route path="/myorder" component={MyOrder}></Route>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
