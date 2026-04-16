# MindFlow React Native 应用 - 安装与启动指南

## 环境要求

### 1. 基础环境
- Node.js 18+ 
- npm 或 yarn
- Git

### 2. 移动端开发环境
#### iOS 开发 (macOS 需要)
- Xcode 15+
- CocoaPods
- iOS 模拟器 或 真机

#### Android 开发
- Java JDK 11+
- Android Studio
- Android SDK
- Android 模拟器 或 真机

### 3. Expo (推荐)
```bash
npm install -g expo-cli
```

## 项目初始化

### 选项 A: 使用 Expo (推荐)
```bash
# 创建新项目
npx create-expo-app mindflow-native --template

# 选择模板时选择:
# - TypeScript
# - Blank (空项目)
# - 不安装 Expo Router

# 进入项目目录
cd mindflow-native

# 安装依赖
npm install
```

### 选项 B: 使用 React Native CLI
```bash
# 创建新项目
npx react-native init mindflow-native --template react-native-template-typescript

# 进入项目目录
cd mindflow-native

# 安装依赖
npm install
```

## 复制项目文件

将本目录中的文件复制到新创建的项目中：

```bash
# 假设你在 mindflow-native 目录中
cp -r src/ ../your-new-project/src/
cp App.tsx ../your-new-project/
cp package.json ../your-new-project/  # 注意：合并依赖，不要直接覆盖
```

## 安装额外依赖

根据 package.json 安装所有依赖：

```bash
npm install
```

或使用 yarn:
```bash
yarn install
```

## 配置项目

### 1. 配置 app.json / app.config.js
```json
{
  "expo": {
    "name": "MindFlow",
    "slug": "mindflow",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.mindflow"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.mindflow"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 2. 配置 TypeScript
确保 tsconfig.json 包含：
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

### 3. 配置图标字体
```bash
# 链接矢量图标
npx react-native link react-native-vector-icons
```

## 启动应用

### 开发模式
```bash
# 启动开发服务器
npm start

# 在浏览器中打开 Expo DevTools
# 然后选择运行平台:
# - 按 'a' 启动 Android 模拟器
# - 按 'i' 启动 iOS 模拟器
# - 扫描二维码在真机上运行
```

### 平台特定启动
```bash
# Android
npm run android

# iOS (需要 macOS)
npm run ios

# Web
npm run web
```

## 项目结构说明

```
mindflow-native/
├── src/
│   ├── components/     # 可复用组件
│   ├── screens/        # 页面屏幕
│   ├── store/          # 状态管理
│   ├── services/       # API 服务
│   ├── navigation/     # 导航配置
│   ├── utils/          # 工具函数
│   └── types/          # TypeScript 类型
├── assets/             # 静态资源
├── App.tsx            # 应用入口
└── package.json       # 依赖配置
```

## 开发工作流

### 1. 添加新屏幕
```typescript
// src/screens/NewScreen.tsx
import React from 'react'
import { View, Text } from 'react-native'

export default function NewScreen() {
  return (
    <View>
      <Text>新屏幕</Text>
    </View>
  )
}
```

### 2. 添加新组件
```typescript
// src/components/NewComponent.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  title: string
}

export default function NewComponent({ title }: Props) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}
```

### 3. 添加导航路由
在 App.tsx 或专门的导航文件中添加新路由。

## 构建发布版本

### Expo 构建
```bash
# 配置 Expo 账户
expo login

# 构建 Android APK
eas build -p android

# 构建 iOS IPA
eas build -p ios
```

### React Native CLI 构建
```bash
# Android
cd android && ./gradlew assembleRelease

# iOS
# 使用 Xcode 进行 Archive
```

## 常见问题

### 1. 模拟器连接失败
- 确保模拟器正在运行
- 检查 ADB 连接 (Android)
- 重启开发服务器

### 2. 依赖安装失败
- 清除 npm 缓存: `npm cache clean --force`
- 删除 node_modules 和 package-lock.json，重新安装
- 使用 yarn 替代 npm

### 3. TypeScript 类型错误
- 运行 `npm run type-check` 检查类型
- 确保所有依赖都有正确的 @types 包

### 4. 图标不显示
- 重新链接矢量图标
- 重启开发服务器
- 检查图标名称是否正确

## 下一步
1. 实现 API 服务层连接后端
2. 添加图表可视化
3. 实现推送通知
4. 添加离线支持
5. 优化性能
6. 发布到应用商店