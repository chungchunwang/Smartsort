import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';
import NatureImage from './mountain.png';
class Homepage extends Component {
    inspirationalMessage = ["Recycling is the step to a better future!", "By recycling, you are saving the Earth's resources.", "Did you know that plastic waste in oceans can kill as many as 1 million sea creatures a year?!", "Did you know that the energy saved for recycling on glass bottle can run a 100-watt light bulb for 4 hours?", "Sorting trash is an easy way for you to help save the world. Good thing we already did it for you!", "Remember to look at your statistics! They provide valuable information about you daily trash use, and can help you become more eco-friendly.", "Remember to recycle when you can!"];
    totalMonthlyRecycleWeight = 0;
    totalMonthlyThrownAwayWeight = 0;
    render() {
        const date = new Date();
        const inspirationalMessageIndex = date.getDay() % this.inspirationalMessage.length;

        //monthly total weights
        var totalThrownAwayWeightMonth = 0;
        var totalRecycleWeightMonth = 0;
        if (this.props.trashCanData) {
            for (const entityIndex in this.props.trashCanData.entries) {
                const entity = this.props.trashCanData.entries[entityIndex];
                if (entity.status === 0) {
                    totalThrownAwayWeightMonth += entity.weight;
                }
                //recycle
                if (entity.status === 1) {
                    totalRecycleWeightMonth += entity.weight;
                }
            }
            this.totalMonthlyRecycleWeight = totalRecycleWeightMonth;
            this.totalMonthlyThrownAwayWeight = totalThrownAwayWeightMonth;
        }
        return (
                <Container fluid>
                    <div style = {{height:'80px'}} />
                    <Jumbotron style={{ backgroundImage:`url(${NatureImage})`, backgroundColor: '#3a8a4f'}}>
                        <h1 style = {{color:'white'}} >Welcome back {this.props.user ? this.props.user.displayName : null}!</h1>
                        <p style = {{color:'white'}}>
                            {this.inspirationalMessage[inspirationalMessageIndex]}
                        </p>
                        <p>
                            <Button variant="primary" href='https://www.epa.gov/trash-free-waters/impacts-mismanaged-trash'>Learn more about how trash is affecting the world.</Button>
                        </p>
                    </Jumbotron>
                    <Alert variant = 'primary'>This month, you have thrown away {this.totalMonthlyThrownAwayWeight} grams, and recycled {this.totalMonthlyRecycleWeight} grams. {(this.totalMonthlyRecycleWeight>this.totalMonthlyThrownAwayWeight)?"Great Job! You are an avid recycler.":"We recommend that you try to purchase more items that can be recycled."}</Alert>
                    <Card bg="primary" text="white" className="text-center">
                        <Card.Header>Your Smart Trash Can</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Take a look at your trash can analytics! Learn more about how you throw stuff away and how you can better help the environment.
                        </Card.Text>
                            <Button variant="secondary"><Link to="/trashlytics" style={{ textDecoration: 'none', color: 'white' }}>Go to Trashlytics!</Link></Button>
                        </Card.Body>
                    </Card>
                </Container>
        );
    }

}
export default Homepage;