import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class KwetterComponentTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difference: 0,
    };
  }

  getDatePosted(date) {
    var dateNow = new Date();
    var datePosted = new Date(date);
    let difference;

    var delta = Math.abs(dateNow - datePosted) / 1000;

    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    var seconds = delta % 60;

    if (days > 0) {
      difference = days + " d";
    }

    if (!difference && hours > 0) {
      difference = hours + " u";
    }

    if (!difference && minutes > 0) {
      difference = minutes + " m";
    }

    if (!difference) {
      difference = seconds.toFixed(0) + " s";
    }

    return difference;
    //return difference;
  }

  componentDidMount() {
    let diff = this.getDatePosted(this.props.tweet.posted);
    this.setState({ difference: diff });
  }

  render() {
    let { tweet } = this.props;
    let { difference } = this.state;

    return (
      <div>
        <div className="tweet-container">
          <div className="tweet-header">
            <div className="tweet-image">
              <img
                src={
                  !!tweet.image
                    ? tweet.image
                    : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                }
                alt={tweet.userId}
                className="profile-image"
              />
            </div>
            <div className="tweet-account-name">
              <div className="tweet-account-username">
                {tweet.account && tweet.account.name && tweet.account.surname
                  ? tweet.account.name + " " + tweet.account.surname
                  : "Undefined"}
              </div>
              <a>
                @
                {tweet.account && tweet.account.username
                  ? tweet.account.username
                  : "USER_" + tweet.userId}
              </a>
            </div>
            <div className="tweet-account-verified">
              {tweet.verified ? (
                <FontAwesomeIcon icon="check-circle" fixedWidth />
              ) : (
                <div></div>
              )}
            </div>
            <div className="tweet-date-posted">{difference}</div>
          </div>
          <div className="tweet-body">
            <div className="tweet-text">{tweet.message}</div>
          </div>
        </div>
        <div className="tweet-space"></div>
      </div>
    );
  }
}

export default KwetterComponentTweet;
