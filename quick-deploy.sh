#!/bin/bash

# 快速部署脚本
echo "🚀 快速部署到 GitHub Pages..."

# 构建并部署
npm run build && npm run deploy

if [ $? -eq 0 ]; then
    echo "✅ 部署完成!"
    echo "🌐 访问地址: https://$(git config user.name).github.io/rechildhood"
else
    echo "❌ 部署失败"
fi
