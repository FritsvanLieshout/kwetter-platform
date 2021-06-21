import React, { Component } from "react";
import "./index.css";
import KwetterComponentFormTweet from "components/forms/tweet";

class KwetterComponentTweetModal extends Component {
  componentDidMount() {
    window.addEventListener("open-modal", () => {
      this.openModel();
    });
    window.addEventListener("close-modal", () => {
      this.closeModel();
    });
  }

  openModel() {
    var modal = document.getElementById("tweet-modal");
    modal.style.display = "block";
  }

  closeModel() {
    var modal = document.getElementById("tweet-modal");
    modal.style.display = "none";
  }

  render() {
    const { t, username } = this.props;

    return (
      <div>
        <div id="tweet-modal" className="modal-container">
          <div className="modal-items">
            <div className="modal-top">
              <span className="modal-close" onClick={() => this.closeModel()}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <KwetterComponentFormTweet username={username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KwetterComponentTweetModal;
