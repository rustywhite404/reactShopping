import React from "react";
import { bindActionCreators } from "redux";

function IfEx(){
    // if(true){
    //     return <p> 첫번째 방법 </p>
    // }else{
    //     return null;
    // }
    // return 안에서는 자바스크립트 if문을 쓸 수 없어서, if를 밖에 두고 return으로 JSX 전체를 뱉어내는 if문을 많이 사용한다. 
    // 이 방법은 else를 생략 할 수도 있다. 

    // if(true){
    //     return (
    //         <div>
    //             <p> 첫번째 방법 - option </p>
    //             {
    //                 1===1?<p>두번째 방법</p>:null
    //             }

    //             {/* 삼항연산자를 사용하는 방법은 JSX 안에서 IF문 대신 사용할 수 있다는 장점이 있다. */}
    //         </div>
    //     )
    // }
    // return null; 
    // function 안에서 return을 만나면 그 아래에 있는 코드는 더 이상 실행되지 않으므로 이렇게 쓸 수도 있음.


    // 그 밖에 reducer 같은 if문이 여러개 중첩되는 경우에 쓸 수 있는 switch
    // function reducer(state, action1){
    //     switch(action1.type){
    //         case 'case1' : 
    //             return case1state;
    //         case 'case2' :
    //             return case2state;
    //         default : 
    //             return state 
    //     }
    // }

    //오브젝트 자료형을 응용한 enum 
    // 현재 상태에 따라 다른 html을 보여주고 싶은 경우
    // ex. state가 info면 상품정보, shipping이면 배송정보, refund면 환불약관
    var 현재상태 = 'info';
    var 정보명 = 'aaa';
    var 탭ui = {aaa: <p>A정보</p>, bbb:<p>B정보</p>, ccc:<p>C정보</p>}
    return(
        <div>
            {
                {info: <p>상품정보</p>,
                shipping : <p>배송정보</p>,
                refund : <p>환불약관</p>
                }[현재상태]
            }
            {
                탭ui[정보명]
            }
        </div>
    )
    //원래 jsx는 저렇게 오브젝트에 담아도, 어레이에 담아도 상관 없다.
    //이런식으로 object 자료형에 HTML을 다 정리해서 담은 다음, 마지막 object{}뒤에 []를 붙여서 "key 값이 '현재상태'인 자료를 뽑겠다" 고 선언하는 것이다.
    // 그러면 이제 현재상태 라는 변수의 값에 따라 원하는 html을 보여줄 수 있다. 

    //혹은 탭ui[정보명] 처럼 오브젝트를 변수로 저장해두고 꺼내서 쓸 수도 있다. 
    

    // 원래 둘 다 상태 변경이 가능하게 state로 만들어야 하지만 예제라서 var로 간단하게 표현한 것.
}

export default IfEx;