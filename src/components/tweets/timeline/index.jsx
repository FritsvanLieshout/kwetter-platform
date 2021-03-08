import React, { Component } from "react";
import KwetterComponentTweet from "../tweet";
import KwetterComponentFormTweet from "../../forms/tweet";
import "./index.css";
import data from "../../../data/tweets.json";

class KwetterComponentTimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: data.tweets,
    };
  }

  render() {
    let { tweets } = this.state;

    return (
      <div className="timeline">
        <div className="header">Startpagina</div>
        <KwetterComponentFormTweet />
        <div className="timeline-space"></div>
        {!!tweets && tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <KwetterComponentTweet tweet={tweet} key={index} />
          ))
        ) : (
          <div>No Feed </div>
        )}
      </div>
    );
  }
}

export default KwetterComponentTimeLine;
