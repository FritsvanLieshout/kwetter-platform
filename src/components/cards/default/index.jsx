import React, { Component } from "react";
import "./index.css";

class KwetterComponentCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="header">Trends voor jou</div>
        <div className="items">
          <div className="item">
            <div className="item-header">#Verkiezingen</div>
            <div className="item-body">14.613 Tweets</div>
          </div>
          <div className="item">
            <div className="item-header">Champions League</div>
            <div className="item-body">11.006 Tweets</div>
          </div>
          <div className="item">
            <div className="item-header">#Drommel</div>
            <div className="item-body">4.590 Tweets</div>
          </div>
        </div>
      </div>
    );
  }
}

export default KwetterComponentCard;
