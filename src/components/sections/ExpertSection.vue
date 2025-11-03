<template>
  <section id="solution" class="section expert-section">
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <h1 class="main-title anim-reveal" style="color: white;">把童年还给孩子，让爱回到现实</h1>
    <p class="section-intro" style="color: white;">
      要整治"网红儿童"背后的流量牟利乱象，必须多方协同发力。
    </p>

    <swiper class="expert-swiper" :modules="[Navigation, Autoplay, EffectCoverflow, Pagination]" :slides-per-view="1.5"
      :space-between="50" :centered-slides="true" :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }" :effect="'coverflow'"
      :coverflowEffect="{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }"
      :navigation="{ enabled: true, clickable: true }" :pagination="{ clickable: true, dynamicBullets: true }"
      :allowTouchMove="true" :grabCursor="true" :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          coverflowEffect: { rotate: 10, stretch: 0, depth: 100, modifier: 1, slideShadows: true }
        },
        480: {
          slidesPerView: 1.1,
          spaceBetween: 20,
          coverflowEffect: { rotate: 15, stretch: 0, depth: 150, modifier: 1, slideShadows: true }
        },
        768: {
          slidesPerView: 1.3,
          spaceBetween: 30,
          coverflowEffect: { rotate: 18, stretch: 0, depth: 180, modifier: 1, slideShadows: true }
        },
        1024: {
          slidesPerView: 1.5,
          spaceBetween: 50,
          coverflowEffect: { rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }
        }
      }" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="(expert, index) in experts" :key="index" class="expert-slide"
        :style="{ backgroundImage: `url(${expert.bg})` }">
        <div class="overlay"></div>
        <div class="expert-content">
          <h3 class="fade-up">{{ expert.name }}</h3>
          <p class="expert-title fade-up">{{ expert.title }}</p>
          <p class="expert-advice fade-up">{{ expert.advice }}</p>
        </div>
      </swiper-slide>
    </swiper>

    <!-- 平台建议对话 -->
    <div class="platform-dialogue">
      <div class="dialogue-content">
        <p>平台可从儿童出镜频率、账号收益中儿童贡献的比例、商业化内容占比等维度建立量化标准来识别是分享还是牟利；推流机制要在法律范围内，减少对可能损害儿童权益内容的流量倾斜。</p>
        <p>
          在法律层面，未来应探索出台未成年人网络保护实施细则和行为规范，进一步优化年龄段治理模式。借鉴国外治理经验，孩子们必须获取相关执照才能成为"网红"，而他们因此获得的收入，必须存入一个专门的银行账户，供他们年满16岁后使用。
        </p>
      </div>
    </div>

    <!-- 儿童权利分级模式表格 -->
    <div class="rights-table-section">
      <h2 class="table-section-title">儿童网络内容生产权利分级模式</h2>
      <div class="rights-table-wrapper">
        <div class="age-column age-0-8">
          <div class="age-header">0-8岁</div>
          <div class="age-content">
            <p class="content-text">应禁止参与带营销性质的内容生产</p>
            <div class="icon-wrapper">
              <svg viewBox="0 0 100 100" class="prohibition-icon">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="6" />
                <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div class="age-column age-8-12">
          <div class="age-header">8-12岁</div>
          <div class="age-content">
            <p class="content-text">探索设置"儿童同意权"</p>
            <div class="icon-wrapper">
              <svg viewBox="0 0 100 100" class="question-icon">
                <text x="50" y="70" font-size="80" text-anchor="middle" fill="currentColor" font-weight="bold">?</text>
              </svg>
            </div>
          </div>
        </div>

        <div class="age-column age-12-18">
          <div class="age-header">12-18岁</div>
          <div class="age-content">
            <p class="content-text">可根据其认知能力设置相应的权利义务</p>
            <div class="icon-wrapper">
              <svg viewBox="0 0 100 100" class="balance-icon">
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="4" />
                <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="4" />
                <line x1="20" y1="40" x2="30" y2="60" stroke="currentColor" stroke-width="4" />
                <line x1="80" y1="40" x2="70" y2="60" stroke="currentColor" stroke-width="4" />
                <circle cx="50" cy="20" r="8" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p class="table-source">基于儿童成长发育规律的分级保护机制</p>
    </div>

    <!-- 家长建议文本 -->
    <div class="parent-advice-text">
      <h3 class="advice-title">给家长的建议</h3>
      <p>家长应尊重孩子的主体性，把童年还给儿童，不要让孩子在摆拍和表演中度过童年。亲子高光时刻转瞬即逝，眼睛和心灵才是最好的相机。</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules"

