import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

class KwetterComponentButtonTransparent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { endpoint, label, icon, onClick } = this.props;

    return (
      <div>
        {icon ? (
          <button className="button button-transparent" onClick={onClick}>
            {icon && (
              <FontAwesomeIcon icon={icon} fixedWidth className="button-icon" />
            )}
            <span>{label}</span>
          </button>
        ) : (
          <button className="button button-transparent">{label}</button>
        )}
      </div>
    );
  }
}

export default KwetterComponentButtonTransparent;
