import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const CardSpaceWalking = (props) => {
    return (
        <div className='card-space-walking'>
            <Card className='space-walking' style={{ width: 'auto' }}>
                <Card.Img className='card-img' variant="top" src={props.src} />
                <Card.Body className='card-body'>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <span>{props.text}</span>
                    </Card.Text>

                </Card.Body>
            </Card>

        </div>
    )
}

export default CardSpaceWalking
