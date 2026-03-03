import { copyFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["src/**/*.test.*", "src/**/*.spec.*"],
      rollupTypes: true,
      outDir: "dist",
      entryRoot: "src",
      staticImport: true,
      skipDiagnostics: false,
      logLevel: "info",
      afterBuild: () => {
        // vite-plugin-dts는 .d.ts 파일을 자동 복사하지 않으므로 수동 복사
        copyFileSync(
          resolve(__dirname, "src/styles.d.ts"),
          resolve(__dirname, "dist/styles.d.ts")
        );
      },
    }),
  ],
  resolve: {
    alias: {
      "@ui": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "InzUI",
      fileName: "inz-ui",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "@floating-ui/react",
        "date-fns",
        "react-hook-form",
      ],
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          assetFileNames: "assets/[name]-[hash][extname]",
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      ],
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
