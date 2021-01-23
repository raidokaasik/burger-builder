import React, {Component} from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/input/Input.js";
import Button from "../../components/buttons/Button.js";
import * as actionCreator from "../../redux/actions/actionIndex.js";
import Spinner from "../../components/UI/spinner/Spinner.js";
import ErrorMessage from "../../components/UI/errormessage/ErrorMessage.js";
import {connect} from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          maxLength: 10,
          required: true,
          valid: false,
          touched: false,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          minLength: 6,
          required: true,
          valid: false,
          touched: false,
        },
      },
    },
    isLogin: true,
  };
  isValidHandler(value, validation) {
    let isValid = true;

    if (!validation) {
      return true;
    }
    if (validation.required) {
      isValid = value.trim() !== "";
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }
    if (validation.isEmail) {
    }
    if (validation.isNumeric) {
      isValid = !Number.isNaN(parseFloat(value)) && Number.isFinite(value);
    }
    return isValid;
  }

  inputHandler = (event, name) => {
    // const updatedControls = {...this.state.controls};
    // const updatedControlElement = {...updatedControls[name]};
    // updatedControlElement.value = event.target.value;
    // updatedControlElement.validation.valid = this.isValidHandler(
    //   event.target.value,
    //   updatedControlElement.validation
    // );
    // updatedControlElement.validation.touched = true;
    // console.log(updatedControls);
    // this.setState({controls: updatedControls});

    const updatedControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        validation: {
          ...this.state.controls.validation,
          touched: true,
          valid: this.isValidHandler(
            event.target.value,
            this.state.controls[name].validation
          ),
        },
      },
    };

    this.setState({controls: updatedControls});
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isLogin
    );
  };

  registerHandler = () => {
    this.setState(prevstate => {
      return {isLogin: !prevstate.isLogin};
    });
  };

  render() {
    const controlsArray = [];
    for (let item in this.state.controls) {
      controlsArray.push({
        id: item,
        config: this.state.controls[item],
      });
    }

    //FORM WITH A LOADING SPINNER

    const form = this.props.loading ? (
      <Spinner />
    ) : (
      controlsArray.map(item => (
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
      ))
    );

    //ERROR MESSAGE

    let errorMessage = null;
    if (this.props.error) {
      const error = this.props.error.split("_").join(" ");
      errorMessage = <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
      <div className={classes.Auth}>
        <h1>Hei there!</h1>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isLogin ? "LOGIN" : "REGISTER"}
          </Button>
        </form>
        <p>or click here to Register</p>
        <Button clicked={this.registerHandler} btnType="Danger">
          SWITCH TO {this.state.isLogin ? "REGISTER" : "LOGIN"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authData: state.ath.authData,
    loading: state.ath.loading,
    error: state.ath.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, pw, signup) =>
      dispatch(actionCreator.auth(email, pw, signup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
