import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../logo/Logo.js";
import NavigationItems from "../navigationitems/NavigationItems.js";
import MenuButton from "../../menubutton/MenuButton.js";

const toolbar = props => {
  return (
    <header className={classes.toolbar}>
      <Logo height="80%" />
      <div className={classes.showMenu}>
        <MenuButton clicked={props.menuClick} />
      </div>

      <div className={classes.desktoponly}>
        <NavigationItems />
      </div>
    </header>
  );
};

export default toolbar;
