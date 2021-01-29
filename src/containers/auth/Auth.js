import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import classes from "./Auth.module.css";
import Input from "../../components/UI/input/Input.js";
import Button from "../../components/buttons/Button.js";
import * as actionCreator from "../../redux/actions/actionIndex.js";
import Spinner from "../../components/UI/spinner/Spinner.js";
import ErrorMessage from "../../components/UI/errormessage/ErrorMessage.js";
import {connect} from "react-redux";
import {Validation} from "../../validation/validation.js";

class Auth extends Component {
  // Form inputs in a state

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

  // Handles the Login form input values and stores them to state(Control)

  inputHandler = (event, name) => {
    const updatedControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        validation: {
          ...this.state.controls.validation,
          touched: true,
          valid: Validation(
            event.target.value,
            this.state.controls[name].validation
          ),
        },
      },
    };

    this.setState({controls: updatedControls});
  };

  // Passing login form inputs(email, password) from state to redux async authenticator as parameters.
  // isLogin is used to swap URLs between register URL and login URL in redux async authenticator.

  submitHandler = event => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isLogin
    );
  };

  // Changes the UI button from Login to Register, because currently Registration and Login are sharing the same form.

  registerHandler = () => {
    this.setState(prevstate => {
      return {isLogin: !prevstate.isLogin};
    });
  };

  render() {
    // Pushing the state(Control) form input fields into an array to map through them

    const controlsArray = [];
    for (let item in this.state.controls) {
      controlsArray.push({
        id: item,
        config: this.state.controls[item],
      });
    }

    // Loading and then mapping the Inputs

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
    let redirect = null;
    let errorMessage = null;

    if (this.props.error) {
      redirect = null;
      const error = this.props.error.split("_").join(" ");
      errorMessage = <ErrorMessage>{error}</ErrorMessage>;
    }

    // Redirect on Login either to "/" or to Checkout("/myorder") - if user has already started creating a burger before logging in.

    if (this.props.isAuth && this.props.inProcess) {
      redirect = <Redirect to="/myorder" />;
    } else if (this.props.isAuth && !this.props.inProcess) {
      redirect = <Redirect to="/" />;
    }

    return (
      // Login and Registration Form

      <div className={classes.Auth}>
        <h1>Hei there!</h1>
        {redirect}
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

// Redux state and dispatch

const mapStateToProps = state => {
  return {
    inProcess: state.ingrd.inProcess,
    authData: state.ath.authData,
    loading: state.ath.loading,
    error: state.ath.error,
    isAuth: state.ath.isAuth,
    authRedirectPath: state.ath.setRedirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setRedirectPath: () => dispatch(actionCreator.setAuthRedirect("/")),
    auth: (email, pw, signup) =>
      dispatch(actionCreator.auth(email, pw, signup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
