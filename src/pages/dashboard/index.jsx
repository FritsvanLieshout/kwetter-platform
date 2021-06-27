import React, { Component } from "react";
import "./index.css";
import KwetterComponentNavBar from "components/navigation/navbar";
import ModeratorForm from "components/forms/moderator";
import ModerationService from "services/ModerationService";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: null,
    };
  }

  componentDidMount() {
    this.initUsers();
  }

  initUsers() {
    ModerationService.retrieveUsers().then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data });
      }
    });
  }

  setSelectedUser(user) {
    if (!!this.props.user && this.props.user.username === user.username) {
      return;
    }
    this.setState({ user: user });
    var moderator = document.getElementById("moderator-popup");
    moderator.style.display = "block";
  }

  render() {
    let { user, users } = this.state;

    return (
      <div className="container">
        <div className="left">
          <KwetterComponentNavBar />
        </div>
        <div className="center" style={{ marginLeft: "-150px" }}>
          <table className="user-overview">
            <tr key={0} style={{ cursor: "default" }}>
              <th>ID</th>
              <th>Username</th>
              <th>Nickname</th>
              <th>Biography</th>
              <th>Verified</th>
              <th>role</th>
            </tr>
            {!!users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} onClick={() => this.setSelectedUser(user)}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.nickName}</td>
                  <td>{user.biography}</td>
                  {user.verified}
                  <td>
                    <label className="table-label">
                      <input
                        type="checkbox"
                        checked={user.verified}
                        className="table-input"
                      ></input>
                    </label>
                  </td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr key={1} style={{ cursor: "default", textAlign: "center" }}>
                <td colSpan="6">No users found :(</td>
              </tr>
            )}
          </table>
        </div>
        <div
          className="right"
          style={{
            marginLeft: "20px",
            width: "20%",
          }}
        >
          <ModeratorForm user={user} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashboardPage);
