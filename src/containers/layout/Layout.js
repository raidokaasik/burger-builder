import React, {Component, Fragment} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/navigation/toolbar/Toolbar.js";
import SideDrawer from "../../components/navigation/sidedrawer/SideDrawer.js";
import {connect} from "react-redux";

class Layout extends Component {
  state = {
    closeSide: false,
  };

  // Closing function for a Sidedrawer when browser is being resized to small.

  closeSideDrawerHandler = () => {
    return this.setState(preValue => {
      return {closeSide: !preValue.closeSide};
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          menuClick={this.closeSideDrawerHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.closeSide}
          closeSide={this.closeSideDrawerHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

// Redux state

const mapStateToProps = state => {
  return {
    isAuth: state.ath.isAuth,
  };
};

export default connect(mapStateToProps)(Layout);
