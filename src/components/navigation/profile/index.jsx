import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentProfileNavbar extends Component {
  render() {
    let { user } = this.props;

    return (
      <div>
        <div className="profile-header">
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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentProfileNavbar);
