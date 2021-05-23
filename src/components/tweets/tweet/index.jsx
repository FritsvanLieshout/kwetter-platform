import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class KwetterComponentTweet extends Component {
  constructor(props) {
    super(props);
  }

  getDatePosted(posted) {
    let difference = 0;
    let prefix;
    const dateNow = new Date();
    let datePosted = new Date(posted);
    datePosted = new Date(datePosted.toString());

    const months = [
      "jan.",
      "feb.",
      "mrt.",
      "apr.",
      "jun.",
      "jul.",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec.",
    ];

    difference = this.getDifferenceInDays(dateNow, datePosted);
    prefix = " d";

    if (difference > 7) {
      if (datePosted.getFullYear() === dateNow.getFullYear()) {
        difference = datePosted.getDate() + " " + months[datePosted.getMonth()];
      } else {
        difference =
          datePosted.getDate() +
          " " +
          months[datePosted.getMonth()] +
          " " +
          datePosted.getFullYear();
      }
      prefix = undefined;
    }

    if (difference < 1) {
      difference = this.getDifferenceInHours(dateNow, datePosted);
      prefix = " h";

      if (difference < 1) {
        difference = this.getDifferenceInMinutes(dateNow, datePosted);
        prefix = " m";

        if (difference < 1) {
          difference = this.getDifferenceInSeconds(dateNow, datePosted);
          prefix = " s";
        }
      }
    }

    if (!!prefix) {
      return difference.toFixed(0) + prefix;
    }
    return difference;
  }

  getDifferenceInDays(dateNow, datePosted) {
    const diffInMs = Math.abs(datePosted - dateNow);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  getDifferenceInHours(dateNow, datePosted) {
    const diffInMs = Math.abs(datePosted - dateNow);
    return diffInMs / (1000 * 60 * 60);
  }

  getDifferenceInMinutes(dateNow, datePosted) {
    const diffInMs = Math.abs(datePosted - dateNow);
    return diffInMs / (1000 * 60);
  }

  getDifferenceInSeconds(dateNow, datePosted) {
    const diffInMs = Math.abs(datePosted - dateNow);
    return diffInMs / 1000;
  }

  render() {
    let { tweet } = this.props;

    return (
      <div>
        <div className="tweet-container">
          <Link
            to={"/profile/" + tweet.tweetUser.username}
            className="tweet-header"
          >
            <div className="tweet-image">
              <img
                src={
                  tweet.tweetUser && tweet.tweetUser.profileImage
                    ? tweet.tweetUser.profileImage
                    : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                }
                alt={
                  tweet.tweetUser && tweet.tweetUser.userId
                    ? tweet.tweetUser.userId
                    : 0
                }
                className="profile-image"
              />
            </div>
            <div className="tweet-account-name">
              <div className="tweet-account-username">
                {tweet.tweetUser && tweet.tweetUser.nickName
                  ? tweet.tweetUser.nickName
                  : "Undefined"}
              </div>
              <a>
                @
                {tweet.tweetUser && tweet.tweetUser.username
                  ? tweet.tweetUser.username
                  : "undefined"}
              </a>
            </div>
            <div className="tweet-account-verified">
              {tweet.tweetUser && tweet.tweetUser.verified ? (
                <FontAwesomeIcon icon="check-circle" fixedWidth />
              ) : (
                <div></div>
              )}
            </div>
            <div className="tweet-date-posted">
              {this.getDatePosted(tweet.tweetPosted)}
            </div>
          </Link>
          <div className="tweet-body">
            <div className="tweet-text">{tweet.tweetMessage}</div>
          </div>
          <div className="tweet-footer">
            <a className="icon-heart">
              <FontAwesomeIcon icon="heart" fixedWidth />
              <span> {tweet.likes ? tweet.likes : 1}</span>
            </a>
            <a className="icon-share">
              <FontAwesomeIcon icon="share" fixedWidth />
            </a>
          </div>
        </div>
        <div className="tweet-space"></div>
      </div>
    );
  }
}

export default KwetterComponentTweet;
