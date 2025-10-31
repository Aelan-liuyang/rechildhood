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
        简单来说就是在互联网世界里，为平台创造价值却可能得不到相应报酬的"隐形打工人"。平台通过算法和规则，让用户不知不觉投入时间精力，最终把这些变成流量和商业利益。
      </p>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.highlight-text {
  font-size: 2rem;
  text-align: center;
  color: #e74c3c;
  margin-bottom: 30px;
}

.highlight-text2 {
  font-size: 1.5rem;
  text-align: center;
  color: #f1c40f;
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.concept-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.concept-intro {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
}

.concept-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  max-width: 900px;
}

.concept-box h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffd700;
}

.concept-detail,
.concept-explain {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
}
</style>