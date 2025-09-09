// 与 Vite 共享 babel 配置
import babelLoader from "./babelLoader.config.js";

const config = {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      include: [
        // 包含源文件以监听样式变化
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        // 列出任何包含使用 React Strict DOM 构建的 UI 的已安装 node_modules
        'node_modules/ui/*.{js,jsx,mjs,ts,tsx}'
      ],
      babelConfig: babelLoader,
      useLayers: true,
    },
    autoprefixer: {},
  },
};

export default config;
