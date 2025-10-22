# GitHub Pages 部署指南

## 🚀 部署方式

### 方式一：使用脚本部署（推荐）

#### 完整部署脚本

```bash
./deploy.sh
```

这个脚本会：

- 检查当前分支
- 检查未提交的更改
- 构建项目
- 部署到 GitHub Pages

#### 快速部署脚本

```bash
./quick-deploy.sh
```

这个脚本会：

- 直接构建并部署
- 适合快速更新

### 方式二：使用 npm 脚本

#### 标准部署

```bash
npm run deploy
```

#### 强制部署（覆盖现有内容）

```bash
npm run deploy:force
```

#### 预览构建结果

```bash
npm run preview
```

### 方式三：自动部署（GitHub Actions）

当你推送代码到 `main` 分支时，GitHub Actions 会自动：

1. 构建项目
2. 部署到 GitHub Pages

## 📋 部署前准备

### 1. 确保 GitHub Pages 已启用

1. 进入你的 GitHub 仓库
2. 点击 `Settings` > `Pages`
3. 在 `Source` 中选择 `GitHub Actions`

### 2. 检查仓库设置

- 确保仓库是公开的（或你有 GitHub Pro）
- 确保有 `main` 分支

### 3. 本地环境准备

```bash
# 安装依赖
npm install

# 测试构建
npm run build

# 预览构建结果
npm run preview
```

## 🌐 访问你的网站

部署成功后，你的网站将在以下地址可用：

```
https://[你的GitHub用户名].github.io/rechildhood
```

## 🔧 常见问题

### 1. 部署失败

- 检查网络连接
- 确保 GitHub token 有效
- 查看构建日志中的错误信息

### 2. 网站无法访问

- 等待几分钟（首次部署需要时间）
- 检查 GitHub Pages 设置
- 确认仓库是公开的

### 3. 样式或资源加载失败

- 检查 `vite.config.js` 中的 `base` 配置
- 确保路径正确

### 4. 自定义域名

如果你有自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入你的域名
3. 在 GitHub Pages 设置中配置域名

## 📝 部署流程

1. **开发**：在本地开发并测试
2. **提交**：提交代码到 `main` 分支
3. **构建**：运行 `npm run build`
4. **部署**：运行 `npm run deploy`
5. **访问**：等待几分钟后访问网站

## 🎯 最佳实践

- 每次部署前先本地测试
- 使用有意义的提交信息
- 定期检查网站是否正常
- 保持依赖包更新

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 日志
2. 检查构建输出
3. 查看浏览器控制台错误
4. 参考 GitHub Pages 官方文档
