import { defineConfig } from "vite";

export default defineConfig({
  root: "src/games/catalyst-reaction",
  build: {
    outDir: "../../docs/catalyst-reaction",
    emptyOutDir: true,
  },
});
