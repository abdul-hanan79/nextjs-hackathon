import React from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import MainButton from '../components/MainButton'
import useLogin from '../cutoomHooks/useLogin'
import Image from 'next/image';
const Login = () => {
    const user = useSelector((state: any) => state.authSlice.singupUser)
    const { email,
        setEmail,
        password,
        setPassword,
        loader, goToSignupPage,
        onSubmitHandler } = useLogin()
    // const { goToSingupPage } = useLogin()
    return (
        <Container className='bg-dark ' fluid>
            <Row className='justify-content-center align-items-center gap-5'>
                <Col lg={5}>

                    {/* <Image src="https://c8.alamy.com/comp/2AAACBB/doodle-hand-drawn-element-of-new-year-celebration-in-neon-color-2AAACBB.jpg" className='img-fluid' alt="image"  width={500}  height={500} /> */}
                </Col>
                <Col lg={4}>
                    <h1 className='text-center text-light'>Login and Join us</h1>
                    <p>welcome to our application</p>
                    <div className='p-2'>
                        <InputGroup className="mb-3 input-form">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-form">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder="password"
                                aria-label="password"
                                type="password"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label text-light" >
                                Remember Me
                            </label>
                        </div>
                        <div className=''>
                            <MainButton title="Login" onClick={onSubmitHandler} />
                        </div>
                        <p className='text-light'>dont have account?</p> <MainButton title="singup" className="signup-btn" onClick={goToSignupPage} /> 
                         
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default Login
