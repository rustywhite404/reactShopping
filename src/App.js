import logo from './logo.svg';
import React, { useEffect, useState, useContext } from 'react';
import  {Navbar,Container,Nav,NavDropdown,CardGroup, Card,Carousel, Accordion,Row} from 'react-bootstrap';
import './App.css';
import objectArray from './data.js';
import mainData from './mainData.js';
import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail';
import Product from './Product';
import Cart from './Cart';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
export let stockContext = React.createContext(); //createContext()를 이용해 변수를 만들면 이 변수는 특별한 '컴포넌트'가 된다. 다른 js에서 쓸 때는 꼭 export / import 해줘야 함.
function App() {
  let history = useHistory();
  let [flower, changeFlower] = useState(objectArray);
  let [mainContent, changeMainContent] = useState(mainData);
  let [stock, changeStock] = useState([10,148,5]);
    // useEffect(()=>{
  //   axios.get().then().catch(); /* 페이지를 실행 하자마자 ajax를 실행시키곡 싶다면 useEffect를 활용하면 된다. */
  // },[]); /* []는 useEffect 할 때 배웠듯이 최초 로드 시에만 실행되도록 해 주는 빈 값. */
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
      <stockContext.Provider value={stock}> {/* createContext()를 통해 만든 stockContext를 이용해서 props  없이도 하위 컴포넌트들로 값을 보낼 수 있다. */}
      <Row xs={2} md={3}>
          {
          flower.map((a,i)=>{
              return(              
                <Detail flower={flower[i]} i={i} key={i} />
             
              )
          }) 
          }
      </Row>
      </stockContext.Provider>

      <button className="baseBtn mgt20 mgb20" onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ 
            /* 성공 시 실행할 코드. then 안의 콜백함수 안 파라미터 = 받아온 데이터 */             
            // let addProduct = [...flower];
            // let add2 = [...result.data];
            // addProduct.push(...add2);
            // changeFlower(addProduct);
            // ㄴ 기존에 배운 이 방법(배열 복사해서 추가)으로도 할 수 있지만 아래처럼 ES6 문법으로 배열 두개를 간단히 합칠 수 있다. 
            // changeFlower([...flower, ...result.data]);
            let num1 = 0;
            let num2 = 1;
            let addArray = result.data.slice(num1,num2);          
            changeFlower([...flower, ...addArray]); // 더보기를 누르면 1개씩 더 보여주기
            num1 ++;
            num2 ++;

          })
          .catch(()=>{/*실패 시 실행할 코드*/

            alert("메인으로 돌아갑니다.");
            history.goBack();
          })
        }}>더보기</button>


        {/* POST 요청은  

          axios.post('https://codingapple1.github.io/shop/data2.json', { id : 'test', pw : 1234})
          .then((result)=>{  })
          .catch(()=>{ })
        이런 식으로 사용하면 되고, URL 옆에 원하는 데이터를 키-값으로 넣어주면 전송해서 쓸 수 있다. 
        */}
      </Route>

      <Route path="/detail/:id">
       <Product flower={flower} stock={stock} changeStock ={changeStock}/>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
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
        <Navbar.Brand to="#home">Noctilucent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
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
