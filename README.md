# Node.js(Express)

Express로 구현된 Node.js 백엔드 어플리케이션 템플릿입니다.
## 🖇️ 준비 및 확인사항

### 지원 Node 버전
- 8, 10, 12, 14, 16, 18
- ⚠️ 로컬/테스트 환경과 클라우드타입에서 설정한 Node 버전이 상이한 경우 정상적으로 빌드되지 않을 수 있습니다.

### 패키지 명세
- 빌드 시 어플리케이션에 사용된 패키지를 설치하기 위해서는 `package.json`, `package-json.json`, `yarn.lock` 중 1개의 파일이 저장소에 반영되어 있어야합니다.
## ⌨️ 명령어

### Install

```bash
  npm ci
```

### Start

```bash
  npm start
```


## 🏷️ 환경변수

- 디렉토리 .env나 클라우드타입 프로젝트 설정 확인
- `NODE_ENV`: production(default) 
- `KAKAO_MAPS_API_APPKEY`: 카카오디벨로퍼 -> 프로젝트명 : 지오넷 프런트개발자팀 채용 과제 -> 자바스크립트키
- `DB_HOST`: 클라우드타입 마리아디비 프로젝트 설정 확인
- `DB_USER`: 클라우드타입 마리아디비 프로젝트 설정 확인
- `DB_PASSWORD`: 클라우드타입 마리아디비 프로젝트 설정 확인
- `DB_DATABASE`: 클라우드타입 마리아디비 프로젝트 설정 확인
- `DB_PORT`: 클라우드타입 마리아디비 프로젝트 설정 확인


## 💬 문제해결

- [클라우드타입 Docs](https://docs.cloudtype.io/)

- [클라우드타입 FAQ](https://help.cloudtype.io/guide/faq)

- [Discord](https://discord.gg/U7HX4BA6hu)


## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

-------------

IaaS (Infrastructure as a Service): 가장 기본적인 인프라 제공

위치: 가장 기본적인 단계로, 사용자가 서버, 네트워크, 저장소 같은 하드웨어 리소스를 가상화하여 직접 설정하고 관리합니다.
설명: 사용자는 가상 서버나 네트워크 인프라를 임대하며, 운영체제, 미들웨어, 애플리케이션 등은 스스로 관리합니다. 예: Amazon Web Services(AWS), Microsoft Azure, Google Cloud의 VM 서비스.
사용 대상: 서버와 네트워크 설정에 대한 유연성과 통제를 필요로 하는 고급 사용자가 주로 사용합니다.

PaaS (Platform as a Service): 개발 플랫폼 제공

위치: IaaS의 상위 단계로, 기본 인프라를 넘어서 개발 플랫폼을 제공하는 서비스입니다.
설명: 개발자는 코드 작성 및 배포에 집중할 수 있으며, 인프라 설정, 운영체제 관리, 서버 설정 등을 자동으로 처리해 줍니다. 예: Cloudtype, Heroku, Google App Engine, Microsoft Azure App Service.
사용 대상: 인프라 관리에 시간을 쓰기보다는 애플리케이션 개발과 배포에 집중하고 싶은 개발자.

SaaS (Software as a Service): 완전한 소프트웨어 솔루션 제공

위치: 최상위 단계로, 완전한 애플리케이션을 클라우드에서 제공하는 모델입니다.
설명: 사용자는 애플리케이션을 설치하거나 유지 관리할 필요 없이, 웹 브라우저 등을 통해 바로 사용할 수 있습니다. 예: Google Workspace(Gmail, Google Docs), Microsoft 365, Dropbox.
사용 대상: 소프트웨어를 빠르게 사용하고 싶은 일반 사용자나 비즈니스 사용자.

--------------

Express : 
  Node.js 기반의 웹 애플리케이션 프레임워크
  서버나 API를 쉽게 만들 수 있도록 도와주는 도구
  : 어떻게 쉽게 만드는지 -> 라우팅 / JSON 처리 자동화 / 미들웨어 / 비동기 요청 처리

미들웨어 :
요청과 응답 사이에서 처리되는 함수

--------------

Cloudtype : PaaS
Express 기반의 기본적인 Node.js 애플리케이션 구조

■ 디렉토리 구조
bin/ : 서버 실행과 관련된 스크립트 파일들이 포함

node_modules/ : 
외부 라이브러리 및 의존성들 설치되는 곳.
package.json에 명시된 의존성들이 이곳에 설치.
앱실행이 이 모듈을 불러와서 사용.

public/ : 
별다른 처리 없이 그대로 클라이언트에게 제공되는 정적인 파일이 담겨있다.
(html,css,js,img,font,audio,video...)

routes/ : 
Express에서 라우팅을 처리하는 역할
라우팅이란, 클라이언트가 특정 URL에 접근했을 때, 
서버가 그 요청을 어떻게 처리할지를 정하는 것

views/ : 
서버 측에서 렌더링되는 HTML 파일들을 담고 있습니다.

.gitignore : 
Git이 추적하지 않아야 할 파일과 폴더들을 정의
.gitignore에 있는 파일들은 배포되지 않습니다.

app.js : 
애플리케이션이 어떻게 설정되고 동작하는지를 정의하는 진입점 역할

package.json : 프로젝트의 이름, 버전, 사용된 라이브러리 등을 정의

--------------

<241116>

클라우드 타입 마리아디비 연결 시 

프로젝트 설정 -> 방화벽 -> TCP 외부 접속 허용하기

--------------

<241117>

require - 모듈 불러오기(외부,내장,사용자 작성 파일)

리스닝 - 서버가 클라이언트 요청을 받을 준비를 하고 특정 포트에서 대기하는 상태

api - 클라이언트와 서버가 데이터를 주고받는 방법