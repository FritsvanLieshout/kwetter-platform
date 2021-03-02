import React, { Component } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Tweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difference: 0
        }
    }

    getDatePosted(date) {
        var dateNow = new Date();
        var datePosted = new Date(date);
        let difference;

        // let dayNow;
        // let dayPosted;
        // let hourNow;
        // let hourPosted;
        // let minutesNow;
        // let minutesPosted;

        // let difference;
    
        // const diffMiliseconds = Math.abs(dateNow - datePosted);
        // const diffSeconds = Math.ceil(diffMiliseconds / 1000);
        // const diffMinutes = Math.ceil(diffSeconds / 60);
        // const diffHours = Math.ceil(diffMinutes / 60);
        // const diffDays = Math.ceil(diffHours / 24); 
        // console.log(diffMiliseconds + " milliseconds");
        // console.log(diffSeconds + " seconds")
        // console.log(diffMinutes + " minutes")
        // console.log(diffHours + " hours")
        // console.log(diffDays + " days");
        
        // dayNow = dateNow.getDay();
        // dayPosted = datePosted.getDay();

        // if ((dayNow - dayPosted) > 0) {
        //     difference = datePosted.getDate();
        // }

        // if (!difference) {
        //     hourNow = dateNow.getHours(); 
        //     hourPosted = datePosted.getHours();

        //     if ((hourNow - hourPosted) > 0) {
        //         difference = (hourNow - hourPosted) + " u" 
        //     }

        //     if (!difference) {
        //         minutesNow = dateNow.getMinutes();
        //         minutesPosted = datePosted.getMinutes();

        //         if ((minutesNow - minutesPosted) > 0) {
        //             difference = (minutesNow - minutesPosted) + " m"
        //         }

        //         if (!difference) {
        //             difference = (dateNow.getSeconds - datePosted.getSeconds) + " s"
        //         }
        //     }
        // }
    
        // return difference;

        var delta = Math.abs(dateNow - datePosted) / 1000;

        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        var seconds = delta % 60;

        if (days > 0) {
            difference = days + " d";
        }

        if (!difference && hours > 0) {
            difference = hours + " u";
        }

        if (!difference && minutes > 0) {
            difference = minutes + " m";
        }

        if (!difference) {
            difference = seconds + " s";
        }

        return difference;
        console.log(days, hours, minutes, seconds);
    }

    componentDidMount() {
        let diff = this.getDatePosted(this.props.tweet.posted);
        this.setState({ difference: diff });
    }

    render() {
        let { tweet } = this.props;
        let { difference } = this.state;

        return (
            <div className="tweet-container">
                <div className="tweet-header">
                    <div className="tweet-image"><img src={tweet.image} alt={tweet.accountName} className="profile-image"/></div>
                    <div className="tweet-account-name">{tweet.accountName}</div>
                    <div className="tweet-account-verified">{tweet.accountVerified ? <FontAwesomeIcon icon="check-circle" fixedWidth /> : <div></div>}</div>
                    <div className="tweet-account-username">{tweet.accountUsername}</div>
            
                    <div className="tweet-date-posted">{difference}</div>
                </div>
                <div className="tweet-body">
                    <div className="tweet-text">{tweet.text}</div>
                </div>
            </div>
        )
    }
}

export default Tweet;