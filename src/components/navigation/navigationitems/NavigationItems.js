import React, {Fragment} from "react";
import {NavLink, Route} from "react-router-dom";
import classes from "./NavigationItems.module.css";
import {connect} from "react-redux";

const navigationItems = () => {
  return (
    <Fragment>
      <ul className={classes.navigationItems}>
        <li className={classes.navigationItem}>
          <NavLink activeClassName={classes.active} exact to="/">
            Burger Builder
          </NavLink>
        </li>
        <li className={classes.navigationItem}>
          <NavLink activeClassName={classes.active} exact to="/orders">
            Orders
          </NavLink>
        </li>
        <li className={classes.navigationItem}>
          <NavLink activeClassName={classes.active} exact to="/auth">
            Register
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(navigationItems);
