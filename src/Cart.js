import React from "react";
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux'; 
function Cart(props){
    return(
        <Table striped bordered hover>
    <tr>
      <th>#</th>
      <th>상품명</th>
      <th>수량</th>
      <th>변경</th>
      
    </tr>
    <tr>
      <td>{props.realState[0].id}</td>
      <td>{props.realState[0].name}</td>
      <td>{props.realState[0].quan}</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
    </Table>
    )
}

//index.js의 store 안에 있는 state를 꺼내쓰는 법
//1.사용을 원하는 컴포넌트.js 밑에 function을 하나 만든다. 이 함수는 store 안에 있던 state를 props로 만들어주는 역할이다. 
//아래와 같이 쓰면, store 안에 있던 모든 state가 props로 등록된다. 
// 이제 Cart.js에서 realState라고 이름 붙인 애를 출력해보면 index.js에서 저장한 state가 출력된다. 또는 realState : state.name 처럼 원하는 값만 뽑아서 쓸 수도 있음. 
//2. export default 하는 부분에  connect()~ 를 쓴다(connect는 import 해서 사용). 그냥 리액트-리덕스 라이브러리 사용법임. 

function stateToProps(state){
    return{
        realState : state 
    }
}

//리덕스 사용법 총 정리
// redux는 props 전송이 귀찮을 때 사용한다. 
// 사용 전 redux 설치, 세팅이 완료되어야 한다.
// 설치 : yarn add redux react-redux 
// 세팅 : 1. index.js에 Provider import 하기 
// 2. state 값 공유를 원하는 컴포넌트 Provider로 감싸기
// 3. createStore를 import 한 다음, state를 만들어 let store라는 변수에 저장하기
// 4. Provider store = {store} 이렇게 store를 등록하면 
// 이제 Provider로 감싼 컴포넌트는 전부 store 안에 있던 값을 props 없이 공유 가능하다. 

// store 안에 있던 state 사용은 
// 0. 사용을 원하는 컴포넌트 파일로 이동
// 1. 하단에 function state를props화() 하나를 만들어주고 state를 props로 등록한다.
// 2. 그리고 하단에 export default connect(state를props화)(Cart); 
// 이렇게 사용하면 아까 만들어 둔 state가 props로 등록된 것.
// props.state이름 이렇게 저장된 state를 자유롭게 사용할 수 있다. 

// 세팅 과정은 까다롭지만 한 번 세팅하고 나면 세팅 완료 된 모든 컴포넌트는 redux 내의 state를 자유롭게 사용이 가능하다. 



export default connect(stateToProps)(Cart);