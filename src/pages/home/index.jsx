import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, setFollowing, setFollowers, setLikes } from "redux/actions";
import AuthService from "services/AuthService";
import FollowService from "services/FollowService";
import "./index.css";

import KwetterComponentTimeLine from "components/tweets/timeline";
import KwetterComponentCard from "components/cards/default";
import KwetterComponentNavBar from "components/navigation/navbar";
import KwetterComponentTweetModal from "components/modals/tweet";
import TrendingService from "services/TrendingService";
import LikeService from "services/LikeService";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setFollowing: (following) => dispatch(setFollowing(following)),
    setFollowers: (followers) => dispatch(setFollowers(followers)),
    setLikes: (likes) => dispatch(setLikes(likes)),
  };
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFetched: false,
      message: null,
      trendingItems: null,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchTrendingItems();
    window.addEventListener("init-followers", (event) => {
      this.initFollowers(event.detail.username);
    });
    window.addEventListener("init-following", (event) => {
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

  fetchData() {
    if (!!this.props.user) {
      this.initFollowers(this.props.user.username);
      this.initFollowing(this.props.user.username);
      this.initLikes(this.props.user.userId);
      this.setState({ userFetched: true, message: null });
    }
  }

  // fetchUser() {
  //   AuthService.getUser()
  //     .then(
  //       (response) => {
  //         if (response.status === 200 || response.status === 201) {
  //           this.props.setUser(response.data);
  //           this.initFollowers(response.data.username);
  //           this.initFollowing(response.data.username);
  //           this.initLikes(response.data.userId);
  //           this.setState({ userFetched: true, message: null });
  //         }
  //       },
  //       (error) => {
  //         this.setState({ message: error.response.data.message });
  //       }
  //     )
  //     .catch(() => {
  //       this.setState({
  //         message:
  //           "Sorry, Server Unavailable. Please contact us or check your internet connection!",
  //       });
  //     });
  // }

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

  initLikes(userId) {
    LikeService.getUserLikes(userId)
      .then((response) => {
        if (response.status === 200) {
          this.props.setLikes(response.data);
        }
      })
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  fetchTrendingItems() {
    TrendingService.retrieveTrendingItems()
      .then((response) => {
        if (response.status === 200) {
          this.setState({ trendingItems: response.data });
        }
      })
      .catch(() => {
        this.setState({
          message:
            "Sorry, Server Unavailable. Please contact us or check your internet connection!",
        });
      });
  }

  render() {
    let { userFetched, trendingItems } = this.state;

    if (userFetched) {
      return (
        <div className="container">
          <div className="left">
            <KwetterComponentNavBar />
          </div>
          <div className="center">
            <KwetterComponentTimeLine />
            <KwetterComponentTweetModal />
          </div>
          <div className="right">
            <KwetterComponentCard items={trendingItems} />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>; //Loading
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
