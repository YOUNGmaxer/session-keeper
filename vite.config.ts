import { defineConfig } from 'vite'
import { ChromeExtensionBuilder } from 'vite-plugin-chrome-builder'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue'],
    }),
    ChromeExtensionBuilder(),
  ],
})
