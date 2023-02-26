import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const CardBrowseCategories = (props:any) => {
    return (
        <div className='browse-categories-card-div'>
            <Card className="browse-categories-card " style={{ width: '90%' }}>
                <Card.Img src={props.src} className="browse-categories-card-img img-fluid" variant='top' />
                <Card.Body>
                    <Card.Title className='cards-title '>{props.title}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardBrowseCategories
