# 🚀 MindFlow CI/CD 快速开始指南

## 概述

本指南将帮助您在 5 分钟内为 MindFlow React Native 项目设置完整的 CI/CD 流水线。

## 步骤 1: 运行设置脚本

```bash
# 进入项目目录
cd mindflow-native

# 运行设置脚本
./setup-cicd.sh
```

脚本将自动：
- ✅ 创建 GitHub Actions 工作流
- ✅ 配置 TypeScript、ESLint、Jest
- ✅ 设置项目目录结构
- ✅ 创建必要的配置文件

## 步骤 2: 提交代码到 GitHub

```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "feat: 添加 CI/CD 配置"

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/your-username/mindflow-native.git

# 推送到 GitHub
git push -u origin main
```

## 步骤 3: 配置 GitHub Secrets

在 GitHub 仓库中，进入：
**Settings → Secrets and variables → Actions → New repository secret**

添加以下密钥（根据需要）：

| 密钥名称 | 说明 | 获取方式 |
|----------|------|----------|
| `EXPO_TOKEN` | Expo 访问令牌 | [Expo 账号设置](https://expo.dev/settings/access-tokens) |
| `SLACK_WEBHOOK_URL` | Slack Webhook URL | [Slack API](https://api.slack.com/messaging/webhooks) |

## 步骤 4: 触发首次构建

### 自动触发
推送代码到以下分支会自动触发构建：
- `main` 分支：生产构建 + 发布
- `develop` 分支：预览构建

### 手动触发
1. 进入 GitHub 仓库的 **Actions** 标签页
2. 选择 **React Native CI/CD** 工作流
3. 点击 **Run workflow**
4. 选择分支并运行

## 步骤 5: 监控构建状态

构建开始后，您可以：

### 查看实时日志
1. 进入 **Actions** 标签页
2. 点击正在运行的工作流
3. 查看各作业的详细日志

### 下载构建产物
构建成功后，可以下载：
- Android APK/AAB 文件
- iOS IPA 文件
- 测试覆盖率报告

### 查看发布版本
生产构建完成后，会自动创建：
- GitHub Release
- 版本标签 (v1.0.0, v1.0.1, ...)
- 变更日志

## 配置说明

### 工作流文件
- `.github/workflows/react-native-ci.yml` - 主工作流文件
- `.github/workflows/full-ci.yml` - 高级配置（含 EAS）
- `.github/workflows/simple-ci.yml` - 简化配置

### 关键配置文件
| 文件 | 用途 |
|------|------|
| `package.json` | 项目依赖和脚本 |
| `tsconfig.json` | TypeScript 配置 |
| `.eslintrc.js` | 代码规范检查 |
| `jest.config.js` | 测试配置 |
| `app.json` | Expo 应用配置 |
| `eas.json` | EAS 构建配置 |

## 自定义配置

### 修改触发条件
编辑 `.github/workflows/react-native-ci.yml`：

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]  # 添加更多分支
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # 每日凌晨2点自动构建
```

### 禁用特定平台
注释掉不需要的作业：

```yaml
# build-ios:
#   name: Build iOS
#   if: false  # 禁用 iOS 构建
```

### 修改 Node.js 版本
```yaml
env:
  NODE_VERSION: '20'  # 修改为需要的版本
```

## 故障排除

### 常见问题

**Q: 构建失败，显示权限错误**
A: 检查 GitHub Secrets 是否正确配置，特别是 `EXPO_TOKEN`

**Q: Android 构建成功但无法安装**
A: 确保 APK 签名配置正确，或使用调试版本测试

**Q: iOS 构建需要 macOS 但显示不可用**
A: 确保仓库中有 `ios/` 目录，或使用 Expo EAS 构建

**Q: 测试覆盖率报告未生成**
A: 检查 `jest.config.js` 中的 `collectCoverageFrom` 配置

### 调试建议

1. 查看详细日志：
   ```bash
   # 在本地运行测试
   npm test -- --verbose
   
   # 检查 TypeScript
   npx tsc --noEmit --listFiles
   ```

2. 检查环境：
   ```bash
   # 查看 Node.js 版本
   node --version
   
   # 查看 npm 版本
   npm --version
   
   # 查看项目依赖
   npm list --depth=0
   ```

3. 清理缓存：
   ```bash
   # 清理 npm 缓存
   npm cache clean --force
   
   # 删除 node_modules 重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

## 高级功能

### 1. 自动版本递增
生产构建会自动增加 `package.json` 中的版本号

### 2. 多环境部署
支持开发、预览、生产环境构建

### 3. 通知集成
支持 Slack、邮件、飞书等通知渠道

### 4. 代码质量门禁
设置代码覆盖率阈值，未达标则构建失败

## 支持与反馈

### 获取帮助
- 查看详细文档：`CICD_README.md`
- 检查示例配置：`.github/workflows/` 目录
- 提交 Issue：GitHub Issues

### 报告问题
遇到问题时，请提供：
1. 错误日志截图
2. 复现步骤
3. 环境信息（Node.js 版本、操作系统等）

### 贡献改进
欢迎提交 Pull Request 改进 CI/CD 配置！

---

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/your-username/mindflow-native/issues)
- 邮箱: dev@mindflow.app
- 飞书群组: MindFlow 开发者群

---

**🎉 恭喜！您已成功设置 MindFlow CI/CD 流水线！**

现在每次推送代码都会自动构建、测试和发布您的应用。🚀