# React-Portfolio (리엑트 포트폴리오 디자인)
리엑트 프레임워크로 개발한 포트폴리오 UI  입니다.

# 사용 라이브러리
 - react-bootstrap@3.3.7
 - react-scroll@1.7.10
 - react-bootstrap@0.32.4

# 디렉토리 구조
 - contrainers : 화면의 구성을 담당하는 JS파일
 - lib : 화면을 구성하는 css 및 image 파일
 - routes : nodejs 백앤드 구성


# 2018-11-04
최초적용

# 2018-11-11
1. 상단 Navbar 의 페이지 이동 중, 문의 부분이 정상적으로 이동하지 않은 문제 수정
2. 브라우저의 width가 768px 이하 일 시, 토클이 보이게끔 수정
3. nodejs 백엔드 개발을 위한 기본 설정

# 2018-12-16
1. 기존의 nodejs 백엔드 개발 설정 제거
- express 디렉토리에 client에 기존 로직 생성
- client/package.json 에 proxy를 통해 백엔드 사용
