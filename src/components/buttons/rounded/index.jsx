import React, { Component } from "react";
import "./index.css";
import CrudService from "services/CrudService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class KwetterComponentButtonRounded extends Component {
  constructor(props) {
    super(props);
  }

  submit(event) {
    if (!!event) {
      this.getServiceEndpoint(event);
    }
  }

  getServiceEndpoint(event) {
    let endpoint = event.endpoint;

    // if (endpoint === "auth") {
    //   AuthService.signIn(event.object.username, event.object.password)
    //     .then(
    //       (response) => {
    //         if (response.status === 200) {
    //           //this.setState({ loginSuccessful: true, message: null });
    //           console.log("succes");
    //           //window.location.replace("http://localhost:3000/");
    //         }
    //       },
    //       (error) => {
    //         this.setState({ message: "Invalid Credentials" });
    //       }
    //     )
    //     .catch(() => {
    //       this.setState({
    //         message:
    //           "Sorry, Server Unavailable. Please contact us or check your internet connection!",
    //       });
    //     });
    // } else {
    CrudService.post(endpoint, event.object).then(() => {
      window.dispatchEvent(
        new Event("time-line-refresh", {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
      window.dispatchEvent(
        new Event("tweet-form-clear", {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
    });
  }
  render() {
    let { disabled, label, event, style, onClick, icon, hover } = this.props;

    return (
      <div>
        <button
          style={style}
          className={"button button-rounded " + (hover ? "button-hover" : "")}
          disabled={disabled}
          onClick={onClick}
        >
          {!!icon && !!icon !== null && (
            <FontAwesomeIcon icon={icon} fixedWidth />
          )}
          <div className="button-label-1">{label}</div>
          <div className="button-label-2">{hover ? "Ontvolg" : label}</div>
        </button>
      </div>
    );
  }
}

export default KwetterComponentButtonRounded;
