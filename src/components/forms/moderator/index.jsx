import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import AuthService from "services/AuthService";
import "./index.css";

class ModeratorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user?.username,
      nickName: this.props.user?.nickName,
      biography: this.props.user?.biography,
      verified: this.props.user?.verified,
      role: this.props.user?.role,
    };

    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }

  handleChange(event) {
    this.props.user[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSelect(event) {
    this.props.user.role = event.target.value;
    this.setState({ role: !event.target.value });
  }

  handleOnCheck(verified) {
    this.props.user.verified = !verified;
    this.setState({ verified: !verified });
  }

  validate = (values) => {
    const errors = {};
    if (values.biography.length > 28) {
      errors.biography = "Must be 28 characters or less";
    }

    if (values.nickName.length > 18) {
      errors.nickName = "Must be 18 characters or less";
    }

    return errors;
  };

  save = (values) => {
    let user = this.props.user;
    user.nickName = values.nickName;
    user.biography = values.biography;
    user.verified = values.verified;
    user.role = values.role;

    console.log(user);

    AuthService.updateUser(user)
      .then((response) => {
        if (response.status === 200) {
          this.props.setUser(response.data);
          window.dispatchEvent(
            new CustomEvent("close-profile-modal", {
              bubbles: true,
              composed: true,
              detail: {},
            })
          );
        }
      })
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  };

  closeProfile() {
    var moderator = document.getElementById("moderator-popup");
    moderator.style.display = "none";
  }

  removeUser(user) {
    console.log(user);
    AuthService.deleteUser(user).then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    });
  }

  render() {
    let { user } = this.props;

    return (
      <div id="moderator-popup">
        {!!user ? (
          <div>
            <div className="moderator-options">
              <span className="modal-title">Acties</span>
              <span className="modal-close" onClick={() => this.closeProfile()}>
                &times;
              </span>
            </div>
            <div className="container-form-edit">
              <Formik
                initialValues={{
                  username: user.username,
                  nickName: user.nickName,
                  biography: user.biography,
                  verified: user.verified,
                  role: user.role,
                }}
                onSubmit={this.save}
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
                        value={props.values.username}
                        disabled
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label className="form-label">Nickname</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="nickName"
                        value={props.values.nickName}
                        onKeyUp={this.handleChange}
                      />
                      {props.errors.nickName ? (
                        <div style={{ color: "red" }}>
                          {props.errors.nickName}
                        </div>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <label className="form-label">Biography</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="biography"
                        value={props.values.biography}
                        onKeyUp={this.handleChange}
                      />
                      {props.errors.biography ? (
                        <div style={{ color: "red" }}>
                          {props.errors.biography}
                        </div>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <label className="form-label">Verified</label>
                      <Field
                        className="form-control"
                        type="checkbox"
                        name="verified"
                        checked={props.values.verified}
                        onChange={() =>
                          this.handleOnCheck(props.values.verified)
                        }
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label className="form-label">Role</label>
                      <Field
                        className="form-control"
                        as="select"
                        name="role"
                        style={{ color: "var(--app-text-color)" }}
                        onChange={this.handleOnSelect}
                      >
                        <option value="KWETTER_USER">User</option>
                        <option value="KWETTER_ADMIN">Admin</option>
                      </Field>
                    </fieldset>
                    <button
                      className="button-form"
                      type="submit"
                      disabled={false}
                    >
                      Save changes
                    </button>
                  </Form>
                )}
              </Formik>
              <KwetterComponentButtonRounded
                onClick={() => this.removeUser(user)}
                label="Verwijder account"
                style={{
                  width: "200px",
                  background: "red",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ModeratorForm;
