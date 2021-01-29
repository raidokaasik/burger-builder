import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";
import classes from "./NavigationItems.module.css";
import {connect} from "react-redux";

const navigationItems = props => {
  return (
    <Fragment>
      <ul className={classes.navigationItems}>
        <li className={classes.navigationItem}>
          <NavLink activeClassName={classes.active} exact to="/">
            Burger Builder
          </NavLink>
        </li>
        {props.isAuth && (
          <li className={classes.navigationItem}>
            <NavLink activeClassName={classes.active} exact to="/orders">
              Orders
            </NavLink>
          </li>
        )}
        <li className={classes.navigationItem}>
          {props.isAuth ? (
            <NavLink activeClassName={classes.active} exact to="/logout">
              Logout
            </NavLink>
          ) : (
            <NavLink activeClassName={classes.active} exact to="/auth">
              Authentication
            </NavLink>
          )}
        </li>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(navigationItems);
