import React, { Component } from "react";
import AuthService from "services/AuthService";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import "./index.css";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: null,
      loginSuccessful: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async loginClicked() {
    const password = btoa(this.state.password);
    AuthService.signIn(this.state.username, password)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({ loginSuccessful: true, message: null });
          }
        },
        (error) => {
          this.setState({ message: "Invalid Credentials" });
        }
      )
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  validatePassword(password) {
    if (!password) {
      return false;
    }

    if (password.length > 7) {
      return true;
    }
    return false;
  }

  render() {
    let { username, password, message, loginSuccessful } = this.state;

    if (loginSuccessful) {
      window.location.replace("http://localhost:3000/home");
    }

    return (
      <div>
        <div className="container-form-login">
          <h3>Login</h3>
          <Formik
            initialValues={{
              username,
              password,
            }}
            onSubmit={this.loginClicked}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <fieldset className="form-group">
                  <label className="form-label">Username</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="example@test.nl"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label className="form-label">Password</label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </fieldset>
              </Form>
            )}
          </Formik>
          <div className="btnAndLink">
            <div className="alert" role="alert">
              {message}
            </div>

            <KwetterComponentButtonRounded
              onClick={this.loginClicked}
              disabled={!this.validatePassword(password)}
              label="Login"
              style={{ width: "150px" }}
            />
            <div className="form-redirect">
              <Link to="/signup">
                <span>No Account yet? Register here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
