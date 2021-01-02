import React from "react";
import classes from "./Controller.module.css";

const controller = props => {
  return (
    <div className={classes.Controller}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
    </div>
  );
};

export default controller;
