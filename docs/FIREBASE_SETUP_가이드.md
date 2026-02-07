# Firebase 설정 - 처음부터 자세히

아래 순서대로만 따라하면 됩니다. 화면에 나오는 단계와 이름이 조금 다를 수 있지만, 같은 메뉴를 찾아가면 됩니다.

---

## 1단계: Firebase 콘솔 들어가기

1. 브라우저에서 **https://console.firebase.google.com/** 주소로 이동합니다.
2. **Google 계정으로 로그인**합니다 (Gmail 계정이면 됩니다).
3. 로그인 후 Firebase 콘솔 첫 화면이 나옵니다.

---

## 2단계: 새 프로젝트 만들기

1. **"프로젝트 추가"** 또는 **"프로젝트 만들기"** 버튼을 클릭합니다.
2. **프로젝트 이름**을 입력합니다.  
   - 예: `제조관리` 또는 `daewoong-manufacturing`  
   - 영문이어도 되고, 한글이어도 됩니다.
3. **다음**을 누릅니다.
4. **Google Analytics** 설정 화면이 나오면:
   - 사용할 경우: **계정 선택** 후 다음.
   - 사용 안 할 경우: **"이 프로젝트에 Google Analytics 사용 설정"**을 **끄기**로 두고 다음.
5. **프로젝트 만들기**를 누르고, 생성이 끝날 때까지 기다립니다 (몇 초~십 초).
6. **계속**을 누르면 이제 만든 프로젝트 화면으로 들어갑니다.

---

## 3단계: 웹 앱 등록 (설정 값 받기)

우리 프로젝트는 **웹 앱**이므로, Firebase에 "웹 앱"을 하나 등록해야 합니다. 이때 **설정 값(API 키 등)**을 받습니다.

1. 프로젝트 화면 왼쪽 위에 **기어 아이콘(⚙)**이 있습니다. 클릭합니다.
2. **"프로젝트 설정"**을 클릭합니다.
3. 설정 페이지가 열리면 아래로 조금 내립니다.
4. **"내 앱"** 또는 **"앱"** 섹션이 보입니다.  
   - 아직 앱이 없으면 **"</> 웹"** 아이콘(또는 "웹" 버튼)을 클릭합니다.
5. **앱 닉네임**을 입력합니다.  
   - 예: `제조 웹` 또는 `manufacturing-web`  
   - 그냥 **"웹 앱 등록"** 또는 **"다음"**을 눌러도 됩니다.
6. **"Firebase Hosting"** 사용 여부는 지금은 **체크하지 않아도** 됩니다. **"앱 등록"** 또는 **"다음"**을 누릅니다.
7. 그러면 **설정 코드**가 나옵니다. 아래와 비슷하게 생겼습니다:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
     authDomain: "제조관리-xxxxx.firebaseapp.com",
     projectId: "제조관리-xxxxx",
     storageBucket: "제조관리-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```

8. **이 화면은 나중에 다시 볼 수 있습니다.**  
   - 경로: **프로젝트 설정** → 아래로 스크롤 → **"내 앱"** → 방금 만든 웹 앱 카드 안에 **"설정"** 또는 **config** 객체가 보입니다.

이제 이 **6개 값**을 우리 프로젝트의 `.env` 파일에 넣을 겁니다.

---

## 4단계: .env 파일 만들기 (설정 값 넣기)

1. **프로젝트 폴더**를 엽니다: `c:\Users\Kang\Desktop\daewoongPj`
2. **루트 폴더**(`package.json`이 있는 곳)에 **새 파일**을 만듭니다.
3. 파일 이름을 **정확히** `.env` 로 합니다.  
   - 앞에 점(.)이 있고, 뒤에 확장자 없이 `env`만 있어야 합니다.
4. 아래 내용을 **복사**해서 `.env` 파일에 **붙여넣기** 한 다음, **Firebase 콘솔에서 복사한 실제 값**으로 바꿉니다.

```env
VITE_FIREBASE_API_KEY=여기에_apiKey_값_붙여넣기
VITE_FIREBASE_AUTH_DOMAIN=여기에_authDomain_값_붙여넣기
VITE_FIREBASE_PROJECT_ID=여기에_projectId_값_붙여넣기
VITE_FIREBASE_STORAGE_BUCKET=여기에_storageBucket_값_붙여넣기
VITE_FIREBASE_MESSAGING_SENDER_ID=여기에_messagingSenderId_값_붙여넣기
VITE_FIREBASE_APP_ID=여기에_appId_값_붙여넣기
```

**매핑 표 (Firebase 화면 → .env 변수):**

| Firebase config 이름        | .env 변수 이름                    |
|----------------------------|-----------------------------------|
| `apiKey`                   | `VITE_FIREBASE_API_KEY`          |
| `authDomain`               | `VITE_FIREBASE_AUTH_DOMAIN`      |
| `projectId`                | `VITE_FIREBASE_PROJECT_ID`       |
| `storageBucket`            | `VITE_FIREBASE_STORAGE_BUCKET`   |
| `messagingSenderId`        | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| `appId`                    | `VITE_FIREBASE_APP_ID`           |

**예시 (실제로는 본인 Firebase 값으로 채우세요):**

