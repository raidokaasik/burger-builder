import React, {Component} from "react";
import classes from "./Orders.module.css";
import OrderComponent from "../../components/orderComponent/OrderComponent.js";
import errorHandler from "../../hoc/errorhandling/errorHandler.js";

import axios from "../../AxiosOrders.js";

class Orders extends Component {
  state = {
    serverData: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedData = [];

        for (let i in res.data) {
          fetchedData.push({
            id: i,
            ...res.data[i],
          });
        }
        this.setState({loading: false, serverData: fetchedData});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  }

  render() {
    console.log(this.state.serverData);
    return (
      <div className={classes.orders}>
        <h1>My Orders</h1>

        {this.state.serverData.map((item, index) => (
          <OrderComponent
            ingredients={item.ingredients}
            key={item.id}
            price={item.price}
            deliveryMethod={item.deliveryMethod}
            name={item.customer.name}
            address={item.customer.address}
            phoneNr={item.customer.phoneNumber}
            email={item.customer.email}
          />
        ))}
      </div>
    );
  }
}

export default errorHandler(Orders, axios);
