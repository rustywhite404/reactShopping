import React from "react";
import {useHistory} from 'react-router-dom';
import  {Card, Link} from 'react-bootstrap';
import './Detail.scss';
function Detail(props){
    let history = useHistory();
    return(

        <Card>
          <Card.Link href={'/detail/'+props.i}><Card.Img variant="top" src={require('./flower'+(props.i)+'.jpg')} /></Card.Link>
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

  )
}

export default Detail