# MindFlow React Native 项目结构

## 项目概述
将心绪面板 Web 应用移植到 React Native，支持 iOS 和 Android。

## 技术栈
- **React Native** (Expo 或 CLI)
- **TypeScript**
- **状态管理**: Zustand 或 React Context
- **导航**: React Navigation
- **UI 组件库**: React Native Paper 或 NativeBase
- **图表**: React Native Chart Kit 或 Victory Native
- **图标**: React Native Vector Icons
- **存储**: AsyncStorage 或 MMKV

## 目录结构
```
mindflow-native/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── mood/
│   │   │   ├── MoodInput.tsx
│   │   │   ├── MoodHistory.tsx
│   │   │   ├── MoodStats.tsx
│   │   │   └── RecentMoods.tsx
│   │   ├── charts/
│   │   │   ├── EmotionChart.tsx
│   │   │   ├── StressTimeline.tsx
│   │   │   └── TagCloud.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── BottomTabNav.tsx
│   │       └── DrawerNav.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ReportScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── CalendarScreen.tsx
│   ├── store/
│   │   ├── moodStore.ts
│   │   ├── userStore.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── moodService.ts
│   │   └── storageService.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── BottomTabNavigator.tsx
│   │   └── DrawerNavigator.tsx
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   ├── emotionUtils.ts
│   │   └── validation.ts
│   └── types/
│       └── index.ts
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── App.tsx
├── app.json
└── package.json
```

## 核心功能移植计划

### Phase 1: 基础架构 (1-2天)
1. 初始化 React Native 项目
2. 配置 TypeScript、导航、状态管理
3. 创建基础组件库
4. 设置 API 服务层

### Phase 2: 核心功能 (2-3天)
1. 心情记录功能 (MoodInput)
2. 心情历史列表 (MoodHistory)
3. 数据统计展示 (MoodStats)
4. 个人资料设置

### Phase 3: 高级功能 (2-3天)
1. 图表可视化
2. 日历视图
3. 周报生成
4. 语音记录功能

### Phase 4: 优化与发布 (1-2天)
1. 性能优化
2. 离线支持
3. 推送通知
4. 应用商店发布

## 组件对应关系
| Web 组件 | React Native 组件 |
|----------|-------------------|
| MoodInput | MoodInput (TextInput + 表情选择) |
| MoodHistory | FlatList + MoodItem |
| MoodStats | 图表组件 + 统计卡片 |
| EmotionChart | 饼图/柱状图组件 |
| StressTimeline | 折线图组件 |
| Header | 自定义 Header 组件 |
| Navigation | React Navigation |

## API 适配
- 保持与现有后端 API 兼容
- 添加移动端特定功能 (推送、本地存储)
- 支持离线模式

## 设计规范
- **颜色方案**: 沿用 Web 版的 primary/secondary 配色
- **字体**: 系统字体 (SF Pro/ Roboto)
- **间距**: 使用 React Native 的标准化间距
- **交互**: 遵循平台设计规范 (iOS HIG / Material Design)

## 下一步行动
1. 选择 React Native 初始化方式 (Expo vs CLI)
2. 创建项目并安装依赖
3. 移植核心 store 和 types
4. 逐步实现各屏幕和组件