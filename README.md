### API 정의
| API | 정의 | 파라미터 |
|---|---|---|
| GET<br>/api/chatroom/list | 채팅 리스트를 가져옵니다. | N/A |
| GET<br>/api/connect/{id}/{chatroomId} | 선택한 채팅방에 접속합니다. | id{Long}<br>chatroomId={Long} |
| GET<br>/api/push | 채팅을 전송합니다. | id={Long}<br>chatroomId={Long}<br>text={String} |