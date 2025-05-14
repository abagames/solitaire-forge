import { defineConfig } from "vite";

export default defineConfig({
  // Change the directory name according to the game being developed.
  root: "src/games/catalyst-reaction",
  build: {
    // Change the directory name according to the game being developed.
    outDir: "../../../docs/catalyst-reaction",
    emptyOutDir: true,
  },
});
