# WAP Customer Management Messenger

## 프로젝트 목표

- **프로젝트 명**: WAP Customer Management Messenger

### 우선순위

1. **UI Package 결정**:
   - UI를 `@wap-cmm/ui`로 라이브러리화할지, 패키지로만 만들 것인지 결정.
2. **Server Socket API 및 SDK Package 작성**:
   - Server Socket API 및 SDK 패키지를 개발. `@wap-cmm/sdk`로 사용자가 사용할 수 있도록 만든다.
3. **Web 및 Server Rest API 개발**:
   - 웹 및 서버 개발.
4. **Admin 페이지 개발**:
   - 관리자 페이지 개발.

## UI Package

- UI 패키지를 만들 예정.
- UI는 사용자 인터페이스 개발을 담당하며, `@wap-cmm/ui`로 라이브러리화할지 패키지로만 만들 것인지 결정 필요.

## Server Socket API & SDK Package

- Server 및 SDK 패키지를 개발할 예정.
- SDK는 메신저 기능, 이미지 업로드, 알림, 로컬 스토리지를 통한 메세지 저장 등의 기능을 제공할 것으로 예상됨.
- 또한, 클라이언트 시크릿즈 발급에 관한 작업이 수행될 것임.

## Web & Server Rest API

- 웹 및 서버 개발을 수행할 예정.

## Admin Page

- 관리자 페이지를 개발할 예정.

## ETC

그러면 ui를 먼저 만들어볼까? 근데 뭐가 있을 줄 알고 ui를 만들지. 일단은 기본적인 ui를 만들어보자.
figma로 먼저 기능을 디자인해볼까?

메신저 기능은?

- 일반적인 텍스트 메시지
- 이미지 올리기
- 알림
- localStorage를 통해서 메세지 저장
- memberId를 통해서 특정 유저에 대한 메세지 저장
- dashboard에서 일단 Client secrets를 발급받아야함.

## 할 일

일단 lint
