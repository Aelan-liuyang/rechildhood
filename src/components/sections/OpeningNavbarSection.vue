<template>
  <div>
    <section class="section opening-section fullscreen" id="chapter0">
      <div class="phone-screen" :class="{ 'phone-show': phoneVisible }">
        <div class="phone-notch">
          <div class="notch-camera"></div>
          <div class="notch-speaker"></div>
        </div>
        <div class="btn-left volume-up"></div>
        <div class="btn-left volume-down"></div>
        <div class="btn-right power"></div>
        <div class="screen-content">
          <div class="opening-text">
            <span class="char" :class="{ 'char-show': charVisible[0] }">你</span>
            <span class="char" :class="{ 'char-show': charVisible[1] }">好</span>
            <span class="char" :class="{ 'char-show': charVisible[2] }">，</span>
            <br>
            <span class="char" :class="{ 'char-show': charVisible[3] }">屏</span>
            <span class="char" :class="{ 'char-show': charVisible[4] }">幕</span>
            <span class="char" :class="{ 'char-show': charVisible[5] }">里</span>
            <span class="char" :class="{ 'char-show': charVisible[6] }">的</span>
            <span class="char" :class="{ 'char-show': charVisible[7] }">童</span>
            <span class="char" :class="{ 'char-show': charVisible[8] }">年</span>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" :class="{ 'indicator-show': indicatorVisible }">
        <span>向下滚动开始</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>

    <nav class="navbar" :class="{ visible: showNav, scrolled: isScrolled }">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-icon">👶</span>
          <span class="brand-text">ReChildhood</span>
        </div>

        <div class="nav-menu" :class="{ active: menuOpen }">
          <a @click.prevent="scrollToSection('chapter0-content')" class="nav-link"
            :class="{ active: activeSection === 'chapter0-content' }">
            <span class="link-icon">👋</span>
            <span class="link-text">你好，屏幕里的童年</span>
          </a>
          <a @click.prevent="scrollToSection('chapter1')" class="nav-link"
            :class="{ active: activeSection === 'chapter1' }">
            <span class="link-icon">⭐</span>
            <span class="link-text">一个网红儿童的诞生</span>
          </a>
          <a @click.prevent="scrollToSection('chapter2')" class="nav-link"
            :class="{ active: activeSection === 'chapter2' }">
            <span class="link-icon">💝</span>
            <span class="link-text">让爱回到现实</span>
          </a>
        </div>

        <div class="nav-toggle" @click="toggleMenu" :class="{ active: menuOpen }" :aria-expanded="menuOpen"
          aria-label="打开导航" role="button" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="nav-progress" :style="{ width: scrollProgress + '%' }"></div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const phoneVisible = ref(false)
const indicatorVisible = ref(false)
const charVisible = ref([false, false, false, false, false, false, false, false, false])

const showNav = ref(false)
const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('chapter0')
const scrollProgress = ref(0)

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
  setTimeout(() => { phoneVisible.value = true }, 500)
  const chars = charVisible.value
  setTimeout(() => { chars[0] = true }, 1500)
  setTimeout(() => {
    setTimeout(() => { chars[1] = true }, 1650)
    setTimeout(() => { chars[2] = true }, 1800)
    setTimeout(() => { chars[3] = true }, 1950)
    setTimeout(() => { chars[4] = true }, 2100)
    setTimeout(() => { chars[5] = true }, 2250)
    setTimeout(() => { chars[6] = true }, 2400)
    setTimeout(() => { chars[7] = true }, 2550)
    setTimeout(() => { chars[8] = true }, 2700)
    setTimeout(() => { indicatorVisible.value = true }, 3200)
    setTimeout(() => { showNav.value = true }, 3500)
  })
  window.addEventListener('scroll', onScroll)
  onScroll()
})
</script>

<style scoped>
.opening-section {
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
}

.phone-screen {
  width: 280px;
  height: 560px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8), 0 0 0 2px #333, inset 0 0 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100vh) scale(0.5);
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.phone-screen.phone-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: phoneFloat 3s ease-in-out infinite 1.5s;
}

@keyframes phoneFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 25px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
}

.notch-camera {
  width: 10px;
  height: 10px;
  background: #333;
  border-radius: 50%;
}

.notch-speaker {
  width: 50px;
  height: 5px;
  background: #333;
  border-radius: 3px;
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
}

.screen-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 25px;
  position: relative;
}

.screen-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1), transparent 60%);
  pointer-events: none;
}

.opening-text {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.6;
}

.opening-text .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(-50px) scale(0) rotate(-180deg);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.opening-text .char.char-show {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
  animation: charGlow 3s ease-in-out infinite 0.6s;
}

@keyframes charGlow {

  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(100, 181, 246, 0.6);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.scroll-indicator.indicator-show {
  opacity: 1;
  transform: translateY(0);
  animation: bounce 2s ease-in-out infinite;
}

.scroll-arrow {
  font-size: 2rem;
  animation: arrowBounce 1s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes arrowBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: 1000;
  transform: translateY(-100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar.visible {
  transform: translateY(0);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.12);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.3s;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 2rem;
  animation: brandPulse 2s ease-in-out infinite;
}

@keyframes brandPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 600;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}

.nav-link:hover::before,
.nav-link.active::before {
  opacity: 0.1;
}

.nav-link:hover {
  color: #667eea;
  transform: translateY(-2px);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4), 0 0 0 2px rgba(102, 126, 234, 0.15) inset;
  animation: navGlow 2s ease-in-out infinite;
}

@keyframes navGlow {

  0%,
  100% {
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4), 0 0 0 2px rgba(102, 126, 234, 0.15) inset;
  }

  50% {
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6), 0 0 0 2px rgba(102, 126, 234, 0.3) inset;
  }
}

.nav-link.active::before {
  opacity: 0;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.nav-toggle span {
  width: 28px;
  height: 3px;
  background: #2c3e50;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

@media (max-width: 768px) {
  .phone-screen {
    width: 220px;
    height: 440px;
    border: 8px solid #1a1a1a;
  }

  .opening-text {
    font-size: 1.3rem;
  }

  .nav-container {
    padding: 0 var(--spacing-md, 20px);
    height: var(--nav-height, 70px);
  }

  .nav-menu {
    position: fixed;
    top: var(--nav-height, 70px);
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    gap: 0;
    padding: var(--spacing-md, 20px) 0;
    transform: translateX(-100%);
    transition: transform 0.3s;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  /* 添加遮罩层 */
  .nav-menu::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: -1;
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-menu.active::before {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    padding: 15px var(--spacing-lg, 30px);
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 0;
    min-height: var(--touch-target-min, 44px);
  }

  .nav-toggle {
    display: flex;
    padding: var(--spacing-sm, 12px);
    min-width: var(--touch-target-min, 44px);
    min-height: var(--touch-target-min, 44px);
  }
}
</style>