import React from "react";
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux'; 
function Cart(props){
    return(
        <div>
            <Table striped bordered hover>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
                </tr>
                {/* redux를 쓴다면 state 데이터를 수정하고 싶을 때 어떻게 해야하는가?
                    1. index.js에 reducer 함수를 만들고 거기에 데이터를 수정하는 법을 정의한다.
                    2. 원하는 곳에서 dispatch() 라는 함수를 써서 reducer에게 수정해달라고 요청한다. 
                    반드시 이렇게 데이터를 수정해야 한다(!안 그러면 redux 쓰는 이점이 없음)

                    // ***reducer는 그냥 function으로 시작하는 흔히 보는 함수인데, 안에 1. state 초기값 / 2. state 데이터 수정방법이 잔뜩 들어있는 함수라고 생각하면 된다. 
                */}

                {props.realState.map((a,i)=>{
                    return(
                    <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.quan}</td>
                    <td>
                        <button onClick={()=>{ props.dispatch({type:'수량증가'})}}> + </button>
                        <button onClick={()=>{ props.dispatch({type:'수량감소'})}}> - </button>
                    </td>
                    {/* 데이터 수정방법을 정의한 후 이렇게 dispatch함수를 써서 reducer를 동작시킨다. 이렇게 하면 버튼을 누를 때 마다 '수량증가' 라고 작명해놓은 state 수정방법이 동작한다. */}
                    </tr>
                    )
                })}
            </Table>
            {props.alertState ===true ?(
                <div className="my-alert2">
                    <p>지금 구매하시면 20% 할인!</p>
                    <button onClick={()=>{props.dispatch({type:'팝업닫기'})}}>닫기</button>
                </div>
                ) : null
            }
            {/* 사실 이 팝업을 만들 때 쓴 것처럼 redux를 쓰면 안 된다. 이거 하나 만드는데 굳이 redux에 저장까지 할 필요가 없다.
            이 state 데이터를 다른 컴포넌트에서 또 쓸 일이 없다면 그냥 Cart 안에서 useState()로 만들면 된다. 
            반면, 여러 컴포넌트에서 공유하는 값은 redux store 안에 보관해야 함. 
            */}
        </div>
    )
}

//index.js의 store 안에 있는 state를 꺼내쓰는 법
//1.사용을 원하는 컴포넌트.js 밑에 function을 하나 만든다. 이 함수는 store 안에 있던 state를 props로 만들어주는 역할이다. 
//아래와 같이 쓰면, store 안에 있던 모든 state가 props로 등록된다. 
// 이제 Cart.js에서 realState라고 이름 붙인 애를 출력해보면 index.js에서 저장한 state가 출력된다. 또는 realState : state.name 처럼 원하는 값만 뽑아서 쓸 수도 있음. 
//2. export default 하는 부분에  connect()~ 를 쓴다(connect는 import 해서 사용). 그냥 리액트-리덕스 라이브러리 사용법임. 

function stateToProps(state){
    return{
        realState : state.reducer,
        alertState : state.reducer2
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