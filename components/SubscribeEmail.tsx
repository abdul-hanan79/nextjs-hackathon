import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import MainButton from './MainButton'
const SubscribeEmail = (props:any) => {
    return (
        <div>
            <InputGroup className="bg-light email-input-div">
                <Form.Control
                    placeholder="Enter Your Email Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="email-input"
                />
                <MainButton title={props.title} id="button-addon2" src={props.src} />
            </InputGroup>
        </div>
    )
}

export default SubscribeEmail
