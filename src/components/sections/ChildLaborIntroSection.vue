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
    <div class="stat-box">据第三方数据机构统计，2025年国内3-12岁儿童网红超<span
        class="big-num">180万</span>，日均直播时长<span
        class="big-num">3.6小时</span>，头部账号月收入可达<span class="big-num">百万</span>。
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.dark-section {
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  color: white;
}

.childlabor-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
  margin: 40px 0;
}

.type-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.type-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #3498db;
}

.key-message {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.8;
  max-width: 800px;
  margin: 30px 0;
}

.highlight {
  color: #f39c12;
  font-weight: bold;
}

.stat-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.2rem;
  max-width: 800px;
  margin-top: 40px;
}

.big-num {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f39c12;
  margin: 0 10px;
  animation: metricPulse 4s ease-in-out infinite;
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
</style>