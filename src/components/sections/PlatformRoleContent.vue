<template>
  <div>
    <h3>平台：算法与规则的制定者</h3>
    <p class="intro-text">社交媒体平台在"网红儿童"现象中扮演着关键角色。平台的算法机制、推荐规则和内容审核标准，直接影响着儿童内容的传播范围和变现能力。</p>

    <div class="algorithm-box">
      <h4 class="algorithm-title">
        <span class="icon">⚙️</span>
        算法驱动的流量循环
      </h4>
      <p class="algorithm-text">
        平台的推荐算法会识别出<span class="highlight">完播率</span>、<span class="highlight">互动率</span>更高的内容类型，并给予更大的流量推荐，从而形成<span
          class="highlight-strong">"表现越好-推荐越多"</span>的循环。为了追求流量和商业利益，部分平台对晒娃视频的内容审核把关不严，任由带有广告植入、过度商业化的视频肆意传播。甚至为了吸引眼球、增加热度，还对一些"网红儿童"及其相关视频进行推波助澜。
      </p>
    </div>

    <!-- <div class="data-highlight">
      <div class="data-row">
        <span class="data-label">算法倾向于推荐</span>
        <span class="big">高互动率</span>
        <span class="data-label">的萌娃内容</span>
      </div>
      <div class="data-row">
        <span class="data-label">儿童内容的推荐权重比普通内容高</span>
        <span class="big">1.5-2倍</span>
      </div>
    </div> -->

    <div class="research-box">
      <div class="research-icon">📊</div>
      <div class="research-content">
        <p class="research-text">
          <span class="source-tag">东北财经大学研究显示</span>，儿童网红账号的<span class="highlight-number">完播率</span>比成人账号高<span
            class="highlight-number strong">47%</span>，平台因此加大流量倾斜，形成<span
            class="highlight-warning">"数据越好-流量越多-变现越强"</span>的恶性循环。
        </p>
      </div>
    </div>

    <h4 class="section-subtitle">平台的双重角色</h4>
    <div class="platform-roles">
      <div class="role-card commercial">
        <div class="role-icon">💰</div>
        <h5>商业推手</h5>
        <p>通过算法放大儿童内容的曝光，促进流量变现，从中获取广告和电商分成。</p>
      </div>
      <div class="role-card regulatory">
        <div class="role-icon">🛡️</div>
        <h5>监管责任方</h5>
        <p>需要审核内容合规性，保护未成年人隐私，但执行力度和效果参差不齐。</p>
      </div>
    </div>

    <p class="conclusion-text">
      近年来，各大平台开始出台未成年人保护措施，如限制直播时间、禁止打赏等。但在流量经济的驱动下，这些措施的实际效果仍待观察。平台需要在商业利益和社会责任之间找到平衡点。
    </p>
  </div>
</template>

<script setup>
// 平台角色组件，无需额外数据
</script>

<style scoped>
/* ==================== 基础文本样式 ==================== */
.intro-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 25px;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.conclusion-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2c3e50;
  text-align: justify;
  text-justify: inter-ideograph;
  margin-top: 30px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.section-subtitle {
  margin-top: 35px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 算法循环盒子 ==================== */
.algorithm-box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  padding: 25px 30px;
  margin: 25px 0;
  position: relative;
  overflow: hidden;
}

.algorithm-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.algorithm-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.3rem;
  color: #667eea;
  margin: 0 0 18px 0;
  font-weight: 700;
}

