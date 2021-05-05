import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import TweetService from "services/TweetService";

class KwetterComponentFormTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
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
    this.setState({ value: value });
  }

  postTweet() {
    TweetService.postTweet(this.state.value).then((response) =>
      console.log(JSON.stringify(response))
    );
  }

  render() {
    let { value } = this.state;

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
      </div>
    );
  }
}

export default KwetterComponentFormTweet;
