import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useEvents from '../cutoomHooks/useEvents';
import MainButton from './MainButton';
const EvenCreations = () => {
    const { goToEventsPage,
        
        componentShow,
        setTitle,
        setDate,
        setTime,
        setLocation,
        setDescription,submitEvent } = useEvents()
    return (
        <div>
            
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title of Event</Form.Label>
                    <Form.Control type="text" placeholder="Enter title " onChange={(e) => setTitle(e.target.value)} />
                    <Form.Text className="text-muted">
                        please enter the title of event
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="Date" onChange={(e) => setDate(e.target.value)} />
                    <Form.Text className="text-muted">
                        please enter the date of event
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Time:</Form.Label>
                    <Form.Control type="Time" onChange={(e) => setTime(e.target.value)} />
                    <Form.Text className="text-muted">
                        please enter the time
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
                    <Form.Text className="text-muted">
                        please enter the event location
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setDescription(e.target.value)} />
                    <Form.Text className="text-muted">
                        please enter the Description
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <MainButton title="submit Event" onClick={submitEvent} />
            </Form>
        </div>
    )
}

export default EvenCreations
