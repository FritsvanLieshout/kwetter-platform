import React, { Component, StrictMode } from "react";
import KwetterComponentTweet from "components/tweets/tweet";
import KwetterComponentFormTweet from "components/forms/tweet";
import "./index.css";
import SockJsClient from "react-stomp";
import TimelineService from "services/TimelineService";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentTimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: {},
      error: "",
    };
  }

  triggerRefresh() {
    this.refreshTimeline();
  }

  componentDidMount() {
    this.refreshTimeline();
    window.addEventListener("time-line-refresh", () => {
      this.refreshTimeline();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("time-line-refresh", () => {
      this.refreshTimeline();
    });
  }

  refreshTimeline() {
    const { user } = this.props;
    console.log(user, this.props.user);
    if (user !== null) {
      TimelineService.retrieveTimeline(user.username)
        .then((response) => {
          this.setState({
            tweets: response.data,
          });
        })
        .catch(() => {
          this.setState({
            error: "Sorry, Server Maintenance or Server Unreachable",
          });
        });
    } else {
      console.log("FALSE");
    }
  }

  onConnected = () => {};

  onTweetReceived = (tweet) => {
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

export default connect(mapStateToProps)(KwetterComponentTimeLine);