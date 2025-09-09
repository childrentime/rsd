import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babelLoader from './babelLoader.config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: babelLoader,
    }),
  ],
  resolve: {
    // 处理平台特定的文件扩展名
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    // 确保正确解析模块
    mainFields: ['module', 'main'],
  },
  optimizeDeps: {
    // 包含 react-strict-dom 用于预构建
    include: ['react-strict-dom'],
  },
})
