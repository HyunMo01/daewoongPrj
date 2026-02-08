# 로고 이미지 추가 안내

사이드바에 대웅제약 로고를 추가하려면 다음 단계를 따라주세요:

## 방법 1: 직접 파일 복사 (권장)

1. 제공하신 대웅제약 로고 이미지 파일을 준비합니다
2. 파일 이름을 `logo.png`로 변경합니다
3. 다음 경로에 복사합니다:
   ```
   c:\Users\Kang\Desktop\daewoongPj\public\logo.png
   ```

## 방법 2: 명령어로 복사

Windows 탐색기나 PowerShell에서 이미지를 복사:

```powershell
# 이미지 파일이 있는 위치에서
Copy-Item "이미지파일경로.png" "c:\Users\Kang\Desktop\daewoongPj\public\logo.png"
```

## 완료 후

- 브라우저를 새로고침하면 사이드바 상단에 로고가 표시됩니다
- Sidebar.vue는 이미 `/logo.png`를 참조하도록 업데이트되어 있습니다

## 현재 상태

✅ Sidebar.vue - 로고 이미지 참조 코드 완료  
⏳ public/logo.png - 이미지 파일 추가 필요
