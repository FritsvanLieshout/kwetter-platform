import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, setFollowing, setFollowers } from "redux/actions";
import AuthService from "services/AuthService";
import FollowService from "services/FollowService";
import "./index.css";

import KwetterComponentTimeLine from "components/tweets/timeline";
import KwetterComponentCard from "components/cards/default";
import KwetterComponentNavBar from "components/navigation/navbar";

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setFollowing: (following) => dispatch(setFollowing(following)),
    setFollowers: (followers) => dispatch(setFollowers(followers)),
  };
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFetched: false,
      message: null,
    };
  }

  componentDidMount() {
    this.fetchUser();
    window.addEventListener("init-followers", (event) => {
      console.log(event.detail);
      this.initFollowers(event.detail.username);
    });
    window.addEventListener("init-following", (event) => {
      console.log(event.detail);
      this.initFollowing(event.detail.username);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("init-followers", () => {
      this.initFollowing(null);
    });
    window.removeEventListener("init-following", () => {
      this.initFollowing(null);
    });
  }

  fetchUser() {
    AuthService.getUser()
      .then(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            this.props.setUser(response.data);
            this.initFollowers(response.data.username);
            this.initFollowing(response.data.username);
            this.setState({ userFetched: true, message: null });
          }
        },
        (error) => {
          this.setState({ message: error.response.data.message });
        }
      )
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  initFollowers(username) {
    FollowService.getFollowers(username)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.setFollowers(response.data);
          }
        },
        (error) => {
          this.setState({ message: error.response.data.message });
        }
      )
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  initFollowing(username) {
    FollowService.getFollowing(username)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.setFollowing(response.data);
          }
        },
        (error) => {
          this.setState({ message: error.response.data.message });
        }
      )
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  render() {
    let { userFetched } = this.state;

    if (userFetched) {
      return (
        <div className="container">
          <div className="left">
            <KwetterComponentNavBar />
          </div>
          <div className="center">
            <KwetterComponentTimeLine />
          </div>
          <div className="right">
            <KwetterComponentCard />
          </div>
        </div>
      );
    } else {
      return <div>NOOOOO</div>; //Loading
    }
  }
}

const TimeLine = connect(null, mapDispatchToProps)(HomePage);
export default TimeLine;
