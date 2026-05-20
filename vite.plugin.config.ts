import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const buildOutputDirectory = process.env.FIGSON_OUT_DIR ?? 'dist'

export default defineConfig({
  build: {
    outDir: buildOutputDirectory,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/plugin/controller.ts'),
      name: 'figsonController',
      fileName: () => 'main.js',
      formats: ['iife'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
