import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "redux/actions";
import AuthService from "services/AuthService";
import "./index.css";

import KwetterComponentTimeLine from "components/tweets/timeline";
import KwetterComponentCard from "components/cards/default";
import KwetterComponentNavBar from "components/navigation/navbar";

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFetched: false,
      message: null,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    AuthService.getUser()
      .then(
        (response) => {
          console.log(response.status);
          if (response.status === 200 || response.status === 201) {
            this.props.setUser(response.data);
            this.setState({ userFetched: true, message: null });
          }
          console.log(response.data);
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

  render() {
    let { userFetched } = this.state;

    if (userFetched) {
      return (
        <div className="container">
          <div className="left">
            <KwetterComponentNavBar />
          </div>
          <div className="center">
            <KwetterComponentTimeLine />
          </div>
          <div className="right">
            <KwetterComponentCard />
          </div>
        </div>
      );
    } else {
      return <div>NOOOOO</div>; //Loading
    }
  }
}

const TimeLine = connect(null, mapDispatchToProps)(HomePage);
export default TimeLine;
