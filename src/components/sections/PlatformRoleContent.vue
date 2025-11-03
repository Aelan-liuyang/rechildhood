<template>
  <div>
    <h3>平台：算法与规则的制定者</h3>
    <p>社交媒体平台在"网红儿童"现象中扮演着关键角色。平台的算法机制、推荐规则和内容审核标准，直接影响着儿童内容的传播范围和变现能力。</p>

    <div class="data-highlight">
      <p>算法倾向于推荐<span class="big">高互动率</span>的萌娃内容</p>
      <p>儿童内容的推荐权重比普通内容高<span class="big">1.5-2倍</span></p>
    </div>

    <h4 style="margin-top: 30px; color: #2c3e50; font-size: 1.4rem;">平台的双重角色</h4>
    <div class="platform-roles">
      <div class="role-card commercial">
        <h5>商业推手</h5>
        <p>通过算法放大儿童内容的曝光，促进流量变现，从中获取广告和电商分成。</p>
      </div>
      <div class="role-card regulatory">
        <h5>监管责任方</h5>
        <p>需要审核内容合规性，保护未成年人隐私，但执行力度和效果参差不齐。</p>
      </div>
    </div>

    <p style="margin-top: 30px;">
      近年来，各大平台开始出台未成年人保护措施，如限制直播时间、禁止打赏等。但在流量经济的驱动下，这些措施的实际效果仍待观察。平台需要在商业利益和社会责任之间找到平衡点。</p>
  </div>
</template>

<script setup>
// 平台角色组件，无需额外数据
</script>

<style scoped>
/* ==================== 数据高亮样式 ==================== */
.data-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px 30px;
  border-radius: 15px;
  color: white;
  margin: 25px 0;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.data-highlight p {
  margin: 12px 0;
  font-size: 1.1rem;
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.data-highlight .big {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* ==================== 平台双重角色 ==================== */
.platform-roles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.role-card {
  padding: 25px;
  border-radius: 15px;
  color: white;
  transition: all 0.3s;
}

.role-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.role-card.commercial {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.role-card.regulatory {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.role-card h5 {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.role-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.95;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .data-highlight .big {
    font-size: 1.4rem;
  }

  .platform-roles {
    grid-template-columns: 1fr;
  }

  .role-card h5 {
    font-size: 1.1rem;
  }

  .role-card p {
    font-size: 0.9rem;
  }
}
</style>