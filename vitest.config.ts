import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@component', replacement: resolve(__dirname, 'src/components') },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/test/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/setupTests.ts'],
  },
})
