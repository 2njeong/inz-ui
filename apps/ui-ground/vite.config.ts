import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = resolve(__dirname, "..", "..");
const libraryRoot = resolve(workspaceRoot, "packages/library");
const librarySrc = resolve(libraryRoot, "src");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // dev에서는 이 이름을 그대로 쓰면서, 빌드된 dist/inz-ui.css 대신src/styles/styles.css를 직접 import 하도록 리다이렉트
      {
        find: "inz-ui/styles",
        replacement: resolve(librarySrc, "styles/styles.css"),
      },
      // 원래는 배포된 패키지의 dist/main.js를 가리켜야 할 이름인데, dev 모드에서는 이 이름을 유지한 채, dist 대신 `src/main.ts`를 바로 바라보게 리다이렉트
      { find: "inz-ui", replacement: resolve(librarySrc, "main.ts") },
      // 라이브러리 src 내부에서만 쓰는 편의용 별칭, dev 환경에서 ui-ground가 library의 src/main.ts를 직접 읽기 때문에 그 내부 import @ui/...를 해석할 수 있도록 ui-ground Vite에도 alias를 설정해둠
      { find: "@ui", replacement: librarySrc },
    ],
  },
  // dev 서버가 라이브러리 소스까지 제공할 수 있도록 server.fs.allow에 libraryRoot 추가
  server: {
    fs: {
      allow: [workspaceRoot, libraryRoot],
    },
  },
  // dev 모드에서는 라이브러리 패키지를 제외하지 않음
  optimizeDeps: {
    exclude: ["inz-ui"],
  },
});
