import React, {Component, Fragment} from "react";
import Modal from "../../components/UI/modals/Modal.js";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({errors: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({error: error});
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorClearHandler = () => {
      this.setState({error: null});
    };
    render() {
      return (
        <Fragment>
          <Modal
            showBackdrop={this.state.error}
            closeOrderSummary={this.errorClearHandler}
          >
            <h4 style={{textAlign: "center"}}>
              {this.state.error ? this.state.error.message : null}
            </h4>
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default errorHandler;
