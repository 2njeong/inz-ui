# inz-ui

inz-ui Design System UI Library

> Tree-shaking을 지원하는 React 컴포넌트 라이브러리

## 📦 설치

### 1. 패키지 설치

```bash
npm install inz-ui
```

### 2. Tailwind CSS 설정 (필수)

**먼저 Tailwind CSS를 설정해야 합니다!** 아래 섹션의 "Tailwind CSS v4 설정 예시"를 참고하세요.

### 3. 사용 예시

```tsx
// 전체 import
import { Badge, Alert, Button } from "inz-ui";
import "inz-ui/styles";

// Tree-shaking을 통해 필요한 컴포넌트만 번들에 포함됩니다!
function App() {
  return <Badge>Hello</Badge>;
}
```

**⚠️ 주의**: `import "inz-ui/styles"`를 사용하기 전에, 반드시 CSS 파일에 `@source "./node_modules/inz-ui/src"`를 추가해야 합니다. 자세한 내용은 아래 "Tailwind CSS v4 설정 예시" 섹션을 참고하세요.

## 📋 요구사항

- React 19.1.1 이상
- React DOM 19.1.1 이상
- Tailwind CSS 4.1 이상 (정확한 버전)
  - 이 라이브러리는 Tailwind CSS 4.1.13에서 개발 및 테스트되었습니다.
  - 라이브러리 내부에서는 Tailwind 빌드를 **직접 수행하지 않으며**,  
    **최종 앱의 Tailwind 인스턴스가 한 번만 빌드**하여 CSS를 생성합니다.
  - 다른 버전의 Tailwind CSS를 사용할 경우 UI가 예상과 다르게 표시될 수 있습니다.
  - 설치 시 `peerDependencies` 경고가 표시되면, Tailwind CSS 버전을 확인해주세요.

### Tailwind CSS v4 설정 예시 (사용자 프로젝트)

**⚠️ 중요**:

1. Tailwind CSS v4에서는 라이브러리의 소스 파일을 직접 스캔해야 합니다. 반드시 `@source` 디렉티브에 라이브러리 경로를 추가해야 합니다!
2. `@import "tailwindcss"`는 **최종 앱에서만** 한 번 해야 합니다. 라이브러리 내부에서는 포함하지 않습니다.

```css
/* 예: app/src/index.css */
/* 1. 먼저 Tailwind를 import (최종 앱에서만) */
@import "tailwindcss";

/* 2. 앱 소스 스캔 (선택사항) */
/* Tailwind CSS v4는 기본적으로 프로젝트의 모든 파일을 자동으로 스캔합니다.
   따라서 앱의 src 폴더는 자동으로 스캔되므로 @source "./src"는 생략 가능합니다.
   하지만 명시적으로 지정하는 것도 좋은 방법입니다. */
/* @source "./src"; */

/* 3. ⚠️ 필수: inz-ui 라이브러리 소스 스캔 */
/* node_modules는 기본적으로 스캔에서 제외되므로, 
   라이브러리 경로를 명시적으로 지정해야 합니다.
   이 경로가 없으면 라이브러리 컴포넌트의 스타일이 적용되지 않습니다! */
@source "./node_modules/inz-ui/src";

/* 4. 디자인 토큰 / 폰트 / 타이포그래피 CSS */
/* 라이브러리 내부에는 @import "tailwindcss"가 없으므로, 
   위에서 이미 import한 Tailwind를 사용합니다 */
@import "inz-ui/styles";
```

**Vite 설정 예시** (필요한 경우):

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**자주 묻는 질문 (FAQ)**:

**Q: `@source "./src"`를 지정하지 않아도 앱의 클래스가 스캔되나요?**  
A: 네, Tailwind CSS v4는 기본적으로 프로젝트의 모든 파일을 자동으로 스캔합니다. 단, `.gitignore`에 있는 파일, `node_modules`, 바이너리 파일, CSS 파일, lock 파일은 제외됩니다.
따라서 앱의 `src` 폴더는 자동으로 스캔되므로 `@source "./src"`는 생략 가능합니다. 하지만 명시적으로 지정하는 것도 좋은 방법입니다.

**Q: 라이브러리 소스만 스캔하면 앱 내부의 클래스명은 스캔이 안 되나요?**  
A: 아닙니다. Tailwind CSS v4는 기본적으로 프로젝트 파일을 자동으로 스캔하므로, 라이브러리 경로만 지정해도 앱의 클래스는 자동으로 스캔됩니다. 하지만 `node_modules`는 기본적으로 제외되므로, 라이브러리 경로는 반드시 명시적으로 지정해야 합니다.

