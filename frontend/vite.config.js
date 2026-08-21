import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

// Vite/Rollup only parse JSX syntax in .jsx/.tsx files by default.
// This plugin runs esbuild's JSX transform on .js files under src/ first,
// so the rest of the build pipeline sees plain JS.
function jsxInJsFiles() {
  return {
    name: 'jsx-in-js-files',
    async transform(code, id) {
      if (!id.match(/\/src\/.*\.js$/)) return null
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
    },
  }
}

export default defineConfig({
  plugins: [jsxInJsFiles(), react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
