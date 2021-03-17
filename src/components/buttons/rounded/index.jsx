import React, { Component } from "react";
import "./index.css";
import TweetService from "../../../services/TweetService";

class KwetterComponentButtonRounded extends Component {
  constructor(props) {
    super(props);
  }

  submit(event) {
    if (!!event) {
      console.log("posted:" + event.endpoint + ", " + event.value);
      this.getServiceEndpoint(event);
    }
  }

  getServiceEndpoint(event) {
    let endpoint = event.endpoint;
    switch (endpoint.toUpperCase()) {
      case "TWEETS":
        TweetService.postTweet(1, event.value).then((response) => {
          document.dispatchEvent(
            new Event("time-line-refresh", {
              bubbles: true,
              composed: true,
              detail: { response: response.data },
            })
          );
        });
        break;
      default:
        console.log("No endpoint selected");
    }
  }

  render() {
    let { disabled, label, event } = this.props;

    return (
      <div>
        <button
          className="button button-rounded"
          disabled={disabled}
          onClick={() => this.submit(event)}
        >
          {label}
        </button>
      </div>
    );
  }
}

export default KwetterComponentButtonRounded;
