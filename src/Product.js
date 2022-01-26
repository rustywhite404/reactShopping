import React, {useEffect, useState} from "react";
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

    let[alert, changeAlert] = useState(true);
    let[inputData, changeInputData] = useState('');
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

    useEffect(()=>{
    /* useEffect는 라이프사이클 훅Lifecycle Hook 대신 사용할 수 있는 함수다. 더 쉽고, 더 짧다. 사용 전에 useEffect import 해 줄 것.
    콜백 함수 안에는 이 컴포넌트가 처음 등장하고 나서 실행시키고 싶은 코드를 적어주면 된다. 
    - 컴포넌트가 첫 등장 해서 로딩이 끝난 후에(mount 끝났을 때)
    - 컴포넌트가 재랜더링 되고 난 후에(update 되고 난 후에)
    */
        // setTimeout(()=>{
        //     document.getElementById('alertBox').style.display = 'none';
        // },2000);

        let timer = setTimeout(()=>{
            changeAlert(false)
        },2000);

        return function ex(){
            /* useEffect 안에는 return을 넣을 수 있는데, 여기 넣은 함수는 컴포넌트가 사라질 때 실행된다. ()=> 도 가능 */
            clearTimeout(timer);
            //이렇게 쓰면 타이머가 사용 후 바로 해제된다.(나중에 코드 복잡해지면 시간 꼬일 수 있음.)
        }

    },[alert]);
     /* 이렇게 []안에 state를 넣어주면, alert라는 이름의 state가 변경 될 때만 업데이트로 치고 실행해달라는 뜻이 된다.
     다른 input onChange이벤트 등이 실행될 때 마다 새로 업데이트 되어서 useEffect까지 돌면 자원이 낭비되므로. 
     이렇게 해 두면 1. 컴포넌트가 로드 될 때, 2. alert라는 state가 변경될 때만 실행된다. 
     대괄호 안에 state는 콤마로 여러개 넣을 수 있다. 
     []로 아무것도 안 넣고 비우면 ? => 컴포넌트 최초 실행 시에만 실행되고, 업데이트 시에는 실행되지 않는다. 
     */
    

    // useEffect(()=>{
    //     // 2번째로 실행할 코드.
    //     // useEffect는 여러 개도 사용이 가능하고, 적은 순서대로 순차 실행된다.
    // });

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
                {inputData}
                <input onChange={(e)=>{changeInputData(e.target.value)}} />
                <Button onClick={()=>{history.push('/detail')}} variant="primary">뒤로가기</Button>

                
                { 
                    alert === true ? (
                        <div id="alertBox" className="my-alert">
                            <p>재고가 얼마 남지 않았습니다</p>
                        </div>
                    ) : null
                }
            </Box>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>        


    )
}
export default Product