import React from "react";
import classes from "./OrderComponent.module.css";

const orderComponent = props => {
  const fetchedIngredients = [];
  for (let item in props.ingredients) {
    fetchedIngredients.push({
      i: item,
      amount: props.ingredients[item],
    });
  }

  const outputIngredients = fetchedIngredients.map((item, index) => {
    return (
      <span className={classes.ingredients} key={item + index}>
        {item.i}: <span className={classes.amount}>{item.amount}</span>
      </span>
    );
  });

  return (
    <div className={classes.orderComponent}>
      <h3>INGREDIENTS:</h3>
      <p>{outputIngredients}</p>
      <h3>PRICE:</h3>
      <p className={classes.price}>{props.price} EUR </p>
      <h3>DELIVERY METHOD:</h3>
      <p>{props.deliveryMethod}</p>
      <h3>DELIVERY ADDRESS:</h3>
      <p>Name: {props.name}</p>
      <p>Phone: {props.phoneNr}</p>
      <p>Email: {props.email}</p>
      <p>Address: {props.address}</p>
    </div>
  );
};

export default orderComponent;
