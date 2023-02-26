import React from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const CardHowWorks = (props) => {
    return (
        <div className='how-works-card-div'>
            <Card className="how-works-card " style={{ width: 'auto' }}>
                <div className='how-works-img-div  justify-content-center'>
                    <Card.Img src={props.src} className="how-works-img  img-fluid " />
                </div>
                <Card.Body>
                    <Card.Title className='cards-title text-center'>{props.title}</Card.Title>
                    <Card.Text className='cards-text text-center'>
                        {props.text}
                    </Card.Text>


                </Card.Body>
            </Card>
        </div>

    )
}

export default CardHowWorks
