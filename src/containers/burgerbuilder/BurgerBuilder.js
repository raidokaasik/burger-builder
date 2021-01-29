import React, {Component, Fragment} from "react";
import Burger from "../../components/burger/Burger.js";
import classes from "./BurgerBuilder.module.css";
import BurgerControls from "../../components/burger/buildControls/BurgerControls.js";
import Modal from "../../components/UI/modals/Modal.js";
import OrderSummary from "../../components/burger/orderSummary/OrderSummary.js";
import axios from "../../AxiosOrders.js";
import Spinner from "../../components/UI/spinner/Spinner.js";
import errorHandler from "../../hoc/errorhandling/errorHandler.js";
import * as actionCreator from "../../redux/actions/actionIndex.js";
import {connect} from "react-redux";

class BurgerBuilder extends Component {
  state = {
    preview: false,
    showBackdrop: false,
    loading: false,
    error: false,
  };

  // Whenever front page loads, ComponentDidMount pulls default ingredients from Firebase, resets purchasing and price.

  componentDidMount() {
    this.props.initIngredients();
    this.props.resetPurchasing();
    this.props.resetPrice();
  }

  // Closes the modal and cancels the order that shows up after burger has been assembled and ORDER is pressed

  closeOrderSummaryHandler = () => {
    this.setState({preview: false, showBackdrop: false});
  };

  // Closes the modal and continues to "/myorder link"

  continueOrderHandler = () => {
    this.props.history.push({
      pathname: "/myorder",
    });
  };

  // Opens the modal for confirmation of the order, when ORDER is pressed

  previewOrderHandler = () => {
    if (this.props.isAuth) {
      this.setState({preview: true});
      this.setState({showBackdrop: true});
    } else {
      // this.props.setRedirectPath("/myorder");
      this.props.history.push({
        pathname: "/auth",
      });
    }
  };

  // Enables or Disables ORDER function depending if any ingredients have been selected or not.
  // If sum > 0 is true then ORDER button has been enabled, otherwise disabled.

  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ingredients)
      .map(item => {
        return this.props.ingredients[item];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  // Adds an ingredient to the burger and calculates the price

  addIngredientHandler = type => {
    this.props.addIngredient(type);
    this.props.addToPrice(type);
  };

  // Removes an ingredient from the burger and recalculates the price

  removeIngredientHandler = type => {
    this.props.removeIngredient(type);
    this.props.removeFromPrice(type);
  };

  render() {
    // Disables the LESS button from ingredient selection if none have been selected

    const disabledInfo = {...this.props.ingredients};
    for (let item in disabledInfo) {
      disabledInfo[item] = disabledInfo[item] <= 0;
    }

    // OrderSummary that comes up with the modal after ORDER is pressed

    let orderSummary = (
      <OrderSummary
        price={this.props.price}
        cancelButton={this.closeOrderSummaryHandler}
        continueButton={this.continueOrderHandler}
        ingredients={this.props.ingredients}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // In case of an error Shows an error message or a Spinner

    let burger = this.props.error ? (
      <p>Ingredients could not load!</p>
    ) : (
      <Spinner />
    );

    // If ingredients have been pulled succesfully from Firebase and stored to Redux store, then burger shows up
    // with it's controls

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <div className={classes.burgerContainer}>
            <Burger ingredients={this.props.ingredients} />
          </div>
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState()}
            clicked={this.previewOrderHandler}
            isAuth={this.props.isAuth}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {this.state.preview ? (
          <Modal
            closeOrderSummary={this.closeOrderSummaryHandler}
            showBackdrop={this.state.showBackdrop}
          >
            {orderSummary}
          </Modal>
        ) : null}
        {burger}
      </Fragment>
    );
  }
}

// Redux state and dispatch

const mapStateToProps = state => {
  return {
    inProcess: state.ingrd.inProcess,
    error: state.ingrd.error,
    ingredients: state.ingrd.ingredients,
    price: state.prc.price,
    isAuth: state.ath.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setRedirectPath: path => dispatch(actionCreator.setAuthRedirect(path)),
    resetPurchasing: () => dispatch(actionCreator.resetPurchasing()),
    addToPrice: type => dispatch(actionCreator.addValue(type)),
    removeFromPrice: type => dispatch(actionCreator.removeValue(type)),
    addIngredient: type => dispatch(actionCreator.addIngredient(type)),
    removeIngredient: type => dispatch(actionCreator.removeIngredient(type)),
    initIngredients: () => dispatch(actionCreator.initIngredients()),
    resetPrice: () => dispatch(actionCreator.resetPrice()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
