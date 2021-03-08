import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Router from "./js/Router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCertificate,
  faUser,
  faCheckCircle,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { createGlobalStyle } from "styled-components";

library.add(fab, faCertificate, faUser, faCheckCircle, faComment, faHeart);

const GlobalStyles = createGlobalStyle`
  html {
    --app-background-color: #ffffff;
    --app-text-color: #000000;

    --app-dark-background-color: #111111;
    --app-dark-text-color: #ffffff;

    --app-accent-color: #1da1f2;
    --app-icon-color: #ffffff;
    --app-primary-color: #1da1f2;
    --app-secondary-color: #80c4ed;
    --app-like-color: #a83250;
    --app-lightgray: #BAB6B9;
    --app-darkgray: #202327;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <Router />
    </div>
  );
}

export default App;
