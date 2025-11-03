<template>
  <div>
    <section class="section final-section fullscreen">
      <h2 class="final-question">如果这些"工作"时间被归还给孩子，他们本可以拥有多少自由玩耍的时光？</h2>
      <div class="savings-jar">
        <div class="jar-container">
          <div class="jar" :class="{ pulse: jarPulse, full: candyCount >= 20 }">
            <!-- 瓶口光效 -->
            <div class="jar-mouth-glow"></div>

            <!-- 瓶身装饰 -->
            <div class="jar-decorations">
              <div class="star-decoration">⭐</div>
              <div class="heart-decoration">💝</div>
              <div class="sparkle-decoration">✨</div>
            </div>

            <!-- 下落中的糖果 -->
            <div class="falling-candies">
              <span v-for="(candy, index) in fallingCandies" :key="`falling-${index}`" class="falling-candy" :style="{
                left: candy.x + '%',
                top: candy.y + '%',
                fontSize: candy.size + 'rem',
                animationDelay: candy.delay + 's',
                transform: `rotate(${candy.rotation}deg)`
              }">
                {{ candy.emoji }}
              </span>
            </div>

            <!-- 已经掉落的糖果 -->
            <div class="candies">
              <span v-for="n in candyCount" :key="n" class="candy" :style="{
                animationDelay: (n * 0.1) + 's'
              }">
                {{ getCandyEmoji(n) }}
              </span>
            </div>

            <!-- 满瓶庆祝效果 -->
            <div v-if="candyCount >= 20" class="celebration-effect">
              <div class="confetti" v-for="i in 30" :key="i"></div>
            </div>
          </div>
          <p class="jar-label">
            <span class="label-icon">🎈</span>
            童年时光储蓄罐
            <span class="label-icon">🎈</span>
          </p>
          <div class="jar-counter">{{ candyCount }} / 20</div>
        </div>

        <button class="add-candy-btn" @click="addCandy" :disabled="candyCount >= 20">
          <span class="btn-icon">🎁</span>
          <span class="btn-text">{{ candyCount >= 20 ? '储蓄罐已满' : '为孩子存入自由与快乐' }}</span>
          <span class="btn-sparkle"></span>
        </button>
      </div>
      <p class="final-message" :class="{ show: candyCount >= 5 }">
        <span v-if="candyCount < 20">守护童心，请为孩子的童年时光存入自由与快乐，而非流量与数据。</span>
        <span v-else class="jar-full-msg">
          🎉 储蓄罐已满！让我们一起守护每一个孩子的童年时光。🎉
        </span>
      </p>
    </section>

    <div class="screen-off" :class="{ active: screenOff }">
      <div class="tv-off-bar"></div>
      <div class="phone-shutdown">
        <div class="shutdown-text">📱</div>
      </div>
      <button class="backtop restart-btn" @click="restart">再看一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const candyCount = ref(0)
const jarPulse = ref(false)
const screenOff = ref(false)
const allowScreenOff = ref(false)
const fallingCandies = ref([])

const candyEmojis = ['🍭', '🍬', '🍡', '🧁', '🍰', '🎂', '🍪', '🍩', '🎀', '🌟']

const getCandyEmoji = (index) => {
  return candyEmojis[index % candyEmojis.length]
}

const addCandy = () => {
  if (candyCount.value < 20) {
    // 创建掉落糖果
    const newCandy = {
      x: 35 + Math.random() * 30, // 从瓶口位置开始（35-65%）
      y: -10, // 从瓶口上方开始
      size: 1.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      delay: 0,
      emoji: candyEmojis[candyCount.value % candyEmojis.length]
    }

    fallingCandies.value.push(newCandy)

    // 0.8秒后（动画结束）增加计数并移除掉落的糖果
    setTimeout(() => {
      candyCount.value++
      fallingCandies.value.shift()
      jarPulse.value = true
      setTimeout(() => { jarPulse.value = false }, 600)
      allowScreenOff.value = true
    }, 800)

    const btn = document.querySelector('.add-candy-btn')
    if (btn) {
      btn.style.transform = 'scale(0.95)'
      setTimeout(() => { btn.style.transform = 'scale(1)' }, 100)
    }
  } else {
    jarPulse.value = true
    setTimeout(() => { jarPulse.value = false }, 300)
    const btn = document.querySelector('.add-candy-btn')
    if (btn) {
      btn.style.animation = 'shake 0.5s'
      setTimeout(() => { btn.style.animation = '' }, 500)
    }
  }
}

