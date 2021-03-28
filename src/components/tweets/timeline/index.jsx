import React, { Component } from "react";
import KwetterComponentTweet from "components/tweets/tweet";
import KwetterComponentFormTweet from "components/forms/tweet";
import "./index.css";
//import TweetService from "../../../services/TweetService";
import TimelineService from "services/TimelineService";

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
    this.refreshTimeline();
  }

  componentDidMount() {
    this.refreshTimeline();
    document.addEventListener("time-line-refresh", () => {
      this.refreshTimeline();
    });
  }

  componentWillUnmount() {
    document.removeEventListener("time-line-refresh", () => {
      this.refreshTimeline();
    });
  }

  refreshTimeline() {
    TimelineService.retrieveTimeline()
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
