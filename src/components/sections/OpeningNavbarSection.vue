<template>
  <div>
    <section class="section opening-section fullscreen" id="chapter0">
      <!-- 星空背景 -->
      <canvas ref="starsCanvas" class="stars-bg"></canvas>

      <!-- 粒子效果 -->
      <div class="particles">
        <div class="particle" v-for="n in 30" :key="n" :style="getParticleStyle(n)"></div>
      </div>

      <!-- 光圈装饰 -->
      <div class="glow-orbs">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="glow-orb orb-3"></div>
      </div>

      <!-- 大标题 -->
      <div class="opening-text">
        <span class="char" :class="{ 'char-show': charVisible[0] }" :style="{ animationDelay: '0s' }">屏</span>
        <span class="char" :class="{ 'char-show': charVisible[1] }" :style="{ animationDelay: '0.1s' }">幕</span>
        <span class="char" :class="{ 'char-show': charVisible[2] }" :style="{ animationDelay: '0.2s' }">后</span>
        <span class="char" :class="{ 'char-show': charVisible[3] }" :style="{ animationDelay: '0.3s' }">的</span>
        <span class="char" :class="{ 'char-show': charVisible[4] }" :style="{ animationDelay: '0.4s' }">小</span>
        <span class="char" :class="{ 'char-show': charVisible[5] }" :style="{ animationDelay: '0.5s' }">劳</span>
        <span class="char" :class="{ 'char-show': charVisible[6] }" :style="{ animationDelay: '0.6s' }">工</span>
        <span class="char highlight" :class="{ 'char-show': charVisible[7] }"
          :style="{ animationDelay: '0.7s' }">：</span>
        <br>
        <span class="char quote" :class="{ 'char-show': charVisible[8] }" :style="{ animationDelay: '0.8s' }">"</span>
        <span class="char" :class="{ 'char-show': charVisible[9] }" :style="{ animationDelay: '0.9s' }">网</span>
        <span class="char" :class="{ 'char-show': charVisible[10] }" :style="{ animationDelay: '1.0s' }">红</span>
        <span class="char" :class="{ 'char-show': charVisible[11] }" :style="{ animationDelay: '1.1s' }">儿</span>
        <span class="char" :class="{ 'char-show': charVisible[12] }" :style="{ animationDelay: '1.2s' }">童</span>
        <span class="char quote" :class="{ 'char-show': charVisible[13] }" :style="{ animationDelay: '1.3s' }">"</span>
        <span class="char" :class="{ 'char-show': charVisible[14] }" :style="{ animationDelay: '1.4s' }">账</span>
        <span class="char" :class="{ 'char-show': charVisible[15] }" :style="{ animationDelay: '1.5s' }">号</span>
        <span class="char" :class="{ 'char-show': charVisible[16] }" :style="{ animationDelay: '1.6s' }">的</span>
        <span class="char" :class="{ 'char-show': charVisible[17] }" :style="{ animationDelay: '1.7s' }">流</span>
        <span class="char" :class="{ 'char-show': charVisible[18] }" :style="{ animationDelay: '1.8s' }">量</span>
        <span class="char" :class="{ 'char-show': charVisible[19] }" :style="{ animationDelay: '1.9s' }">密</span>
        <span class="char" :class="{ 'char-show': charVisible[20] }" :style="{ animationDelay: '2.0s' }">码</span>
      </div>

      <!-- 文字光效 -->
      <div class="text-particles">
        <div class="text-particle" v-for="n in 15" :key="n"></div>
      </div>

      <div class="phone-screen" :class="{ 'phone-show': phoneVisible }">
        <!-- 手机外发光 -->
        <div class="phone-glow"></div>

        <div class="phone-notch">
          <div class="notch-camera">
            <div class="camera-lens"></div>
          </div>
          <div class="notch-speaker"></div>
        </div>
        <div class="btn-left volume-up"></div>
        <div class="btn-left volume-down"></div>
        <div class="btn-right power">
          <div class="power-indicator"></div>
        </div>

        <div class="screen-content">
          <!-- 屏幕光晕 -->
          <div class="screen-shine"></div>
        </div>
      </div>

      <div class="scroll-indicator" :class="{ 'indicator-show': indicatorVisible }">
        <div class="indicator-line"></div>
        <span class="indicator-text">向下滚动开始</span>
        <div class="scroll-arrow">
          <span>↓</span>
        </div>
      </div>
    </section>

    <nav class="navbar" :class="{ visible: showNav, scrolled: isScrolled }">
      <!-- 导航栏光晕 -->
      <div class="nav-glow"></div>

      <div class="nav-container">
        <div class="nav-brand" @click="scrollToSection('chapter0')">
          <div class="brand-icon-wrapper">
            <span class="brand-icon">👶</span>
            <div class="icon-pulse"></div>
          </div>
          <span class="brand-text">ReChildhood</span>
          <div class="brand-shine"></div>
        </div>

        <div class="nav-menu" :class="{ active: menuOpen }">
          <a @click.prevent="scrollToSection('chapter0-content')" class="nav-link"
            :class="{ active: activeSection === 'chapter0-content' }">
            <span class="link-icon">👋</span>
            <span class="link-text">你好，屏幕里的童年</span>
            <div class="link-ripple"></div>
          </a>
          <a @click.prevent="scrollToSection('chapter1')" class="nav-link"
            :class="{ active: activeSection === 'chapter1' }">
            <span class="link-icon">⭐</span>
            <span class="link-text">一个网红儿童的诞生</span>
            <div class="link-ripple"></div>
          </a>
          <a @click.prevent="scrollToSection('chapter2')" class="nav-link"
            :class="{ active: activeSection === 'chapter2' }">
            <span class="link-icon">💝</span>
            <span class="link-text">让爱回到现实</span>
            <div class="link-ripple"></div>
          </a>
        </div>

        <div class="nav-toggle" @click="toggleMenu" :class="{ active: menuOpen }" :aria-expanded="menuOpen"
          aria-label="打开导航" role="button" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="nav-progress" :style="{ width: scrollProgress + '%' }">
        <div class="progress-glow"></div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const phoneVisible = ref(false)
