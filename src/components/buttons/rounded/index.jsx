import React, { Component } from "react";
import "./index.css";
import TweetService from "services/TweetService";
import CrudService from "services/CrudService";

class KwetterComponentButtonRounded extends Component {
  constructor(props) {
    super(props);
  }

  submit(event) {
    if (!!event) {
      this.getServiceEndpoint(event);
    }
  }

  getServiceEndpoint(event) {
    let endpoint = event.endpoint;
    CrudService.post(endpoint, event.object).then(() => {
      window.dispatchEvent(
        new Event("time-line-refresh", {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
      window.dispatchEvent(
        new Event("tweet-form-clear", {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
    });
  }

  render() {
    let { disabled, label, event, style } = this.props;

    return (
      <div>
        <button
          style={style}
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
