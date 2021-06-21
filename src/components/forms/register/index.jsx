import React, { Component } from "react";
import AuthService from "services/AuthService";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import LoginComponent from "components/forms/login";
import KwetterComponentButtonRounded from "components/buttons/rounded";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      nickName: "",
      password: "",
      confirmPassword: "",
      registerSuccessful: false,
      message: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.registerClicked = this.registerClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  validate(username) {
    if (username.length > 7) {
      return true;
    }
    return false;
  }

  validatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) {
      return false;
    }

    if (password === confirmPassword && password.length > 7) {
      return true;
    }
    return false;
  }

  registerClicked() {
    const password = btoa(this.state.password);
    AuthService.signUp(this.state.username, password, this.state.nickName)
      .then(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            this.setState({ registerSuccessful: true, message: null });
          }
        },
        (error) => {
          this.setState({ message: error.response.data.message });
        }
      )
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  render() {
    let {
      username,
      nickName,
      password,
      confirmPassword,
      message,
      registerSuccessful,
    } = this.state;

    if (registerSuccessful === true) {
      return <LoginComponent />;
    } else {
      return (
        <div>
          <div className="container-form-login">
            <h3>Register</h3>
            <Formik
              initialValues={{
                username,
                nickName,
                password,
                confirmPassword,
              }}
              onSubmit={this.registerClicked}
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
                    <label className="form-label">Nickname</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="nickName"
                      value={this.state.nickName}
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
                  <fieldset className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
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
                onClick={this.registerClicked}
                disabled={
                  !this.validatePassword(password, confirmPassword) ||
                  !this.validate(username)
                }
                label="Register"
                style={{ width: "150px" }}
              />
              <div className="form-redirect">
                <Link to="/signin">
                  <span>Already an account? Sign in here</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default RegisterComponent;
