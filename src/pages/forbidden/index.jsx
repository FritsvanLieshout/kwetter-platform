import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

class ForbiddenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      count: 5,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    this.inter = setInterval(() => {
      if (this.state.count <= 1) {
        clearInterval(this.inter);
        this.setState({
          redirect: true,
        });
      } else {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  redirectToSignIn() {
    return <Redirect to="/signin" />;
  }

  render() {
    let { redirect, count } = this.state;

    return redirect ? (
      <Redirect to="/signin" />
    ) : (
      <div className="forbidden-container">
        <div className="forbidden-icon">
          <FontAwesomeIcon
            icon="exclamation-triangle"
            fixedWidth
            style={{ fontSize: "64px" }}
          />
        </div>
        <div className="forbidden-text">
          <h1>Forbidden access...</h1>
          <p>Sorry, your access is refused due to security reasons.</p>
          <p>After {count} seconds you will be redirected.</p>
        </div>
      </div>
    );
  }
}

export default ForbiddenPage;
