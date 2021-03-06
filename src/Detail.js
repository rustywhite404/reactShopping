import React, { useContext } from "react";
import {useHistory} from 'react-router-dom';
import  {Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Detail.scss';
import {stockContext} from './App.js';
function Detail(props){
    let history = useHistory();
    let stock = useContext(stockContext);
    let num = props.i * 1;
    return(
        <Col>
        <Card>
          <Link to={'/detail/'+(num+1)}><Card.Img variant="top" src={require('./flower'+(num+1)+'.jpg')} /></Link>
          <Card.Body>
            <Card.Title>{props.flower.title}</Card.Title>
            <Card.Text>
              {props.flower.content}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{props.flower.price}</small>
            <button className="baseBtn red">주문하기</button> 
            <button onClick={()=>{history.goBack()}} className="baseBtn">뒤로가기</button> 
            {/* 다른 페이지로 이동 시키고 싶으면 history.push('/원하는경로')로도 활용 가능하다. */}
          </Card.Footer>
        </Card>
        </Col>

  )
}

export default Detail