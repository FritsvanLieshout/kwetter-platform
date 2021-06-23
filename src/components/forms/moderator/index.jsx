import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Prompt } from "react-router-dom";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import "./index.css";

class ModeratorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.username,
      nickName: this.props.user.nickName,
      biography: this.props.user.biography,
      verified: this.props.user.verified,
      role: this.props.user.role,
    };

    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleOnSelect(event) {
    console.log(event.target.value);
    this.props.user.role = event.target.value;
    this.setState({ role: event.target.value });
    // this.setState({ role: role });
  }

  handleOnCheck(verified) {
    console.log(verified);
    this.props.user.verified = !verified;
    this.setState({ verified: !verified });
  }

  save() {
    console.log(this.props);
  }

  closeProfile() {
    this.setState({ user: null });
    var moderator = document.getElementById("moderator-popup");
    moderator.style.display = "none";
  }

  render() {
    let { user } = this.props;

    console.log(user);

    if (!!user) {
      return (
        <div id="moderator-popup">
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
                  </fieldset>
                  <fieldset className="form-group">
                    <label className="form-label">Verified</label>
                    <Field
                      className="form-control"
                      type="checkbox"
                      name="verified"
                      checked={props.values.verified}
                      onChange={() => this.handleOnCheck(props.values.verified)}
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
                  <button className="button-form" type="submit">
                    Opslaan
                  </button>
                </Form>
              )}
            </Formik>
            <KwetterComponentButtonRounded
              onClick={this.save}
              label="Verwijder account"
              style={{ width: "200px", background: "red", marginTop: "20px" }}
            />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default ModeratorForm;
