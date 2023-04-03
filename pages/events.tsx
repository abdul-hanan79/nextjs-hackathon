import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import CardDiscover from '../components/CardDiscover'
import EvenCreations from '../components/EvenCreations'
import MainButton from '../components/MainButton'
import useEvents from '../cutoomHooks/useEvents'
import { useSelector } from 'react-redux'

const Events = () => {

  const { goToEventsPage,
    showComponent,
    componentShow,
    eventList,
    setEditTitle,
    setEditDate,
    setEditTime,
    setEditLocation,
    setEditDescription,
    editTitle,
    editDate,
    editTime,
    editLocation,
    isUpdate,
    eventId,
    editDescription, eventEditHandler, eventUpdateHandler,eventDeleteHandler } = useEvents()
  console.log("the value of evenList", eventList);
  console.log("showComponent", showComponent);
  const userId = useSelector((state: any) => state.authSlice.user.uid)
  console.log("user id in events",userId);
  return (
    <div>
      <h1>this is events page</h1>
      <MainButton title="create event" onClick={componentShow} />
      {showComponent && <Container className='bg-dark'><Row className='justify-content-center'><Col lg={5}><EvenCreations /></Col></Row></Container>}
      <Container>
        <Row>
          {eventList && eventList.map((event: any, index: number) => {
            return (
              <Col key={index} lg={3}>

                {isUpdate && eventId == event.id ? <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Title of Event</Form.Label>
                      <Form.Control type="text" placeholder="Enter title " value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                      <Form.Text className="text-muted">
                        please enter the title of event
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Date:</Form.Label>
                      <Form.Control type="Date" onChange={(e) => setEditDate(e.target.value)} value={editDate} />
                      <Form.Text className="text-muted">
                        please enter the date of event
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Time:</Form.Label>
                      <Form.Control type="Time" onChange={(e) => setEditTime(e.target.value)} value={editTime} />
                      <Form.Text className="text-muted">
                        please enter the time
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Location</Form.Label>
                      <Form.Control type="text" placeholder="Enter location" onChange={(e) => setEditLocation(e.target.value)} value={editLocation} />
                      <Form.Text className="text-muted">
                        please enter the event location
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEditDescription(e.target.value)} value={editDescription} />
                      <Form.Text className="text-muted">
                        please enter the Description
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <MainButton title="edit" onClick={() => eventUpdateHandler(event)} />

                  </Form>
                </div> :
                  <div>
                    <h1>{event.title}</h1>
                    <h1>{event.description}</h1>
                    <h1>{event.location}</h1>
                    {/* <h1>{event.date}</h1> */}
                    <p>hello world</p>
                    {event.creator == userId && <MainButton title="Edit" onClick={() => eventEditHandler(event)} />}
                    {event.creator == userId && <MainButton title="Delete" onClick={() => eventDeleteHandler(event)} />}
                  </div>

                  // <CardDiscover title="Distant Galaxy" src={SrcImg} avatarPlaceholder={MoonDancerImg} text="MoonDancer" price="1.63" bid="0.33" />

                }
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>

  )
}

export default Events
