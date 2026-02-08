# Firebase Authentication 400 에러 해결 가이드

회원가입 시 400 에러가 발생하는 경우, 대부분 Firebase 콘솔에서 Authentication이 제대로 활성화되지 않았거나 설정이 누락된 경우입니다.

## 1단계: Firebase 콘솔에서 Authentication 활성화 확인

### 📌 Firebase 콘솔 접속
1. [https://console.firebase.google.com/](https://console.firebase.google.com/) 접속
2. **daewoong-b2c53** 프로젝트 선택

### 📌 Authentication 활성화
1. 좌측 메뉴에서 **"빌드(Build)"** → **"Authentication"** 클릭
2. 만약 "시작하기" 버튼이 보이면 클릭
3. **"Sign-in method"** 탭을 선택

### 📌 이메일/비밀번호 로그인 활성화 (중요!)
1. **"이메일/비밀번호"** 항목을 찾아서 클릭
2. 첫 번째 **"사용 설정"** 토글을 **ON**으로 변경 (파란색으로 켜짐)
   - ⚠️ "Email link (passwordless sign-in)"는 OFF로 두세요 (두 번째 토글)
3. **"저장"** 버튼 클릭
4. 상태가 **"사용 설정됨"**으로 표시되어야 합니다

## 2단계: 브라우저 콘솔에서 정확한 에러 확인

1. 브라우저에서 `http://localhost:5174` 접속
2. **F12** 키를 눌러 개발자 도구 열기
3. **Console** 탭 선택
4. 회원가입을 다시 시도
5. 빨간색으로 표시되는 에러 메시지 확인

### 흔한 에러 메시지들

#### ❌ "Firebase: Error (auth/admin-restricted-operation)"
**원인**: Authentication이 활성화되지 않음  
**해결**: 위 1단계를 다시 확인

#### ❌ "Firebase: Error (auth/operation-not-allowed)"
**원인**: 이메일/비밀번호 로그인 방법이 활성화되지 않음  
**해결**: Firebase 콘솔 → Authentication → Sign-in method → 이메일/비밀번호 활성화

#### ❌ "Firebase: Error (auth/invalid-api-key)"
**원인**: .env 파일의 API 키가 잘못됨  
**해결**: Firebase 콘솔에서 API 키를 다시 복사

## 3단계: 개발 서버 재시작 (필요 시)

.env 파일을 수정한 경우에만 필요합니다:

1. 현재 실행 중인 개발 서버를 중지 (**Ctrl + C**)
2. `npm run dev` 명령어로 다시 시작

## 4단계: 다시 테스트

1. 브라우저에서 `http://localhost:5174` 새로고침
2. 회원가입 탭에서:
   - 이메일: `test@example.com`
   - 비밀번호: `123456` (최소 6자)
3. 회원가입 버튼 클릭
4. 성공하면 자동으로 메인 화면으로 이동

## 추가 확인 사항

### ✅ Firebase 콘솔에서 사용자 확인
회원가입이 성공하면:
1. Firebase 콘솔 → Authentication → Users
2. 방금 가입한 사용자가 목록에 나타남

### ✅ 네트워크 탭 확인
개발자 도구 → Network 탭에서:
1. `identitytoolkit.googleapis.com` 요청 찾기
2. Status Code 확인
   - **200**: 성공
   - **400**: Authentication 비활성화 또는 설정 오류
   - **401**: API 키 문제

## 스크린샷 가이드

### Firebase 콘솔에서 확인해야 할 화면:

**1. Authentication 메뉴**
- 좌측에 "Authentication" 메뉴가 보여야 함

**2. Sign-in method 탭**
- "이메일/비밀번호"가 "사용 설정됨" 상태여야 함

**3. 이메일/비밀번호 설정 화면**
```
┌─────────────────────────────────────┐
│ 이메일/비밀번호                      │
├─────────────────────────────────────┤
│ 사용 설정              [ON] 🔵      │
│ Email link             [OFF] ⚪      │
│                                      │
│              [취소]  [저장]         │
└─────────────────────────────────────┘
```

## 여전히 문제가 있다면

브라우저 콘솔의 정확한 에러 메시지를 알려주시면 더 구체적으로 도와드릴 수 있습니다!
