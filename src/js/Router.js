import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home";
import LandingPage from "pages/landing";
import LoginComponent from "components/forms/login";
import RegisterComponent from "components/forms/register";
import ProfilePage from "pages/profile";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "pages/dashboard";
import ForbiddenPage from "pages/forbidden";

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
      <Route path="/forbidden" exact component={ForbiddenPage} />
      <PrivateRoute
        roles={[roles.User, roles.Moderator]}
        path="/profile/:username"
        exact
        component={ProfilePage}
      />
      {/* <PrivateRoute
        roles={[roles.Moderator]}
        path="/dashboard"
        exact
        component={DashboardPage}
      /> */}
      <Route path="/dashboard" exact component={DashboardPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
