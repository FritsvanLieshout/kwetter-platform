import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonTransparent from "components/buttons/transparent";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import KwetterComponentProfileNavbar from "components/navigation/profile";
import data from "data/endpoints.json";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthService from "services/AuthService";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KwetterComponentNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  componentDidMount() {
    this.setState({ menu: data.menu });
  }

  openModal() {
    window.dispatchEvent(
      new CustomEvent("open-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }

  logout() {
    AuthService.logout().then((res) => {
      if (res.status === 200 || res.status === 404 || res.status === 302) {
        console.log(res.data);
      }
      window.localStorage.removeItem("persist:root");
      window.location.replace("http://localhost:3000/signin");
    });
  }

  render() {
    let { menu } = this.state;
    let { user } = this.props;

    //TODO user info below in navbar
    return (
      <div className="sidebar-container">
        <div className="sidebar-header">Kwetter</div>
        <div className="sidebar-body">
          {menu &&
            menu.length > 0 &&
            menu.map((item) =>
              item.unique === true && user != null ? (
                <Link
                  to={item.endpoint + "/" + user.username}
                  className="sidebar-item"
                >
                  <KwetterComponentButtonTransparent
                    key={item.id}
                    endpoint={item.endpoint}
                    label={item.label}
                    icon={item.icon}
                    style={{ width: "auto" }}
                  />
                </Link>
              ) : item.endpoint === "logout" ? (
                <div className="sidebar-item">
                  <KwetterComponentButtonTransparent
                    key={item.id}
                    label={item.label}
                    icon={item.icon}
                    style={{ width: "auto" }}
                    onClick={this.logout}
                  />
                </div>
              ) : (
                <Link to={item.endpoint} className="sidebar-item">
                  <KwetterComponentButtonTransparent
                    key={item.id}
                    endpoint={item.endpoint}
                    label={item.label}
                    icon={item.icon}
                    style={{ width: "auto" }}
                  />
                </Link>
              )
            )}
          <KwetterComponentButtonRounded
            onClick={this.openModal}
            label="Tweeten"
            style={{
              fontSize: "22px",
              width: "200px",
              borderRadius: "50px",
              padding: "12px",
              marginTop: "50px",
            }}
          />
        </div>
        <div className="sidebar-footer">
          <KwetterComponentProfileNavbar />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(KwetterComponentNavBar);
