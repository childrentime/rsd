# React Strict DOM 演示项目

![演示效果](./img_v3_02pv_17fd66ef-dca2-446a-81ca-d897df79345g.jpg)

## 项目简介

这是一个基于 **React Strict DOM** (RSD) 的跨平台演示项目，展示了如何使用 React Strict DOM 构建同时运行在 Web 和 React Native 上的购物应用界面。

**React Strict DOM** 是由 Meta 开发的 JavaScript 库，它定义了 React DOM 和 Web API 的一个子集，使开发者能够使用相同的代码库为 Web 和原生平台构建界面，同时保持各平台的原生外观和体验。

## 主要特性

- 🌐 **跨平台支持**: 一套代码同时运行在 Web 和 React Native
- 🎨 **原生外观**: 在不同平台上保持原生的外观和体验
- ⚡ **高性能**: 基于 React Strict DOM 优化的渲染性能
- 🔧 **类型安全**: 完整的 TypeScript 支持

## 演示功能

本项目实现了一个水果购物页面，展示了 React Strict DOM 的跨平台能力：

- 商品列表展示和无限滚动
- 图片加载和进度条动画
- 商品标签和价格信息
- 加载状态提示

## 项目结构

```
rsd/
├── apps/                          # 应用程序
│   ├── expo-app/                  # React Native (Expo) 应用
│   └── vite-app/                  # Web 应用 (Vite)
├── packages/
│   ├── react-strict-dom/          # React Strict DOM 核心包
│   └── ui/                        # 共享 UI 组件库
│       ├── FlatList/              # 列表组件
│       ├── LoadingDots/           # 加载动画组件
│       ├── SafeAreaPaddingTop/    # 安全区域组件
│       ├── StickyHeader/          # 粘性标题组件
│       └── home.tsx               # 主页面组件
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 22.3.0
- pnpm (项目使用 pnpm 作为包管理器)
- iOS 模拟器或 Android 模拟器 (用于 React Native 开发)

### 安装依赖

```bash
# 安装项目依赖
pnpm install
```

### 运行 Web 版本

```bash
# 进入 Web 应用目录
cd apps/vite-app

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 查看 Web 版本效果。

### 运行 React Native 版本

```bash
# 进入 React Native 应用目录
cd apps/expo-app

# 启动 Expo 开发服务器
pnpm start

# 或者直接运行在特定平台
pnpm ios     # iOS 模拟器
pnpm android # Android 模拟器
pnpm web     # Web 版本
```

## 技术栈

- **React Strict DOM**: 跨平台 React 开发框架
- **React 19**: 最新版本的 React
- **TypeScript**: 类型安全的 JavaScript
- **Expo**: React Native 开发平台
- **Vite**: 快速的 Web 构建工具
- **pnpm**: 高效的包管理器

## 架构说明

### React Strict DOM
使用 React Strict DOM 实现跨平台开发，通过统一的 `html` 和 `css` API 在 Web 和 React Native 上渲染相同的组件。

### 样式系统
```typescript
import { css, html } from 'react-strict-dom';

const styles = css.create({
  container: { backgroundColor: '#f8f9fa' }
});

<html.div style={styles.container}>内容</html.div>
```

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 相关链接

- [React Strict DOM 官方文档](https://facebook.github.io/react-strict-dom/)
- [React Strict DOM GitHub](https://github.com/facebook/react-strict-dom)
- [React 官方文档](https://react.dev/)
- [Expo 文档](https://docs.expo.dev/)

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](../../issues)
- 发起 [GitHub Discussion](../../discussions)

---

*使用 React Strict DOM 构建的跨平台演示应用 - 一次编写，到处运行！*
