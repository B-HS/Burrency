# Burrency
- 매번 네이버 들어가서 환율 치기 귀찮다 !!
- Electron/NEST.js를 이용한 실시간 환율 어플리케이션

# 목표
- Docker배포가 가능한 Nest.js 백엔드
- React + TS + Electron을 이용한 데스크톱 어플리케이션 작성
- Github action을 이용하여 Lightsail 서버로의 CI/CD작업

# 현재
- 기본 백엔드 준비 완료 (환율 크롤링, sqlite에 저장, nestjs에서 마지막 저장결과 get)
- 기본 일렉트론 앱 준비 완료

# 예정
- 비교적 간단한 앱이라 최대한 9월 안으로 완성
- MAC/WINDOW 환경 양쪽에서 돌아가는 환율 환경 구축
- WINDOW는 될 지는 모르겠는데 일단 맥용으로 작업표시줄에 환율 바로 띄우기
- 최대한 API KEY등을 사용하지 않고 구축

# 진행 중
- 일렉트론 : IPCRenderer로 양방향 신호, 닫기, 숨김버튼, 우측클릭 메뉴 (홈페이지, 닫기 추가)
- 백엔드: 테이블 확장성 조금 생각해보기
