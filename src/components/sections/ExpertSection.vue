<template>
  <section id="solution" class="section expert-section">
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <h1 class="main-title anim-reveal" style="color: white;">把童年还给孩子，让爱回到现实</h1>
    <p class="section-intro" style="color: white;">
      要整治“网红儿童”背后的流量牟利乱象，必须多方协同发力。
    </p>

    <swiper
      class="expert-swiper"
      :modules="[Navigation, Autoplay, EffectCoverflow, Pagination]"
      :slides-per-view="1.5"
      :space-between="50"
      :centered-slides="true"
      :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      :effect="'coverflow'"
      :coverflowEffect="{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }"
      navigation
      :pagination="{ clickable: true }">
      <swiper-slide
        v-for="(expert, index) in experts"
        :key="index"
        class="expert-slide"
        :style="{ backgroundImage: `url(${expert.bg})` }">
        <div class="overlay"></div>
        <div class="expert-content">
          <h3 class="fade-up">{{ expert.name }}</h3>
          <p class="expert-title fade-up">{{ expert.title }}</p>
          <p class="expert-advice fade-up">{{ expert.advice }}</p>
        </div>
      </swiper-slide>
    </swiper>
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
    advice: "儿童不适宜出现在公开的网络账号中，不要打开“儿童网红”产业化的潘多拉魔盒。如果能够明确禁止未成年人在公开网络账号中出现，就可以从根本上避免利用儿童引流的问题。",
    bg: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "方增泉",
    title: "北京师范大学新闻传播学院未成年人网络素养研究中心主任",
    advice: "进一步明确设定儿童出镜时长、内容更新频次、商业链接植入等行业规范，以确保充分发挥网络平台丰富家庭数字记忆、促进儿童成长发展的同时，有效防止儿童被工具化利用。",
    bg: "https://images.unsplash.com/photo-1517242023979-5f2d1ccdf36e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "郑宁",
    title: "中国传媒大学文化产业管理学院法律系教授",
    advice: "建议尽快明确“儿童网红”账号的判断和利用未成年人牟利的标准，主管部门应指导相关行业协会出台细化标准，可结合出镜频率、账号收益分配、商业化内容占比等因素综合判断。",
    bg: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "李可欣",
    title: "儿童心理发展专家",
    advice: "过早将孩子暴露在网络镜头下，可能影响其心理发展。建议家庭和学校协同，引导孩子在现实生活中获取更多自我认同感。",
    bg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "王思远",
    title: "教育技术与媒体研究者",
    advice: "网络内容应当服务于儿童成长，而非牟利。家长和平台需共同制定观看和参与规则，避免孩子成为流量工具。。",
    bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
]

const particleCanvas = ref(null)

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
  padding-bottom: 80px;
  text-align: center;
  overflow: hidden;
}

.particle-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.expert-swiper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0;
  padding-bottom: 60px;
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
}

/* Swiper 控制按钮 */
.swiper-button-next,
.swiper-button-prev {
  color: white;
  top: 45%;
  transition: 0.3s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #ffcc33;
  transform: scale(1.2);
}

/* 分页小点 */
.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  transition: all 0.3s;
}

.swiper-pagination-bullet-active {
  background: #ffcc33;
  transform: scale(1.3);
  opacity: 1;
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