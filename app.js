/*
  ★ 요약
  애플리케이션이 어떻게 설정되고 동작하는지를 정의하는 진입점 역할
*/

require('dotenv').config(); // 환경변수 불러오기

// 오류 처리에 사용되는 모듈로, 404나 500과 같은 HTTP 에러를 생성할 때 사용
var createError = require('http-errors'); 
// Node.js 웹 프레임워크인 Express를 불러옵니다.
var express = require('express');
// 경로 관련 유틸리티를 제공하는 모듈로, 파일 시스템에서 경로를 다룰 때 사용
var path = require('path');
// 클라이언트가 보낸 쿠키를 쉽게 파싱할 수 있도록 도와주는 미들웨어입니다.
var cookieParser = require('cookie-parser');
// HTTP 요청 로그를 기록하는 미들웨어로, 개발 중 디버깅에 유용
var logger = require('morgan');
// 템플릿 엔진으로, HTML 파일을 동적으로 렌더링할 때 사용
const nunjucks = require('nunjucks');



// 라우터 설정
// routes/index.js 파일에서 정의한 라우트를 불러오기
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// Express 애플리케이션 초기화
var app = express();

// 뷰 엔진 설정
/*
  views 폴더: 템플릿 파일들이 위치하는 폴더를 설정합니다. 
  views 폴더 안에서 Nunjucks 템플릿을 사용할 것입니다.
  뷰 엔진 설정: Nunjucks를 템플릿 엔진으로 설정하고, 
  njk 확장자를 사용하도록 지정합니다. 
  Nunjucks는 동적 HTML 페이지를 렌더링하는 데 사용됩니다.
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure('views', { 
  express: app,
  autoescape: true,
  watch: true,
});


// 미들웨어 설정
app.use(logger('dev')); // morgan 모듈을 사용하여 개발 모드에서 요청 로그를 기록
app.use(express.json()); // JSON 형식의 요청 바디를 파싱하는 미들웨어
// URL-encoded 데이터를 파싱하는 미들웨어로, HTML 폼 데이터를 처리할 때 사용
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 클라이언트가 보낸 쿠키를 파싱하는 미들웨어
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공 미들웨어


// 라우트 설정
// 루트 경로로 요청이 들어오면 indexRouter가 처리
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/locations', indexRouter);
app.use('/api/categories', indexRouter);

// 404 오류 처리
// 요청한 경로가 없을 경우 404 오류를 발생시켜 다음 에러 처리
app.use(function(req, res, next) {
  next(createError(404));
});

// 오류 처리기
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