const experts = [
  {
    name: "蒋俏蕾",
    title: "清华大学新闻与传播学院长聘副教授",
    advice: "儿童不适宜出现在公开的网络账号中，不要打开「儿童网红」产业化的潘多拉魔盒。如果能够明确禁止未成年人在公开网络账号中出现，就可以从根本上避免利用儿童引流的问题。",
    bg: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "方增泉",
    title: "北京师范大学新闻传播学院未成年人网络素养研究中心主任",
    advice: "进一步明确设定儿童出镜时长、内容更新频次、商业链接植入等行业规范，以确保充分发挥网络平台丰富家庭数字记忆、促进儿童成长发展的同时，有效防止儿童被工具化利用。",
    bg: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "郑宁",
    title: "中国传媒大学文化产业管理学院法律系教授",
    advice: "建议尽快明确「儿童网红」账号的判断和利用未成年人牟利的标准，主管部门应指导相关行业协会出台细化标准，可结合出镜频率、账号收益分配、商业化内容占比等因素综合判断。",
    bg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "李可欣",
    title: "儿童心理发展专家",
    advice: "过早将孩子暴露在网络镜头下，可能影响其心理发展。建议家庭和学校协同，引导孩子在现实生活中获取更多自我认同感。",
    bg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "王思远",
    title: "教育技术与媒体研究者",
    advice: "网络内容应当服务于儿童成长，而非牟利。家长和平台需共同制定观看和参与规则，避免孩子成为流量工具。",
    bg: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
  }
]

const particleCanvas = ref(null)
const swiperInstance = ref(null)

// Swiper 实例回调
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// 切换幻灯片回调
const onSlideChange = () => {
  console.log('Slide changed')
}

onMounted(() => {
  const canvas = particleCanvas.value
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = 600

  const particles = []
  const particleCount = 120

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 204, 51, 0.7)"
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(255, 204, 51, 0.7)"
      ctx.fill()

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    })

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = 600
  })
})
</script>

<style scoped>
.expert-section {
  position: relative;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  padding: var(--section-padding-top, 80px) var(--container-padding, 40px) var(--section-padding-bottom, 80px);
  text-align: center;
  overflow: hidden;
}

.particle-bg {
  position: absolute;
  inset: 0;
  z-index: var(--z-below, -1);
}

.expert-swiper {
  position: relative;
  z-index: var(--z-content, 10);
  width: 100%;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto 0;
  padding-bottom: var(--spacing-2xl, 60px);
}

/* 轮播每一项 */
.expert-slide {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.expert-slide:hover {
  transform: scale(1.05);
}

/* 半透明 overlay 提升文字可读性 */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  transition: all 0.3s;
}

.expert-slide:hover .overlay {
  background: rgba(0, 0, 0, 0.4);
}

/* 文字内容 */
.expert-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 30px;
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
}

/* 专家姓名标题 - 优化颜色和阴影 */
.expert-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;

  /* 高亮渐变颜色 */
  background: linear-gradient(90deg, #fff176, #ffc107, #ffeb3b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  /* 阴影增强可读性 */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  animation: fadeUp 1s ease forwards;
}

