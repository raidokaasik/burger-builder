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
    this.props.fetchOrders(this.props.token);
  }

  render() {
    console.log(this.props.errors);

    let myOrders = (
      <div className={classes.orders}>
        <h1>My Orders</h1>
        {this.props.orders.map((item, index) => (
          <OrderComponent
            onCancel={() => this.props.deleteOrder(item.id)}
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

    // PLACEHOLDER ERROR MESSAGE
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

const mapStateToProps = state => {
  return {
    orders: state.ordr.orders,
    loading: state.ordr.loading,
    errors: state.ordr.errors,
    token: state.ath.token,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    refreshDeletedOrders: () => {
      dispatch(actionCreator.orderDeleteProcessed());
    },
    deleteOrder: id => dispatch(actionCreator.orderDelete(id)),
    fetchOrders: token => dispatch(actionCreator.fetchOrdersAsync(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Orders, axios));
