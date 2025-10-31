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
.final-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.final-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotateBackground 30s linear infinite;
}

@keyframes rotateBackground {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.final-question {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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

.jar {
  width: 320px;
  height: 420px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.25) 100%);
  backdrop-filter: blur(20px);
  border: 6px solid rgba(255, 255, 255, 0.4);
  border-radius: 25px 25px 50px 50px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  padding: 25px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    inset 0 0 30px rgba(255, 255, 255, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  transition: all 0.3s ease;
}

.jar::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 35px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.3) 100%);
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.jar-mouth-glow {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glowPulse {

  0%,
  100% {
    opacity: 0.5;
    transform: translateX(-50%) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.2);
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

.jar.full {
  animation: jarCelebrate 1s ease-in-out infinite;
  border-color: rgba(255, 215, 0, 0.8);
}

@keyframes jarCelebrate {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
    box-shadow: 0 20px 60px rgba(255, 215, 0, 0.5);
  }

  25% {
    transform: scale(1.02) rotate(-2deg);
    box-shadow: 0 25px 80px rgba(255, 215, 0, 0.8);
  }

  75% {
    transform: scale(1.02) rotate(2deg);
    box-shadow: 0 25px 80px rgba(255, 215, 0, 0.8);
  }
}

.jar-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star-decoration,
.heart-decoration,
.sparkle-decoration {
  position: absolute;
  font-size: 2rem;
  animation: floatDecoration 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
}

.star-decoration {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.heart-decoration {
  top: 40%;
  right: 10%;
  animation-delay: 1s;
}

.sparkle-decoration {
  bottom: 20%;
  left: 15%;
  animation-delay: 2s;
}

@keyframes floatDecoration {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-15px) rotate(10deg);
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
  gap: 12px;
  justify-content: center;
  align-content: flex-end;
  position: relative;
  z-index: 5;
}

.candy {
  font-size: 2rem;
  animation: candyPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.candy:hover {
  transform: scale(1.2) rotate(10deg);
  filter: drop-shadow(0 6px 12px rgba(255, 215, 0, 0.8));
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

.celebration-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(45deg, #ffd700, #ff69b4, #00bfff, #7cfc00);
  top: 0;
  left: 50%;
  animation: confettiFall 3s ease-out infinite;
  opacity: 0;
}

.confetti:nth-child(odd) {
  background: #ffd700;
}

.confetti:nth-child(even) {
  background: #ff69b4;
}

.confetti:nth-child(3n) {
  background: #00bfff;
}

@keyframes confettiFall {
  0% {
    top: -20px;
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }

  100% {
    top: 100%;
    opacity: 0;
    transform: translateX(calc(-50vw + var(--x, 0) * 100vw)) rotate(720deg);
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

.jar-label {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 25px;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
}

.label-icon {
  font-size: 1.8rem;
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.jar-counter {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.add-candy-btn {
  padding: 22px 55px;
  font-size: 1.35rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #2c3e50;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 800;
  box-shadow:
    0 15px 35px rgba(255, 215, 0, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
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
  font-size: 1.6rem;
  animation: iconRotate 3s linear infinite;
}

@keyframes iconRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-sparkle {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8), transparent 70%);
  background-size: 200% 200%;
  animation: sparkleMove 3s linear infinite;
  border-radius: 50px;
  opacity: 0.6;
  pointer-events: none;
}

@keyframes sparkleMove {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.add-candy-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 20px 45px rgba(255, 215, 0, 0.6),
    0 0 0 4px rgba(255, 255, 255, 0.5),
    inset 0 0 30px rgba(255, 255, 255, 0.7);
}

.add-candy-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.add-candy-btn:disabled {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  cursor: not-allowed;
  opacity: 0.7;
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

.final-message {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s;
  line-height: 1.8;
  max-width: 800px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.final-message.show {
  opacity: 1;
}

.jar-full-msg {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow:
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.6),
    0 2px 10px rgba(0, 0, 0, 0.3);
  animation: jarFullGlow 2s ease-in-out infinite;
}

@keyframes jarFullGlow {

  0%,
  100% {
    text-shadow:
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 40px rgba(255, 215, 0, 0.6),
      0 2px 10px rgba(0, 0, 0, 0.3);
  }

  50% {
    text-shadow:
      0 0 30px rgba(255, 215, 0, 1),
      0 0 60px rgba(255, 215, 0, 0.8),
      0 0 80px rgba(255, 215, 0, 0.6),
      0 2px 10px rgba(0, 0, 0, 0.3);
  }
}

.screen-off {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
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

.tv-off-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  background: #fff;
  opacity: 0;
}

.screen-off.active .tv-off-bar {
  animation: tvOff 1.2s ease forwards;
}

@keyframes tvOff {
  0% {
    height: 100%;
    opacity: 0;
  }

  30% {
    height: 6px;
    opacity: 1;
  }

  60% {
    height: 2px;
    opacity: 0.8;
  }

  100% {
    height: 0;
    opacity: 0;
  }
}

.phone-shutdown {
  opacity: 0;
  transition: opacity 1s ease-in-out 1s;
}

.screen-off.active .phone-shutdown {
  opacity: 1;
  animation: phoneShutdown 2s ease-in-out 1s forwards;
}

.shutdown-text {
  font-size: 4rem;
  filter: brightness(0.5);
}

@keyframes phoneShutdown {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

.restart-btn {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
}

@media (max-width: 768px) {
  .final-question {
    font-size: 1.5rem;
  }

  .jar {
    width: 280px;
    height: 380px;
    padding: 20px;
  }

  .add-candy-btn {
    padding: 18px 40px;
    font-size: 1.15rem;
  }

  .final-message {
    font-size: 1.2rem;
  }

  .jar-label {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .jar {
    width: 240px;
    height: 340px;
  }

  .candy {
    font-size: 1.5rem;
  }

  .add-candy-btn {
    padding: 15px 30px;
    font-size: 1rem;
  }
}
</style>