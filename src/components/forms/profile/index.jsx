import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentFormProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biography: null,
      nickName: null,
    };
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("profile-form-clear", () => {
      document.getElementById("profileForm").reset();
      this.setState({ value: "" });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("profile-form-clear", () => {
      document.getElementById("profileForm").reset();
      this.setState({ value: "" });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  save() {}

  render() {
    let { biography, nickName } = this.state;
    let { user } = this.props;

    return (
      <div>
        <div className="container-form-edit">
          <Formik
            initialValues={{
              biography,
              nickName,
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
                  <label className="form-label">Nickname</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="nickName"
                    value={user.nickName ? user.nickName : ""}
                    onChange={this.handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label className="form-label">Biography</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="biography"
                    value={user.biography ? user.biography : ""}
                    onChange={this.handleChange}
                  />
                </fieldset>
              </Form>
            )}
          </Formik>
          <div className="profile-btn">
            <KwetterComponentButtonRounded
              onClick={this.save}
              label="Opslaan"
              style={{ width: "150px" }}
            />
          </div>
          <KwetterComponentButtonRounded
            label="Verwijder account"
            style={{ width: "200px", background: "red" }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentFormProfile);
