import React, { Component } from "react";

import KwetterComponentAuthForm from "components/forms/auth";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <KwetterComponentAuthForm />;
  }
}

export default LoginPage;
