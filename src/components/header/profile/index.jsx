import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "services/AuthService";
import FollowService from "services/FollowService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import { setFollowing } from "redux/actions";
import "./index.css";
import KwetterComponentProfileModal from "components/modals/profile";

function mapDispatchToProps(dispatch) {
  return {
    setFollowing: (following) => dispatch(setFollowing(following)),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    followers: state.followers,
    following: state.following,
  };
};

class KwetterComponentProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: {},
      followers: {},
      userFetched: false,
      message: null,
      user: {},
      ownProfile: false,
    };
  }

  componentDidMount() {
    if (
      this.props.username !== null ||
      (this.props.username !== undefined && this.props.user !== null)
    ) {
      if (this.props.username === this.props.user.username) {
        this.setState({ ownProfile: true });
        this.initOwnProfile();
      } else {
        this.setState({ ownProfile: false });
        this.initProfile(this.props.username);
      }
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.username !== newProps.username) {
      if (this.props.username === this.props.user.username) {
        this.setState({ ownProfile: true });
        this.initOwnProfile();
      } else {
        this.setState({ ownProfile: false });
        this.initProfile(this.props.username);
      }
    }
  }

  initOwnProfile() {
    if (this.props.following !== null) {
      this.setState({ following: this.props.following });
    }

    if (this.props.followers !== null) {
      this.setState({ followers: this.props.followers });
    }
    this.setState({ user: this.props.user, userFetched: true });
  }

  initProfile() {
    AuthService.fetchUser(this.props.username)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({ user: response.data, message: null });
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

    this.initFollowing(this.props.username);
    this.initFollowers(this.props.username);
    if (this.state.user !== null) {
      this.setState({ userFetched: true });
    }
  }

  initFollowers(username) {
    FollowService.getFollowers(username)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              followers: response.data,
              message: null,
            });
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
            this.setState({
              following: response.data,
              message: null,
            });
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

  checkIfUserFollowAccount() {
    let result = false;

    if (this.props.username !== null && this.props.following !== null) {
      const username = this.props.username;
      result = this.props.following.follows.some(function (f) {
        return f["followingUsername"] === username;
      });
    }

    return result;
  }

  followClicked(alreadyFollowing) {
    if (this.props.user.username && this.props.username !== null) {
      if (!alreadyFollowing) {
        FollowService.followUser(
          this.props.user.username,
          this.props.username
        ).then((response) => {
          if (response.status === 200) {
            this.refreshFollowing(this.props.user.username);
          }
        });
      } else {
        FollowService.unFollowUser(
          this.props.user.username,
          this.props.username
        ).then((response) => {
          if (response.status === 200) {
            this.refreshFollowing(this.props.user.username);
          }
        });
      }
    }
  }

  refreshFollowing(username) {
    FollowService.getFollowing(username)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.setFollowing(response.data);
            this.initProfile(this.props.username);
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

  openModal() {
    console.log("OPEN THIS");
    window.dispatchEvent(
      new CustomEvent("open-profile-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }

  render() {
    let { following, followers, user, userFetched, ownProfile } = this.state;
    const alreadyFollowingUser = this.checkIfUserFollowAccount();

    if (userFetched) {
      return (
        <div className="profile-container">
          <div className="profile-header">
            <div className="profle-image">
              <img
                src={
                  user.profileImage
                    ? user.profileImage
                    : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                }
                alt={user.userId ? user.userId : 0}
                className="main-profile-image"
              />
            </div>
            <div className="profile-button">
              {!ownProfile ? (
                <div>
                  <KwetterComponentButtonRounded
                    hover={alreadyFollowingUser}
                    label={alreadyFollowingUser ? "Volgend" : "Volgen"}
                    onClick={() => this.followClicked(alreadyFollowingUser)}
                    style={{
                      fontSize: "16px",
                      width: "100px",
                      borderRadius: "50px",
                      padding: "12px",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <KwetterComponentButtonRounded
                    label="Profiel instellen"
                    onClick={this.openModal}
                    style={{
                      fontSize: "16px",
                      width: "150px",
                      borderRadius: "50px",
                      padding: "12px",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="profile-account-name">
              <div className="profile-account-username">
                {user.nickName ? user.nickName : "Undefined"}
              </div>
              <div className="profile-account-verified">
                {user.verified ? (
                  <FontAwesomeIcon icon="check-circle" fixedWidth />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="profile-username">
              @{user.username ? user.username : "undefined"}
            </div>
            <div className="profile-bio">
              {user.biography ? user.biography : ""}
            </div>
            <div className="profile-follow">
              <div className="follow">
                <b>{following.count ? following.count : 0}</b> Volgend
              </div>
              <div className="follow">
                <b>{followers.count ? followers.count : 0}</b> Volgers
              </div>
            </div>
          </div>
          <KwetterComponentProfileModal />
        </div>
      );
    } else {
      return <div>Geen data...</div>;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KwetterComponentProfileHeader);
