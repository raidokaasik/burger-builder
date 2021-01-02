import React, {Component, Fragment} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/navigation/toolbar/Toolbar.js";
import SideDrawer from "../../components/navigation/sidedrawer/SideDrawer.js";

class Layout extends Component {
  state = {
    closeSide: false,
  };

  closeSideDrawerHandler = () => {
    return this.setState(preValue => {
      return {closeSide: !preValue.closeSide};
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar menuClick={this.closeSideDrawerHandler} />
        <SideDrawer
          open={this.state.closeSide}
          closeSide={this.closeSideDrawerHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
