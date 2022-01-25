import logo from './logo.svg';
import React, { useState } from 'react';
import  {Navbar,Container,Nav,NavDropdown,CardGroup, Card} from 'react-bootstrap';
import './App.css';
import objectArray from './data.js';

function App() {
  let [flower, changeFlower] = useState(objectArray);
  return (
    
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Noctilucent</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>  
      </Navbar>

      <div id="mainBox">
        <div class="title">Noctilucent;</div>
      </div>
      <CardGroup>
        {
          flower.map((a,i)=>{
            return <CardFlower flower={flower[i]} i={i} key={i} />
          }) 
        }
      </CardGroup>
    </div>
  )
}

function CardFlower(props){
  return(     
        <Card>
          <Card.Img variant="top" src={require('./flower'+(props.i+1)+'.jpg')} />
          <Card.Body>
            <Card.Title>{props.flower.title}</Card.Title>
            <Card.Text>
              {props.flower.content}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{props.flower.price}</small>
          </Card.Footer>
        </Card>
      
  )
}
export default App;