const restart = () => {
  screenOff.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onScroll = () => {
  const atBottom = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 2)
  if (atBottom && allowScreenOff.value && !screenOff.value) {
    setTimeout(() => { screenOff.value = true }, 300)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* 结尾主区域 */
.final-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: finalGradientShift 15s ease-in-out infinite;
  color: white;
  position: relative;
  overflow: hidden;
}

@keyframes finalGradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* 旋转背景光晕 */
.final-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(240, 147, 251, 0.1) 30%,
      transparent 70%);
  animation: rotateBackground 30s linear infinite;
}

/* 浮动光球装饰 */
.final-section::after {
  content: '';
  position: absolute;
  top: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: floatOrb 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes rotateBackground {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes floatOrb {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }

  33% {
    transform: translate(-100px, 100px) scale(1.2);
    opacity: 0.8;
  }

  66% {
    transform: translate(100px, -50px) scale(0.9);
    opacity: 0.7;
  }
}

/* 问题标题 */
.final-question {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  text-align: center;
  margin-bottom: clamp(40px, 8vh, 60px);
  line-height: 1.8;
  position: relative;
  z-index: 1;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 255, 255, 0.2);
  padding: 0 20px;
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 700;
  animation: questionFadeIn 1.5s ease-out;
}

@keyframes questionFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.savings-jar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
}

.jar-container {
  position: relative;
}

/* 储蓄罐主体 */
.jar {
  width: min(320px, 85vw);
  height: min(420px, 60vh);
  max-width: 400px;
  max-height: 500px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.28) 100%);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 6px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px 25px 50px 50px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  padding: 25px;
  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.4),
    inset 0 0 40px rgba(255, 255, 255, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 0 60px rgba(240, 147, 251, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin: 0 auto;
  animation: jarEntrance 1s ease-out;
}

@keyframes jarEntrance {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 瓶口 */
.jar::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 35px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 100%);
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 215, 0, 0.4);
}

/* 瓶口光效 */
.jar-mouth-glow {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle,
      rgba(255, 215, 0, 0.5) 0%,
      rgba(255, 215, 0, 0.3) 30%,
      rgba(240, 147, 251, 0.2) 60%,
      transparent 80%);
  border-radius: 50%;
  animation: glowPulse 2.5s ease-in-out infinite;
  pointer-events: none;
  filter: blur(8px);
}

@keyframes glowPulse {

  0%,
  100% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.3);
  }
}

.jar.pulse {
  animation: jarPulseEffect 0.6s ease;
}

