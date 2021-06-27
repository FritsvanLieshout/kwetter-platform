import React, { Component } from "react";
import "./index.css";
import KwetterComponentButtonRounded from "components/buttons/rounded";

class LandingPage extends Component {
  registerClicked() {
    window.location.replace("http://20.86.242.101:3000/signup");
  }

  loginClicked() {
    window.location.replace("http://20.86.242.101:3000/signin");
  }

  render() {
    return (
      <div className="landing-container">
        <div className="landing-left">
          <span className="landing-span-title">Kwetter</span>
        </div>
        <div className="landing-right">
          <span className="landing-span-title">Wat er nu gebeurt</span>
          <span className="landing-span-description">
            Meld je vandaag nog aan bij Kwetter
          </span>
          <div className="landing-buttons">
            <KwetterComponentButtonRounded
              onClick={this.loginClicked}
              label="Inloggen"
              style={{
                width: "150px",
                backgroundColor: "var(--app-background-color)",
                border: "1px solid var(--app-accent-color)",
                color: "var(--app-accent-color)",
              }}
            />
            <KwetterComponentButtonRounded
              onClick={this.registerClicked}
              label="Registreren"
              style={{ width: "150px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
