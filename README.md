# INZ UI

Vite 기반 모노레포로 구축된 React 컴포넌트 라이브러리입니다.

## 프로젝트 구조

```
inz-ui/
├── packages/
│   ├── ui/          # UI 컴포넌트 라이브러리
│   └── docs/        # 문서 및 데모 사이트
├── package.json     # 루트 워크스페이스 설정
├── pnpm-workspace.yaml
└── tsconfig.json    # 공통 TypeScript 설정
```

## 시작하기

### 필수 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 설치

```bash
pnpm install
```

### 개발 모드 실행

문서 사이트만 실행하면 됩니다:

```bash
pnpm --filter @inz-ui/docs dev
```

문서 사이트가 UI 라이브러리의 소스 파일을 직접 참조하므로, UI 컴포넌트를 수정하면 즉시 반영됩니다.

### 빌드

모든 패키지 빌드:

```bash
pnpm build
```

### 문서 사이트 미리보기

```bash
cd packages/docs
pnpm preview
```

## 패키지 설명

### @inz-ui/ui

재사용 가능한 React 컴포넌트를 제공하는 UI 라이브러리입니다.

**현재 컴포넌트:**

- Button: 다양한 variant와 size를 지원하는 버튼 컴포넌트

**사용 예시:**

```tsx
import { Button } from '@inz-ui/ui';

function App() {
  return (
    <Button
      variant="primary"
      size="medium">
      Click me!
    </Button>
  );
}
```

**Tree-shaking 지원:**

Named export를 사용하여 사용하지 않는 컴포넌트는 자동으로 번들에서 제외됩니다:

```tsx
// Button만 import하면 다른 컴포넌트는 번들에 포함되지 않음
import { Button } from '@inz-ui/ui';

// 여러 컴포넌트를 선택적으로 import 가능
import { Button, Input, Select } from '@inz-ui/ui';
```

### @inz-ui/docs

컴포넌트 라이브러리의 문서 및 데모 사이트입니다. 각 컴포넌트의 사용 예시와 다양한 props를 확인할 수 있습니다.

## 개발

### Path Alias 사용

각 패키지에서 `@/` alias를 사용하여 절대 경로로 import 할 수 있습니다:

```typescript
// 상대 경로 대신
import { Button } from '../../components/Button';

// 절대 경로 사용
import { Button } from '@/components/Button';
```

### 새 컴포넌트 추가하기

1. `packages/ui/src/components/` 디렉토리에 새 컴포넌트 생성
2. `packages/ui/src/index.ts`에 export 추가 (`@/components/...` 사용)
3. `packages/docs/src/App.tsx`에 데모 추가

### 스크립트

- `pnpm dev` - 모든 패키지 개발 모드 실행
- `pnpm build` - 모든 패키지 빌드
- `pnpm lint` - ESLint 실행
- `pnpm type-check` - TypeScript 타입 체크
- `pnpm format` - Prettier로 코드 포맷팅
- `pnpm format:check` - 포맷팅 체크 (CI용)

## 기술 스택

- **빌드 도구**: Vite 5
- **패키지 매니저**: pnpm
- **프레임워크**: React 19
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4 (@tailwindcss/vite)
- **린팅**: ESLint
- **포매팅**: Prettier
