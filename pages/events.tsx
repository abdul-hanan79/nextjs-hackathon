import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import CardDiscover from '../components/CardDiscover'
import EvenCreations from '../components/EvenCreations'
import MainButton from '../components/MainButton'
import useEvents from '../cutoomHooks/useEvents'
import { useSelector } from 'react-redux'
import { EventFormData } from '../types/EventFormDataType'

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
    editDescription, eventEditHandler, eventUpdateHandler, eventDeleteHandler, eventJoinHandler, handleDateChange } = useEvents()
  console.log("the value of evenList", eventList);
  console.log("value of show component in events.tsx", showComponent);

  const userId = useSelector((state: any) => state.authSlice.user.uid)
  console.log("user id in events", userId);
  const [searchQuery, setSearchQuery] = useState({ date: '', time: '', location: '' });
  const [filteredEvents, setFilteredEvents] = useState(eventList);
  useEffect(() => {
    const filtered = eventList.filter((event:EventFormData) => {
      console.log("serach query", searchQuery);
      const dateMatch = event.date.includes(searchQuery.date);
      const timeMatch = event.time.includes(searchQuery.time);
      const locationMatch = event.location.includes(searchQuery.location);
      return dateMatch && timeMatch && locationMatch;
    });
    setFilteredEvents(filtered);
  }, [eventList, searchQuery]);

  return (
    <div>
      <input type="date" value={searchQuery.date} onChange={(e) => setSearchQuery({ ...searchQuery, date: e.target.value })} />
      <input type="time" value={searchQuery.time} onChange={(e) => setSearchQuery({ ...searchQuery, time: e.target.value })} />
      <input type="text" value={searchQuery.location} onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })} />

      <h1>this is events page</h1>
      <MainButton title="create event" onClick={componentShow} />
      {showComponent && <Container className='bg-dark'><Row className='justify-content-center'><Col lg={5}><EvenCreations /></Col></Row></Container>}
      <Container>
        <Row>
          {filteredEvents && filteredEvents.map((event: any, index: number) => {

            return (
              <Col key={index} lg={3}>

                {isUpdate && eventId == event?.id ? <div>
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
                      <Form.Control type="Date" onChange={handleDateChange} value={editDate} />
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
                    <MainButton title="Update" onClick={() => eventUpdateHandler(event)} />

                  </Form>
                </div> :
                  <div>
                    <h1>{event?.title}</h1>
                    <h1>{event?.id}</h1>
                    <h1>{event?.description}</h1>
                    <h1>{event?.location}</h1>
                    <p>Attendees:</p>
                    <ul>
                      {/* {event.attendees.map(attendee => (
                        <li >{attendee} </li>
                      ))} */}
                      {event.attendees.map((attendee: any) => {
                        return (
                          <li>{attendee}</li>
                        )
                      })}
                    </ul>
                    {/* <h1>{event.date}</h1> */}
                    <p>hello world</p>
                    {event?.creator == userId && <MainButton title="Edit" onClick={() => eventEditHandler(event)} />}
                    {event?.creator != userId && <MainButton title="Join" onClick={() => eventJoinHandler(event)} />}
                    {event?.creator == userId && <MainButton title="Delete" onClick={() => eventDeleteHandler(event)} />}
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
