import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const CardTopCreators = (props:any) => {
    return (
        <div className='top-creators-card-div'>
            <Card className="top-creators-card " style={{ width: 'auto' }}>
                <div className='top-creators-img-div position-relative  justify-content-center'>
                    <Card.Img src={props.src} className="top-creators-img  " />
                </div>
                <Card.Body>
                    <Card.Title className='cards-title text-center'>{props.title}</Card.Title>
                    <Card.Text className='cards-text text-center'>
                        Total Sales: <span className='cards-text-span'>{props.sales} ETH</span>
                    </Card.Text>
                    <span className='top-creators-card-number position-absolute'>{props.number}</span>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardTopCreators
