import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const button = props => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  clicked: PropTypes.any,
};

export default button;
