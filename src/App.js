import React from 'react';
import {Alert, Row} from "reactstrap";
import Mqtt from 'mqtt';
import {PublishForm} from "./components/PublishForm";


let client;

export default class App extends React.Component {

    state = {
        newTopic: '',
        newText: '',
        isPublished: false
    };


    componentDidMount() {
        const SERVER_URL = process.env.REACT_APP_MQTT_SERVER_URL;
        const USERNAME = process.env.REACT_APP_USERNAME;
        const PASSWORD = process.env.REACT_APP_PASSWORD;

        console.log("using server '%s'", SERVER_URL);

        client = Mqtt.connect('mqtt://' + SERVER_URL, {
            username: USERNAME,
            password: PASSWORD,
            clientId: 'mqttclient_' + Math.random()
        });

        client.on('connect', function () {
            console.log('connected with mqtt server ' + SERVER_URL);
        });
    }


    render() {
        return (
            <div>
                <h1>WELCOME TO PUBLISHER CLIENT</h1>
                <Row>
                    <PublishForm publishHandler={this.publishToTopic}
                                   topicHandler={e => this.topicHandler(e)}
                                   textHandler={e => this.textHandler(e)}
                    />

                    <Alert color="success" isOpen={this.state.isPublished} toggle={this.onCloseAlert}>
                        Message published
                    </Alert>

                </Row>
            </div>
        )
    }

    topicHandler = (topic) => {
        this.setState({
            newTopic: topic
        })
    };

    textHandler = (text) => {
        this.setState({
            newText: text
        })
    };

    onCloseAlert = () => {
        this.setState({
            isPublished: false
        })
    };

    publishToTopic = () => {

        if (this.state.newTopic.length > 0
        && this.state.newText.length > 0) {

            const topic = this.state.newTopic;
            const text = this.state.newText;

            const mqttMessage = JSON.stringify(  {"topic": topic, "text": text} );

            client.publish(topic, mqttMessage);

            console.log("published to topic: " + topic + " with text: " + text)

            this.setState({
                isPublished: true
            })

        } else {
            console.log("No topic or text");
        }
    };

    componentWillUnmount() {
        client.end(true);
    }

}
