// 모듈 가져오기
var express = require('express');

/*
  ★ 요약
  Express에서 라우팅을 처리하는 역할
  라우팅이란, 클라이언트가 특정 URL에 접근했을 때, 
  서버가 그 요청을 어떻게 처리할지를 정하는 것
*/


/*
router 객체는 Express에서 경로별로 HTTP 요청을 처리할 수 있도록 
도와주는 미들웨어입니다. 다양한 HTTP 메서드(GET, POST 등)를 경로별로 
정의할 수 있습니다.
*/
var router = express.Router(); // 라우터 객체 초기화

/* 라우트 정의 */
// 루트경로(/)로 들어왔을 때 처리하는 라우트
// req는 요청 객체, res는 응답 객체, next는 다음 미들웨어로 요청을 넘길 때 사용하는 함수
router.get('/', function(req, res, next) {
  // views 폴더에 있는 index.html 파일을 렌더링하여 클라이언트에 반환
  res.render('index.html');
});

// 모듈 내보내기
/* 
  **module.exports**를 사용하여 router 객체를 외부로 내보냅니다. 
  이렇게 하면 이 파일을 다른 곳에서 require하여 사용할 수 있습니다.
  보통 이 파일은 **app.js**에서 불러오며, 
  전체 애플리케이션의 경로 설정에 통합됩니다.
*/
module.exports = router;
