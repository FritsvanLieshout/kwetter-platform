import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home";
import LoginPage from "pages/login";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
