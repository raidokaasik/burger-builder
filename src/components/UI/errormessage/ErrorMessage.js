import React from "react";
import classes from "./ErrorMessage.module.css";

const errorMessage = props => {
  return <div className={classes.errorMessage}>{props.children}</div>;
};

export default errorMessage;
