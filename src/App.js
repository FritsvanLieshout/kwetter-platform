import React from 'react';
import logo from './logo.svg';
import './App.css';

import Router from "./js/Router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCertificate, faUser, faCheckCircle, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCertificate, faUser, faCheckCircle, faComment, faHeart)

function App() {
  return (
    <div><Router /></div>
  );
}

export default App;
