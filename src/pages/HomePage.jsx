import React, { Component } from "react";

import KwetterComponentTimeLine from "../components/tweets/timeline";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <KwetterComponentTimeLine />
      </div>
    );
  }
}

export default HomePage;
