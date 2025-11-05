<template>
  <section class="section dark-section">
    <h2 class="section-title white">儿童作为网络空间中数量庞大的群体，不可避免地被"召唤"，成为数字生产力，沦为"数字童工"
    </h2>
    <div class="childlabor-types">
      <div class="type-card">
        <h3>媒介接触型</h3>
        <p>作为媒介接触型数字童工的代表 ，短视频社交媒体平台中的数字童工可大致分为两类 ：一类是学龄前儿童，年龄在 2 ～ 6 岁
          ，他们以短视频的浏览为主要的使用形式 ，自身并不具备独立使用电子设备进行拍摄视频的能力 ，主要由监护人进行拍摄、发布。</p>
      </div>
      <div class="type-card">
        <h3>身体参与型</h3>
        <p>正处于学龄阶段的儿童和青少年 ，其本身不仅具有浏览能力 ，而且也有视频内容生产的能力。身体参与型是指仍以体力劳动为主要的劳动形式
          ，且劳动有着他人推动或是控制的原因的数字童工 ，诸如童模。</p>
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
  padding: var(--container-padding, 60px) var(--spacing-md, 20px) var(--container-padding, 80px);
  max-width: 1400px;
  margin: 0 auto;
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
  font-size: var(--font-size-h2, 2.4rem);
  color: #fff;
  margin-bottom: var(--spacing-2xl, 60px);
  font-weight: 700;
  line-height: 1.5;
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

/* ==================== 类型卡片 ==================== */
.childlabor-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl, 40px);
  width: 100%;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto;
}

.type-card {
  background: rgba(255, 255, 255, 0.12);
  padding: var(--spacing-2xl, 40px) var(--spacing-xl, 35px);
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
  margin-bottom: var(--spacing-lg, 25px);
  color: #3498db;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
}

.type-card p {
  font-size: 1.1rem;
  line-height: 2;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 0.95);
}

/* ==================== 关键信息 ==================== */
.key-message {
  font-size: 1.3rem;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 2;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto;
  padding: var(--spacing-xl, 30px) var(--spacing-lg, 35px);
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
  padding: var(--spacing-2xl, 50px) var(--spacing-xl, 40px);
  border-radius: var(--radius-lg, 20px);
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 1.2rem;
  line-height: 2;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto 0;
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

  .childlabor-types {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg, 30px);
    max-width: 100%;
    margin: var(--spacing-xl, 40px) auto;
  }

  .type-card {
    padding: var(--spacing-xl, 35px) var(--spacing-lg, 30px);
    border-radius: 16px;
  }

  .type-card h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md, 20px);
  }

  .type-card p {
    font-size: 1rem;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .key-message {
    font-size: 1.15rem;
    padding: var(--spacing-lg, 25px) var(--spacing-md, 25px);
    margin: var(--spacing-xl, 40px) auto;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .stat-box {
    font-size: 1.05rem;
    padding: var(--spacing-xl, 35px) var(--spacing-lg, 30px);
    margin: var(--spacing-xl, 40px) auto 0;
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

  .childlabor-types {
    gap: var(--spacing-md, 20px);
    max-width: 100%;
    margin: var(--spacing-lg, 30px) auto;
  }

  .type-card {
    padding: var(--spacing-lg, 25px) var(--spacing-md, 20px);
    border-radius: 14px;
  }

  .type-card h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-sm, 18px);
  }

  .type-card p {
    font-size: 0.95rem;
    line-height: 1.9;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .key-message {
    font-size: 1.05rem;
    padding: var(--spacing-md, 20px) var(--spacing-sm, 18px);
    margin: var(--spacing-lg, 30px) auto;
    text-align: justify;
    text-justify: inter-ideograph;
    line-height: 1.9;
  }

  .highlight {
    font-size: 1.1rem;
  }

  .stat-box {
    font-size: 0.95rem;
    padding: var(--spacing-lg, 25px) var(--spacing-md, 20px);
    margin: var(--spacing-lg, 30px) auto 0;
    text-align: justify;
    text-justify: inter-ideograph;
    line-height: 1.9;
  }

  .big-num {
    font-size: 1.7rem;
    margin: 0 5px;
  }
}
</style>