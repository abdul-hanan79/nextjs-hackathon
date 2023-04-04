import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CardSpaceWalking from '../components/CardSpaceWalking'
import Counter from '../components/Counter'
import MainButton from '../components/MainButton'
import MainNavbar from '../components/MainNavbar'
import useEvents from '../cutoomHooks/useEvents'
import authSlice, { fetchCurrentUser } from '../store/authSlice'
// import styles from '../styles/Home.module.css'
// import '../styles/landingPage.module.css'
import Browse from '../sections/Browse'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/Store'
const Home: NextPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  useEffect(() => {
    console.log("index.ts");
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  // const currentUser = useSelector((state) => state.authSlice.user?.email)
  // console.log("current user", currentUser);
  const { goToEventsPage } = useEvents()

  return (
    <>
      {/* <MainNavbar /> */}
      <div className='hero-section'>
        <Container className='hero-section-container' >
          <Row className='justify-content-center '>
            <Col lg={6} md={6} sm={12} >
              <div className=''>
                <h1 className='hero-heading'>Welcome to the Event Planner app! </h1>
                <p className='paragraph hero-para text-light'>Our real-time collaboration tool makes event planning a breeze. With features such as creating events, inviting attendees, and tracking RSVPs, you can easily stay organized and keep your attendees informed. Whether youre planning a small get-together or a large conference, the Event Planner app helps streamline the event planning process and make it a success. Sign up or log in now to get started!</p>
                <MainButton title="Explore Events" onClick={goToEventsPage} />

                <Row className='mt-5'>
                  <Col>
                    <Counter number="240K" name="Total Sale" />
                  </Col>
                  <Col>
                    <Counter number="100K" name="Acutions" />

                  </Col>
                  <Col>
                    <Counter number="240K" name="Artits" />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} className="">
              <CardSpaceWalking src="https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M=" title="Space Walking" text="animakid" />

            </Col>
          </Row>
        </Container>
        <Browse />

        {/* {/* <h1>hello this is hero section</h1> */}
      </div>
    </>
  )
}

export default Home

{/* <MainButton title="Explore Events" onClick={goToEventsPage} /> */ }