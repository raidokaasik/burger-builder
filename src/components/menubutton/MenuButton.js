import React from "react";
import classes from "./MenuButton.module.css";

const menuButton = props => {
  return (
    <div className={classes.menubutton} onClick={props.clicked}>
      <div className={classes.btnline}></div>
      <div className={classes.btnline}></div>
      <div className={classes.btnline}></div>
    </div>
  );
};

export default menuButton;
