import React, { Component, StrictMode } from "react";
import KwetterComponentTweet from "components/tweets/tweet";
import KwetterComponentFormTweet from "components/forms/tweet";
import "./index.css";
import SockJsClient from "react-stomp";
import TimelineService from "services/TimelineService";
import { connect } from "react-redux";
import { setTimeline, setOwnTweets } from "redux/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    timeline: state.timeline,
    ownTweets: state.ownTweets,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setTimeline: (timeline) => dispatch(setTimeline(timeline)),
    setOwnTweets: (ownTweets) => dispatch(setOwnTweets(ownTweets)),
  };
}

class KwetterComponentTimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: {},
      error: "",
      onUpdate: false,
    };
  }

  componentDidMount() {
    if (!!this.props.endpoint && this.props.endpoint === "profile") {
      this.retrieveOwnTweets(this.props.username);
      window.addEventListener("refresh-own-tweets", () => {
        this.retrieveOwnTweets(this.props.user.username);
      });
    } else {
      this.refreshTimeline();
      window.addEventListener("time-line-refresh", () => {
        this.refreshTimeline();
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("time-line-refresh", () => {
      this.refreshTimeline();
    });
  }

  refreshTimeline() {
    const { user, timeline } = this.props;
    //if (timeline === null) {
    if (user !== null) {
      //if state.timeline !== null ? axios call : use state
      TimelineService.retrieveTimeline(user.username)
        .then((response) => {
          this.setState({
            tweets: response.data,
          });
          this.props.setTimeline(response.data);
        })
        .catch(() => {
          this.setState({
            error: "Sorry, Server Maintenance or Server Unreachable",
          });
        });
    }
    //} else {
    //  this.setState({ tweets: timeline });
    //}
  }

  retrieveOwnTweets(username) {
    const { user, ownTweets } = this.props;
    //if (ownTweets === null) {
    if (user !== null) {
      //if state.timeline !== null ? axios call : use state
      TimelineService.retrieveOwnTweets(username)
        .then((response) => {
          this.setState({
            tweets: response.data,
          });
          if (user.username === username) {
            this.props.setOwnTweets(response.data);
          }
        })
        .catch(() => {
          this.setState({
            error: "Sorry, Server Maintenance or Server Unreachable",
          });
        });
    }
    //} else {
    //  this.setState({ tweets: ownTweets });
    //}
  }

  onConnected = () => {};

  onTweetReceived = (tweet) => {
    this.setState((prevState) => ({
      tweets: [...prevState.tweets, tweet],
    }));
    this.setState({ onUpdate: true });
    this.refreshTimeline();
  };

  render() {
    let { tweets } = this.state;
    let { endpoint } = this.props;

    return (
      <div className="timeline">
        {endpoint !== "profile" ? (
          <div>
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
          </div>
        ) : (
          <div></div>
        )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KwetterComponentTimeLine);