const indicatorVisible = ref(false)
const charVisible = ref(Array(21).fill(false))
const starsCanvas = ref(null)

const showNav = ref(false)
const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('chapter0')
const scrollProgress = ref(0)

// 粒子样式生成
const getParticleStyle = (n) => {
  const size = Math.random() * 4 + 2
  const duration = Math.random() * 3 + 2
  const delay = Math.random() * 2
  const left = Math.random() * 100

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const nav = document.querySelector('.navbar')
    const offset = nav ? nav.offsetHeight : 0
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    menuOpen.value = false
  }
}

const updateScrollState = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight <= 0 ? 0 : (scrollTop / docHeight) * 100
  isScrolled.value = scrollTop > 100
  const sections = ['chapter0', 'chapter0-content', 'chapter1', 'chapter2']
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeSection.value = sectionId
        break
      }
    }
  }
}
const onScroll = () => { updateScrollState() }

onMounted(() => {
  // 星空背景
  if (starsCanvas.value) {
    const canvas = starsCanvas.value
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
      })
    }

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'

      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animateStars)
    }
    animateStars()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
  }

  setTimeout(() => { phoneVisible.value = true }, 500)
  const chars = charVisible.value

  // 逐个显示21个字符
  setTimeout(() => { chars[0] = true }, 1500)
  setTimeout(() => {
    for (let i = 1; i < 21; i++) {
      setTimeout(() => { chars[i] = true }, 1500 + i * 150)
    }
    setTimeout(() => { indicatorVisible.value = true }, 1500 + 21 * 150 + 500)
    setTimeout(() => { showNav.value = true }, 1500 + 21 * 150 + 800)
  })
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* ==================== 开场 Section ==================== */
.opening-section {
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  overflow: hidden;
}

/* 星空背景 */
.stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* 粒子效果 */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
  border-radius: 50%;
  bottom: -10px;
  animation: particleRise linear infinite;
}

