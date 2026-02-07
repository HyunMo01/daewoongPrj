# Firebase 설정 및 사용 가이드

이 프로젝트는 **Firebase Firestore**만 사용합니다.  
**카테고리**와 **이미지** 모두 Firestore에 저장하며, 이미지는 **base64(data URL)** 로 문서에 넣습니다.  
**Firebase Storage는 사용하지 않습니다.**

> **처음 설정이 어렵다면** → **[FIREBASE_SETUP_가이드.md](./FIREBASE_SETUP_가이드.md)** 에서 "1단계"부터 순서대로 따라해 보세요.  
> (화면에서 누를 곳, `.env`에 넣을 값까지 자세히 적어 두었습니다.)

---

## 1. Firebase란?

Firebase는 Google에서 제공하는 BaaS(Backend as a Service)입니다.

| 서비스 | 이 프로젝트에서의 용도 |
|--------|------------------------|
| **Firestore** | 카테고리 목록 저장 + 이미지 데이터 저장 (이미지는 base64로 문서에 포함) |
| **Firebase Storage** | **미사용** (이미지는 Firestore에만 저장) |
| **Authentication** | (추후) 로그인·회원가입 (현재 미사용) |

- 별도 서버 없이 클라이언트만으로 CRUD 가능  
- 실시간 동기화, 오프라인 지원 등 확장 기능 제공  
- 웹·앱(iOS/Android) 동일 프로젝트로 사용 가능 → 추후 앱 전환 시 그대로 활용 가능  

---

## 2. 프로젝트 생성 및 앱 등록

1. [Firebase 콘솔](https://console.firebase.google.com/) 접속 후 **Google 로그인**
2. **프로젝트 추가** → 프로젝트 이름 입력(예: `daewoong-manufacturing`) → 필요 시 Google Analytics 설정
3. **빌드** → **웹(</>)** 선택 → 앱 닉네임 입력 후 **앱 등록**
4. 표시되는 **firebaseConfig** 객체를 복사해 두기 (다음 단계에서 사용)

---

## 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고, Firebase 설정 값을 넣습니다.

```bash
# .env.example 을 복사한 뒤 .env 로 저장
cp .env.example .env
```

`.env` 내용 예시 (Firebase 콘솔에서 복사한 값으로 채우기):

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

- **주의**: `VITE_` 접두사가 있어야 Vite에서 클라이언트로 노출됩니다.  
- `.env`는 Git에 올리지 마세요 (이미 `.gitignore`에 포함됨).

---

## 4. Firestore 설정

1. Firebase 콘솔 → **Firestore Database** → **데이터베이스 만들기**
2. **테스트 모드**로 시작 후, 보안 규칙은 아래처럼 설정해 두세요 (실서비스 시에는 규칙을 더 엄격하게 조정해야 합니다).

**Firestore 규칙 예시 (개발/테스트용):**

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

**컬렉션 구조:**

- **`categories`**: 카테고리 문서  
  - `name`, `description`, `order`, `createdAt`
- **`images`**: 이미지 문서 (Storage 없이 Firestore에만 저장)  
  - `categoryId`, `url` (base64 data URL), `title`, `fileName`, `createdAt`  
  - 이미지는 업로드 시 리사이즈·압축 후 **base64**로 변환되어 `url` 필드에 저장됨 (문서 1MB 제한 준수)

---

## 5. 프로젝트에서 사용하는 파일

| 경로 | 역할 |
|------|------|
| `src/firebase/config.js` | Firebase 앱 초기화, Firestore만 사용 (Storage 미사용) |
| `src/firebase/categories.js` | 카테고리 CRUD (Firestore) |
| `src/firebase/images.js` | 카테고리별 이미지 조회·업로드·삭제 (Firestore에 base64 저장) |

---

## 6. 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 열고, 카테고리를 추가한 뒤 해당 카테고리를 선택해 이미지를 업로드하면 **Firestore에만** 반영됩니다 (이미지는 base64로 저장).

---

## 7. 추후 앱으로 전환 시

- 같은 Firebase 프로젝트에 **Android/iOS 앱**을 추가하면 동일한 Firestore를 그대로 사용할 수 있습니다.
- 웹용 `VITE_FIREBASE_*` 설정과 별도로, 앱용 설정 파일(예: `google-services.json`, `GoogleService-Info.plist`)만 추가하면 됩니다.

---

## 8. 문제 해결

- **"Firebase: Error (auth/...)"**  
  → 이 프로젝트는 아직 Authentication을 사용하지 않습니다. Firestore만 사용 중입니다.
- **이미지 목록이 안 나와요**  
  → Firestore 규칙에서 `read`가 허용되는지, `.env`의 `VITE_FIREBASE_*` 값이 맞는지 확인하세요.
- **업로드 시 권한 오류**  
  → Firestore 규칙에서 `write`가 허용되는지 확인하세요. (Storage는 사용하지 않음)
- **CORS / 네트워크 오류**  
  → Firebase 콘솔에서 해당 프로젝트의 도메인(또는 localhost)이 허용 목록에 있는지 확인하세요.

필요하면 Firebase 콘솔의 **사용량·할당량** 메뉴에서 Firestore 읽기/쓰기 횟수를 확인할 수 있습니다.
