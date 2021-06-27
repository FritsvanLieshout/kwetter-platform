import React, { Component } from "react";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import AuthService from "services/AuthService";
import { connect } from "react-redux";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentAlertModal extends Component {
  componentDidMount() {
    window.addEventListener("open-alert-modal", () => {
      this.openModel();
    });
    window.addEventListener("close-alert-modal", () => {
      this.closeModel();
    });
  }

  removeUser(user) {
    console.log(user);
    AuthService.deleteUser(user).then((response) => {
      if (response.status === 200) {
        console.log(response);

        AuthService.logout().then((res) => {
          if (res.status === 200) {
            window.localStorage.removeItem("persist:root");
            window.location.replace("http://20.86.242.101:3000/signin");
          }
        });
      }
    });
  }

  openModel() {
    var modal = document.getElementById("alert-modal");
    modal.style.display = "block";
  }

  closeModel() {
    var modal = document.getElementById("alert-modal");
    modal.style.display = "none";
  }

  render() {
    let { title, warning, label, user } = this.props;

    return (
      <div>
        <div id="alert-modal" className="modal-container">
          <div className="modal-items">
            <div className="modal-top">
              <span className="modal-title">{title}</span>
              <span className="modal-close" onClick={() => this.closeModel()}>
                &times;
              </span>
            </div>
            <div className="modal-body-alert">
              <span>{warning}</span>
              <div className="modal-buttons">
                <KwetterComponentButtonRounded
                  label="Cancel"
                  onClick={this.closeModel}
                  style={{
                    fontSize: "16px",
                    width: "100px",
                    borderRadius: "50px",
                    padding: "12px",
                  }}
                />
                <KwetterComponentButtonRounded
                  label={label}
                  onClick={() => this.removeUser(user)}
                  style={{
                    fontSize: "16px",
                    width: "100px",
                    borderRadius: "50px",
                    padding: "12px",
                    background: "red",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentAlertModal);