@keyframes particleRise {
  from {
    bottom: -10px;
    opacity: 1;
  }

  to {
    bottom: 110%;
    opacity: 0;
  }
}

/* 光圈装饰 */
.glow-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: orbFloat 15s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.5), transparent);
  top: 50%;
  right: -150px;
  animation-delay: -5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.5), transparent);
  bottom: -100px;
  left: 30%;
  animation-delay: -10s;
}

@keyframes orbFloat {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(30px, -40px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 30px) scale(0.9);
  }
}

/* ==================== 手机屏幕 ==================== */
.phone-screen {
  width: 300px;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  border-radius: 45px;
  border: 12px solid #1a1a1a;
  box-shadow:
    0 60px 120px rgba(0, 0, 0, 0.9),
    0 0 0 3px #333,
    0 0 60px rgba(102, 126, 234, 0.5),
    inset 0 0 40px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 10%;
  right: 8%;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100vh) scale(0.5) rotate(10deg);
  transition: all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 8;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.phone-screen.phone-show {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
  animation: phoneFloat 4s ease-in-out infinite 1.8s;
}

@keyframes phoneFloat {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-15px) rotate(-2deg);
  }
}

/* 手机外发光 */
.phone-glow {
  position: absolute;
  inset: -30px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent 70%);
  border-radius: 50%;
  opacity: 0;
  animation: phoneGlowPulse 3s ease-in-out infinite 2s;
  z-index: -1;
}

@keyframes phoneGlowPulse {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.9);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

/* 手机刘海 */
.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 10;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.notch-camera {
  width: 12px;
  height: 12px;
  background: #222;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.8);
}

.camera-lens {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #667eea, #1a1a1a);
  border-radius: 50%;
  animation: cameraGlow 3s ease-in-out infinite;
}

@keyframes cameraGlow {

  0%,
  100% {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }

  50% {
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.9);
  }
}

.notch-speaker {
  width: 60px;
  height: 6px;
  background: #333;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
}

.btn-left,
.btn-right {
  position: absolute;
  background: #1a1a1a;
  border-radius: 2px;
}

.volume-up {
  left: -3px;
  top: 120px;
  width: 3px;
  height: 60px;
}

.volume-down {
  left: -3px;
  top: 200px;
  width: 3px;
  height: 60px;
}

.power {
  right: -3px;
  top: 160px;
  width: 3px;
  height: 80px;
  position: relative;
}

.power-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, #667eea, transparent);
  animation: powerBlink 2s ease-in-out infinite;
}

@keyframes powerBlink {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }
}

/* 屏幕内容 */
.screen-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 25px;
  position: relative;
  z-index: 5;
}

.screen-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.15), transparent 65%);
  pointer-events: none;
  animation: screenGlow 4s ease-in-out infinite;
}

@keyframes screenGlow {

  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}

.screen-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.1) 45deg,
      transparent 90deg);
  animation: screenRotate 10s linear infinite;
  pointer-events: none;
}

@keyframes screenRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 文字样式 */
.opening-text {
  color: white;
  font-size: 4.5rem;
  font-weight: 900;
  text-align: center;
  line-height: 1.4;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  letter-spacing: 2px;
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--spacing-xl, 40px);
  pointer-events: none;
}

.opening-text .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(-60px) scale(0) rotate(-180deg);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: blur(10px);
}

.opening-text .char.char-show {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
  filter: blur(0);
  text-shadow:
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(102, 126, 234, 0.6),
    0 5px 15px rgba(0, 0, 0, 0.5);
  animation: charGlow 3s ease-in-out infinite;
}

/* 高亮冒号 */
.opening-text .char.highlight {
  color: #ffd700;
  font-weight: bold;
  text-shadow:
    0 0 30px rgba(255, 215, 0, 0.9),
    0 0 50px rgba(255, 215, 0, 0.6),
    0 5px 20px rgba(255, 215, 0, 0.4);
  animation: highlightPulse 2s ease-in-out infinite;
}

