import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./burgerIngredient/BurgerIngredient";

const burger = props => {
  let errormessage = null;
  const transformedIngredients = Object.keys(props.ingredients)
    .map(item => {
      return [...Array(props.ingredients[item])].map((_, index) => {
        return <BurgerIngredient key={item + index} type={item} />;
      });
    })
    .reduce((arr, item) => {
      return arr.concat(item);
    }, []);

  if (transformedIngredients.length === 0) {
    errormessage = <h2 className={classes.Errormessage}>Make it Good!</h2>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      {errormessage}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default burger;
