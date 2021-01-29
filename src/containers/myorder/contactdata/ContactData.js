import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/buttons/Button.js";
import axios from "../../../AxiosOrders.js";
import Spinner from "../../../components/UI/spinner/Spinner.js";
import Input from "../../../components/UI/input/Input.js";
import {connect} from "react-redux";
import * as actionCreator from "../../../redux/actions/actionIndex.js";
import WithErrorHandler from "../../../hoc/errorhandling/errorHandler.js";
import {Validation} from "../../../validation/validation.js";

class ContactData extends Component {
  state = {
    customer: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      phoneNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Phone Nr",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 8,
          touched: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      postalcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 5,
          touched: false,
        },
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "delivery",
              displayValue: "Home Delivery",
            },
            {
              value: "pickUp",
              displayValue: "Pick-Up",
            },
          ],
        },
        value: "delivery",
        validation: {
          valid: true,
        },
      },
    },
    formIsValid: false,
  };

  // Sending a filled order with async OrderSubmitAttempt to Firebase database

  orderHandler = event => {
    event.preventDefault();
    const formSubmit = {};
    for (let key in this.state.customer) {
      formSubmit[key] = this.state.customer[key].value;
    }

    const newOrder = {
      userId: this.props.userId,
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formSubmit,
    };
    this.props.orderSubmitAttempt(newOrder, this.props.token);
  };

  // Updating Customer state values with Order input fields and checking field validation(Works partially)

  inputHandler = (event, id) => {
    const updatedForm = {...this.state.customer};
    const updatedElement = {...updatedForm[id]};
    updatedElement.value = event.target.value;

    updatedElement.validation.valid = Validation(
      event.target.value,
      updatedElement.validation
    );
    updatedElement.validation.touched = true;

    //Form Validation

    let isFormValid = true;
    if (updatedForm[id].validation.valid && isFormValid) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    updatedForm[id] = updatedElement;
    this.setState({customer: updatedForm, formIsValid: isFormValid});
  };

  render() {
    const formElements = [];

    for (let key in this.state.customer) {
      formElements.push({
        id: key,
        config: this.state.customer[key],
      });
    }

    const form = (
      <form>
        <div className={classes.formData}>
          {formElements.map((item, index) => (
            <Input
              touched={item.config.validation.touched}
              shouldValidate={item.config.validation.required}
              invalid={!item.config.validation.valid}
              changed={event => this.inputHandler(event, item.id)}
              key={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.value}
            />
          ))}
        </div>
        <div className={classes.formButtons}>
          <Button
            disabled={!this.state.formIsValid}
            clicked={this.orderHandler}
            btnType="Success"
          >
            ORDER
          </Button>
          <Button clicked={this.props.cancelOrder} btnType="Danger">
            CANCEL
          </Button>
        </div>
      </form>
    );

    return (
      <div className={classes.contactDataContainer}>
        <h1>Order Data</h1>
        <h3>Where and to Whom should we send it?</h3>
        {this.props.loading ? <Spinner /> : form}
      </div>
    );
  }
}

// Redux state and dispatch

const mapStateToProps = state => {
  return {
    token: state.ath.token,
    loading: state.ordr.loading,
    ingredients: state.ingrd.ingredients,
    price: state.prc.price,
    userId: state.ath.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderSubmitAttempt: (payload, token) =>
      dispatch(actionCreator.orderSubmitAttempt(payload, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
