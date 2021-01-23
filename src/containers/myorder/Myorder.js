import React, {Component} from "react";
import classes from "./Myorder.module.css";
import {Redirect, Route} from "react-router-dom";
import MyCheckoutSummary from "../../components/mycheckout/mycheckoutsummary/MyCheckoutSummary";
import ContactData from "./contactdata/ContactData.js";
import Burger from "../../components/burger/Burger.js";
import {connect} from "react-redux";

class MyOrder extends Component {
  // componentDidMount() {
  //   //How to parse URI search params into a state object
  //   const query = new URLSearchParams(this.props.location.search);
  //   const newIngredients = {};
  //   for (let item of query.entries()) {
  //     if (item[0] !== "price") {
  //       this.setState({totalPrice: +item[1]});
  //       newIngredients[item[0]] = +item[1];
  //     }
  //   }
  //   this.setState({ingredients: newIngredients});
  // }

  state = {
    showDataForm: false,
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
    let renderedBurger = <Redirect to="/" />;
    if (this.props.ingredients) {
      if (this.props.purchased) {
        return <Redirect to="/" />;
      }
      renderedBurger = <Burger ingredients={this.props.ingredients} />;
    }

    return (
      <div className={classes.myorderContainer}>
        <div className={classes.myorderLeftSide}>{renderedBurger}</div>
        <div className={classes.myorderRightSide}>
          {this.state.showDataForm ? (
            <Route
              path={this.props.match.url + "/contact-data"}
              render={props => (
                <ContactData
                  // ingredients={this.props.ingredients}
                  // price={this.props.price}
                  {...props}
                />
              )}
            />
          ) : (
            <MyCheckoutSummary
              continueOrder={this.continueOrderHandler}
              cancelOrder={this.cancelOrderHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    purchased: state.ordr.purchased,
    ingredients: state.ingrd.ingredients,
    price: state.prc.price,
  };
};

export default connect(mapStateToProps)(MyOrder);
