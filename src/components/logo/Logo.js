import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
import PropTypes from "prop-types";

const logo = props => {
  return (
    <div className={classes.logo} style={{height: props.height}}>
      <img src={burgerLogo} alt="my burger"></img>
    </div>
  );
};

logo.propTypes = {
  height: PropTypes.string,
};

export default logo;