**Q: 여러 `@source`를 지정하면 충돌하나요?**  
A: 충돌하지 않습니다. 여러 `@source`를 지정하면 모든 경로를 스캔하고, 사용된 클래스만 CSS에 포함됩니다. 같은 클래스명이 여러 곳에서 사용되어도 CSS 규칙은 하나만 생성되므로 중복 걱정은 없습니다.

**문제 해결**:

- 스타일이 적용되지 않는 경우, `@source "./node_modules/inz-ui/src"`가 CSS 파일에 포함되어 있는지, 경로가 정확한지 확인하세요.
- `node_modules/inz-ui/src` 폴더가 존재하는지 확인하세요.
- Tailwind CSS 버전이 4.1 이상인지 확인하세요.
- 앱에서 직접 사용하는 Tailwind 클래스가 적용되지 않는 경우, `@source "./src"`가 포함되어 있는지 확인하세요.

---

## 🏗️ 레포지토리 구조

이 레포지토리는 **Monorepo 구조**로 구성되어 있습니다.

```
inz-ui/
├── packages/
│   └── library/               ← 라이브러리 소스 코드
│       ├── src/
│       │   ├── components/    ← 모든 컴포넌트 소스
│       │   ├── icons/
│       │   ├── styles/
│       │   └── main.ts        ← 진입점
│       ├── package.json       ← inz-ui
│       ├── vite.config.js     ← 빌드 설정
│       └── dist/              ← 빌드 결과물 (.gitignore)
│
├── apps/
│   └── ui-ground/             ← 프리뷰/테스트 앱
│       ├── src/
│       └── package.json
│
├── package.json               ← Workspace 루트
├── pnpm-workspace.yaml        ← Monorepo 설정
└── pnpm-lock.yaml

관리 도구: pnpm workspace
```

### 브랜치 전략

|               | develop             | main                        |
| ------------- | ------------------- | --------------------------- |
| **목적**      | 개발 브랜치 (PR용)  | 프로덕션 & 자동 배포        |
| **CI/CD**     | 테스트만 실행       | 빌드 + 버전 업데이트 + 배포 |
| **개발 방식** | Feature 브랜치 → PR | develop 브랜치 머지         |

---

## 🚀 개발 가이드

### 1. 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/2njeong/inz-ui.git
cd inz-ui

# develop 브랜치로 전환 (개발용)
git checkout develop

# pnpm 설치 (없는 경우)
npm install -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 시작 (ui-ground 프리뷰 앱, library src를 바로 watch 모드로 사용)
pnpm dev
```

### 2. 컴포넌트 개발 워크플로우

```bash
# 1. develop 브랜치에서 Feature 브랜치 생성
git checkout develop
# 업데이트 된 version으로 반드시 Pull 해주세요!
git pull
git checkout -b feat/new-component

# 2. 컴포넌트 생성
cd packages/library/src/components
mkdir new-component
# new-component/NewComponent.tsx 작성

# 3. main.ts에 export 추가
# packages/library/src/main.ts
export { NewComponent } from "./components/new-component/NewComponent";

# 4. ui-ground에서 테스트 (빌드 없이 src를 직접 사용)
# apps/ui-ground/src/Test.tsx에서 NewComponent 사용
pnpm dev  # library src 변경 사항이 바로 반영됨 (watch 모드)

# 5. (선택) 빌드 및 검증 - main 머지/배포 전에는 한 번씩 실행 권장
pnpm build

# 6. 커밋 & PR 생성 (develop 브랜치로)
git add .
git commit -m "feat: Add NewComponent"
git push origin feat/new-component

