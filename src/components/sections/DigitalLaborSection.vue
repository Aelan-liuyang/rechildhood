<template>
  <section id="digital-labor" class="section concept-section fullscreen">
    <h2 class="highlight-text anim-reveal">当你在刷手机时真的是在进行纯粹的娱乐吗？</h2>
    <p class="concept-intro highlight-text2">
      你有没有想过自己是在劳动，而屏幕那头的儿童或许在进行另一种看不见的劳动。</p>
    <div class="concept-box">
      <h3>什么是"数字劳工"？</h3>
      <p class="concept-detail">
        英国学者福克斯在《数字劳动与马克思》(2014)一书中将"数字劳工"定义为：数字劳工是电子媒介生存、使用以及应用这样集体劳动力中的一部分，他们不是一个确定的职业，他们服务的产业定义了他们，在这个产业中，他们受资本的剥削。
      </p>
      <p class="concept-explain">
        简单来说就是在互联网世界里，为平台创造价值却可能得不到相应报酬的"隐形打工人"。平台通过算法和规则，让用户不知不觉投入时间精力，最终把这些变成流量和商业利益。不管是在社交媒体上观看、点赞，还是发内容评论，只要你的劳动被平台用来赚钱，而你没有获得合理回报，都属于数字劳工的范畴。
      </p>
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

.concept-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.concept-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
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
.highlight-text {
  font-size: 2.4rem;
  text-align: center;
  color: #fff;
  margin-bottom: var(--spacing-xl, 40px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: var(--spacing-lg, 30px);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  border-radius: 2px;
}

.highlight-text2 {
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: var(--spacing-2xl, 60px);
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-md, 20px);
}

.highlight-text2:hover {
  transform: translateY(-3px);
}

.concept-intro {
  font-size: 1.3rem;
  text-align: justify;
  text-justify: inter-ideograph;
  margin-bottom: var(--spacing-xl, 40px);
  line-height: 2;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-md, 20px);
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 概念框样式 ==================== */
.concept-box {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: var(--spacing-2xl, 50px) var(--spacing-xl, 40px);
  border-radius: var(--radius-lg, 20px);
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.concept-box h3 {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-lg, 30px);
  color: #ffd700;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

.concept-detail,
.concept-explain {
  font-size: 1.1rem;
  line-height: 2;
  margin-bottom: var(--spacing-lg, 30px);
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.concept-explain {
  margin-bottom: 0;
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

  .highlight-text {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .highlight-text::after {
    width: 60px;
    height: 3px;
  }

  .highlight-text2 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-xl, 40px);
    padding: 0 var(--spacing-md, 20px);
  }

  .concept-intro {
    font-size: 1.15rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding: 0 var(--spacing-md, 20px);
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .concept-box {
    padding: var(--spacing-xl, 35px) var(--spacing-lg, 30px);
    border-radius: 16px;
  }

  .concept-box h3 {
    font-size: 1.6rem;
    margin-bottom: var(--spacing-md, 25px);
  }

  .concept-detail,
  .concept-explain {
    font-size: 1rem;
    text-align: justify;
    text-justify: inter-ideograph;
    margin-bottom: var(--spacing-md, 25px);
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-lg, 30px) 12px var(--spacing-xl, 40px);
  }

  .highlight-text {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-sm, 15px);
    line-height: 1.5;
  }

  .highlight-text::after {
    width: 50px;
    height: 3px;
  }

  .highlight-text2 {
    font-size: 1.15rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding: 0 12px;
  }

  .concept-intro {
    font-size: 1.05rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding: 0 12px;
    text-align: justify;
    text-justify: inter-ideograph;
    line-height: 1.9;
  }

  .concept-box {
    padding: var(--spacing-lg, 25px) var(--spacing-md, 20px);
    border-radius: 14px;
  }

  .concept-box h3 {
    font-size: 1.4rem;
    margin-bottom: var(--spacing-md, 20px);
  }

  .concept-detail,
  .concept-explain {
    font-size: 0.95rem;
    line-height: 1.9;
    margin-bottom: var(--spacing-md, 20px);
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .concept-explain {
    margin-bottom: 0;
  }
}
</style>