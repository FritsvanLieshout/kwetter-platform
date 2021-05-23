import React, { Component } from "react";
import "./index.css";
import KwetterComponentFormProfile from "components/forms/profile";

class KwetterComponentProfileModal extends Component {
  componentDidMount() {
    window.addEventListener("open-profile-modal", () => {
      this.openModel();
    });
    window.addEventListener("close-profile-modal", () => {
      this.closeModel();
    });
  }

  openModel() {
    console.log("OPEN THIS FUCKING MODAL");
    var modal = document.getElementById("profile-modal");
    modal.style.display = "block";
  }

  closeModel() {
    var modal = document.getElementById("profile-modal");
    modal.style.display = "none";
  }

  render() {
    return (
      <div>
        <div id="profile-modal" className="modal-container">
          <div className="modal-items">
            <div className="modal-top">
              <span className="modal-title">Profiel wijzigen</span>
              <span className="modal-close" onClick={() => this.closeModel()}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <KwetterComponentFormProfile />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KwetterComponentProfileModal;
