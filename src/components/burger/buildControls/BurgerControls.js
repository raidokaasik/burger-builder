import React from "react";
import Controller from "./controller/Controller.js";
import classes from "./BurgerControls.module.css";
import PropTypes from "prop-types";

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Meat", type: "meat"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
];

// Add or Remove Ingredients

const burgerControls = props => (
  <div className={classes.BurgerControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((item, index) => (
      <Controller
        key={item.label + index}
        label={item.label}
        added={() => props.ingredientAdded(item.type)}
        removed={() => props.ingredientRemoved(item.type)}
        disabled={props.disabled[item.type]}
      />
    ))}

    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.clicked}
    >
      {props.isAuth ? "ORDER NOW!" : "SIGN UP"}
    </button>
  </div>
);

burgerControls.propTypes = {
  clicked: PropTypes.any,
};

export default burgerControls;
