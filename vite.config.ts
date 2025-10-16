import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // 允许局域网访问，也可以写具体IP
    port: 5173, // 端口号，可自定义
    allowedHosts: ["pdx-tdt.local"], // 允许开发服务器访问的域名
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {},
});
