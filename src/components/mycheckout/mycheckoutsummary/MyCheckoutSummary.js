import React from "react";
import classes from "./MyCheckoutSummary.module.css";
import Button from "../../buttons/Button.js";

// This will be displayed when ORDER has been pressed and user has been asked to confirm the ingredient selection.

const myCheckoutSummary = props => {
  return (
    <div className={classes.summaryContainer}>
      <h1>Looks delicious!</h1>
      <h3>Would you like to confirm your order?</h3>
      <div className={classes.summaryButtons}>
        <Button clicked={props.continueOrder} btnType="Success">
          CONTINUE
        </Button>
        <Button clicked={props.cancelOrder} btnType="Danger">
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default myCheckoutSummary;
