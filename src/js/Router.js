import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home";
import LoginPage from "pages/login";
import LoginComponent from "components/forms/login";
import RegisterComponent from "components/forms/register";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={LoginPage} />
      <Route path="/signin" exact component={LoginComponent} />
      <Route path="/signup" exact component={RegisterComponent} />
    </Switch>
  </BrowserRouter>
);

export default Router;