/* 职称 */
.expert-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  animation: fadeUp 1s ease 0.2s forwards;
  opacity: 0;
}

/* 建议/段落 */
.expert-advice {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #ffe082;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  animation: fadeUp 1s ease 0.4s forwards;
  opacity: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* Swiper 控制按钮 - 增强交互性 */
.swiper-button-next,
.swiper-button-prev {
  color: white;
  top: 45%;
  transition: 0.3s;
  width: 60px;
  height: 60px;
  background: rgba(255, 204, 51, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  pointer-events: auto !important;
  cursor: pointer !important;
  z-index: 100;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 24px;
  font-weight: bold;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #ffcc33;
  background: rgba(255, 204, 51, 0.4);
  transform: scale(1.2);
}

.swiper-button-next:active,
.swiper-button-prev:active {
  transform: scale(0.95);
}

/* 分页小点 */
.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  transition: all 0.3s;
  cursor: pointer;
}

.swiper-pagination-bullet-active {
  background: #ffcc33;
  transform: scale(1.3);
  opacity: 1;
}

/* 平台建议对话样式 */
.platform-dialogue {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 60px auto 40px;
  padding: 40px 50px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.dialogue-content p {
  color: #fff;
  font-size: 1.15rem;
  line-height: 2;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  word-break: keep-all;
  overflow-wrap: break-word;
}

.dialogue-content p:last-child {
  margin-bottom: 0;
}

/* 家长建议图片和文本样式 */
.parent-advice-section {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 40px auto 0;
  padding: 0 20px;
}

.advice-image-wrapper {
  width: 100%;
  margin-bottom: 30px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s;
}

.advice-image-wrapper:hover {
  transform: translateY(-5px);
}

.advice-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s;
}

.advice-image-wrapper:hover .advice-image {
  transform: scale(1.05);
}

.advice-text {
  padding: 30px 40px;
  background: linear-gradient(135deg, rgba(255, 204, 51, 0.25) 0%, rgba(255, 204, 51, 0.15) 100%);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 2px solid rgba(255, 204, 51, 0.4);
  box-shadow: 0 8px 32px rgba(255, 204, 51, 0.2);
}

.advice-text p {
  color: #fff;
  font-size: 1.2rem;
  line-height: 2;
  margin: 0;
  text-align: center;
  font-weight: 500;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.5px;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* 小屏幕适配 */
@media (max-width: 768px) {
  .expert-slide {
    height: 400px;
  }

  .expert-content {
    padding: 20px;
  }

  .expert-content h3 {
    font-size: 1.6rem;
  }

  .expert-title {
    font-size: 1rem;
  }

  .expert-advice {
    font-size: 1rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 50px;
    height: 50px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;
  }

  .platform-dialogue {
    margin: 40px 20px 30px;
    padding: 30px 25px;
  }

  .dialogue-content p {
    font-size: 1rem;
    line-height: 1.8;
  }

  .parent-advice-section {
    padding: 0 15px;
  }

  .advice-text {
    padding: 20px 25px;
  }

  .advice-text p {
    font-size: 1rem;
    line-height: 1.8;
  }
}

/* ==================== 儿童权利分级表格样式 ==================== */
.rights-table-section {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto 0;
  padding: 0 var(--spacing-md, 20px);
}

.table-section-title {
  font-size: var(--font-size-h2, 2.2rem);
  color: white;
  text-align: center;
  margin-bottom: var(--spacing-xl, 40px);
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.rights-table-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-radius: var(--radius-lg, 20px);
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--spacing-md, 20px);
}

.age-column {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.age-column:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.age-header {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.age-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl, 40px) var(--spacing-lg, 30px);
  gap: var(--spacing-lg, 30px);
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  font-weight: 600;
  margin: 0;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
}

/* 0-8岁：红色禁止 */
.age-0-8 {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
}

.age-0-8 .content-text {
  color: white;
}

.age-0-8 .prohibition-icon {
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

/* 8-12岁：黄色探索 */
.age-8-12 {
  background: linear-gradient(135deg, #f9d423 0%, #f7b731 100%);
}

.age-8-12 .content-text {
  color: #2c3e50;
}

.age-8-12 .question-icon {
  color: rgba(44, 62, 80, 0.8);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* 12-18岁：绿色平衡 */
.age-12-18 {
  background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);
}

.age-12-18 .content-text {
  color: white;
}

.age-12-18 .balance-icon {
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.table-source {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: var(--spacing-md, 20px);
  font-style: italic;
}

/* ==================== 家长建议文本样式 ==================== */
.parent-advice-text {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: var(--spacing-2xl, 60px) auto 0;
  padding: var(--spacing-xl, 40px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.advice-title {
  font-size: 1.8rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: var(--spacing-lg, 30px);
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.parent-advice-text p {
  font-size: 1.15rem;
  line-height: 2;
  color: #2c3e50;
  text-align: center;
  margin: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .section {
    padding: 60px 25px;
  }

  h2 {
    font-size: 1.8rem;
    padding: 0 15px;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .expert-swiper {
    margin: 40px auto 0;
    padding-bottom: 50px;
  }

  .expert-slide {
    height: 420px;
    border-radius: 14px;
  }

  .expert-content {
    padding: 25px 20px;
    max-width: 100%;
  }

  .expert-content h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .expert-title {
    font-size: 0.95rem;
  }

  .expert-advice {
    font-size: 1.05rem;
    line-height: 2;
  }

  .rights-table-wrapper {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .age-column {
    min-height: 250px;
  }

  .age-header {
    font-size: 1.6rem;
    padding: var(--spacing-md, 20px);
  }

  .age-content {
    padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
    gap: var(--spacing-md, 20px);
  }

  .content-text {
    font-size: 1rem;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .parent-advice-text {
    padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  }

  .advice-title {
    font-size: 1.5rem;
  }

  .parent-advice-text p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 45px 16px;
  }

  h2 {
    font-size: 1.5rem;
    padding: 0 10px;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .expert-swiper {
    margin: 30px 0 0;
    padding-bottom: 45px;
  }

  .expert-slide {
    height: 380px;
    border-radius: 12px;
  }

  .expert-content {
    padding: 20px 16px;
    max-width: 100%;
  }

  .expert-content h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  .expert-title {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  .expert-advice {
    font-size: 1rem;
    line-height: 2.1;
  }

  /* Swiper 控制优化 */
  .swiper-button-next,
  .swiper-button-prev {
    width: 36px !important;
    height: 36px !important;
    background: rgba(255, 255, 255, 0.25) !important;
    border-radius: 50% !important;
    backdrop-filter: blur(8px) !important;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 16px !important;
    font-weight: 700 !important;
  }

  .swiper-pagination-bullet {
    width: 9px !important;
    height: 9px !important;
    opacity: 0.7 !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
    background: #fff !important;
  }

  .rights-table-wrapper {
    grid-template-columns: 1fr;
    gap: 2px;
    margin: 25px 0;
  }

  .age-column {
    min-height: 230px;
  }

  .age-header {
    font-size: 1.4rem;
    padding: 18px;
  }

  .age-content {
    padding: 25px 18px;
    gap: 18px;
  }

  .content-text {
    font-size: 0.95rem;
    line-height: 1.9;
  }

  .icon-wrapper {
    width: 55px;
    height: 55px;
  }

  .parent-advice-text {
    padding: 28px 18px;
  }

  .advice-title {
    font-size: 1.35rem;
    padding: 0 10px;
    margin-bottom: 18px;
  }

  .parent-advice-text p {
    font-size: 1rem;
    padding: 0 10px;
    line-height: 2;
  }

  /* SVG 表格响应式 */
  svg {
    max-width: 100%;
    height: auto;
  }
}

/* 文字淡入动画 */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>