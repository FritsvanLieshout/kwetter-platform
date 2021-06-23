import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import AuthService from "services/AuthService";
import { setUser } from "redux/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}

class KwetterComponentFormProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biography: null,
      nickName: null,
    };
    this.editUser = this.editUser.bind(this);
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

  editUser() {
    let user = this.props.user;
    if (this.state.nickName !== null) {
      user.nickName = this.state.nickName;
    }
    if (this.state.biography !== null) {
      user.biography = this.state.biography;
    }

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
  }

  openModal() {
    window.dispatchEvent(
      new CustomEvent("close-profile-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
    window.dispatchEvent(
      new CustomEvent("open-alert-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }

  render() {
    let { user } = this.props;

    return (
      <div>
        <div className="container-form-edit">
          <Formik
            initialValues={{
              biography: user.biography,
              nickName: user.nickName,
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
              </Form>
            )}
          </Formik>
          <div className="profile-btn">
            <KwetterComponentButtonRounded
              onClick={this.editUser}
              label="Opslaan"
              style={{ width: "150px" }}
            />
          </div>
          <KwetterComponentButtonRounded
            onClick={this.openModal}
            label="Verwijder account"
            style={{ width: "200px", background: "red" }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KwetterComponentFormProfile);