/* 引号样式 */
.opening-text .char.quote {
  color: #ff6b9d;
  font-weight: bold;
  font-size: 1.3em;
  text-shadow:
    0 0 25px rgba(255, 107, 157, 0.8),
    0 0 45px rgba(255, 107, 157, 0.5);
  animation: quotePulse 2.5s ease-in-out infinite;
}

@keyframes highlightPulse {

  0%,
  100% {
    text-shadow:
      0 0 30px rgba(255, 215, 0, 0.9),
      0 0 50px rgba(255, 215, 0, 0.6),
      0 5px 20px rgba(255, 215, 0, 0.4);
    transform: scale(1);
  }

  50% {
    text-shadow:
      0 0 40px rgba(255, 215, 0, 1),
      0 0 70px rgba(255, 215, 0, 0.8),
      0 5px 30px rgba(255, 215, 0, 0.6);
    transform: scale(1.1);
  }
}

@keyframes quotePulse {

  0%,
  100% {
    text-shadow:
      0 0 25px rgba(255, 107, 157, 0.8),
      0 0 45px rgba(255, 107, 157, 0.5);
  }

  50% {
    text-shadow:
      0 0 35px rgba(255, 107, 157, 1),
      0 0 60px rgba(255, 107, 157, 0.7);
  }
}

@keyframes charGlow {

  0%,
  100% {
    text-shadow:
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(102, 126, 234, 0.6),
      0 5px 15px rgba(0, 0, 0, 0.5);
  }

  50% {
    text-shadow:
      0 0 30px rgba(255, 255, 255, 1),
      0 0 60px rgba(102, 126, 234, 0.9),
      0 5px 20px rgba(0, 0, 0, 0.5);
  }
}

/* 文字粒子效果 */
.text-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.text-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: textParticleFloat 3s ease-in-out infinite;
}

.text-particle:nth-child(odd) {
  left: 30%;
  animation-delay: calc(var(--n) * 0.2s);
}

.text-particle:nth-child(even) {
  right: 30%;
  animation-delay: calc(var(--n) * 0.15s);
}

@keyframes textParticleFloat {
  0% {
    bottom: 40%;
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 0.5;
  }

  100% {
    bottom: 60%;
    opacity: 0;
  }
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 20;
}

.scroll-indicator.indicator-show {
  opacity: 1;
  transform: translateY(0);
  animation: indicatorFloat 3s ease-in-out infinite;
}

@keyframes indicatorFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.indicator-line {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent);
  position: relative;
  overflow: hidden;
}

.indicator-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0), rgba(102, 126, 234, 1));
  animation: lineDrop 2s ease-in-out infinite;
}

@keyframes lineDrop {
  0% {
    top: -20px;
  }

  100% {
    top: 100%;
  }
}

.indicator-text {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {

  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
}

.scroll-arrow {
  font-size: 2.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: arrowPulse 2s ease-in-out infinite;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.scroll-arrow span {
  animation: arrowBounce 1.5s ease-in-out infinite;
  display: inline-block;
}

@keyframes arrowPulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }

  50% {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  }
}

@keyframes arrowBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

/* ==================== 导航栏 ==================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  z-index: var(--z-navbar, 1000);
  transform: translateY(-100%);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.nav-glow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 20px;
  background: radial-gradient(ellipse, rgba(102, 126, 234, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.navbar.visible {
  transform: translateY(0);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.1);
  animation: navSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes navSlideIn {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 35px rgba(102, 126, 234, 0.15);
  border-bottom-color: rgba(102, 126, 234, 0.2);
}

.navbar.scrolled .nav-glow {
  opacity: 1;
}

/* 导航容器 */
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: relative;
}

/* 品牌区域 */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
}

.nav-brand:hover {
  transform: scale(1.08);
}

.brand-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.brand-icon {
  font-size: 2.2rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
}

.icon-pulse {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%);
  animation: brandPulse 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes brandPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.3);
    opacity: 0.8;
  }
}

.nav-brand:hover .brand-icon {
  transform: scale(1.2) rotate(360deg);
}

.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: brandGradient 3s ease infinite;
  position: relative;
  font-weight: 900;
  letter-spacing: 1px;
}

