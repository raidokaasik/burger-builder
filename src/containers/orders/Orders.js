import React, {Component} from "react";
import classes from "./Orders.module.css";
import OrderComponent from "../../components/orderComponent/OrderComponent.js";
import errorHandler from "../../hoc/errorhandling/errorHandler.js";
import * as actionCreator from "../../redux/actions/actionIndex.js";
import {connect} from "react-redux";
import Spinner from "../../components/UI/spinner/Spinner.js";
import axios from "../../AxiosOrders.js";

class Orders extends Component {
  componentDidMount() {
    // Getting the orders with a TOKEN
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  // deleteOrder = id => {
  //   this.props.deletionProcessed(id);
  //   this.props.deleteOrder(id, this.props.token);
  // };

  render() {
    let myOrders = (
      <div className={classes.orders}>
        <h1>My Orders</h1>
        {this.props.orders.map((item, index) => (
          <OrderComponent
            // onCancel={() => this.deleteOrder(item.id)}
            ingredients={item.ingredients}
            key={item.id}
            price={item.price}
            deliveryMethod={item.deliveryMethod}
            name={item.customer.name}
            city={item.customer.city}
            street={item.customer.street}
            phoneNr={item.customer.phoneNumber}
            email={item.customer.email}
            postalcode={item.customer.postalcode}
          />
        ))}
      </div>
    );

    //Placeholder Error message

    if (this.props.errors) {
      myOrders = (
        <div className={classes.errormessage}>
          <h3>ACCESS UNAUTHORIZED</h3>
          <p>{this.props.errors.message}</p>
        </div>
      );
    }
    return this.props.loading ? <Spinner /> : myOrders;
  }
}

// Redux state and dispatch

const mapStateToProps = state => {
  return {
    orders: state.ordr.orders,
    loading: state.ordr.loading,
    errors: state.ordr.errors,
    token: state.ath.token,
    userId: state.ath.userId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deletionProcessed: id => dispatch(actionCreator.orderDeleteProcessed(id)),
    deleteOrder: (id, token) => dispatch(actionCreator.orderDelete(id, token)),
    fetchOrders: (token, user) =>
      dispatch(actionCreator.fetchOrdersAsync(token, user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Orders, axios));
