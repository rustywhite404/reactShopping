import logo from './logo.svg';
import React, { useState } from 'react';
import  {Navbar,Container,Nav,NavDropdown,CardGroup, Card,Carousel, Accordion} from 'react-bootstrap';
import './App.css';
import objectArray from './data.js';
import mainData from './mainData.js';
import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail';
import Product from './Product';
function App() {
  let [flower, changeFlower] = useState(objectArray);
  let [mainContent, changeMainContent] = useState(mainData);
  return (
    
    <div className="App">
      <NavBar />
      <Switch>
      <Route exact path="/">
        {/* 원래 "/detail"을 쓰면 "/"와 /detail의 내용을 다 보여준다. 그게 싫으면 exact 속성을 부여해주면 정확히 /와 일치할 때만 메인을 보여준다.
          path="/어쩌고" component={컴포넌트내용} 이렇게도 쓸 수 있음. 이렇게 쓰면 컴포넌트 내용을 이 자리에 보여준다. 물론 안에 <컴포넌트명 /> 로 써도 상관없음.
        */}
        <Carousel>
          <Carousel.Item interval={1000} className='mainbg'>
            <img
              className="d-block w-100"
              src="main1.jpg" 
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{mainContent[0].title}</h3>
              <p>{mainContent[0].content}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000} className='mainbg'>
            <img
              className="d-block w-100"
              src="main2.jpg" 
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{mainContent[1].title}</h3>
              <p>{mainContent[0].content}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000} className='mainbg'>
            <img
              className="d-block w-100"
              src="main3.jpg" 
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{mainContent[2].title}</h3>
              <p>{mainContent[2].content}</p>
            </Carousel.Caption>
          </Carousel.Item>


          </Carousel>
          <Accordion defaultActiveKey="0">
          {
            mainContent.map((a,i)=>{
              return <AccoEX mainContent={mainContent[i]} i={i} />
            })        
          }
        </Accordion>
      </Route>

      <Route exact path="/detail">

        <CardGroup>
          {
          flower.map((a,i)=>{
              return <Detail flower={flower[i]} i={i} key={i} />
          }) 
          }
        </CardGroup>

      </Route>

      <Route path="/detail/:id">

       <Product flower={flower} />

      </Route>

      <Route path="/:id">
        {/* /:id는 URL 파라미터라고 하는데,
        슬래시 뒤에 모든 문자가 오면 이 Route로 안내해주라는 뜻.
        /detail로 가면 /detail의 내용들 + 이 안의 내용들이 같이 보인다(리액트 라우터는 매치되는 URL을 전부 다 보여준다)
        이걸 방지하고 싶으면 Switch 태그로 Route들을 감싸주면 됨. 
        Switch로 감싸주면 여러 개의 Route가 매칭되어도 (((맨 위의 Route 하나만 보여준다.)))
        */}
        <div>새로 만든 Route입니다.</div>
      </Route>
      </Switch>
    </div>
  )
}

function NavBar(){
  return(
  <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Noctilucent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Detail</Nav.Link>
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

function AccoEX(props){
  return(    
    <Accordion.Item eventKey={props.i}>
      <Accordion.Header>{props.mainContent.title}</Accordion.Header>
      <Accordion.Body>
      {props.mainContent.content}
      </Accordion.Body>
    </Accordion.Item>
  )
}


export default App;
