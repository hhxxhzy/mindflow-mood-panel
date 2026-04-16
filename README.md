# MindFlow · 心绪看板 (React版本)

基于React + TypeScript + TailwindCSS构建的现代化情绪追踪Web应用，集成AI情感分析。

## 🚀 功能特性

- **📝 智能心情记录** - 文字输入 + 语音输入（待实现）
- **🤖 AI情感分析** - 集成Gemini API进行实时情绪分析
- **📊 数据可视化** - 情绪趋势图表、压力指数统计
- **📅 历史回顾** - 时间线展示所有心情记录
- **📈 周报生成** - AI生成每周情绪总结报告
- **🎨 现代化UI** - 响应式设计，治愈系配色

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS
- **状态管理**: Zustand
- **图表库**: Recharts
- **图标**: Lucide React
- **HTTP客户端**: Axios
- **后端API**: Node.js + Express + MongoDB

## 📁 项目结构

```
mindflow-react/
├── src/
│   ├── components/     # React组件
│   │   ├── Header.tsx
│   │   ├── MoodInput.tsx
│   │   ├── MoodHistory.tsx
│   │   └── MoodStats.tsx
│   ├── stores/         # Zustand状态管理
│   │   └── moodStore.ts
│   ├── lib/           # 工具函数和API
│   │   └── api.ts
│   ├── types/         # TypeScript类型定义
│   │   └── index.ts
│   ├── App.tsx        # 主应用组件
│   └── main.tsx       # 应用入口
├── public/            # 静态资源
└── package.json       # 依赖配置
```

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
创建 `.env` 文件：
```env
VITE_API_BASE=http://localhost:8082/api
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建生产版本
```bash
npm run build
```

## 🔌 API集成

项目需要后端API服务支持，默认配置：
- **开发环境**: 代理到 `http://localhost:8082/api`
- **生产环境**: 连接到 `http://8.213.221.116:8082/api`

### API接口
- `POST /api/record` - 提交心情记录
- `GET /api/history/:userId` - 获取历史记录

## 🎨 设计理念

- **治愈系配色**: 紫蓝色渐变，营造平静氛围
- **玻璃拟态**: 毛玻璃效果，现代感UI
- **情感化设计**: 根据情绪状态动态变化
- **无障碍访问**: 支持键盘导航和屏幕阅读器

## 📱 响应式设计

- **桌面端**: 三栏布局，完整功能展示
- **平板端**: 两栏布局，优化空间利用
- **移动端**: 单栏布局，触控友好

## 🔧 开发计划

### 已完成
- ✅ 基础项目架构搭建
- ✅ 核心组件开发
- ✅ Zustand状态管理
- ✅ API服务集成
- ✅ 响应式UI设计

### 待实现
- 📅 图表可视化（Recharts）
- 🎤 语音输入功能
- 📊 周报生成系统
- 🔐 用户认证系统
- 📱 PWA支持

## 📄 许可证

MIT License