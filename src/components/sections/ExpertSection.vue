<template>
  <section id="solution" class="section expert-section">
    <h1 class="main-title anim-reveal">把童年还给孩子，让爱回到现实</h1>
    <p class="section-intro">要整治"网红儿童"背后的流量牟利乱象，必须多方协同发力。</p>

    <div class="expert-cards">
      <div class="expert-card" v-for="expert in experts" :key="expert.name">
        <h3>{{ expert.name }}</h3>
        <p class="expert-title">{{ expert.title }}</p>
        <p class="expert-advice">{{ expert.advice }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const experts = [
  {
    name: '蒋俏蕾',
    title: '清华大学新闻与传播学院长聘副教授',
    advice: '儿童不适宜出现在公开的网络账号中，不要打开"儿童网红"产业化的"潘多拉魔盒"。如果能够明确禁止未成年人在公开网络账号中出现，就可以从根本上避免利用儿童引流的问题。'
  },
  {
    name: '方增泉',
    title: '北京师范大学新闻传播学院未成年人网络素养研究中心主任',
    advice: '进一步明确设定儿童出镜时长、内容更新频次、商业链接植入等行业规范，以确保在充分发挥网络平台丰富家庭数字记忆、促进儿童成长发展等功能的同时，有效防止儿童被工具化利用。'
  },
  {
    name: '郑宁',
    title: '中国传媒大学文化产业管理学院法律系教授',
    advice: '建议尽快明确"儿童网红"账号的判断和利用未成年人牟利的标准，建议主管部门指导相关行业协会出台细化标准，可以结合未成年人出镜频率、账号收益分配、商业化内容占比等因素综合判断。'
  }
]
</script>

<style scoped>
.expert-section {
  background: linear-gradient(to bottom, #ece9e6, #ffffff);
}

.expert-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 50px 0;
}

.expert-card {
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-top: 5px solid #3498db;
  transition: all 0.3s;
}

.expert-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.expert-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.expert-title {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.expert-advice {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #555;
}
</style>