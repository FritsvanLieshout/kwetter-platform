import React, { Component } from "react";
import "./index.css";
import KwetterComponentNavBar from "components/navigation/navbar";
import ModeratorForm from "components/forms/moderator";

const users = [
  {
    id: 1,
    username: "fritsjhuuu1",
    nickName: "Frits van Lieshout",
    biography: "Voetballer",
    verified: true,
    role: "KWETTER_ADMIN",
  },
  {
    id: 2,
    username: "kevindebruyne",
    nickName: "KDB",
    biography: "Rode Duivel",
    verified: false,
    role: "KWETTER_USER",
  },
];

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "fritsjhuuu1",
        nickName: "FVL",
        biography: "PSV",
        verified: true,
        role: "KWETTER_ADMIN",
      },
    };
  }

  setSelectedUser(user) {
    var moderator = document.getElementById("moderator-popup");
    moderator.style.display = "block";
    this.setState({ user: user });
  }

  render() {
    let { user } = this.state;

    return (
      <div className="container">
        <div className="left">
          <KwetterComponentNavBar />
        </div>
        <div className="center">
          <table className="user-overview">
            <tr key={0}>
              <th>ID</th>
              <th>Username</th>
              <th>Nickname</th>
              <th>Biography</th>
              <th>Verified</th>
              <th>role</th>
            </tr>
            {!!users &&
              users.length > 0 &&
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
              ))}
          </table>
        </div>
        <div
          className="right"
          style={{
            marginLeft: "20px",
            width: "25%",
          }}
        >
          <ModeratorForm user={user} />
        </div>
      </div>
    );
  }
}

export default DashboardPage;
