#!/bin/bash

# MindFlow CI/CD 快速设置脚本
# 用法: ./setup-cicd.sh

set -e

echo "🚀 MindFlow CI/CD 快速设置脚本"
echo "================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

echo -e "${BLUE}1. 创建 GitHub Actions 目录...${NC}"
mkdir -p .github/workflows

echo -e "${BLUE}2. 复制 CI/CD 配置文件...${NC}"
# 使用完整的工作流配置
cp .github/workflows/react-native-ci.yml .github/workflows/ci.yml 2>/dev/null || true

echo -e "${BLUE}3. 创建必要的配置文件...${NC}"

# 创建 package.json 如果不存在
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}创建 package.json...${NC}"
    cat > package.json << 'EOF'
{
  "name": "mindflow-native",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "cd android && ./gradlew assembleRelease",
    "build:ios": "cd ios && xcodebuild -workspace MindFlow.xcworkspace -scheme MindFlow -configuration Release -archivePath $PWD/build/MindFlow.xcarchive archive",
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx --max-warnings=0",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native-vector-icons": "^10.0.0",
    "zustand": "^4.4.0",
    "async-storage": "^0.1.0"
  },
  "devDependencies": {
    "@types/react": "~18.2.0",
    "@types/react-native": "~0.73.0",
    "typescript": "^5.3.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "@testing-library/react-native": "^12.0.0",
    "@testing-library/jest-native": "^5.0.0",
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6"
  }
}
EOF
fi

# 创建 TypeScript 配置
if [ ! -f "tsconfig.json" ]; then
    echo -e "${YELLOW}创建 tsconfig.json...${NC}"
    cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "allowJs": true,
    "esModuleInterop": true,
    "jsx": "react-native",
    "lib": ["DOM", "ESNext"],
    "moduleResolution": "node",
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*",
    "App.tsx"
  ],
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
EOF
fi

# 创建 ESLint 配置
if [ ! -f ".eslintrc.js" ]; then
    echo -e "${YELLOW}创建 .eslintrc.js...${NC}"
    cat > .eslintrc.js << 'EOF'
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  env: {
    'react-native/react-native': true,
    jest: true
  },
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
EOF
fi

# 创建 Jest 配置
if [ ! -f "jest.config.js" ]; then
    echo -e "${YELLOW}创建 jest.config.js...${NC}"
    cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo.*|@expo.*)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
EOF
fi

# 创建 Babel 配置
if [ ! -f "babel.config.js" ]; then
    echo -e "${YELLOW}创建 babel.config.js...${NC}"
    cat > babel.config.js << 'EOF'
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
EOF
fi

# 创建 app.json 如果不存在
if [ ! -f "app.json" ] && [ ! -f "app.config.js" ] && [ ! -f "app.config.ts" ]; then
    echo -e "${YELLOW}创建 app.json...${NC}"
    cat > app.json << 'EOF'
{
  "expo": {
    "name": "MindFlow",
    "slug": "mindflow",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
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
      "bundleIdentifier": "com.mindflow.app",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.mindflow.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
EOF
fi

# 创建 assets 目录
echo -e "${BLUE}4. 创建资源目录...${NC}"
mkdir -p assets
echo "App assets directory" > assets/README.md

# 创建 src 目录结构
echo -e "${BLUE}5. 创建源码目录结构...${NC}"
mkdir -p src/{components,screens,navigation,store,services,utils,types,assets}

# 创建基础文件
echo -e "${BLUE}6. 创建基础文件...${NC}"
cat > src/types/index.ts << 'EOF'
export interface Mood {
  id: string;
  emotion: string;
  intensity: number;
  notes?: string;
  tags: string[];
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppState {
  moods: Mood[];
  user?: User;
  loading: boolean;
}
EOF

# 创建 .gitignore
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}创建 .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.expo/
dist/
npm-debug.*
yarn-debug.*
yarn-error.*

# Production
build/
release/
*.apk
*.aab
*.ipa

# Development
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Logs
*.log
logs/

# Expo
.expo-shared/
.expo/
web-build/

# Android
android/.gradle/
android/app/build/
android/build/
android/.idea/
android/*.iml
android/local.properties

# iOS
ios/build/
ios/Pods/
ios/*.xcworkspace/
ios/*.xcodeproj/
ios/*.xcuserdata/
EOF
fi

echo -e "${GREEN}✅ CI/CD 配置完成！${NC}"
echo ""
echo -e "${YELLOW}📋 下一步：${NC}"
echo "1. 提交代码到 GitHub 仓库"
echo "2. 在 GitHub 仓库设置中添加以下 Secrets："
echo "   - EXPO_TOKEN (如果需要 Expo EAS 构建)"
echo "   - SLACK_WEBHOOK_URL (如果需要通知)"
echo "3. 推送代码到 main 或 develop 分支触发 CI/CD"
echo ""
echo -e "${BLUE}📚 详细文档请查看：${NC}"
echo "   - CICD_README.md"
echo "   - .github/workflows/react-native-ci.yml"
echo ""
echo -e "${GREEN}🚀 开始构建吧！${NC}"