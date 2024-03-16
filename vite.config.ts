import { defineConfig } from 'vite'
import { ChromeExtensionBuilder } from 'vite-plugin-chrome-builder'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
    }),
    ChromeExtensionBuilder(),
  ],
})
