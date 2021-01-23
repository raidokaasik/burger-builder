import React, {Component, Fragment} from "react";
import Burger from "../../components/burger/Burger.js";
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
    ingredientsV2: {
      salad: 1,
      meat: 0,
      bacon: 1,
      cheese: 1,
    },
  };

  componentDidMount() {
    this.props.initIngredients();
    this.props.resetRedirect();
    this.props.resetPrice();
  }

  closeOrderSummaryHandler = () => {
    this.setState({preview: false, showBackdrop: false});
  };

  continueOrderHandler = () => {
    this.props.history.push({
      pathname: "/myorder",
    });
  };

  previewOrderHandler = () => {
    this.setState({preview: true});
    this.setState({showBackdrop: true});
  };

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

  addIngredientHandler = type => {
    this.props.addIngredient(type);
    this.props.addToPrice(type);
  };

  removeIngredientHandler = type => {
    this.props.removeIngredient(type);
    this.props.removeFromPrice(type);
  };

  render() {
    const disabledInfo = {...this.props.ingredients};
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

    for (let item in disabledInfo) {
      disabledInfo[item] = disabledInfo[item] <= 0;
    }
    let burger = this.props.error ? (
      <p>Ingredients could not load!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState()}
            clicked={this.previewOrderHandler}
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
const mapStateToProps = state => {
  return {
    error: state.ingrd.error,
    ingredients: state.ingrd.ingredients,
    price: state.prc.price,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetRedirect: () => dispatch(actionCreator.resetRedirect()),
    addToPrice: type => dispatch(actionCreator.addValue(type)),
    removeFromPrice: type => dispatch(actionCreator.removeValue(type)),
    addIngredient: type => dispatch(actionCreator.addIngredient(type)),
    removeIngredient: type => dispatch(actionCreator.removeIngredient(type)),
    initIngredients: () => dispatch(actionCreator.initIngredients()),
    resetPrice: () => dispatch(actionCreator.resetPrice()),
    // reportError: () => dispatch(actionCreator.reportError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
