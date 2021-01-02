import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
const downloaddata = (props) => {
    return (
          <Container fluid>
            <div style = {{height:'80px'}} />
            <Jumbotron>
              <h1>Your Smart Trash Can Data</h1>
              <p>We believe that your data should be yours. Therefore, here you can download all your data collected by your smart trash bin.</p>
              <Button href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(props.json)
            )}`}
              download="trashCanData.json"> Download My Trash Can Data</Button>
            <small> *Data provided is the same stored on our servers.</small>
          </Jumbotron>
          <Alert variant = 'info'>Our Commitment to Privacy: Your data will not be sold or used by us or any other third party. If you have any privacy concerns, please feel free to contact us with any inquries or requests.</Alert>
          <Card>
            <Card.Header>How is your data structured?</Card.Header>
            <Card.Body>
              <Card.Text>
                Your data is stored in a JSON file, which has 2 properties: your email and a list of entries. 
                </Card.Text>
                <Card.Text> - Email: the email you log in with</Card.Text>
                <Card.Text> - Entries: a list of entries, each one listing a piece of trash. Each entry holds data such as the time and date, the weight of the trash, what the trash bin determines the trash to be, and whether it was recycled or thrown away</Card.Text>
              
            </Card.Body>
          </Card>
        </Container>
    );
};

export default downloaddata;