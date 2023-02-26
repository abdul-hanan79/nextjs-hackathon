import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
const CardTrendingCollection = (props) => {
    return (
        <div className='card-trending-collection'>

            <Card className="card-trending" style={{ width: 'auto' }}>
                <Card.Img className='card-image img-fluid' variant="top" src={props.src} height="300px" widht="400px" />
                <Card.Body className='p-1 pt-3 card-body'>
                    <Row className="gap-0">
                        <Col lg={4} md={4} sm={4} xs={4} className="">
                            <img src={props.secondaryImg1} height="90px" widht="90px" className='img-fluid' alt="" />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={4} className="">
                            <img src={props.secondaryImg2} height="90px" widht="90px" alt="" className='img-fluid' />
                        </Col>

                        <Col lg={4} md={4} sm={4} xs={4} className="">
                            <img src={props.secondaryImg3} height="90px" widht="90px" alt="" className='img-fluid' />
                        </Col>
                    </Row>
                    <Card.Title className='mt-3'>{props.title}</Card.Title>
                    <Card.Text className="mt-2">
                        <img src={props.avatarPlaceholder} alt="avatar" height={24} width={24} /> <span className='cards-text'>{props.text}</span>
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default CardTrendingCollection