@keyframes brandGradient {

  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

.brand-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s;
  pointer-events: none;
}

.nav-brand:hover .brand-shine {
  left: 100%;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* 导航链接 */
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.link-icon {
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: grayscale(30%);
}

.link-text {
  position: relative;
  z-index: 2;
}

.link-ripple {
  position: absolute;
  inset: 0;
  border-radius: 30px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 30px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  opacity: 0;
  z-index: -1;
  filter: blur(8px);
  transition: opacity 0.4s;
}

.nav-link:hover {
  color: #667eea;
  transform: translateY(-4px) scale(1.05);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25);
}

.nav-link:hover .link-icon {
  transform: scale(1.3) rotate(10deg);
  filter: grayscale(0%);
}

.nav-link:hover .link-ripple {
  transform: scale(1.2);
  opacity: 1;
}

.nav-link:hover::before {
  opacity: 0.1;
}

.nav-link:hover::after {
  opacity: 0.5;
}

/* 激活状态 */
.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% auto;
  animation: activeLinkGradient 3s ease infinite;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@keyframes activeLinkGradient {

  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

.nav-link.active .link-icon {
  filter: grayscale(0%);
  animation: activeLinkIcon 2s ease-in-out infinite;
}

@keyframes activeLinkIcon {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.15) rotate(5deg);
  }
}

.nav-link.active:hover {
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.7);
  transform: translateY(-5px) scale(1.05);
}

.nav-link.active::before {
  opacity: 0;
}

.nav-link.active::after {
  opacity: 0.8;
  animation: activeGlow 2s ease-in-out infinite;
}

@keyframes activeGlow {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

/* 移动端切换按钮 */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;
}

.nav-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-toggle:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.nav-toggle:hover::before {
  opacity: 1;
}

.nav-toggle span {
  width: 30px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
}

