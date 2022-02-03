import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';

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
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
