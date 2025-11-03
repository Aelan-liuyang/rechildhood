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
              <div class="like-counter">❤️ {{ likeCount.toLocaleString() }}
              </div>
              <div class="hearts">
                <span v-for="n in 15" :key="n" class="heart">❤️</span>
              </div>
              <!-- <div class="money" :class="{ show: moneyShow }">💰</div> -->
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
      当<span class="keyword-highlight">"养娃"</span>变成了<span class="keyword-highlight">"养号"</span>，<span
        class="keyword-highlight">爱</span>就开始有了回报率。很多账号最初确实是出于分享和记录的目的。然而，一旦<span
        class="keyword-highlight">流量</span>涌入，<span class="keyword-highlight">MCN机构</span>伸出橄榄枝，<span
        class="keyword-highlight">商业合作</span>接踵而至，最初的<span class="keyword-highlight">"爱"</span>就可能被异化。<span
        class="keyword-highlight">家长</span>的角色可能悄然转变为<span class="keyword-highlight">"经纪人"</span>，而<span
        class="keyword-highlight">孩子</span>则可能成为家庭中的<span class="keyword-highlight">"数字劳工"</span>。
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
const liveStreamImg = new URL('@/assets/images/zhibo.png', import.meta.url).href
const liveStreamImg2 = new URL('@/assets/images/shangye.png', import.meta.url).href
const liveStreamImg3 = new URL('@/assets/images/mcn.png', import.meta.url).href

const timeline = [
  { title: '短视频第一条视频发布', desc: '当流量涌入', icon: '📱', image: firstVideoSrc },
  { title: '直播变现', desc: '开启直播带货', icon: '💰', image: liveStreamImg },
  { title: '商业合作接踵而至', desc: '第一个广告来了', icon: '📢', image: liveStreamImg2 },
  { title: 'MCN抛出橄榄枝', desc: '签约MCN机构', icon: '🤝', image: liveStreamImg3 }
]
const timelineVisible = ref([false, false, false, false])

onMounted(() => {
  // 时间线进入视口逐个显现 - 优化速度
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          // 减少延迟：300ms -> 150ms
          setTimeout(() => { timelineVisible.value[index] = true }, index * 150)
        }
      })
    },
    { threshold: 0.3 } // 降低阈值，更早触发
  )

  // 减少初始延迟：500ms -> 200ms
  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, index) => {
      item.dataset.index = index
      observer.observe(item)
    })
  }, 200)

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
  max-width: 900px;
  margin: var(--spacing-2xl, 60px) auto;
  position: relative;
  padding: var(--spacing-lg, 30px) 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(to bottom, #667eea, #764ba2, #f093fb);
  transform: translateX(-50%);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin: var(--spacing-2xl, 60px) 0;
  position: relative;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item.timeline-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.timeline-dot {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 10px rgba(102, 126, 234, 0.15),
    0 0 20px rgba(102, 126, 234, 0.4);
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-item.timeline-visible .timeline-dot {
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {

  0%,
  100% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0.15),
      0 0 20px rgba(102, 126, 234, 0.4);
  }

  50% {
    box-shadow: 0 0 0 15px rgba(102, 126, 234, 0.1),
      0 0 30px rgba(102, 126, 234, 0.6);
  }
}

.timeline-content {
  width: 45%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  padding: var(--spacing-lg, 30px);
  border-radius: var(--radius-xl, 24px);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.18),
    0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
  margin-right: 55%;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 55%;
}

.timeline-item:nth-child(odd) .timeline-content::before {
  content: '';
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid rgba(248, 249, 255, 0.95);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.timeline-item:nth-child(even) .timeline-content::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-right: 20px solid rgba(248, 249, 255, 0.95);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.step-badge {
  position: absolute;
  top: -16px;
  left: -16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  border: 3px solid white;
  z-index: 3;
}

.timeline-content h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: var(--spacing-sm, 12px);
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timeline-content p {
  color: #555;
  line-height: 1.7;
  font-size: 1.05rem;
}

.timeline-image {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md, 12px);
  margin: var(--spacing-md, 20px) 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.timeline-image:hover {
  transform: scale(1.03) translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.3);
}

.timeline-icon {
  font-size: 2.5rem;
  position: absolute;
  right: -70px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #fff, #f8f9ff);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
  border: 2px solid rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
}

.timeline-item.timeline-visible .timeline-icon {
  animation: iconBounce 1s ease-in-out;
}

@keyframes iconBounce {

  0%,
  100% {
    transform: translateY(-50%) scale(1);
  }

  25% {
    transform: translateY(-50%) scale(1.15) rotate(5deg);
  }

  50% {
    transform: translateY(-50%) scale(0.95) rotate(-5deg);
  }

  75% {
    transform: translateY(-50%) scale(1.05) rotate(3deg);
  }
}

.timeline-icon:hover {
  transform: translateY(-50%) scale(1.15) rotate(10deg);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.35);
}

.timeline-item:nth-child(even) .timeline-icon {
  left: -70px;
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
  min-height: 250px;
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

.insight-text {
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 920px;
  text-align: center;
  margin: var(--spacing-2xl, 60px) auto;
  color: #2c3e50;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg, 30px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.keyword-highlight {
  color: #667eea;
  font-weight: 600;
  border-bottom: 2px solid rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .timeline {
    padding: var(--spacing-md, 20px) 0;
    max-width: 100%;
  }

  .timeline::before {
    left: 25px;
    width: 3px;
    transform: none;
  }

  .timeline-item {
    margin: var(--spacing-xl, 40px) 0;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    width: calc(100% - 70px);
    margin-left: 70px;
    margin-right: 0;
  }

  .timeline-item:nth-child(odd) .timeline-content::before,
  .timeline-item:nth-child(even) .timeline-content::before {
    display: none;
  }

  .timeline-dot {
    left: 25px;
    width: 18px;
    height: 18px;
    transform: none;
  }

  .timeline-icon {
    display: none;
  }

  .step-badge {
    width: 36px;
    height: 36px;
    font-size: 1rem;
    top: -12px;
    left: -12px;
  }

  .timeline-content {
    padding: var(--spacing-md, 20px);
  }

  .timeline-content h3 {
    font-size: 1.2rem;
  }

  .timeline-content p {
    font-size: 0.95rem;
  }

  .insight-text {
    font-size: 1.05rem;
    padding: var(--spacing-md, 20px);
    margin: var(--spacing-xl, 40px) auto;
  }
}

@media (max-width: 480px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-dot {
    left: 20px;
    width: 16px;
    height: 16px;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px;
  }

  .timeline-content {
    padding: 18px;
  }

  .timeline-content h3 {
    font-size: 1.1rem;
  }

  .timeline-content p {
    font-size: 0.9rem;
  }

  .insight-text {
    font-size: 1rem;
    padding: 18px;
  }
}
</style>