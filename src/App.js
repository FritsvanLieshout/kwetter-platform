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
  faHome,
  faCog,
  faHashtag,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import { createGlobalStyle } from "styled-components";

library.add(
  fab,
  faCertificate,
  faUser,
  faCheckCircle,
  faComment,
  faHeart,
  faHome,
  faCog,
  faHashtag,
  faShare
);

const GlobalStyles = createGlobalStyle`
  html {
    --app-background-color: #ffffff;
    --app-text-color: #000000;

    --app-accent-color: #55cca2;
    --app-accent-light-color: #86f0ca;
    --app-icon-color: #ffffff;
    --app-primary-color: #55cca2;
    --app-secondary-color: #80c4ed;
    --app-like-color: #a83250;
    --app-lightgray: #F7F9FA;
    --app-darkgray: #202327;
    --app-shadow-text-color: #939A9E;
  }

  @media (prefers-color-scheme: dark) {
    html {
    --app-background-color: #111111;
    --app-lightgray: #202327;
    --app-darkgray: #F7F9FA;
    --app-text-color: #ffffff;
    }
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
