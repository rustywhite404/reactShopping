import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';

/* 기존 코드에 BrowserRouter를 추가해줬다. 
BrowserRouter를 사용하려면 yarn이나 npm으로 사전 설치 필요함.
BrowserRouter 말고 HashRouter라는 태그도 이용할 수 있음. 단어만 바꿔서 똑같이 쓰면 되는데
HastRouter을 쓰면 사이트 방문 시 URL 맨 뒤에 /#이 붙고, BrowserRouter를 쓰면 깨끗하게 붙음.
=> 굳이 #가 붙는 HashRouter를 쓰는 이유? 
주소창에 뭘 입력하면 서버에게 페이지를 보여달라는 요청이 되는데, 
우리는 요청할 서버가 없는 상태다. 그래서 잘못하면 있지도 않은 페이지를 서버에 요청해서 404를 보게 된다. 
실수로 서버에 요청하지 않게 하려면 안전하게 #을 붙여줘야 함. 
BrowserRouter를 쓰려면 API 세팅만 잘 해두면 됨
*/

//let store = createStore(()=>{return [{id:0, name:'멋진신발',quan:2}]})
// let store = createStore(reducer);
//리덕스에서 state를 만들려면 createStore()함수를 써야 한다. useState와 다름! 
// 위와 같이 createStrore(콜백함수) 이렇게 쓰면 되고, 콜백함수에는 내가 원하는 state 초기값을 넣어주면 된다. 


// function reducer(){
//   //createStore에 refucer 만든 걸 넣으면 reducer가 완성됨. 
//   return [{id:0, name:'멋진신발',quan:2}] 
// }

//또는 이렇게도 쓸 수 있다. 

let DefaultState =  [{id:0, name:'멋진신발',quan:2}];
function reducer(state = DefaultState, action){ 

  // state = DefaultState 이건 default 파라미터 문법인데
  // 함수를 만들때 실수 또는 의도적으로 파라미터 입력을 안 했을 때 기본으로 가질 파라미터를 부여하는 것.
  // 그냥 파라미터 선언할 때 =등호로 입력하면 쓸 수 있다. 
  

   if(action.type==='항목추가'){
    let whereNo = state.findIndex( (a)=>{ return a.id === action.payload.id});
    console.log("whereNo:"+whereNo);

    if(whereNo >=0){
      let copy = [...state];
      copy[whereNo].quan++;
      return copy; 
    }else{
      let copy = [...state];
      copy.push(action.payload);
      return copy; 
    }
    
   }else if(action.type ==='수량증가'){
    // return 수량증가된새로운state 
    let copy = [...state];
    copy[action.payload].quan++;
    return copy;

  }else if(action.type ==='수량감소'){
    let copy = [...state];
    copy[action.payload].quan--;
    return copy;
  }else{
    return state 
  }


  //데이터가 수정되는 방법을 정의한 것. 
  // 1. '수량증가'라는 데이터 수정방법 이름을 하나 작명해 줌(액션.type===수정방법이름) 같은 식으로.
  // 2. if문 안에는 '수량증가' 라는 요청이 들어오면 어떤 state를 뱉을 지 정의한 것.
  // 3. else에는 요청이 안 들어온 경우 기본 state를 뱉으라고 정의. 


}

let alertDefault = true; 
function reducer2(state = alertDefault, action){
  if(action.type ==='팝업닫기'){
    return alertDefault = false; 
  }else{
    return state
  }
  }
// reducer를 하나 더 만들었으면 이걸 store에 등록도 꼭 해줘야 사용 가능함. 

//let store = createStore(reducer);
let store = createStore(combineReducers({reducer, reducer2}));
// reducer를 여러개 쓸 거면 combineReducers를 만들어서 그 안에 모든 리듀서를 넣으면 된다. 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}> {/* 리덕스를 사용하기 위해 Provider로 내가 state 공유를 원하는 컴포넌트를 다 감싸준다. App를 감싸면 App과 그 안에 있는 모든 html, 컴포넌트가 state를 직접, props 없이 사용할 수 있다. */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
