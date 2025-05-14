import { defineConfig } from "vite";

export default defineConfig({
  // Change the directory name according to the game being developed.
  root: "src/games/cartographers-expedition",
  build: {
    // Change the directory name according to the game being developed.
    outDir: "../../../docs/cartographers-expedition",
    emptyOutDir: true,
  },
});
