# 제조를 위한 모든 것

Vue 3 + Firebase 기반 웹 프로젝트입니다.  
카테고리별 이미지 저장·조회 기능을 제공하며, 추후 앱(iOS/Android)으로 확장할 예정입니다.

## 기술 스택

- **Vue 3** (Composition API, `<script setup>`)
- **Vite**
- **Firebase** (Firestore, 이미지 base64 저장)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Firebase 설정

- [Firebase 콘솔](https://console.firebase.google.com/)에서 프로젝트 생성 후 웹 앱 등록
- 루트에 `.env` 파일 생성 후 Firebase 설정 값 입력 (`.env.example` 참고)
- **Firestore** 사용 설정 및 개발용 규칙

자세한 단계는 **[docs/FIREBASE.md](docs/FIREBASE.md)** 를 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 표시되는 주소(예: http://localhost:5173)로 접속합니다.

### 4. 빌드

```bash
npm run build
```

`dist` 폴더에 프로덕션 빌드가 생성됩니다.

### 5. 배포 (다른 사람이 접속할 수 있는 주소)

Firebase Hosting으로 배포하면 **https://프로젝트ID.web.app** 같은 주소를 받을 수 있습니다.

- 자세한 절차: **[docs/배포_가이드.md](docs/배포_가이드.md)**
- 요약: `firebase login` → `firebase use --add`(프로젝트 연결) → `npm run deploy`

## 기능

- **카테고리 관리**: 제조 항목별 카테고리 추가·삭제
- **카테고리별 이미지**: 카테고리 선택 후 이미지 업로드, 목록 조회, 삭제

## 프로젝트 구조

```
src/
  firebase/          # Firebase 설정 및 API
    config.js        # 앱 초기화, db, storage
    categories.js    # 카테고리 CRUD
    images.js        # 이미지 업로드/조회/삭제
  components/
    CategoryManager.vue   # 카테고리 관리 UI
    ImageUpload.vue       # 카테고리별 이미지 업로드·갤러리
  App.vue
  main.js
  style.css
docs/
  FIREBASE.md        # Firebase 설정·사용 설명
```

## 추후 계획

- 앱(Native 또는 Capacitor 등)으로 확장
- 추가 기능 확장 (문서 관리, 설비 현황 등)
