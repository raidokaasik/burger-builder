import React, {Component} from "react";
import {Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreator from "./redux/actions/actionIndex.js";
import Layout from "../src/containers/layout/Layout.js";
import BurgerBuilder from "./containers/burgerbuilder/BurgerBuilder";
// import MyOrder from "./containers/myorder/Myorder.js";
import Backdrop from "./components/UI/backdrop/BackDrop.js";
// import Orders from "./containers/orders/Orders.js";
// import Auth from "./containers/auth/Auth.js";
import Logout from "./containers/logout/Logout.js";
import asyncComponent from "./hoc/asyncComponent.js";

const asyncOrders = asyncComponent(() =>
  import("./containers/orders/Orders.js")
);
const asyncMyorder = asyncComponent(() =>
  import("./containers/myorder/Myorder.js")
);
const asyncAuth = asyncComponent(() => import("./containers/auth/Auth.js"));

class App extends Component {
  state = {
    showBackdrop: false,
  };

  componentDidMount() {
    this.props.authChecker();
  }

  render() {
    // unAuth users cannot visit orders or myorders page

    return (
      <div>
        <Backdrop />
        <Layout>
          {this.props.isAuth ? (
            <Route exact path="/logout" component={Logout} />
          ) : null}
          <Route exact path="/auth" component={asyncAuth} />
          {this.props.isAuth ? (
            <Route exact path="/orders" component={asyncOrders} />
          ) : null}
          <Route exact path="/" component={BurgerBuilder}></Route>
          {this.props.isAuth ? (
            <Route path="/myorder" component={asyncMyorder}></Route>
          ) : null}
          <Redirect to="/" />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.ath.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authChecker: () => dispatch(actionCreator.checkAuthStatus()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
