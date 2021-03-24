import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonTransparent from "components/buttons/transparent";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import data from "data/endpoints.json";
import { Link } from "react-router-dom";

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

  render() {
    let { menu } = this.state;

    return (
      <div className="sidebar-container">
        <div className="sidebar-header">Kwetter</div>
        <div className="sidebar-body">
          {menu &&
            menu.length > 0 &&
            menu.map((item) => (
              <Link to={item.endpoint} className="sidebar-item">
                <KwetterComponentButtonTransparent
                  key={item.id}
                  endpoint={item.endpoint}
                  label={item.label}
                  icon={item.icon}
                />
              </Link>
            ))}
          <KwetterComponentButtonRounded
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
      </div>
    );
  }
}

//"font-size: 22px; width: 200px; text-align:center"

export default KwetterComponentNavBar;
