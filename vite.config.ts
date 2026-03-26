import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "v8",
    },
    projects: [
      {
        extends: true,
        test: {
          globals: true,
          environment: "jsdom",
          setupFiles: "./src/setupTests.ts",
        },
      },
    ],
  },
});
