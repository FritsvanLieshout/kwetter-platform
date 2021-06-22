import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home";
import LandingPage from "pages/landing";
import LoginComponent from "components/forms/login";
import RegisterComponent from "components/forms/register";
import ProfilePage from "pages/profile";
import PrivateRoute from "./PrivateRoute";
import ModeratorPage from "pages/moderator";

const roles = {
  User: "KWETTER_USER",
  Moderator: "KWETTER_ADMIN",
};

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute
        roles={[roles.User, roles.Moderator]}
        path="/home"
        exact
        component={HomePage}
      />
      <Route path="/" exact component={LandingPage} />
      <Route path="/signin" exact component={LoginComponent} />
      <Route path="/signup" exact component={RegisterComponent} />
      <PrivateRoute
        roles={[roles.User, roles.Moderator]}
        path="/profile/:username"
        exact
        component={ProfilePage}
      />
      <PrivateRoute
        roles={[roles.Moderator]}
        path="/mod/overview"
        exact
        component={ModeratorPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
