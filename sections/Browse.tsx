import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CardBrowseCategories from '../components/CardBrowseCategories'
// import ArtImg from '../../assests/homePage/artImg.png'
// import CollectiblesImg from '../../assests/homePage/collectiblesImg.png'
// import MusicImg from '../../assests/homePage/musicImg.png'
// import PhotographyImg from '../../assests/homePage/photographyImg.png'
// import VideoImg from '../../assests/homePage/videoImg.png'
// import UtilityImg from '../../assests/homePage/utilityImg.png'
// import SportImg from '../../assests/homePage/sportsImg.png'
// import VirtualWorldImg from '../../assests/homePage/virtualWorldImg.png'


const BrowseCategories = () => {
    return (
        <div className="browse-categories">
            <Container>
                <Row>
                    <Col>
                        <h2 className='div-heading'>Adavntages of this app</h2>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={3} md={3} sm={6}>
                        <CardBrowseCategories title="Event Planning" src="https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=" />
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <CardBrowseCategories title="Event Viewing" src="https://www.shutterstock.com/image-photo/scene-stage-light-colored-spotlights-260nw-620976638.jpg" />
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <CardBrowseCategories title="Celebration" src="https://media.istockphoto.com/id/1181250359/photo/business-people.jpg?s=612x612&w=0&k=20&c=1DFEPJdcvlhFdQYp-hzj2CYXXRn-b6qYoPgyOptZsck=" />
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <CardBrowseCategories title="Photography" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default BrowseCategories
