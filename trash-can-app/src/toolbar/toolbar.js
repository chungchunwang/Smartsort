import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
const toolbar = (props) => {
    console.log(props.imageUrl);
    return (
            <Container>
            <Navbar style = {{backgroundColor: "#233e5c"}} fixed = "top" expand="lg">
                <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Smart Trash Can</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/" style={{ textDecoration: 'none', color: 'grey' }}>Home</Link></Nav.Link>
                        <Nav.Link><Link to="/trashlytics" style={{ textDecoration: 'none', color: 'grey' }}>Trashlytics</Link></Nav.Link>
                        <Nav.Link><Link to="/downloaddata" style={{ textDecoration: 'none', color: 'grey' }}>Download Your Data</Link></Nav.Link>
                    </Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <Navbar.Brand>
                        <img
                            src={props.photoUrl}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Your Profile"
                        />
                    </Navbar.Brand>
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={props.onSignOutClick}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
            </Container>
    );
};

export default toolbar;