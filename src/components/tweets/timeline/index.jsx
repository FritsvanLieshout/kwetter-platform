import React, { Component } from "react";
import KwetterComponentTweet from "../tweet";
import KwetterComponentFormTweet from "../../forms/tweet";
import "./index.css";
import data from "../../../data/tweets.json";
import TweetService from "../../../services/TweetService";

class KwetterComponentTimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //tweets: data.tweets,
      tweets: {},
      error: "",
    };
  }

  triggerRefresh() {
    this.refreshTweets();
  }

  componentDidMount() {
    this.refreshTweets();
    document.addEventListener("time-line-refresh", () => {
      this.refreshTweets();
    });
  }

  refreshTweets() {
    TweetService.retrieveAllTweets()
      .then((response) => {
        console.log(response);
        this.setState({
          tweets: response.data,
        });
      })
      .catch(() => {
        this.setState({
          error: "Sorry, Server Maintenance or Server Unreachable",
        });
      });
  }

  render() {
    let { tweets } = this.state;
    console.log(tweets);

    return (
      <div className="timeline">
        <div className="header">Startpagina</div>
        <KwetterComponentFormTweet />
        <div className="timeline-space"></div>
        {!!tweets && tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <KwetterComponentTweet
              tweet={tweet}
              key={index}
              handler={this.handlerRefresh}
            />
          ))
        ) : (
          <div>No Feed </div>
        )}
      </div>
    );
  }
}

export default KwetterComponentTimeLine;
