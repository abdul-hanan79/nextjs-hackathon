import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const CardDiscover = (props:any) => {
    return (
        <div className='card-discover'>
            <Card className='card-main-discover' style={{ width: 'auto' }}>

                <Card.Body className='card-body ps-4'>
                    <Card.Title className='cards-title'>{props.title}</Card.Title>
                    <Card.Text>


                        <Row className='about mt-2'>

                            <Col>
                                <p>price <br />
                                    <span>{props.price} ETH</span></p>
                            </Col>
                            <Col>
                                <p>Highest Bid <br /><span>{props.bid} wETH</span></p>

                            </Col>
                        </Row>
                    </Card.Text>

                </Card.Body>
            </Card>

        </div>
    )
}

export default CardDiscover
