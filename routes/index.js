var express = require('express');
var router = express.Router();


var sendmail = require('./sendmail.js');
/*
express.Router() 객체를 이용해 라우팅 로직을 설정 합니다. 라우트 객체 router는 get() 함수를 이용해 / URI로 호출되었을 경우 어떤 로직을 수행하도록 합니다. 두번째 파라매터인 콜백함수는 세 개의 파라메터를 갖는데 다음과 같습니다.

req: 클라이언트 요청정보를 담은 객체
res: 요청한 클라이어트로 응답을 위한 객체
next: 다음 로직 수행을 위한 함수명
위 코드는 클라인언트로부터 GET / 호출이 있을 경우, 뭔가를 렌더링하라는 의미 정도로 이해하면 됩니다. 자세한 라우팅은 별도 섹션에서 설명할 것입니다.

/views/index.jade: 템플릿 파일일 제이드(Jade) 파일입니다. 이 파일을 제이드 엔진을 통해 HTML 코드로 변환됩니다. 위에서 설정한 라우팅 로직 중 redner()함수에서 파라매터로 이 파일을 사용합니다. 제이드 파일도 마지막 섹션에서 자세히 설명할 것입니다.

/public: 정적 파일을 위한 폴더로서 자바스크립트 파일, 이미지 파일, 스타일시트 등을 포함합니다. 브라우져에 로딩된 HTML파일에서 해당 파일을 호출하면 내려주는 역할을 합니다.
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendmail', function(request, response) {
  response.json(sendmail(request, response));
});

module.exports = router;
