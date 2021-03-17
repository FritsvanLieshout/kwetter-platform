import React, { Component } from "react";
import "./index.css";

class KwetterComponentButtonTransparent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { endpoint } = this.props;

    return (
      <div>
        <button className="button button-transparent">{endpoint}</button>
      </div>
    );
  }
}

export default KwetterComponentButtonTransparent;
