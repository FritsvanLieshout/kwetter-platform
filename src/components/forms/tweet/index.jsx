import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import TweetService from "services/TweetService";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentFormTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      mentions: null,
      hashtags: null,
      message: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.postTweet = this.postTweet.bind(this);
  }

  componentDidMount() {
    document.addEventListener("tweet-form-clear", () => {
      document.getElementById("tweetForm").reset();
      this.setState({ value: "" });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("tweet-form-clear", () => {
      document.getElementById("tweetForm").reset();
      this.setState({ value: "" });
    });
  }

  handleChange(e) {
    const value = e.target.value;
    this.handleMentions(value);
    this.handleHashtags(value);
    this.setState({ value: value, message: null });
  }

  handleMentions(text) {
    var pattern = /\B@[a-z0-9_-]+/gi;
    var mentions = text.match(pattern);
    let mentionString = [];

    if (!!mentions && mentions.length > 0) {
      for (var mention of mentions) {
        var username = mention.split("@").pop();
        if (!mentionString.includes(username)) {
          mentionString = [...mentionString, username];
        }
      }
      this.setState({ mentions: mentionString.join() });
    }
  }

  handleHashtags(text) {
    var pattern = /\B#[a-z0-9_-]+/gi;
    var hashtags = text.match(pattern);
    let hashtagString = [];

    if (!!hashtags && hashtags.length > 0) {
      for (var hashtag of hashtags) {
        var tag = hashtag.split("#").pop();
        if (!hashtagString.includes(tag)) {
          hashtagString = [...hashtagString, tag];
        }
      }
      this.setState({ hashtags: hashtagString.join() });
    }
  }

  postTweet() {
    if (this.props.user !== null) {
      TweetService.postTweet(
        this.state.value,
        this.props.user,
        this.state.mentions,
        this.state.hashtags
      ).then((response) => {
        if (response.status === 200 || response.status === 201) {
          if (
            this.props.username !== null &&
            this.props.username === this.props.user.username
          ) {
            window.dispatchEvent(
              new Event("refresh-own-tweets", {
                bubbles: true,
                composed: true,
                detail: {},
              })
            );
          }
          document.getElementById("tweetForm").reset();
        }
        if (response.status === 204) {
          this.setState({ message: "Tweet cannot be posted!" });
        }
      });
    }

    window.dispatchEvent(
      new CustomEvent("close-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }

  render() {
    let { value, message } = this.state;

    return (
      <div className="tweet-form-container">
        <div className="tweet-header">
          <div className="tweet-image">
            <img
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              alt="img"
              className="profile-image"
            />
          </div>
          <div className="tweet-form-text">
            <form id="tweetForm">
              <input
                type="text"
                placeholder="Wat houd je bezig?"
                onKeyUp={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="tweet-form-button">
          <KwetterComponentButtonRounded
            disabled={!value}
            label="Tweeten"
            // event={{
            //   object: { userId: 1, message: value },
            //   endpoint: "tweets/tweet",
            // }}
            onClick={this.postTweet}
          />
        </div>
        <div className="alert" role="alert">
          {message}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentFormTweet);
