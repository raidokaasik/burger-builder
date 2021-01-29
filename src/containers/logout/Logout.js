import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreator from "../../redux/actions/actionIndex.js";

class Logout extends Component {
  // Dispatch function is inside componentDidMount, because Logout page exists and when user is redirected to "/logout"
  // it fires this.props.logout() immediately and another redirection follows.

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

// Redux dispatch

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreator.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
