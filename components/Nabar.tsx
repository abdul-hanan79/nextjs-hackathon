import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from '../assests/logo.png'
import MainButton from './MainButton';
import signupLogo from "../assests/User.png"
const Nabar = () => {
    return (
        <Navbar  expand="lg" fixed="top">
            <Container className='justify-content-center'>
                <div className=''><Link to="/"> <img src={Logo} alt='logo' /></Link></div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='bg-light'>
                    <Nav className="bg-dark  ">
                        <ul className='d-flex gap-4 align-items-center list-unstyled'>
                            <li className='navbar-links'><Link to='/marketplace'>Marketplace</Link></li>
                            <li className='navbar-links'><Link to='/ranking'>Rankings</Link></li>
                            <li className='navbar-links'><Link to='/wallet'>Connect a wallet</Link></li>
                            <li><Link to='/signup'><MainButton title="Sign Up" src={signupLogo} /></Link></li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}




export default Nabar
