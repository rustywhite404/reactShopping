import React, {useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import  {Card,Button} from 'react-bootstrap';
import styled from 'styled-components';
import './Product.scss';
/* styled-components 라이브러리를 사용하면 컴포넌트를 만들 때 스타일을 미리 주입해서 만들 수 있다. */
let Box = styled.div`
  padding : 20px;
`;

let Subject = styled.h4`
    font-size:14px;
    color: ${props => props.coloring};
    line-height:180%;
`;
/* ${}은 문자를 생성하는 ``안에서 쓸 수 있는 ES6문법으로, 문자 안에 함수나 변수를 넣고 싶을 때 사용한다.
    이렇게 쓸 경우 그냥 props.색상 으로 쓰면 안 되고, 위 예시처럼 콜백함수로 넣어야 함.
    사실 그냥 css로 써도 상관은 없다. 나중에 SASS 배우면 CSS+SASS로 작성해서 원하는 CSS만 IMPORT해서 쓰는 게 전체적인 스타일 관리 할 때는 더 편함.
*/

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
            

            <Box>
                <Card.Text>
                    <Subject coloring={'dimgrey'}>{findProduct.content}</Subject>
                    {/* 위에서 만들어놓은 props.coloring을 이런식으로 사용할 수 있다. */}                
                </Card.Text>
                <Button onClick={()=>{history.push('/detail')}} variant="primary">뒤로가기</Button>
                <div className="my-alert">
                    <p>재고가 얼마 남지 않았습니다</p>
                </div>
                
            </Box>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>        


    )
}
export default Product