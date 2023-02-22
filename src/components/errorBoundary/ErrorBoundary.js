import {Component} from "react";

import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {

  state = {
    error: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo)
    this.setState({
      error: true
    })
  }

  render() {
    const {error} = this.state;

    return (
      error ? <ErrorMessage/> : this.props.children
    )
  }

}

export default ErrorBoundary
