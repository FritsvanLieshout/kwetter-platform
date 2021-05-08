import React, { Component } from "react";
import "./index.css";
import KwetterComponentProfileHeader from "components/header/profile";
import KwetterComponentTimeLine from "components/tweets/timeline";
import KwetterComponentCard from "components/cards/default";
import KwetterComponentNavBar from "components/navigation/navbar";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Voor de user die je opzoekt andere endpoint (/status/naam)
  }

  render() {
    return (
      <div className="container">
        <div className="left">
          <KwetterComponentNavBar />
        </div>
        <div className="center">
          <KwetterComponentProfileHeader
            username={this.props.match.params.username}
          />
          <KwetterComponentTimeLine
            endpoint="profile"
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