# 7. GitHub에서 PR 생성 (feat/new-component → develop)
# 8. 리뷰 후 develop에 머지
# 9. develop → main PR 생성 & 머지 → 자동 배포!
```

### 3. 컴포넌트 추가 체크리스트

- [ ] `packages/library/src/components/컴포넌트명/` 폴더 생성
- [ ] 컴포넌트 파일 작성 (`.tsx`)
- [ ] 컴포넌트 사용법 JSDoc 추가
- [ ] `packages/library/src/main.ts`에 export 추가
- [ ] `apps/ui-ground/src/Test.tsx`에서 프리뷰 테스트
- [ ] 빌드 확인 (`pnpm build`)
- [ ] PR 생성 시 **커밋 메시지 규칙** 준수 (`fix:`, `feat:`, `major:`)

---

## 📝 커밋 메시지 규칙

라이브러리 버전은 `main` 브랜치에 머지된 커밋 메시지에 따라 **자동으로 업데이트**됩니다:

| PR 제목 시작                     | 버전 변경         | 예시           |
| -------------------------------- | ----------------- | -------------- |
| `patch:` 또는 `fix:`             | Patch (버그 수정) | 1.3.0 → 1.3.1  |
| `minor:` 또는 `feat:`            | Minor (새 기능)   | 1.3.0 → 1.4.0  |
| `major:` 또는 `BREAKING CHANGE:` | Major (큰 변경)   | 1.3.0 → 2.0.0  |
| 기타                             | 업데이트 없음     | 1.3.0 (그대로) |

### 커밋 메시지 예시

```bash
# 버그 수정
git commit -m "fix: Correct Badge color prop"

# 새 기능 추가
git commit -m "feat: Add tree-shaking support"

# 중대한 변경
git commit -m "major: Redesign Badge API"
```

### PR 생성 예시

```
PR 제목: "feat: Enable tree-shaking with preserveModules"
        ^^^^^ 이 부분이 버전 업데이트에 사용됩니다!

내용:
- Vite config에 preserveModules 추가
- package.json에 sideEffects 설정
- Badge import 시 번들 크기 90% 감소

→ 병합 후 자동으로 1.3.0 → 1.4.0으로 업데이트됩니다!
```

---

## 🔄 배포 워크플로우

### 자동 배포 프로세스

`main` 브랜치에 push되면 자동으로:

1. **빌드**: 라이브러리 빌드 실행
2. **버전 확인**: 커밋 메시지에서 버전 타입 확인
3. **버전 업데이트**: `package.json` 버전 자동 업데이트
   - `patch:` / `fix:` → Patch 버전 업 (1.3.0 → 1.3.1)
   - `minor:` / `feat:` → Minor 버전 업 (1.3.0 → 1.4.0)
   - `major:` / `BREAKING CHANGE:` → Major 버전 업 (1.3.0 → 2.0.0)
4. **버전 커밋**: 변경된 버전을 main 브랜치에 자동 커밋
5. **배포**: npm에 자동 배포

### 일반적인 개발 & 배포 흐름

```bash
# 1. develop에서 개발
git checkout develop
git pull

# 2. Feature 브랜치 생성
git checkout -b feat/new-feature

# 3. 작업 & 커밋
git commit -m "feat: Add new feature"
git push origin feat/new-feature

# 4. GitHub에서 PR 생성 (feat/new-feature → develop)
# 5. 리뷰 & 머지

# 6. develop → main PR 생성 & 머지
# 7. main 브랜치에 자동 배포! 🚀

# 8. 작업 후 최신 버전 동기화
git checkout develop
git pull  # 자동 업데이트된 버전 가져오기
```

### 수동 배포 (필요 시)

```bash
# main 브랜치에서
git checkout main
cd packages/library

# 버전 업데이트
pnpm version patch  # 또는 minor, major

# 배포
pnpm publish
```

---

## 🧪 테스트

```bash
# 라이브러리 테스트
cd packages/library
pnpm test

# 테스트 watch 모드
pnpm test:watch

# 타입 체크
pnpm type-check

# 린팅
pnpm lint
```

---

## 🔧 빌드

```bash
# 라이브러리 빌드 (루트에서)
pnpm build

# 또는 packages/library에서
cd packages/library
pnpm build

# 빌드 결과 확인
ls -la dist/
```

---

## 📚 추가 정보

### Tree-shaking 지원

이 라이브러리는 **tree-shaking**을 지원하여, 사용하는 컴포넌트만 최종 번들에 포함됩니다.

```tsx
// Badge만 import → Badge 코드만 번들에 포함!
import { Badge } from "inz-ui";

// 여러 컴포넌트 import → 해당 컴포넌트들만 번들에 포함
import { Badge, Alert, Button } from "inz-ui";
```

### 주의사항

- **develop 브랜치**: 개발 브랜치, 모든 작업은 여기서 진행
- **main 브랜치**: 프로덕션 브랜치, 머지 시 자동 배포
- **커밋 메시지**: 버전 관리를 위해 규칙 준수 필수 (`fix:`, `feat:`, `major:`)
- **버전 동기화**: main 머지 후 `git pull`로 자동 업데이트된 버전 가져오기
