import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home";
import LandingPage from "pages/landing";
import LoginComponent from "components/forms/login";
import RegisterComponent from "components/forms/register";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={LandingPage} />
      <Route path="/signin" exact component={LoginComponent} />
      <Route path="/signup" exact component={RegisterComponent} />
    </Switch>
  </BrowserRouter>
);

export default Router;