.nav-toggle:hover span {
  background: linear-gradient(90deg, #667eea 0%, #f093fb 100%);
}

.nav-toggle.active {
  transform: scale(1.05);
  border-color: rgba(102, 126, 234, 0.5);
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
  background: linear-gradient(90deg, #f093fb 0%, #667eea 100%);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
  background: linear-gradient(90deg, #f093fb 0%, #667eea 100%);
}

/* 进度条 */
.nav-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% auto;
  transition: width 0.1s ease-out;
  box-shadow: 0 2px 15px rgba(102, 126, 234, 0.7);
  animation: progressGlow 2s ease-in-out infinite;
}

@keyframes progressGlow {

  0%,
  100% {
    background-position: 0% center;
    box-shadow: 0 2px 15px rgba(102, 126, 234, 0.7);
  }

  50% {
    background-position: 100% center;
    box-shadow: 0 2px 20px rgba(240, 147, 251, 0.9);
  }
}

/* 中等屏幕响应式 */
@media (max-width: 1024px) {
  .opening-text {
    font-size: 3.5rem;
    top: 30%;
  }

  .phone-screen {
    bottom: 8%;
    right: 5%;
  }
}

/* 平板和手机响应式 */
@media (max-width: 768px) {
  .opening-section {
    padding: 40px 15px 60px;
    min-height: 100vh;
  }

  .phone-screen {
    width: 200px;
    height: 400px;
    border: 6px solid #1a1a1a;
    position: absolute;
    bottom: 15%;
    right: 50%;
    transform: translateX(50%);
  }

  .phone-screen.phone-show {
    transform: translateX(50%) translateY(0) scale(1) rotate(0deg);
  }

  .phone-glow {
    width: 220px;
    height: 420px;
  }

  .phone-notch {
    width: 120px;
    height: 22px;
    gap: 8px;
  }

  .camera-lens {
    width: 10px;
    height: 10px;
  }

  .speaker {
    width: 40px;
    height: 4px;
  }

  .power {
    width: 3px;
    height: 25px;
  }

  .opening-text {
    display: none;
  }

  .text-particles {
    display: none;
  }

  .scroll-indicator {
    bottom: 25px;
    gap: 8px;
  }

  .indicator-line {
    height: 35px;
  }

  .indicator-text {
    font-size: 0.8rem;
  }

  .scroll-arrow {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .nav-container {
    padding: 0 18px;
    height: 70px;
  }

  .nav-brand {
    font-size: 1.35rem;
    gap: 12px;
  }

  .brand-icon-wrapper {
    width: 42px;
    height: 42px;
  }

  .brand-icon {
    font-size: 1.9rem;
  }

  .brand-text {
    font-size: 1.35rem;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    flex-direction: column;
    gap: 0;
    padding: 20px 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.4s ease;
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
    z-index: 998;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    border-top: 1px solid rgba(102, 126, 234, 0.1);
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-link {
    padding: 14px 24px;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid rgba(102, 126, 234, 0.08);
    border-radius: 0;
    min-height: 52px;
    font-size: 1rem;
    background: transparent;
    backdrop-filter: none;
    margin: 0 12px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-link:active {
    background: rgba(102, 126, 234, 0.08);
    transform: scale(0.98);
  }

  .nav-link .link-icon {
    font-size: 1.2rem;
    min-width: 24px;
  }

  .nav-link .link-text {
    font-weight: 600;
  }

  .nav-toggle {
    display: flex;
    padding: 12px;
    min-width: 48px;
    min-height: 48px;
  }

  .nav-toggle span {
    width: 28px;
  }

  .navbar {
    height: 70px;
  }

  .navbar.scrolled {
    height: 65px;
  }

  .navbar.scrolled .nav-container {
    height: 65px;
  }

  .navbar.scrolled .nav-menu {
    top: 65px;
    max-height: calc(100vh - 65px);
  }
}

@media (max-width: 480px) {
  .opening-section {
    padding: 30px 10px 50px;
  }

  .phone-screen {
    width: 160px;
    height: 320px;
    border: 5px solid #1a1a1a;
    position: absolute;
    bottom: 15%;
    right: 50%;
    transform: translateX(50%);
  }

  .phone-screen.phone-show {
    transform: translateX(50%) translateY(0) scale(1) rotate(0deg);
  }

  .phone-glow {
    width: 180px;
    height: 340px;
  }

  .phone-notch {
    width: 100px;
    height: 18px;
  }

  .camera-lens {
    width: 8px;
    height: 8px;
  }

  .speaker {
    width: 30px;
    height: 3px;
  }

  .power {
    width: 2px;
    height: 20px;
  }

  .opening-text {
    display: none;
  }

  .scroll-indicator {
    bottom: 20px;
    gap: 6px;
  }

  .indicator-line {
    height: 30px;
  }

  .indicator-text {
    font-size: 0.75rem;
  }

  .scroll-arrow {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }

  .nav-container {
    padding: 0 14px;
    height: 65px;
  }

  .nav-brand {
    font-size: 1.2rem;
    gap: 10px;
  }

  .brand-icon-wrapper {
    width: 38px;
    height: 38px;
  }

  .brand-icon {
    font-size: 1.7rem;
  }

  .brand-text {
    font-size: 1.2rem;
    letter-spacing: 0.5px;
  }

  .nav-menu {
    top: 65px;
    padding: 16px 0;
    border-top: 1px solid rgba(102, 126, 234, 0.12);
  }

  .nav-link {
    padding: 14px 20px;
    min-height: 50px;
    font-size: 0.95rem;
    margin: 0 10px;
    border-radius: 10px;
  }

  .nav-link .link-icon {
    font-size: 1.15rem;
    min-width: 22px;
  }

  .nav-link .link-text {
    font-weight: 600;
  }

  .nav-toggle {
    padding: 10px;
    min-width: 44px;
    min-height: 44px;
  }

  .nav-toggle span {
    width: 26px;
    height: 2.5px;
  }

  .navbar {
    height: 65px;
  }

  .navbar.scrolled {
    height: 60px;
  }

  .navbar.scrolled .nav-container {
    height: 60px;
  }

  .navbar.scrolled .nav-menu {
    top: 60px;
    max-height: calc(100vh - 60px);
  }
}
</style>