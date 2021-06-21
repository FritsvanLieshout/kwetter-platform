import React, { Component } from "react";
import "./index.css";

class KwetterComponentCard extends Component {
  constructor(props) {
    super(props);
  }

  retrieveItems(trends) {
    if (!!trends && trends.length > 0) {
      return trends.map((item) => (
        <div className="item">
          <div className="item-header">{item.trend}</div>
          <div className="item-body">
            {item.count} {item.count > 1 ? "Tweets" : "Tweet"}
          </div>
        </div>
      ));
    }
  }

  render() {
    let { items } = this.props;
    console.log(items);
    return (
      <div className="card">
        <div className="header">Trends voor jou</div>
        <div className="items">{this.retrieveItems(items)}</div>
      </div>
    );
  }
}

export default KwetterComponentCard;
