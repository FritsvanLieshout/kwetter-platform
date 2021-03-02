import React, { Component } from "react";

import TimeLine from '../components/tweets/timeline';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            welcome: "Welkom"
        }
    }

    render() {
        let { welcome } = this.state;

        return <div><TimeLine /></div>
    }
}

export default HomePage;