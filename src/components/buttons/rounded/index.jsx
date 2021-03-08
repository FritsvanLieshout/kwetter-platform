import React, { Component } from "react";
import "./index.css";

class KwetterComponentButtonRounded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { disabled } = this.props;

    return (
      <div>
        <button className="button button-rounded" disabled={disabled}>
          Tweeten
        </button>
      </div>
    );
  }
}

export default KwetterComponentButtonRounded;
