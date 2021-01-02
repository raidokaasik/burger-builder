import React, {Component} from "react";
import classes from "./Myorder.module.css";
import {Route} from "react-router-dom";
import MyCheckoutSummary from "../../components/mycheckout/mycheckoutsummary/MyCheckoutSummary";
import ContactData from "./contactdata/ContactData.js";
import Burger from "../../components/burger/Burger.js";

class MyOrder extends Component {
  componentDidMount() {
    //How to parse URI search params into a state object
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    for (let item of query.entries()) {
      if (item[0] === "price") {
        this.setState({totalPrice: +item[1]});
      } else {
        newIngredients[item[0]] = +item[1];
      }
    }
    this.setState({ingredients: newIngredients});
  }

  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1,
    },
    showDataForm: false,
    totalPrice: null,
  };

  continueOrderHandler = () => {
    this.setState({showDataForm: true});
    this.props.history.push("/myorder/contact-data");
  };

  cancelOrderHandler = () => {
    console.log();
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={classes.myorderContainer}>
        <div className={classes.myorderLeftSide}>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div className={classes.myorderRightSide}>
          {this.state.showDataForm ? (
            <Route
              path={this.props.match.url + "/contact-data"}
              render={props => (
                <ContactData
                  ingredients={this.state.ingredients}
                  price={this.state.totalPrice}
                  {...props}
                />
              )}
            />
          ) : (
            <MyCheckoutSummary
              continueOrder={this.continueOrderHandler}
              cancelOrder={this.cancelOrderHandler}
              ingredients={this.state.ingredients}
            />
          )}
        </div>
      </div>
    );
  }
}
export default MyOrder;
