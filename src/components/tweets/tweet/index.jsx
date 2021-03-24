import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

class KwetterComponentTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //difference: 0,
    };
  }

  // getDatePosted(date) {
  //   var dateNow = new Date();
  //   var datePosted = new Date(date);
  //   console.log(dateNow, datePosted);
  //   let difference;

  //   var delta = Math.abs(dateNow - datePosted) / 1000;

  //   var days = Math.floor(delta / 86400);
  //   delta -= days * 86400;

  //   var hours = Math.floor(delta / 3600) % 24;
  //   delta -= hours * 3600;

  //   var minutes = Math.floor(delta / 60) % 60;
  //   delta -= minutes * 60;

  //   var seconds = delta % 60;

  //   if (days > 0) {
  //     difference = days + " d";
  //   }

  //   if (!difference && hours > 0) {
  //     difference = hours + " u";
  //   }

  //   if (!difference && minutes > 0) {
  //     difference = minutes + " m";
  //   }

  //   if (!difference) {
  //     difference = seconds.toFixed(0) + " s";
  //   }

  //   return difference;
  //   //return difference;
  // }

  getDatePosted(posted) {
    let difference = 0;
    let prefix;
    const dateNow = new Date();
    const datePosted = new Date(posted);
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

  componentDidMount() {
    //let diff = this.getDatePosted(this.props.tweet.posted);
    this.setState({ dateNow: new Date() });
  }

  render() {
    let { tweet } = this.props;
    let { dateNow } = this.state;

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
            <div className="tweet-date-posted">
              {this.getDatePosted(tweet.posted)}
            </div>
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