.algorithm-title .icon {
  font-size: 1.5rem;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.algorithm-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2c3e50;
  margin: 0;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.algorithm-text .highlight {
  color: #667eea;
  font-weight: 600;
  padding: 0 4px;
}

.algorithm-text .highlight-strong {
  color: #764ba2;
  font-weight: 700;
  background: linear-gradient(to bottom, transparent 60%, rgba(118, 75, 162, 0.15) 60%);
  padding: 0 6px;
}

/* ==================== 研究数据盒子 ==================== */
.research-box {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
  border: 2px solid #f39c12;
  border-radius: 16px;
  padding: 25px;
  margin: 25px 0;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  box-shadow: 0 4px 15px rgba(243, 156, 18, 0.15);
}

.research-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.research-content {
  flex: 1;
}

.research-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2c3e50;
  margin: 0;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.source-tag {
  display: inline-block;
  background: #f39c12;
  color: white;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 4px;
}

.highlight-number {
  color: #e67e22;
  font-weight: 600;
  padding: 0 4px;
}

.highlight-number.strong {
  font-size: 1.3rem;
  font-weight: 800;
  color: #d35400;
  background: rgba(230, 126, 34, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.highlight-warning {
  color: #c0392b;
  font-weight: 700;
  background: linear-gradient(to bottom, transparent 60%, rgba(192, 57, 43, 0.15) 60%);
  padding: 0 6px;
}

/* ==================== 数据高亮样式 ==================== */
.data-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 16px;
  color: white;
  margin: 25px 0;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.data-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
  font-size: 1.1rem;
  line-height: 1.8;
}

.data-label {
  color: rgba(255, 255, 255, 0.95);
  word-break: keep-all;
}

.data-highlight .big {
  font-size: 2rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0 12px;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {

  0%,
  100% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  50% {
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

/* ==================== 平台双重角色 ==================== */
.platform-roles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 25px 0;
}

.role-card {
  padding: 30px;
  border-radius: 16px;
  color: white;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.role-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  transition: all 0.4s;
  z-index: 0;
}

.role-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
}

.role-card:hover::before {
  background: rgba(255, 255, 255, 0.1);
}

.role-card.commercial {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.role-card.regulatory {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.role-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.role-card h5 {
  margin: 0 0 15px 0;
  font-size: 1.3rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.role-card p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.95;
  word-break: keep-all;
  overflow-wrap: break-word;
  position: relative;
  z-index: 1;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .intro-text {
    font-size: 1.05rem;
    padding: 0 10px;
  }

  .section-subtitle {
    font-size: 1.3rem;
    padding: 0 10px;
  }

  .algorithm-box {
    padding: 20px 18px;
    margin: 20px 0;
  }

  .algorithm-title {
    font-size: 1.2rem;
    gap: 10px;
  }

  .algorithm-title .icon {
    font-size: 1.3rem;
  }

  .algorithm-text {
    font-size: 1rem;
    line-height: 1.7;
  }

  .research-box {
    flex-direction: column;
    padding: 20px;
    gap: 15px;
  }

  .research-icon {
    font-size: 2rem;
  }

  .research-text {
    font-size: 1rem;
  }

  .source-tag {
    font-size: 0.85rem;
    padding: 2px 8px;
  }

  .data-highlight {
    padding: 20px 18px;
  }

  .data-row {
    font-size: 1rem;
    gap: 8px;
  }

  .data-highlight .big {
    font-size: 1.5rem;
    padding: 0 8px;
  }

  .platform-roles {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .role-card {
    padding: 25px 20px;
  }

  .role-icon {
    font-size: 2rem;
  }

  .role-card h5 {
    font-size: 1.2rem;
  }

  .role-card p {
    font-size: 0.95rem;
  }

  .conclusion-text {
    font-size: 1rem;
    padding: 18px 16px;
  }
}

@media (max-width: 480px) {
  .intro-text {
    font-size: 1rem;
    padding: 0 8px;
    line-height: 1.7;
  }

  .section-subtitle {
    font-size: 1.2rem;
    padding: 0 8px;
    margin-top: 30px;
  }

  .algorithm-box {
    padding: 18px 15px;
  }

  .algorithm-title {
    font-size: 1.1rem;
    gap: 8px;
  }

  .algorithm-title .icon {
    font-size: 1.2rem;
  }

  .algorithm-text {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .research-box {
    padding: 18px 15px;
    gap: 12px;
  }

  .research-icon {
    font-size: 1.8rem;
  }

  .research-text {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .source-tag {
    font-size: 0.8rem;
    padding: 2px 6px;
  }

  .highlight-number.strong {
    font-size: 1.15rem;
    padding: 2px 6px;
  }

  .data-highlight {
    padding: 18px 15px;
  }

  .data-row {
    font-size: 0.95rem;
    flex-direction: column;
    text-align: center;
  }

  .data-highlight .big {
    font-size: 1.4rem;
    padding: 0 6px;
  }

  .role-card {
    padding: 20px 16px;
  }

  .role-icon {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  .role-card h5 {
    font-size: 1.1rem;
  }

  .role-card p {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .conclusion-text {
    font-size: 0.95rem;
    padding: 16px 14px;
    line-height: 1.7;
  }
}
</style>