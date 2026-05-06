import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";
import type { PreRenderedChunk } from "rollup";

function isMaterialSymbolChunk(chunkInfo: PreRenderedChunk) {
  const moduleIds = [
    chunkInfo.facadeModuleId,
    ...chunkInfo.moduleIds,
  ].filter(Boolean);

  return moduleIds.some((moduleId) =>
    moduleId.includes("@material-symbols/svg-400") && moduleId.includes(".svg"),
  );
}

function createChunkFileNames(extension: "js" | "cjs") {
  return (chunkInfo: PreRenderedChunk) =>
    `${isMaterialSymbolChunk(chunkInfo) ? "icons/" : ""}[name]-[hash].${extension}`;
}

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ldkjWebUi",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "style",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: [
        {
          format: "es",
          chunkFileNames: createChunkFileNames("js"),
        },
        {
          format: "cjs",
          chunkFileNames: createChunkFileNames("cjs"),
        },
      ],
    },
  },
});
