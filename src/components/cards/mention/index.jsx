import React, { Component } from "react";
import KwetterComponentTweet from "components/tweets/tweet";
import "./index.css";
import TweetService from "services/TweetService";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentMentionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentions: null,
    };
  }

  componentDidMount() {
    this.initMentions();
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.username !== newProps.username) {
      this.initMentions();
    }
  }

  initMentions() {
    if (!!this.props && !!this.props.username)
      TweetService.retrieveMentions(this.props.username).then((response) => {
        if (response.status === 200) {
          this.setState({ mentions: response.data });
        }
      });
  }

  render() {
    let { mentions } = this.state;
    let { username } = this.props;

    return (
      <div className="card" style={{ width: "350px" }}>
        <div className="header">Mentions</div>
        <div className="items">
          {!!mentions &&
            mentions.length > 0 &&
            mentions.map((mention, index) => (
              <KwetterComponentTweet
                tweet={mention}
                key={index}
                style={{
                  background: "var(--app-lightgray)",
                  minWidth: "340px",
                }}
                mention={true}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentMentionCard);
