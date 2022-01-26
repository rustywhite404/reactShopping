import React from "react";
import {useHistory, useParams} from 'react-router-dom';
import  {Card,Button} from 'react-bootstrap';


function Product(props){
    let history = useHistory();
    let {id} = useParams();
    var srcUrl = "../flower"+[id]+".jpg";
    let findProduct = props.flower.find(function(product){
        return product.id == id
        /*
        입력받은 숫자 = 파라미터인 경우가 아니라 이 데이터의 idx(영구번호)값이 입력받은 숫자인 데이터를 보여달라고 하려면? 
        find() 문법 사용. array 뒤에 붙일 수 있으며 안에 콜백 함수가 들어간다. 
        콜백 함수 내의 파라미터(product)는 임의의 이름으로, array 안에 있는 데이터 하나하나를 의미한다. 
        return 오른쪽에는 조건식을 쓸 수 있다. 이게 참인 데이터만 새로운 변수에 저장한다. 
        위 조건식은 현재 URL의 /:id값과 상품의 영구번호(상품.id)가 같은지 비교하고 있는 것.
        
        실제 개발시에는 서버에서 id:0인 데이터를 Ajax로 요청해서 쓰는 경우가 더 많을 것.
        */
    });
    return(
        <Card className="text-center">
        <div className="productImg" >
        <Card.Img variant="top" src={srcUrl} />
        </div>
        <Card.Header>{findProduct.title}</Card.Header>
        <Card.Body>
            {/* useParams()는 현재 URL에 적힌 모든 파라미터를 파라미터1, 파라미터2 이런 식으로 저장해준다. 
            그걸 destructuring이라는 문법을 이용해 변수로 빼서 저장한 것.
            그래서 id라는 변수는 :id자리에 있던 숫자가 된다.  */}
            <Card.Text>
            {findProduct.content}
            </Card.Text>
            <Button onClick={()=>{history.push('/detail')}} variant="primary">뒤로가기</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    )
}
export default Product