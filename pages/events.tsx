import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CardDiscover from '../components/CardDiscover'
import EvenCreations from '../components/EvenCreations'
import MainButton from '../components/MainButton'
import useEvents from '../cutoomHooks/useEvents'
import { useSelector } from 'react-redux'
import { EventFormData } from '../types/EventFormDataType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIdCardAlt, faCircleDot, faLocationPin, faCalendarDays, faCircleInfo, faPeopleGroup, faCalendarTimes, faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
const Events = () => {

  const { goToEventsPage,
    showComponent,
    setShowComponent,
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
    const filtered = eventList.filter((event: EventFormData) => {
      console.log("serach query", searchQuery);
      const dateMatch = event?.date.includes(searchQuery.date);
      const timeMatch = event?.time.includes(searchQuery.time);
      const locationMatch = event?.location.includes(searchQuery.location);
      return dateMatch && timeMatch && locationMatch;
    });
    setFilteredEvents(filtered);
  }, [eventList, searchQuery]);

  return (
    <div >
      <h1 className='text-center fw-bold text-light'>Event Page</h1>
      <Container>
        <Row>
          <h2 className='text-center mt-5 text-light'>Search</h2>
          <Form className='d-flex justify-content-center gap-2 text-light'>

            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Control type="date" placeholder="Enter title " value={searchQuery.date} onChange={(e) => setSearchQuery({ ...searchQuery, date: e.target.value })} />
              <Form.Text className="text-muted">
                Search by date
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Control type="time" placeholder="Enter title " value={searchQuery.time} onChange={(e) => setSearchQuery({ ...searchQuery, time: e.target.value })} />
              <Form.Text className="text-muted">
                Search by time
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Control type="text" placeholder="Enter Location" value={searchQuery.location} onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })} />
              <Form.Text className="text-muted">
                Search by Location
              </Form.Text>
            </Form.Group>

          </Form>
        </Row>
      </Container>
      {/* <input type="date" value={searchQuery.date} onChange={(e) => setSearchQuery({ ...searchQuery, date: e.target.value })} /> */}
      {/* <input type="time" value={searchQuery.time} onChange={(e) => setSearchQuery({ ...searchQuery, time: e.target.value })} /> */}
      {/* <input type="text" value={searchQuery.location} onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })} /> */}
      <div className='m-5'>
        <MainButton title="create event" onClick={componentShow} />
        <br />
        {showComponent && <Container className='bg-dark'><Row className='justify-content-center'><Col lg={5}><EvenCreations /></Col></Row></Container>}
      </div>
      <Container>
        <Row className=''>
          {filteredEvents && filteredEvents.map((event: any, index: number) => {

            return (
              <Col key={index} lg={4}>

                {isUpdate && eventId == event?.id ? <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Title of Event

                      </Form.Label>
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
                    <Card className='event-card'>
                      <Card.Header><p className="event-header-div"><FontAwesomeIcon icon={faIdCardAlt} /><span className=""> {event?.id}</span></p></Card.Header>
                      <Card.Body>
                        <Card.Title><span className='event-title'>Title: {event?.title}</span></Card.Title>
                        <Card.Text> <p className="event-description-div"><FontAwesomeIcon icon={faCircleInfo} />
                          <span>{event?.description}</span></p>

                          <p className="event-location-div"><FontAwesomeIcon icon={faLocationPin} /><span>{event?.location}</span></p>
                          <p className="event-time-div"><FontAwesomeIcon icon={faCalendarTimes} /><span>{event?.time}</span></p>
                          <p className="event-date-div"><FontAwesomeIcon icon={faCalendarDays} /><span>{event?.date}</span></p>
                          <p className="event-list"><FontAwesomeIcon icon={faPeopleGroup} /> Attendees: {event?.attendees?.length}
                            <br />
                            {event?.attendees?.map((attendee: Array<string>, index: number) => {
                              return (
                                <p key={index} className="attendees-list"><FontAwesomeIcon icon={faCircleDot} /> {attendee}</p>
                              )
                            })}
                          </p>
                          <p className='event-creator-div'>{<FontAwesomeIcon icon={faUser} />}<span>{event.creator}</span></p>

                        </Card.Text>
                        <div className='d-flex justify-content-center gap-2'>  {event?.creator == userId && <MainButton title={<FontAwesomeIcon icon={faEdit} />} onClick={() => eventEditHandler(event)} />}
                          {event?.creator != userId && <MainButton title="Join" onClick={() => eventJoinHandler(event)} />}
                          {event?.creator == userId && <MainButton title={<FontAwesomeIcon icon={faTrash} />} onClick={() => eventDeleteHandler(event)} />}</div>

                      </Card.Body>
                    </Card>



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
