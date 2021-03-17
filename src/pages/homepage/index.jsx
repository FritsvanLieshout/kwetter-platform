import React, { Component } from "react";
import "./index.css";

import KwetterComponentTimeLine from "../../components/tweets/timeline";
import KwetterComponentCard from "../../components/cards/default";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="left">NAVBAR</div>
        <div className="center">
          <KwetterComponentTimeLine />
        </div>
        <div className="right">
          <KwetterComponentCard />
        </div>
      </div>
    );
  }
}

export default HomePage;