@keyframes jarPulseEffect {
  0% {
    transform: scale(1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 25px 80px rgba(255, 215, 0, 0.6);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
}

/* 瓶满状态 */
.jar.full {
  animation: jarCelebrate 1.5s ease-in-out infinite;
  border-color: rgba(255, 215, 0, 0.9);
}

@keyframes jarCelebrate {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
    box-shadow:
      0 25px 70px rgba(255, 215, 0, 0.6),
      0 0 80px rgba(255, 215, 0, 0.4),
      inset 0 0 40px rgba(255, 255, 255, 0.25);
  }

  15% {
    transform: scale(1.03) rotate(-3deg);
    box-shadow:
      0 30px 90px rgba(255, 215, 0, 0.9),
      0 0 100px rgba(255, 215, 0, 0.6),
      inset 0 0 50px rgba(255, 255, 255, 0.3);
  }

  30% {
    transform: scale(1.02) rotate(0deg);
  }

  45% {
    transform: scale(1.03) rotate(3deg);
    box-shadow:
      0 30px 90px rgba(255, 215, 0, 0.9),
      0 0 100px rgba(255, 215, 0, 0.6),
      inset 0 0 50px rgba(255, 255, 255, 0.3);
  }

  60% {
    transform: scale(1.02) rotate(0deg);
  }

  75% {
    transform: scale(1.03) rotate(-2deg);
  }
}

.jar-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* 装饰元素 */
.star-decoration,
.heart-decoration,
.sparkle-decoration {
  position: absolute;
  font-size: 2.2rem;
  animation: floatDecoration 4s ease-in-out infinite;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
  transition: all 0.3s ease;
}

.star-decoration {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.heart-decoration {
  top: 40%;
  right: 10%;
  animation-delay: 1.3s;
}

.sparkle-decoration {
  bottom: 20%;
  left: 15%;
  animation-delay: 2.6s;
}

@keyframes floatDecoration {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }

  25% {
    transform: translateY(-15px) rotate(-8deg) scale(1.1);
    opacity: 1;
  }

  50% {
    transform: translateY(-5px) rotate(0deg) scale(1.05);
    opacity: 0.9;
  }

  75% {
    transform: translateY(-15px) rotate(8deg) scale(1.1);
    opacity: 1;
  }
}

.falling-candies {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.falling-candy {
  position: absolute;
  animation: candyFall 0.8s cubic-bezier(0.4, 0, 0.6, 1) forwards;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
}

@keyframes candyFall {
  0% {
    top: -10%;
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1.5);
  }

  10% {
    opacity: 1;
  }

  50% {
    transform: translateY(200px) rotate(180deg) scale(1.2);
  }

  80% {
    transform: translateY(350px) rotate(300deg) scale(1);
  }

  100% {
    top: 85%;
    opacity: 0;
    transform: translateY(400px) rotate(360deg) scale(0.8);
  }
}

.candies {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 2vw, 12px);
  justify-content: center;
  align-content: flex-end;
  position: relative;
  z-index: 5;
  padding: 5px;
}

/* 糖果元素 */
.candy {
  font-size: clamp(1.5rem, 4vw, 2rem);
  animation: candyPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  cursor: pointer;
}

.candy:hover {
  transform: scale(1.3) rotate(15deg);
  filter: drop-shadow(0 8px 16px rgba(255, 215, 0, 0.9));
  animation: candyJiggle 0.5s ease-in-out infinite;
}

@keyframes candyJiggle {

  0%,
  100% {
    transform: scale(1.3) rotate(12deg);
  }

  50% {
    transform: scale(1.35) rotate(18deg);
  }
}

