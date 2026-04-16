# MindFlow CI/CD 配置说明

## 📋 概述

本项目包含完整的 React Native CI/CD 流水线配置，支持：

- ✅ 代码质量检查 (TypeScript, ESLint, 测试)
- 📱 Android APK/AAB 构建
- 🍎 iOS IPA 构建
- 🚀 GitHub Releases 自动发布
- 📢 部署通知 (Slack)

## 🛠️ 配置文件

### 1. 主要工作流文件

| 文件 | 用途 | 推荐使用 |
|------|------|----------|
| `.github/workflows/react-native-ci.yml` | **完整 CI/CD 流水线** | ✅ **推荐** |
| `.github/workflows/full-ci.yml` | 高级配置 (包含 EAS) | 需要 Expo EAS |
| `.github/workflows/simple-ci.yml` | 简化配置 | 快速上手 |
| `.github/workflows/ci.yml` | 基础配置 | 参考示例 |

### 2. 其他配置文件

| 文件 | 用途 |
|------|------|
| `eas.json` | Expo Application Services 配置 |
| `package.json` | 项目依赖和脚本 |
| `app.json` | Expo 应用配置 |

## 🔧 环境变量配置

在 GitHub Repository Settings → Secrets and variables → Actions 中添加以下密钥：

### 必需密钥
- `EXPO_TOKEN`: Expo 访问令牌 (用于 EAS 构建)

### 可选密钥
- `SLACK_WEBHOOK_URL`: Slack Webhook URL (用于通知)
- `FIREBASE_TOKEN`: Firebase CLI 令牌
- `FIREBASE_PROJECT`: Firebase 项目 ID
- `FIREBASE_ANDROID_APP_ID`: Firebase Android 应用 ID

## 🚀 使用指南

### 1. 启用工作流

将 `.github/workflows/react-native-ci.yml` 推送到仓库后，GitHub Actions 会自动启用。

### 2. 手动触发构建

在 GitHub Actions 页面，可以：
1. 点击 "Run workflow"
2. 选择分支 (main/develop)
3. 点击运行按钮

### 3. 查看构建结果

构建完成后，可以：
1. 查看工作流运行详情
2. 下载构建产物 (APK/IPA)
3. 查看测试覆盖率报告
4. 访问发布的 GitHub Release

## 📱 构建产物

### Android
- **APK**: 可直接安装的 Android 包
- **AAB**: Google Play 上架包
- 路径: `android/app/build/outputs/apk/release/`

### iOS
- **IPA**: iOS 应用包
- 需要企业证书或 TestFlight
- 路径: `ios/build/`

## 🔍 工作流详情

### 阶段 1: 测试与检查
- TypeScript 类型检查
- ESLint 代码规范检查
- 单元测试运行
- 代码覆盖率上传到 Codecov

### 阶段 2: Android 构建
- 设置 Android SDK
- 构建 Release APK/AAB
- 使用 Gradle 或 EAS 构建

### 阶段 3: iOS 构建
- 设置 CocoaPods
- 构建 iOS IPA
- 使用 Xcode 或 EAS 构建

### 阶段 4: 发布
- 自动创建 GitHub Release
- 上传构建产物
- 生成变更日志

### 阶段 5: 通知
- 生成部署摘要
- 发送 Slack 通知
- 失败时告警

## ⚙️ 自定义配置

### 修改触发条件
编辑工作流文件的 `on:` 部分：

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]  # 添加更多分支
    tags: [ 'v*' ]  # 标签触发
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # 每日凌晨2点
```

### 修改 Node.js 版本
```yaml
env:
  NODE_VERSION: '20'  # 修改为需要的版本
```

### 禁用特定作业
注释掉不需要的作业：

```yaml
# build-ios:
#   name: Build iOS
#   if: false  # 禁用此作业
```

## 🐛 故障排除

### 常见问题

1. **Android 构建失败**
   - 检查 Android SDK 版本
   - 确认 Gradle 配置正确
   - 查看构建日志中的具体错误

2. **iOS 构建失败**
   - 需要 macOS 运行器
   - 检查 CocoaPods 版本
   - 确认 Xcode 配置

3. **EAS 构建失败**
   - 检查 `EXPO_TOKEN` 是否正确
   - 确认 `eas.json` 配置
   - 查看 Expo 控制台日志

4. **测试失败**
   - 检查测试文件路径
   - 确认测试依赖已安装
   - 查看测试覆盖率配置

### 调试建议

1. 启用详细日志：
   ```yaml
   - name: Debug info
     run: |
       node --version
       npm --version
       java --version
   ```

2. 检查环境：
   ```yaml
   - name: List files
     run: ls -la
   ```

3. 查看缓存：
   ```yaml
   - name: Clear cache
     run: npm cache clean --force
   ```

## 📈 监控与优化

### 性能指标
- 构建时间
- 测试覆盖率
- 代码质量评分
- 发布频率

### 优化建议
1. **缓存依赖**: 利用 GitHub Actions 缓存
2. **并行作业**: 独立不依赖的作业并行运行
3. **增量构建**: 只构建变更的部分
4. **镜像优化**: 使用预装工具的 Docker 镜像

## 🤝 贡献

### 添加新功能
1. Fork 仓库
2. 创建功能分支
3. 添加或修改工作流
4. 提交 Pull Request

### 报告问题
1. 在 Issues 中描述问题
2. 提供错误日志
3. 说明复现步骤
4. 建议解决方案

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🔗 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Expo EAS 文档](https://docs.expo.dev/eas/)
- [React Native 构建指南](https://reactnative.dev/docs/signed-apk-android)
- [Codecov 集成指南](https://docs.codecov.com/docs)