import React, { Component } from "react";
import Tweet from "../tweet";
import "./index.css";
import logo from '../../../assets/images/default_profile_400x400.png'

class TimeLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [{ image: logo, accountName: "Frits van Lieshout", accountVerified: true, accountUsername: "@Fritsjhuuu21", posted: "2021-02-26 16:01:00", text: "Initial Tweet"}, { image: logo, accountName: "Frits van Lieshout", accountVerified: true, accountUsername: "@Fritsjhuuu21", posted: "2021-02-26 16:02:00", text: "Second Tweet"}, { image: logo, accountName: "Frits van Lieshout", accountVerified: true, accountUsername: "@Fritsjhuuu21", posted: "2021-03-01 16:01:00", text: "Test Tweet"}]
        }
    }

    render() {
        let { tweets } = this.state;

        return (
            <div className="timeline">
                <div>Startpagina</div>
                {!!tweets && tweets.length > 0 ? 
                    tweets.map((tweet, index) => (
                        <Tweet tweet={tweet} key={index} />
                    )) 
                    : <div>No Feed </div>
                }
            </div>
        )
    }
}

export default TimeLine;