#!/bin/bash

# ReChildhood GitHub Pages 部署脚本
# 使用方法: ./deploy.sh

echo "🚀 开始部署 ReChildhood 到 GitHub Pages..."

# 检查是否在正确的分支
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  警告: 当前分支是 $current_branch，建议在 main 分支上部署"
    read -p "是否继续? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        exit 1
    fi
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改:"
    git status --short
    echo
    read -p "是否先提交这些更改? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 请输入提交信息:"
        read commit_message
        if [ -z "$commit_message" ]; then
            commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        git add .
        git commit -m "$commit_message"
        echo "✅ 更改已提交"
    fi
fi

# 构建项目
echo "🔨 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，部署已取消"
    exit 1
fi

echo "✅ 项目构建成功"

# 部署到 GitHub Pages
echo "📤 正在部署到 GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo "🎉 部署成功!"
    echo "🌐 你的网站将在几分钟后可用:"
    echo "   https://$(git config user.name).github.io/rechildhood"
    echo
    echo "💡 提示:"
    echo "   - 如果这是第一次部署，可能需要等待几分钟"
    echo "   - 可以在 GitHub 仓库的 Settings > Pages 中查看部署状态"
    echo "   - 如果使用自定义域名，记得在 GitHub Pages 设置中配置"
else
    echo "❌ 部署失败"
    exit 1
fi
