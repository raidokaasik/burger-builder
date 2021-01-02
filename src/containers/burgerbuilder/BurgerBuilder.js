import React, {Component, Fragment} from "react";
import Burger from "../../components/burger/Burger.js";
import BurgerControls from "../../components/burger/buildControls/BurgerControls.js";
import Modal from "../../components/UI/modals/Modal.js";
import OrderSummary from "../../components/burger/orderSummary/OrderSummary.js";
import axios from "../../AxiosOrders.js";
import Spinner from "../../components/UI/spinner/Spinner.js";
import errorHandler from "../../hoc/errorhandling/errorHandler.js";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.7,
  bacon: 1,
  meat: 2.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    preview: false,
    showBackdrop: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://builder-app-9a83c.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ingredients: response.data});
        console.log("Ingredients Loaded");
      })
      .catch(error => this.setState({error: true}));
  }

  closeOrderSummaryHandler = () => {
    this.setState({preview: false, showBackdrop: false});
  };

  continueOrderHandler = () => {
    const queryParams = [];
    for (let item in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(item) +
          "=" +
          encodeURIComponent(this.state.ingredients[item])
      );
    }
    queryParams.push("price=" + this.state.price);
    this.props.history.push({
      pathname: "/myorder",
      search: "?" + queryParams.join("&"),
    });
  };

  previewOrderHandler = () => {
    this.setState({preview: true});
    this.setState({showBackdrop: true});
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(item => {
        return ingredients[item];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    console.log(updatedIngredients);
    const oldPrice = this.state.price;
    const newPrice = oldPrice + INGREDIENT_PRICE[type];

    const updatedPrice = newPrice;

    this.setState({
      ingredients: updatedIngredients,
      price: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    const oldCountCopy = {
      ...this.state.ingredients,
    };
    oldCountCopy[type] = oldCountCopy[type] === 0 ? 0 : newCount;
    const oldPrice = this.state.price;
    const newPrice = oldPrice - INGREDIENT_PRICE[type];

    const updatedPrice = newPrice;
    this.setState({
      ingredients: oldCountCopy,
      price: updatedPrice,
    });
    this.updatePurchaseState(oldCountCopy);
  };

  render() {
    const disabledInfo = {...this.state.ingredients};
    let orderSummary = (
      <OrderSummary
        price={this.state.price}
        cancelButton={this.closeOrderSummaryHandler}
        continueButton={this.continueOrderHandler}
        ingredients={this.state.ingredients}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    for (let item in disabledInfo) {
      disabledInfo[item] = disabledInfo[item] <= 0;
    }
    let burger = this.state.error ? (
      <p>Ingredients could not load!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.price}
            purchasable={this.state.purchasable}
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

export default errorHandler(BurgerBuilder, axios);
