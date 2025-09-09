// 与 Vite 共享 babel 配置
import babelLoader from "./babelLoader.config.js";

const config = {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      include: [
        // 包含源文件以监听样式变化
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        // 列出任何包含使用 React Strict DOM 构建的 UI 的已安装 node_modules
        'node_modules/ui/**/*.{js,jsx,mjs,ts,tsx}'
      ],
      exclude: [
        // 排除 ui 包内的 node_modules 目录，避免处理嵌套依赖的测试文件
        'node_modules/ui/node_modules/**',
        // 排除测试文件
        '**/tests/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/test.*'
      ],
      babelConfig: babelLoader,
      useLayers: false,
    },
    autoprefixer: {},
  },
};

export default config;
