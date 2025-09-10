import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf', '**/*.bin'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (assetInfo.name.endsWith('.gltf') || assetInfo.name.endsWith('.bin'))) {
            return 'assets/models/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
