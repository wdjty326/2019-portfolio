### API 정의
| API | 정의 | 파라미터 |
|---|---|---|
| GET \n /api/chatroom/list | 채팅 리스트를 가져옵니다. | N/A |
| GET \n /api/connect/{id}/{chatroomId} | 선택한 채팅방에 접속합니다. | 'id{Long, chatroomId={Long}' |
| GET \n /api/push | 채팅을 전송합니다. | 'id={Long}, chatroomId={Long}, text={String}' |