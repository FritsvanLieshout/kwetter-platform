import React, { Component } from "react";
import "./index.css";
import CrudService from "services/CrudService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    let { disabled, label, style, onClick, icon, hover } = this.props;

    return (
      <div>
        <button
          style={style}
          className={"button button-rounded " + (hover ? "button-hover" : "")}
          disabled={disabled}
          onClick={onClick}
        >
          {!!icon && !!icon !== null && (
            <FontAwesomeIcon icon={icon} fixedWidth />
          )}
          <div className="button-label-1">{label}</div>
          <div className="button-label-2">{hover ? "Ontvolg" : label}</div>
        </button>
      </div>
    );
  }
}

export default KwetterComponentButtonRounded;
