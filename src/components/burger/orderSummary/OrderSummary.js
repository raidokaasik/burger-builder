import classes from "./OrderSummary.module.css";
import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "../../buttons/Button.js";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary] will update");
  }

  render() {
    const orderedIngredients = Object.keys(this.props.ingredients).map(
      (item, index) => {
        return (
          <li key={item + index}>
            <span style={{textTransform: "capitalize"}}>{item}</span>:
            {this.props.ingredients[item]}
          </li>
        );
      }
    );
    return (
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{orderedIngredients}</ul>
        <p>
          Total price:{" "}
          <span className={classes.priceTag}>
            {this.props.price.toFixed(2)} $
          </span>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.continueButton} btnType="Success">
          CONTINUE
        </Button>
        <Button clicked={this.props.cancelButton} btnType="Danger">
          CANCEL
        </Button>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  price: PropTypes.number,
};

export default OrderSummary;
