import React from 'react';
import {Col, Card, CardBody, CardTitle, CardText} from "reactstrap";

export const PublishedMessageItem = ({messageItem}) =>
    <Col sm="6">
        <Card body inverse color="dark" className="m-3 p-0">
            <CardBody>
                <CardTitle><strong>Topic:</strong> {messageItem.topic}</CardTitle>
                <CardTitle><strong>Time:</strong> {messageItem.time}</CardTitle>
                <CardText><strong>Message:</strong> {messageItem.text}</CardText>
            </CardBody>
        </Card>
    </Col>;