@keyframes candyPopIn {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }

  70% {
    transform: scale(1.2) rotate(20deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* 庆祝效果 */
.celebration-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 20;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #ffd700, #ff69b4, #00bfff, #7cfc00);
  top: 0;
  left: 50%;
  animation: confettiFall 3s ease-out infinite;
  opacity: 0;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

.confetti:nth-child(odd) {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
}

.confetti:nth-child(even) {
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
}

.confetti:nth-child(3n) {
  background: linear-gradient(135deg, #00bfff 0%, #1e90ff 100%);
}

.confetti:nth-child(4n) {
  background: linear-gradient(135deg, #7cfc00 0%, #32cd32 100%);
}

.confetti:nth-child(5n) {
  background: linear-gradient(135deg, #f093fb 0%, #764ba2 100%);
}

@keyframes confettiFall {
  0% {
    top: -20px;
    opacity: 1;
    transform: translateX(0) rotate(0deg) scale(1);
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 0.7;
  }

  100% {
    top: 100%;
    opacity: 0;
    transform: translateX(calc(-50vw + var(--x, 0) * 100vw)) rotate(1080deg) scale(0.5);
  }
}

.confetti:nth-child(1) {
  animation-delay: 0s;
  --x: 0.1;
}

.confetti:nth-child(2) {
  animation-delay: 0.1s;
  --x: 0.2;
}

.confetti:nth-child(3) {
  animation-delay: 0.2s;
  --x: 0.3;
}

.confetti:nth-child(4) {
  animation-delay: 0.3s;
  --x: 0.4;
}

.confetti:nth-child(5) {
  animation-delay: 0.4s;
  --x: 0.5;
}

.confetti:nth-child(6) {
  animation-delay: 0.5s;
  --x: 0.6;
}

.confetti:nth-child(7) {
  animation-delay: 0.6s;
  --x: 0.7;
}

.confetti:nth-child(8) {
  animation-delay: 0.7s;
  --x: 0.8;
}

.confetti:nth-child(9) {
  animation-delay: 0.8s;
  --x: 0.9;
}

.confetti:nth-child(10) {
  animation-delay: 0.9s;
  --x: 0.15;
}

.confetti:nth-child(11) {
  animation-delay: 1s;
  --x: 0.25;
}

.confetti:nth-child(12) {
  animation-delay: 1.1s;
  --x: 0.35;
}

.confetti:nth-child(13) {
  animation-delay: 1.2s;
  --x: 0.45;
}

.confetti:nth-child(14) {
  animation-delay: 1.3s;
  --x: 0.55;
}

.confetti:nth-child(15) {
  animation-delay: 1.4s;
  --x: 0.65;
}

.confetti:nth-child(16) {
  animation-delay: 1.5s;
  --x: 0.75;
}

.confetti:nth-child(17) {
  animation-delay: 1.6s;
  --x: 0.85;
}

.confetti:nth-child(18) {
  animation-delay: 1.7s;
  --x: 0.95;
}

.confetti:nth-child(19) {
  animation-delay: 1.8s;
  --x: 0.12;
}

.confetti:nth-child(20) {
  animation-delay: 1.9s;
  --x: 0.22;
}

.confetti:nth-child(21) {
  animation-delay: 2s;
  --x: 0.32;
}

.confetti:nth-child(22) {
  animation-delay: 2.1s;
  --x: 0.42;
}

.confetti:nth-child(23) {
  animation-delay: 2.2s;
  --x: 0.52;
}

.confetti:nth-child(24) {
  animation-delay: 2.3s;
  --x: 0.62;
}

.confetti:nth-child(25) {
  animation-delay: 2.4s;
  --x: 0.72;
}

.confetti:nth-child(26) {
  animation-delay: 2.5s;
  --x: 0.82;
}

.confetti:nth-child(27) {
  animation-delay: 2.6s;
  --x: 0.92;
}

.confetti:nth-child(28) {
  animation-delay: 2.7s;
  --x: 0.18;
}

.confetti:nth-child(29) {
  animation-delay: 2.8s;
  --x: 0.28;
}

.confetti:nth-child(30) {
  animation-delay: 2.9s;
  --x: 0.38;
}

/* 标签 */
.jar-label {
  text-align: center;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  margin-top: clamp(15px, 3vh, 25px);
  font-weight: 800;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 12px);
  padding: 0 10px;
  animation: labelFadeIn 1s ease-out 0.3s backwards;
}

@keyframes labelFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.label-icon {
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  animation: iconBounce 2.5s ease-in-out infinite;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
}

@keyframes iconBounce {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-12px) rotate(-5deg);
  }

  75% {
    transform: translateY(-12px) rotate(5deg);
  }
}

/* 计数器 */
.jar-counter {
  text-align: center;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 800;
  margin-top: clamp(8px, 2vh, 12px);
  padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  border-radius: 25px;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  letter-spacing: 2px;
  animation: counterFadeIn 1s ease-out 0.4s backwards;
}

@keyframes counterFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 添加按钮 */
.add-candy-btn {
  padding: clamp(18px, 3vw, 24px) clamp(40px, 7vw, 60px);
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
  background-size: 200% auto;
  color: #2c3e50;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 800;
  box-shadow:
    0 15px 40px rgba(255, 215, 0, 0.5),
    0 0 0 4px rgba(255, 255, 255, 0.4),
    inset 0 0 25px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 215, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, 12px);
  max-width: 90vw;
  text-align: center;
  white-space: nowrap;
  animation: btnEntrance 1.2s ease-out 0.5s backwards;
}

@keyframes btnEntrance {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.add-candy-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.add-candy-btn:active::before {
  width: 400px;
  height: 400px;
}

.btn-icon {
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  animation: iconFloat 2.5s ease-in-out infinite;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes iconFloat {

  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }

  25% {
    transform: translateY(-5px) rotate(-10deg) scale(1.1);
  }

  50% {
    transform: translateY(0) rotate(0deg) scale(1);
  }

  75% {
    transform: translateY(-5px) rotate(10deg) scale(1.1);
  }
}

.btn-text {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.btn-sparkle {
  position: absolute;
  inset: -3px;
  background: linear-gradient(90deg,
      transparent 20%,
      rgba(255, 255, 255, 0.9) 50%,
      transparent 80%);
  background-size: 200% 100%;
  animation: sparkleMove 3s ease-in-out infinite;
  border-radius: 50px;
  opacity: 0.7;
  pointer-events: none;
  filter: blur(2px);
}

@keyframes sparkleMove {
  0% {
    background-position: 200% center;
    opacity: 0.5;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    background-position: -200% center;
    opacity: 0.5;
  }
}

.add-candy-btn:hover {
  transform: translateY(-5px) scale(1.08);
  background-position: 100% center;
  box-shadow:
    0 20px 50px rgba(255, 215, 0, 0.7),
    0 0 0 5px rgba(255, 255, 255, 0.6),
    inset 0 0 35px rgba(255, 255, 255, 0.8),
    0 0 80px rgba(255, 215, 0, 0.5);
}

.add-candy-btn:hover .btn-icon {
  transform: scale(1.3) rotate(20deg);
}

.add-candy-btn:active {
  transform: translateY(-2px) scale(1.03);
}

.add-candy-btn:disabled {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  cursor: not-allowed;
  opacity: 0.7;
  animation: none;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 3px rgba(255, 255, 255, 0.2);
}

.add-candy-btn:disabled:hover {
  transform: none;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  75% {
    transform: translateX(10px);
  }
}

/* 最终信息 */
.final-message {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  text-align: center;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
  line-height: 1.9;
  max-width: 850px;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.3);
  transform: translateY(20px);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.final-message.show {
  opacity: 1;
  transform: translateY(0);
}

.jar-full-msg {
  display: block;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 900;
  color: #ffd700;
  text-shadow:
    0 0 25px rgba(255, 215, 0, 0.9),
    0 0 50px rgba(255, 215, 0, 0.7),
    0 0 80px rgba(255, 215, 0, 0.5),
    0 2px 10px rgba(0, 0, 0, 0.3);
  animation: jarFullGlow 2s ease-in-out infinite;
  letter-spacing: 1px;
  line-height: 1.6;
}

@keyframes jarFullGlow {

  0%,
  100% {
    text-shadow:
      0 0 25px rgba(255, 215, 0, 0.9),
      0 0 50px rgba(255, 215, 0, 0.7),
      0 0 80px rgba(255, 215, 0, 0.5),
      0 2px 10px rgba(0, 0, 0, 0.3);
    transform: scale(1);
  }

  50% {
    text-shadow:
      0 0 35px rgba(255, 215, 0, 1),
      0 0 70px rgba(255, 215, 0, 0.9),
      0 0 100px rgba(255, 215, 0, 0.7),
      0 0 130px rgba(255, 215, 0, 0.5),
      0 2px 10px rgba(0, 0, 0, 0.3);
    transform: scale(1.02);
  }
}

/* 屏幕关闭效果 */
.screen-off {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #1a1a1a 0%, #000000 100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 3s ease-in-out;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-off.active {
  opacity: 1;
  pointer-events: all;
}

/* 电视关闭条 */
.tv-off-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.5) 20%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.5) 80%,
      transparent 100%);
  opacity: 0;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
}

