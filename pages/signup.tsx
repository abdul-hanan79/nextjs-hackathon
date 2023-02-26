import React from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import MainButton from '../components/MainButton'
import useSingup from '../cutoomHooks/useSignup'



const signup = () => {
    const { userName,
        setUsername,
        email,
        setEmail,
        password, setPassword, loader, onSubmitHandler } = useSingup()
    return (
        <Container fluid className='bg-dark'>
            <Row className='justify-content-center align-items-center sign-row gap-5'>
                <Col lg={5}>
                    <h1 className='text-light'>Welcome to the Event Planner app! </h1>
                    <h5 className='text-light'>Our real-time collaboration tool makes event planning a breeze. With features such as creating events, inviting attendees, and tracking RSVPs, you can easily stay organized and keep your attendees informed. Whether you're planning a small get-together or a large conference, the Event Planner app helps streamline the event planning process and make it a success. Sign up or log in now to get started!</h5>

                </Col>
                <Col lg={3}>
                    <h1 className="text-light text-center">SignUp form </h1>
                    <h3 className='text-light text-center'>join us!</h3>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="password"
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <MainButton title="singup" onClick={onSubmitHandler} />
                </Col>
            </Row>

        </Container >
    )
}

export default signup
