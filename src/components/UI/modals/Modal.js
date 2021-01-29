import React, {Component, Fragment} from "react";
import BackDrop from "../backdrop/BackDrop.js";
import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.showBackdrop !== this.props.showBackdrop ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Fragment>
        <BackDrop
          show={this.props.showBackdrop}
          clicked={this.props.closeOrderSummary}
        />
        <div
          style={{
            transform: this.props.showBackdrop
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.showBackdrop ? 1 : 0,
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
