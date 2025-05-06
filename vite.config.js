import { defineConfig } from "vite";

export default defineConfig({
  root: "src/games/cartographers-expedition",
  build: {
    outDir: "../../dist/cartographers-expedition",
    emptyOutDir: true,
  },
});
