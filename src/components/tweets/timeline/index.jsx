import React, { Component } from "react";
import KwetterComponentTweet from "components/tweets/tweet";
import KwetterComponentFormTweet from "components/forms/tweet";
import "./index.css";
import SockJsClient from "react-stomp";
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

  onConnected = () => {
    console.log("Connected!!");
  };

  onTweetReceived = (tweet) => {
    console.log("New Tweet Received!!", tweet);

    this.setState((prevState) => ({
      tweets: [...prevState.tweets, tweet],
    }));
    this.refreshTimeline();
  };

  render() {
    let { tweets } = this.state;

    return (
      <div className="timeline">
        <div className="header">Startpagina</div>
        <KwetterComponentFormTweet />
        <div className="timeline-space"></div>
        <SockJsClient
          url={process.env.REACT_APP_SOCKET_API}
          topics={["/topic_timeline"]}
          onConnect={this.onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg) => this.onTweetReceived(msg)}
          debug={false}
        />
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
