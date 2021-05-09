import React, { Component } from "react";
import "./index.css";
import KwetterComponentFormTweet from "components/forms/tweet";

class KwetterComponentTweetModal extends Component {
  componentDidMount() {
    window.addEventListener("open-modal", () => {
      this.openModel();
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
    const { t } = this.props;

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
              <KwetterComponentFormTweet />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KwetterComponentTweetModal;