.screen-off.active .tv-off-bar {
  animation: tvOff 1.5s ease forwards;
}

@keyframes tvOff {
  0% {
    height: 100%;
    opacity: 0;
  }

  20% {
    height: 50%;
    opacity: 0.3;
  }

  35% {
    height: 8px;
    opacity: 1;
    box-shadow: 0 0 50px rgba(255, 255, 255, 1);
  }

  60% {
    height: 3px;
    opacity: 0.9;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  }

  80% {
    height: 1px;
    opacity: 0.5;
  }

  100% {
    height: 0;
    opacity: 0;
  }
}

/* 手机关机效果 */
.phone-shutdown {
  opacity: 0;
  transition: opacity 1s ease-in-out 1.2s;
  position: relative;
}

.screen-off.active .phone-shutdown {
  opacity: 1;
  animation: phoneShutdown 2.5s ease-in-out 1.2s forwards;
}

.shutdown-text {
  font-size: 5rem;
  filter: brightness(0.5) drop-shadow(0 0 30px rgba(255, 255, 255, 0.3));
  position: relative;
}

@keyframes phoneShutdown {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: brightness(0.5) blur(0px);
  }

  20% {
    opacity: 0.8;
    transform: scale(1.15);
    filter: brightness(0.7) blur(0px);
  }

  40% {
    opacity: 0.6;
    transform: scale(1.3);
    filter: brightness(0.4) blur(2px);
  }

  60% {
    opacity: 0.4;
    transform: scale(1.1);
    filter: brightness(0.2) blur(5px);
  }

  80% {
    opacity: 0.2;
    transform: scale(0.5);
    filter: brightness(0.1) blur(10px);
  }

  100% {
    opacity: 0;
    transform: scale(0);
    filter: brightness(0) blur(15px);
  }
}

