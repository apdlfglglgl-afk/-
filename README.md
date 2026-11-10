# 반도체 공정 부품·소재 실무 용어 사전 66선 (Semi-Glossary 66)

신입 엔지니어와 현장 작업자를 위한 66개 반도체 실무 용어, 1:1 맞춤형 기술 도해, 현장 은어, 안전 Red-Line 및 엑셀 사진 클립보드(Ctrl+V) 교체 시스템입니다.

---

## 🚀 GitHub Pages 배포 방법

본 프로젝트는 GitHub Pages의 서브패스(`https://<아이디>.github.io/<저장소이름>/`) 환경에서도 에셋 404 오류 없이 바로 구동될 수 있도록 `base: './'` 설정과 자동 배포 워크플로우(`deploy.yml`)가 완료되어 있습니다.

### 방법 1. GitHub Actions 자동 배포 (가장 권장)

1. 코드를 GitHub 저장소의 `main` (또는 `master`) 브랜치로 푸시(Push)합니다.
   ```bash
   git add .
   git commit -m "feat: 반도체 실무 용어 사전 66선 구축"
   git branch -M main
   git remote add origin https://github.com/<사용자ID>/<저장소이름>.git
   git push -u origin main
   ```
2. GitHub 저장소 상단 메뉴의 **Settings**로 이동합니다.
3. 좌측 사이드바에서 **Pages**를 클릭합니다.
4. **Build and deployment** 섹션의 **Source**를 **`GitHub Actions`**로 선택합니다.
5. 상단 **Actions** 탭으로 가시면 자동으로 빌드 및 배포가 진행되며, 약 1분 후 `https://<사용자ID>.github.io/<저장소이름>/` 주소로 사이트가 즉시 오픈됩니다!

---

### 방법 2. npm 명령어로 직접 배포 (`gh-pages`)

로컬 터미널에서 명령어로 바로 `gh-pages` 브랜치에 배포하려면:

1. 터미널에서 다음 명령어를 실행합니다:
   ```bash
   npm run deploy
   ```
2. GitHub 저장소의 **Settings** -> **Pages** -> **Source**를 **`Deploy from a branch`**로 두고, 브랜치를 **`gh-pages` / `/ (root)`**로 선택 후 저장합니다.

---

## 💻 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 테스트
npm run build
```

---

## ✨ 핵심 기능

1. **66선 전수 수록 및 1:1 기술 도해 매핑**: 소재, 제품, 소재가공, 에칭및세정, 검사및포장 5개 카테고리 전체 맞춤 SVG 도해 내장
2. **클립보드(Ctrl+V) 실사 교체**: 엑셀 시트에서 사진 복사(Ctrl+C) 후 원하는 카드를 지정하여 Ctrl+V로 즉시 사진 교체
3. **시트 사진 일괄 등록**: 파일명 기반 자동 1:1 매칭 드래그 앤 드롭 일괄 등록 모달
4. **IndexedDB 로컬 영구 보관**: 등록/교체된 사진 데이터가 브라우저에 안전하게 보관되어 재접속 시에도 유지
5. **다양한 학습 모드**: 카드 뷰, 스프레드시트 테이블 뷰, 3D 플래시카드 암기 뷰, 10문제 현장 테스트 퀴즈, 전수 인쇄용 치트시트
