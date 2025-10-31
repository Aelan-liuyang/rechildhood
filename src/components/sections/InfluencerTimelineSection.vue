<template>
  <section id="influencer" class="section timeline-section">
    <h1 class="main-title">一个"网红儿童"的诞生</h1>

    <div class="timeline">
      <!-- 首条视频（特殊处理，包含动画） -->
      <div class="timeline-item first-video-item" :class="{ 'timeline-visible': timelineVisible[0] }">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="step-badge">1</div>
          <h3>{{ timeline[0].title }}</h3>
          <div class="first-video-anim" ref="firstVideoAnim">
            <div class="video-frame">
              <img :src="firstVideoSrc" alt="首条视频" class="timeline-video-img" />
              <div class="like-counter">❤️ {{ likeCount.toLocaleString() }}</div>
              <div class="hearts">
                <span v-for="n in 28" :key="n" class="heart">❤️</span>
              </div>
              <div class="money" :class="{ show: moneyShow }">💰</div>
            </div>
          </div>
          <p>{{ timeline[0].desc }}</p>
          <div class="timeline-icon">{{ timeline[0].icon }}</div>
        </div>
      </div>

      <!-- 其他时间线项 -->
      <div v-for="(item, index) in timeline.slice(1)" :key="index + 1" class="timeline-item"
        :class="{ 'timeline-visible': timelineVisible[index + 1] }">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="step-badge">{{ index + 2 }}</div>
          <h3>{{ item.title }}</h3>
          <img v-if="item.image" :src="item.image" :alt="item.title" class="timeline-image" />
          <p>{{ item.desc }}</p>
          <div class="timeline-icon">{{ item.icon }}</div>
        </div>
      </div>
    </div>

    <p class="insight-text">
      当"养娃"变成了"养号"，爱就开始有了回报率。很多账号最初确实是出于分享和记录的目的。然而，一旦流量涌入，MCN机构伸出橄榄枝，商业合作接踵而至，最初的"爱"就可能被异化。家长的角色可能悄然转变为"经纪人"，而孩子则可能成为家庭中的"数字劳工"。
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const firstVideoAnim = ref(null)
const moneyShow = ref(false)
const likeCount = ref(100)
let likeTimer = null
const firstVideoSrc = new URL('@/assets/images/7.png', import.meta.url).href
const liveStreamImg = new URL('@/assets/images/8.png', import.meta.url).href

const timeline = [
  { title: '短视频第一条视频发布', desc: '当流量涌入', icon: '📱', image: firstVideoSrc },
  { title: '直播变现', desc: '开启直播带货', icon: '💰', image: liveStreamImg },
  { title: '商业合作接踵而至', desc: '第一个广告来了', icon: '📢' },
  { title: 'MCN抛出橄榄枝', desc: '签约MCN机构', icon: '🤝' }
]
const timelineVisible = ref([false, false, false, false])

onMounted(() => {
  // 时间线进入视口逐个显现
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          setTimeout(() => { timelineVisible.value[index] = true }, index * 300)
        }
      })
    },
    { threshold: 0.5 }
  )

  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, index) => {
      item.dataset.index = index
      observer.observe(item)
    })
  }, 500)

  // 首条视频动画
  const setupFirstVideoAnimation = () => {
    if (!firstVideoAnim.value) return
    const container = firstVideoAnim.value
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          container.classList.add('run')
          likeTimer && clearInterval(likeTimer)
          likeCount.value = 100
          let acceleration = 1
          likeTimer = setInterval(() => {
            acceleration += 0.1
            likeCount.value += Math.floor(30 * acceleration + Math.random() * 100)
            if (likeCount.value >= 8000) {
              clearInterval(likeTimer)
              likeTimer = null
              likeCount.value = 8000
            }
          }, 60)
          setTimeout(() => {
            if (likeTimer) {
              clearInterval(likeTimer)
              likeTimer = null
              likeCount.value = 8000
            }
          }, 2500)
          setTimeout(() => { moneyShow.value = true }, 3500)
          io.unobserve(container)
        }
      })
    }, { threshold: 0.6 })
    io.observe(container)
  }
  setupFirstVideoAnimation()
})
</script>

<style scoped>
.timeline {
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #3498db, #9b59b6);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin: 50px 0;
  position: relative;
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.timeline-visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 8px rgba(52, 152, 219, 0.2);
  z-index: 2;
}

.timeline-content {
  width: 45%;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
  margin-right: 55%;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 55%;
}

.step-badge {
  position: absolute;
  top: -14px;
  left: -14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.35);
}

.timeline-content h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.timeline-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.timeline-image:hover {
  transform: scale(1.05);
}

.timeline-icon {
  font-size: 2rem;
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-item:nth-child(even) .timeline-icon {
  left: -60px;
  right: auto;
}

.first-video-anim {
  width: 100%;
  margin: 20px 0;
}

.first-video-anim .video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background: #000;
}

.timeline-video-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 1s ease;
}

.first-video-anim.run .timeline-video-img {
  opacity: 0.3;
}

.like-counter {
  position: absolute;
  right: 14px;
  top: 14px;
  color: #fff;
  font-weight: 800;
  background: rgba(0, 0, 0, .5);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .3);
  z-index: 20;
  transition: all 0.3s ease;
}

.first-video-anim.run .like-counter {
  background: rgba(255, 20, 147, 0.9);
  animation: counterPulse 0.5s ease infinite;
}

@keyframes counterPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.first-video-anim .hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.first-video-anim .heart {
  position: absolute;
  right: -50px;
  bottom: 20px;
  font-size: 20px;
  opacity: 0;
}

.first-video-anim.run .heart {
  animation: heartRise 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes heartRise {
  0% {
    right: -50px;
    bottom: 20px;
    transform: scale(0.5) rotate(0deg);
    opacity: 0;
  }

  10% {
    right: 30px;
    opacity: 1;
  }

  20% {
    right: 50%;
    bottom: 30%;
    transform: scale(1.5) rotate(15deg);
  }

  40% {
    right: 45%;
    bottom: 40%;
    transform: scale(2.5) rotate(30deg);
    opacity: 1;
  }

  60% {
    right: 40%;
    bottom: 50%;
    transform: scale(4) rotate(45deg);
    opacity: 0.9;
  }

  80% {
    right: 35%;
    bottom: 55%;
    transform: scale(6) rotate(60deg);
    opacity: 0.7;
  }

  100% {
    right: 30%;
    bottom: 60%;
    transform: scale(8) rotate(90deg);
    opacity: 0;
  }
}

.first-video-anim .money {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  opacity: 0;
  color: #ffd700;
  text-shadow: 0 10px 30px rgba(0, 0, 0, .6);
  z-index: 15;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.first-video-anim .money.show {
  font-size: 8rem;
  opacity: 1;
  animation: moneyBounce 1s ease-in-out;
}

@keyframes moneyBounce {
  0% {
    transform: scale(0) rotate(-180deg);
  }

  50% {
    transform: scale(1.2) rotate(10deg);
  }

  70% {
    transform: scale(0.9) rotate(-5deg);
  }

  85% {
    transform: scale(1.05) rotate(2deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

.first-video-anim .money.show::after {
  content: '💰';
  position: absolute;
  font-size: 8rem;
  opacity: 0.3;
  filter: blur(20px);
  animation: moneyGlow 2s ease-in-out infinite;
}

@keyframes moneyGlow {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
    transform: none;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    width: calc(100% - 80px);
    margin-left: 80px;
    margin-right: 0;
  }

  .timeline-dot {
    left: 30px;
    transform: none;
  }

  .timeline-icon {
    display: none;
  }
}
</style>