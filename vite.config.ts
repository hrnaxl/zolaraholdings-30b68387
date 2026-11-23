import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "zolara-dev-entry",
      apply: "serve",
      transformIndexHtml: {
        order: "pre",
        handler: () => [{ tag: "script", attrs: { type: "module", src: "/src/main.tsx" }, injectTo: "body" }],
      },
    },
  ],
});
