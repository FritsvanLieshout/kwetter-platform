import React, { Component } from "react";
import "./index.css";
import KwetterComponentProfileHeader from "components/header/profile";
import KwetterComponentTimeLine from "components/tweets/timeline";
import KwetterComponentCard from "components/cards/default";
import KwetterComponentNavBar from "components/navigation/navbar";
import KwetterComponentTweetModal from "components/modals/tweet";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="left">
          <KwetterComponentNavBar />
        </div>
        <div className="center">
          <KwetterComponentProfileHeader
            key={this.props.match.params.username + "0"}
            username={this.props.match.params.username}
          />
          <KwetterComponentTimeLine
            endpoint="profile"
            key={this.props.match.params.username + "1"}
            username={this.props.match.params.username}
          />
          <KwetterComponentTweetModal
            username={this.props.match.params.username}
          />
        </div>
        <div className="right">
          <KwetterComponentCard />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
