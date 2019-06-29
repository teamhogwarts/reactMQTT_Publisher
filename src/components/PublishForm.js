import React from 'react';
import {Col, Input, Card, CardBody, CardTitle, Button} from "reactstrap";


export const PublishForm = ({publishHandler, topicHandler, textHandler}) =>
    <Col md="8">
        <Card body inverse color="dark" className="mx-5 p-0">
            <CardBody>
                <CardTitle><strong>Publish your Text to Topic</strong></CardTitle>

                <Input id='inputTopic'
                       type="text"
                       placeholder={'Enter the Topic'}
                       name="topic"
                       onChange={e => topicHandler(e.target.value)}
                />

                <Input id='inputText'
                       type="text"
                       placeholder={'Enter the Text'}
                       name="text"
                       onChange={e => textHandler(e.target.value)}
                />

                <Button color="primary" onClick={() => {
                    publishHandler();
                    document.getElementById('inputTopic').value = '';
                    document.getElementById('inputText').value = '';
                }}
                >Publish</Button>

            </CardBody>
        </Card>
    </Col>;

