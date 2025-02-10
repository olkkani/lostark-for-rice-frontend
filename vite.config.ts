import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/shared/assets"),
      },
    },
    server: {
      proxy: {
        "/items": {
          target: env.VITE_APP_API_URL,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
