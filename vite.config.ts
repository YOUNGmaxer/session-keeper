import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { ChromeExtensionBuilder } from 'vite-plugin-chrome-builder'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    ChromeExtensionBuilder(),
  ],
})
