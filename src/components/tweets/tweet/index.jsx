import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setLikes } from "redux/actions";
import LikeService from "services/LikeService";

function mapDispatchToProps(dispatch) {
  return {
    setLikes: (likes) => dispatch(setLikes(likes)),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    likes: state.likes,
  };
};

class KwetterComponentTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyLiked: false,
      likeCount: 0,
    };
  }

  componentDidMount() {
    if (!!this.props && !!this.props.tweet) {
      this.checkIfAlreadyLiked(this.props.tweet.id);
      this.checkTweetLikeCount(this.props.tweet.id);
    }
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

  checkIfAlreadyLiked(tweetId) {
    const likes = this.props.likes;
    if (!!likes && likes.length > 0) {
      for (var like of likes) {
        console.log(like + ", " + tweetId);
        if (like === tweetId) {
          this.setState({ alreadyLiked: true });
        }
      }
    }
  }

  checkTweetLikeCount(tweetId) {
    LikeService.getLikesByTweet(tweetId).then((response) => {
      if (response.status === 200) {
        this.setState({ likeCount: response.data });
      }
    });
  }

  actionLike(tweetId, alreadyLiked) {
    if (alreadyLiked) {
      LikeService.unLikeTweet(this.props.user.userId, tweetId).then(
        (response) => {
          if (response.status === 200 || response.status === 204) {
            console.log("Gedisliked");
            this.setState({ alreadyLiked: false });
            LikeService.getUserLikes(this.props.user.userId).then((res) => {
              if (res.status === 200) {
                this.props.setLikes(res.data);
                this.checkTweetLikeCount(this.props.tweet.id);
              }
            });
          }
        }
      );
    } else {
      LikeService.likeTweet(this.props.user.userId, tweetId).then(
        (response) => {
          if (response.status === 200 || response.status === 204) {
            console.log("Liked");
            this.setState({ alreadyLiked: true });
            LikeService.getUserLikes(this.props.user.userId).then((res) => {
              if (res.status === 200) {
                this.props.setLikes(res.data);
                this.checkTweetLikeCount(this.props.tweet.id);
              }
            });
          }
        }
      );
    }
  }

  render() {
    let { likeCount, alreadyLiked } = this.state;
    let { tweet, style, mention } = this.props;

    return (
      <div>
        <div className="tweet-container" style={style}>
          <Link
            to={"/profile/" + tweet.tweetUser.username}
            className="tweet-header"
            style={mention ? { display: "flex" } : {}}
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
              {this.getDatePosted(
                tweet.tweetPosted
                  ? tweet.tweetPosted
                  : tweet.posted
                  ? tweet.posted
                  : null
              )}
            </div>
          </Link>
          <div
            className="tweet-body"
            style={mention ? { textAlign: "left" } : {}}
          >
            <div className="tweet-text">
              {tweet.tweetMessage
                ? tweet.tweetMessage
                : tweet.message
                ? tweet.message
                : ""}
            </div>
          </div>
          <div className="tweet-footer">
            <a
              className="icon-heart"
              style={{ color: alreadyLiked ? "red" : "" }}
              onClick={() => this.actionLike(tweet.id, alreadyLiked)}
            >
              <FontAwesomeIcon icon="heart" fixedWidth />
              <span> {likeCount}</span>
            </a>
          </div>
        </div>
        <div className="tweet-space"></div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KwetterComponentTweet);
