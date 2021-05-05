import React, { Component } from "react";
import AuthService from "services/AuthService";
import KwetterComponentButtonRounded from "components/buttons/rounded";
import "./index.css";

class KwetterComponentAuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      nickName: "",
      loading: false,
      message: null,
      loginSuccessful: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("login-container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  login() {
    if (!!this.state.username && this.state.password) {
      AuthService.signIn(this.state.username, this.state.password)
        .then(
          (response) => {
            if (response.status === 200) {
              //this.setState({ loginSuccessful: true, message: null });
              console.log(response.headers.get("set-cookie"));
              //window.location.replace("http://localhost:3000/home");
            }
          },
          (error) => {
            this.setState({ message: "Invalid Credentials" });
          }
        )
        .catch(() => {
          this.setState({
            message:
              "Sorry, Server Unavailable. Please contact us or check your internet connection!",
          });
        });
    }
  }

  register() {
    if (!!this.state.username && this.state.password && this.state.nickName) {
      AuthService.signUp(
        this.state.username,
        this.state.password,
        this.state.nickName
      )
        .then(
          (response) => {
            if (response.status === 200) {
              //this.setState({ loginSuccessful: true, message: null });
              console.log("succes");
              //window.location.replace("http://localhost:3000/");
            }
          },
          (error) => {
            this.setState({ message: "Invalid Credentials" });
          }
        )
        .catch(() => {
          this.setState({
            message:
              "Sorry, Server Unavailable. Please contact us or check your internet connection!",
          });
        });
    }
  }

  validatePassword(password) {
    if (!password) {
      return false;
    }

    if (password.length > 7) {
      return true;
    }
    return false;
  }

  render() {
    let { username, password, nickName, message, loginSuccessful } = this.state;

    // if (loginSuccessful) {
    //   window.location.replace("http://localhost:3000/");
    // }

    return (
      <div className="login-container">
        <div className="login-form-container" id="login-container">
          <div className="form-container sign-up-container">
            <form className="login-form">
              <h1>Registreren</h1>
              <input
                className="login-input"
                type="text"
                placeholder="Gebruikersnaam"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <input
                className="login-input"
                type="text"
                placeholder="Bijnaam"
                name="nickName"
                value={nickName}
                onChange={this.handleChange}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Wachtwoord"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <KwetterComponentButtonRounded
                // disabled={!this.validatePassword(password)}
                label="Registreren"
                onClick={this.register}
              ></KwetterComponentButtonRounded>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="login-form">
              <h1>Inloggen</h1>
              <input
                className="login-input"
                type="text"
                placeholder="Gebruikersnaam"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Wachtwoord"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <KwetterComponentButtonRounded
                // disabled={!this.validatePassword(password)}
                label="Inloggen"
                // event={{
                //   object: { username: username, password: password },
                //   endpoint: "auth",
                // }}
                onClick={this.login}
              ></KwetterComponentButtonRounded>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welkom terug!</h1>
                <p>Meld je hier aan</p>
                <button className="auth-button" id="signIn">
                  Inloggen
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Wat er nu gebeurt</h1>
                <p>Meld je vandaag nog aan bij Kwetter</p>
                <button className="auth-button" id="signUp">
                  Registreren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KwetterComponentAuthForm;
