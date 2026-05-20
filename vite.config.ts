import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const buildOutputDirectory = process.env.FIGSON_OUT_DIR ?? 'dist'

import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { type ConfigEnv, defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const figmaCompatibleUiHtml = (): Plugin => ({
  name: 'figma-compatible-ui-html',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    const htmlPath = resolve(import.meta.dirname, buildOutputDirectory, 'index.html')
    const html = readFileSync(htmlPath, 'utf8')
    const figmaCompatibleHtml = html
      .replace(/<script type="module" crossorigin>/g, '<script>')
      .replace(/<script type="module">/g, '<script>')

    writeFileSync(htmlPath, figmaCompatibleHtml)
  },
})

export default defineConfig(({ command }: ConfigEnv) => ({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ...(command === 'build' ? [viteSingleFile(), figmaCompatibleUiHtml()] : []),
  ],
  build: {
    outDir: buildOutputDirectory,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife' as const,
        name: 'FigsonConverterUi',
      },
    },
  },
}))
