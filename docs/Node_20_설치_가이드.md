# Node.js 20 설치 방법 (Windows)

Node 18에서는 Vite 7·Firebase CLI 등이 동작하지 않을 수 있어, **Node.js 20 LTS**를 설치하는 방법을 안내합니다.

---

## 방법 1: 공식 설치 프로그램 (가장 간단)

### 1단계: 다운로드

1. 브라우저에서 **https://nodejs.org/ko** 접속
2. **LTS** 버전(권장) 중 **20.x** 다운로드  
   - 예: "20.18.1 LTS (권장)" 옆 **다운로드** 클릭  
   - Windows면 **Windows Installer (.msi)** 64비트 선택

### 2단계: 설치

1. 다운로드한 **.msi** 파일 더블클릭
2. **Next** 눌러 진행
3. 사용권 동의 → **Next**
4. 설치 경로는 기본값 그대로 → **Next**
5. **"Automatically install the necessary tools..."** 는 체크 해제해도 됨 → **Next**
6. **Install** → 관리자 권한 요청 시 **예**
7. **Finish** 로 설치 완료

### 3단계: 확인

1. **사용 중이던 터미널·Cursor는 모두 닫기**
2. **새 터미널** 열기 (Cursor에서 터미널 다시 열기)
3. 아래 입력:

```bash
node -v
```

- `v20.x.x` 처럼 **20**이 나오면 성공입니다.
- 여전히 `v18.x.x` 이면 터미널을 한 번 더 닫았다 열거나, PC 재시작 후 다시 `node -v` 확인.

### 4단계: 프로젝트에서 사용

새 터미널에서:

```bash
cd c:\Users\Kang\Desktop\daewoongPj
npm run dev
```

또는 배포 시:

```bash
firebase deploy
```

---

## 방법 2: nvm-windows로 여러 버전 관리 (선택)

**Node 18과 20을 같이 쓰고 싶을 때** 사용합니다.

### 1. 기존 Node 제거 (선택)

- 제어판 → 프로그램 제거 → **Node.js** 제거  
- (nvm을 쓰면 나중에 18·20을 골라 쓸 수 있으므로, 꼭 제거하지 않아도 됩니다.)

### 2. nvm-windows 설치

1. **https://github.com/coreybutler/nvm-windows/releases** 접속
2. **nvm-setup.exe** 최신 버전 다운로드 후 실행
3. 설치 경로는 기본값 → Next → Install
4. 설치 후 **새 터미널** 열기

### 3. Node 20 설치 및 사용

```bash
nvm install 20
nvm use 20
node -v
```

- `v20.x.x` 나오면 OK.  
- 이후 이 터미널에서는 `nvm use 20` 한 번 실행한 상태로 `npm run dev`, `firebase deploy` 사용하면 됩니다.

---

## 자주 하는 질문

**Q. 설치 후에도 `node -v`가 18이에요.**  
- Cursor·VS Code·명령 프롬프트 등 **열려 있던 터미널을 모두 닫고** 새로 열어보세요.  
- 그래도 18이면 **PC 재부팅** 후 다시 확인.

**Q. 기존 프로젝트(node_modules)는 어떻게 해요?**  
- Node 20으로 올린 뒤, 프로젝트 폴더에서 **한 번만** 아래 실행하는 것을 권장합니다.  
  ```bash
  cd c:\Users\Kang\Desktop\daewoongPj
  npm install
  ```

**Q. 18이 꼭 필요해요.**  
- 방법 2(nvm-windows)를 쓰면 `nvm use 18` / `nvm use 20` 으로 전환해서 쓸 수 있습니다.
