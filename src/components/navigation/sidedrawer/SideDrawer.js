import React, {Fragment} from "react";
import classes from "./Sidedrawer.module.css";
import NavigationItems from "../navigationitems/NavigationItems.js";
import Logo from "../../logo/Logo.js";
import BackDrop from "../../UI/backdrop/BackDrop.js";

const sideDrawer = props => {
  let attachedClasses = [classes.sidedrawer, classes.close];
  if (props.open) {
    attachedClasses = [classes.sidedrawer, classes.open];
  }

  return (
    <Fragment>
      <BackDrop show={props.open} clicked={props.closeSide} />
      <div className={attachedClasses.join(" ")} onClick={props.closeSide}>
        <div className={classes.logo}>
          <Logo height="65px" />
        </div>
        <NavigationItems isAuth={props.isAuth} />
      </div>
    </Fragment>
  );
};

export default sideDrawer;
