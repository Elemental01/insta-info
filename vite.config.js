// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    plugins: [react()],
    define: {
      "process.env.VITE_KEY": JSON.stringify(process.env.VITE_KEY),
    },
    build: {
      rollupOptions: {
        external: ["emailjs-com"],
      },
    },
  };
});
