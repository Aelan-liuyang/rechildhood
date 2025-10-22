#!/bin/bash

# 部署测试脚本
echo "🧪 测试部署配置..."

# 检查必要文件
echo "📁 检查文件..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json 不存在"
    exit 1
fi

if [ ! -f "vite.config.js" ]; then
    echo "❌ vite.config.js 不存在"
    exit 1
fi

if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ GitHub Actions 工作流不存在"
    exit 1
fi

# 检查依赖
echo "📦 检查依赖..."
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "❌ gh-pages 未安装"
    exit 1
fi

# 测试构建
echo "🔨 测试构建..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 检查构建输出
echo "📋 检查构建输出..."
if [ ! -d "dist" ]; then
    echo "❌ dist 目录不存在"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html 不存在"
    exit 1
fi

echo "✅ 所有检查通过！"
echo "🚀 可以开始部署了："
echo "   ./deploy.sh        # 完整部署"
echo "   ./quick-deploy.sh  # 快速部署"
echo "   npm run deploy     # npm 部署"
