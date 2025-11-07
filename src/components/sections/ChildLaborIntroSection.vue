<template>
  <section class="section dark-section">
    <h2 class="section-title white">儿童作为网络空间中数量庞大的群体，不可避免地被"召唤"，成为数字生产力，沦为"数字童工"
    </h2>
    <p class="types-intro">数字童工大致可分为两类，媒介接触型和身体参与性。</p>
    <div class="childlabor-types">
      <div class="type-card">
        <h3>媒介接触型</h3>
        <p>媒介接触型可大致分为两类 ：一类是以短视频的浏览为主要的使用形式 ，自身并不具备独立使用电子设备进行拍摄视频的能力 ，主要由监护人进行拍摄、发布 ；而第二类不仅具有浏览能力 ，而且也有视频内容生产的能力。</p>
      </div>
      <div class="type-card">
        <h3>身体参与型</h3>
        <p>身体参与型是指仍以体力劳动为主要的劳动形式 ，通过身体的直接参与来从事相关数字劳动，且劳动有着他人推动或是控制的原因的数字童工。</p>
      </div>
    </div>
    <p class="key-message">在这其中，有一部分在父母的包装下成为了<span
        class="highlight">小网红博主</span>（后文称为"网红儿童"）。当"晒娃"念起了"生意经"，儿童也就变成了"摇钱树"。
    </p>
    <div class="stat-box">据第三方数据机构统计，2025年国内3-12岁儿童网红超<span class="big-num">180万</span>，日均直播时长<span
        class="big-num">3.6小时</span>，头部账号月收入可达<span class="big-num">百万</span>。
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* ==================== 基础布局 ==================== */
.section {
  padding: var(--section-padding-top, 80px) var(--container-padding, 40px) var(--section-padding-bottom, 80px);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.dark-section {
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  color: white;
  position: relative;
  overflow: hidden;
}

.dark-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {

  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
}

/* ==================== 标题样式 ==================== */
.section-title {
  text-align: center;
  font-size: var(--font-size-h2, 2.2rem);
  color: #fff;
  margin-bottom: var(--title-margin-bottom, 40px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: var(--spacing-lg, 30px);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 2px;
}

/* ==================== 类型介绍文字 ==================== */
.types-intro {
  font-size: 1.2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto var(--spacing-xl, 40px);
  max-width: 1200px;
  line-height: 1.7;
  padding: 0 var(--spacing-md, 20px);
}

/* ==================== 类型卡片 ==================== */
.childlabor-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl, 40px);
  width: 100%;
  max-width: 1200px;
  margin: var(--spacing-xl, 40px) auto;
}

.type-card {
  background: rgba(255, 255, 255, 0.12);
  padding: var(--spacing-lg, 25px) var(--spacing-lg, 28px);
  border-radius: var(--radius-lg, 20px);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

.type-card h3 {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-md, 18px);
  color: #3498db;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
}

.type-card p {
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  word-break: normal;
}

/* ==================== 关键信息 ==================== */
.key-message {
  font-size: 1.3rem;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 1.7;
  max-width: 1200px;
  margin: var(--spacing-lg, 30px) auto;
  padding: var(--spacing-lg, 20px) var(--spacing-lg, 28px);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg, 20px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  word-break: keep-all;
  overflow-wrap: break-word;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.highlight {
  color: #f39c12;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
}

/* ==================== 统计框 ==================== */
.stat-box {
  background: rgba(255, 255, 255, 0.15);
  padding: var(--spacing-lg, 25px) var(--spacing-lg, 30px);
  border-radius: var(--radius-lg, 20px);
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 1.2rem;
  line-height: 1.7;
  max-width: 1200px;
  margin: var(--spacing-lg, 30px) auto 0;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  word-break: keep-all;
  overflow-wrap: break-word;
}

.big-num {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f39c12;
  margin: 0 8px;
  animation: metricPulse 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(243, 156, 18, 0.5);
}

@keyframes metricPulse {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(243, 156, 18, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(243, 156, 18, 0.5));
  }
}

/* ==================== 响应式样式 ==================== */
@media (max-width: 1024px) {
  .section {
    padding: var(--container-padding, 50px) var(--spacing-md, 20px) var(--container-padding, 70px);
  }
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-xl, 40px) var(--spacing-md, 20px) var(--spacing-xl, 50px);
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-xl, 40px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .section-title::after {
    width: 60px;
    height: 3px;
  }

  .types-intro {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg, 30px);
  }

  .childlabor-types {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg, 30px);
    max-width: 100%;
    margin: var(--spacing-lg, 30px) auto;
  }

  .type-card {
    padding: var(--spacing-lg, 20px) var(--spacing-md, 25px);
    border-radius: 16px;
  }

  .type-card h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-sm, 15px);
  }

  .type-card p {
    font-size: 1rem;
    line-height: 1.7;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .key-message {
    font-size: 1.15rem;
    line-height: 1.7;
    padding: var(--spacing-md, 18px) var(--spacing-md, 22px);
    margin: var(--spacing-lg, 30px) auto;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .stat-box {
    font-size: 1.05rem;
    line-height: 1.7;
    padding: var(--spacing-lg, 20px) var(--spacing-md, 25px);
    margin: var(--spacing-lg, 30px) auto 0;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .big-num {
    font-size: 1.9rem;
    margin: 0 6px;
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-lg, 30px) 12px var(--spacing-xl, 40px);
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-sm, 15px);
    line-height: 1.5;
  }

  .section-title::after {
    width: 50px;
    height: 3px;
  }

  .types-intro {
    font-size: 1rem;
    margin-bottom: var(--spacing-md, 25px);
  }

  .childlabor-types {
    gap: var(--spacing-md, 20px);
    max-width: 100%;
    margin: var(--spacing-md, 25px) auto;
  }

  .type-card {
    padding: var(--spacing-md, 18px) var(--spacing-sm, 18px);
    border-radius: 14px;
  }

  .type-card h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-xs, 12px);
  }

  .type-card p {
    font-size: 0.95rem;
    line-height: 1.7;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .key-message {
    font-size: 1.05rem;
    line-height: 1.7;
    padding: var(--spacing-sm, 15px) var(--spacing-sm, 16px);
    margin: var(--spacing-md, 25px) auto;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .highlight {
    font-size: 1.1rem;
  }

  .stat-box {
    font-size: 0.95rem;
    line-height: 1.7;
    padding: var(--spacing-md, 18px) var(--spacing-sm, 18px);
    margin: var(--spacing-md, 25px) auto 0;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .big-num {
    font-size: 1.7rem;
    margin: 0 5px;
  }
}
</style>