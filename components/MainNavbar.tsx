import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MainButton from './MainButton';
import Router, { useRouter } from 'next/router';
import useLogin from '../cutoomHooks/useLogin';
import useEvents from '../cutoomHooks/useEvents';
import { useSelector } from 'react-redux';
import authSlice from '../store/authSlice';
function MainNavbar() {
  const auth = useSelector((state: any) => state.authSlice)
  console.log("auth slice in navbare", auth.isLoggedIn);
  const router = useRouter()
  const { goToEventsPage } = useEvents()
  const { goToSignupPage, gotoSignOut, goToHome, goToLoginPage } = useLogin()



  return (
    <Navbar bg="dark" expand="lg" className="main-navbar">
      <Container>
        <Navbar.Brand onClick={goToHome} className="text-light fw-bold navbar-brand">Event Planner Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={goToHome} className='fs-5 navbar-links'>Home</Nav.Link>
            <Nav.Link onClick={goToEventsPage} className='fs-5 navbar-links'>Events</Nav.Link>

          </Nav>
          {!auth.isLoggedIn ? <div className='d-flex gap-2'>
            <MainButton title="Login" onClick={goToLoginPage} />
            <MainButton title="Signup" onClick={goToSignupPage} />
          </div> : <MainButton title="SignOut" onClick={gotoSignOut} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;