import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'FluentUIVueComponents',
          formats: ['es'],
          fileName: 'fluentui-vue-components',
        },
        rollupOptions: {
          external: ['vue', '@griffel/core', 'griffel-vue', '@fluentui/react-theme', '@floating-ui/vue', 'tabster'],
        },
      },
    }
  }

  // Dev mode - serves the demo app
  return {
    plugins: [vue()],
  }
})
