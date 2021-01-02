import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/buttons/Button.js";
import axios from "../../../AxiosOrders.js";
import Spinner from "../../../components/UI/spinner/Spinner.js";
import Input from "../../../components/UI/input/Input.js";

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
    loading: false,
  };

  isValidHandler(value, validation) {
    let isvalid = true;
    if (validation.required) {
      isvalid = value.trim() !== "";
    }
    if (validation.minLength) {
      isvalid = validation.minLength === value.length;
    }
    return isvalid;
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({loading: true});
    const formSubmit = {};
    for (let key in this.state.customer) {
      formSubmit[key] = this.state.customer[key].value;
    }

    const newOrder = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formSubmit,
    };
    console.log(this.state.customer);
    axios
      .post("/orders.json", newOrder)
      .then(this.setState({loading: false}, this.props.history.push("/")))
      .catch(this.setState({loading: false}));
  };

  inputHandler = (event, id) => {
    const updatedForm = {...this.state.customer};
    const updatedElement = {...updatedForm[id]};
    updatedElement.value = event.target.value;
    // Input Validation

    updatedElement.validation.valid = this.isValidHandler(
      event.target.value,
      updatedElement.validation
    );
    updatedElement.validation.touched = true;

    //Form Validation
    let isFormValid = true;
    for (let item in updatedForm[id]) {
      if (updatedForm[id].validation.valid && isFormValid) {
        isFormValid = true;
      } else {
        isFormValid = false;
      }
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
        {this.state.loading ? <Spinner /> : form}
      </div>
    );
  }
}

export default ContactData;