```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=제조관리-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=제조관리-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=제조관리-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

5. **저장**합니다.  
6. **주의**: `.env` 파일은 Git에 올리면 안 됩니다. 이미 `.gitignore`에 들어 있어서 실수로 올라가는 것은 막혀 있습니다.

이제 **Firestore 데이터베이스**만 켜면 됩니다. (이미지는 Storage가 아니라 **Firestore에 base64로 저장**합니다.)

---

## 5단계: Firestore 데이터베이스 켜기

Firestore는 **카테고리 목록**과 **이미지 데이터**를 모두 저장하는 곳입니다.  
이미지는 별도 파일 저장소(Storage) 없이 **문서 안에 base64 문자열**로 저장됩니다.

1. Firebase 콘솔 왼쪽 메뉴에서 **"Firestore Database"** 또는 **"빌드" → "Firestore Database"**를 클릭합니다.
2. **"데이터베이스 만들기"** 버튼을 클릭합니다.
3. **위치 선택**  
   - `asia-northeast3 (서울)` 이 있으면 그걸 선택하는 것이 좋습니다.  
   - 없으면 가까운 지역(예: `asia-northeast1`)을 선택하고 **다음**을 누릅니다.
4. **보안 규칙** 설정:
   - **"테스트 모드에서 시작"**을 선택합니다.  
   - (나중에 실서비스할 때는 규칙을 꼭 다시 조정해야 합니다.)
5. **사용 설정** 또는 **만들기**를 누릅니다.
6. 데이터베이스가 생성될 때까지 기다립니다.

**규칙을 나중에 바꾸고 싶을 때:**

- Firestore Database 화면에서 **"규칙"** 탭을 클릭합니다.
- 아래 규칙으로 바꾼 뒤 **게시**합니다 (개발용 예시):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

---

## 6단계: 개발 서버에서 확인

1. 터미널(또는 Cursor 터미널)을 엽니다.
2. 프로젝트 폴더로 이동한 뒤 **`npm install`**을 한 번 실행한 다음, **`npm run dev`**를 실행합니다.

```bash
cd c:\Users\Kang\Desktop\daewoongPj
npm install
npm run dev
```

(실행 시 오류가 나면 아래 **문제 해결**을 참고하세요.)

3. 브라우저에서 나오는 주소(예: http://localhost:5173)로 접속합니다.
4. **카테고리 관리**에서 카테고리 하나를 **추가**해 봅니다.
5. **카테고리별 이미지**에서 그 카테고리를 선택하고 **이미지 선택**으로 사진을 **업로드**해 봅니다.

- 카테고리가 추가되고 이미지가 보이면 **Firestore 설정이 정상**인 것입니다.  
  (이미지는 **Firestore 문서에 base64**로 저장되며, **Storage는 사용하지 않습니다.**)
- "권한 오류"나 "설정을 확인하세요" 같은 메시지가 나오면 아래 **문제 해결**을 봅니다.

---

## 문제 해결

### `npm run dev` 시 "crypto.hash is not a function" / "Node.js version" 오류

- **원인**: Node.js 18을 쓰는 환경에서는 Vite 7이 동작하지 않습니다.
- **조치**: 이 프로젝트는 Node 18에서도 돌아가도록 **Vite 5**로 맞춰 두었습니다.
- `npm run dev` 전에 **`npm install`**을 한 번 실행한 뒤 다시 시도하세요.
- 여전히 오류가 나면 터미널에서 **`node -v`**로 버전을 확인하세요.  
  Node.js **20 이상**이면 Vite 7로 올려도 되고, **18**이면 지금처럼 Vite 5를 쓰면 됩니다.

### "카테고리 목록을 불러오지 못했습니다" / "Firebase 설정을 확인하세요"

- **.env** 파일이 프로젝트 **루트**에 있는지 확인하세요 (`package.json`과 같은 폴더).
- 파일 이름이 **`.env`** 인지 확인하세요 (앞에 점, 확장자 없음).
- **VITE_** 로 시작하는 6개 변수를 모두 채웠는지, 따옴표 없이 값만 넣었는지 확인하세요.
- `.env`를 수정한 뒤에는 **개발 서버를 한 번 종료했다가 다시 `npm run dev`** 해 보세요.

### "업로드에 실패했습니다" / "Firestore 규칙을 확인하세요"

- 이미지는 **Firestore에 base64로 저장**됩니다. Storage는 사용하지 않습니다.
- Firebase 콘솔 → **Firestore Database** → **규칙** 탭에서 `read, write` 가 허용돼 있는지 확인하세요.
- 5단계의 Firestore 규칙 예시를 적용한 뒤 **게시**하고 다시 시도해 보세요.

### 설정 값을 다시 보고 싶어요

- **Firebase 콘솔** → **기어 아이콘** → **프로젝트 설정**  
- 아래로 내려서 **"내 앱"** → 웹 앱 카드  
- **config** 객체 또는 **SDK 설정** 부분에 `apiKey`, `authDomain` 등이 나옵니다.  
  여기서 복사해서 `.env`에 넣으면 됩니다.

---

## 정리 체크리스트

- [ ] Firebase 콘솔에서 프로젝트 생성
- [ ] 웹 앱 등록 후 `firebaseConfig` 6개 값 확인
- [ ] 프로젝트 루트에 `.env` 파일 생성 후 6개 값 입력 (`VITE_FIREBASE_...`)
- [ ] Firestore Database 사용 설정 (테스트 모드) — 이미지는 여기에 base64로 저장됨
- [ ] `npm run dev` 후 카테고리 추가·이미지 업로드로 동작 확인

---

## 이미지 저장 방식 요약

| 항목 | 설명 |
|------|------|
| **저장 위치** | Firestore 데이터베이스만 사용 (Storage 미사용) |
| **이미지 형식** | 업로드 시 압축·리사이즈 후 **base64(data URL)** 로 변환해 문서에 저장 |
| **문서 크기 제한** | Firestore 문서 1MB 제한에 맞추기 위해 이미지는 약 700KB 이하로 자동 압축 |
| **장점** | Storage 업그레이드·결제 없이 Firestore만으로 사용 가능 |

다 해보시고, 특정 단계에서 막히는 부분이 있으면 "몇 단계에서, 어떤 화면/메시지가 나오는지" 알려주시면 그 부분만 더 구체적으로 적어 드리겠습니다.
