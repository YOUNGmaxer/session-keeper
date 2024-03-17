import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { ChromeExtensionBuilder } from 'vite-plugin-chrome-builder'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      imports: ['vue', 'pinia'],
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
    ChromeExtensionBuilder(),
  ],
})