/* 重启按钮 */
.restart-btn {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 16px 40px;
  border-radius: 50px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border: 2px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 10px 30px rgba(102, 126, 234, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  letter-spacing: 1px;
}

.restart-btn:hover {
  transform: translateX(-50%) translateY(-5px) scale(1.1);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow:
    0 15px 40px rgba(102, 126, 234, 0.5),
    0 0 60px rgba(102, 126, 234, 0.4),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
}

/* 平板响应式 */
@media (max-width: 768px) {
  .final-question {
    font-size: clamp(1.4rem, 4vw, 1.8rem);
    margin-bottom: 50px;
  }

  .jar {
    padding: 20px;
    max-width: 350px;
  }

  .final-message {
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    padding: 0 20px;
    margin-top: 50px;
  }

  .jar-label {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
  }

  .jar-counter {
    font-size: 1.1rem;
  }

  .jar-container {
    transform: scale(0.95);
  }

  .add-candy-btn {
    padding: 18px 40px;
    font-size: 1.2rem;
  }

  .star-decoration,
  .heart-decoration,
  .sparkle-decoration {
    font-size: 1.8rem;
  }

  .restart-btn {
    padding: 14px 35px;
    font-size: 1rem;
  }
}

/* 手机响应式 */
@media (max-width: 480px) {
  .final-question {
    font-size: clamp(1.2rem, 4.5vw, 1.5rem);
    margin-bottom: 40px;
    padding: 0 15px;
  }

  .jar {
    padding: 15px;
    max-width: 280px;
  }

  .jar::before {
    width: 120px;
    height: 30px;
  }

  .jar-container {
    transform: scale(0.9);
  }

  .jar-mouth-glow {
    width: 100px;
    height: 100px;
  }

  .btn-text {
    font-size: 0.95em;
  }

  .add-candy-btn {
    padding: 16px 30px;
    gap: 8px;
  }

  .final-section {
    padding: 40px 15px;
  }

  .final-message {
    padding: 0 15px;
    margin-top: 40px;
  }

  .star-decoration,
  .heart-decoration,
  .sparkle-decoration {
    font-size: 1.5rem;
  }

  .candy {
    font-size: clamp(1.3rem, 5vw, 1.8rem);
  }

  .confetti {
    width: 8px;
    height: 8px;
  }

  .restart-btn {
    padding: 12px 28px;
    font-size: 0.95rem;
    bottom: 10vh;
  }

  .shutdown-text {
    font-size: 3.5rem;
  }
}

@media (min-width: 1400px) {
  .jar {
    width: min(380px, 85vw);
    height: min(480px, 60vh);
  }

  .candy {
    font-size: 2.2rem;
  }
}
</style>