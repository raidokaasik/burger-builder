import React from "react";
import classes from "./MyCheckoutSummary.module.css";
import Burger from "../../burger/Burger.js";
import Button from "../../buttons/Button.js";

const myCheckoutSummary = props => {
  return (
    <div className={classes.summaryContainer}>
      {/* <div className={classes.summaryLeft}>
        <Burger ingredients={props.ingredients} />
      </div> */}
      {/* <div className={classes.summaryRight}> */}
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
    // </div>
  );
};

export default myCheckoutSummary;
