<template>
  <div>
    <section class="section final-section fullscreen">
      <h2 class="final-question">如果这些"工作"时间被归还给孩子，他们本可以拥有多少自由玩耍的时光？</h2>
      <div class="savings-jar">
        <div class="jar-container">
          <div class="jar" :class="{ pulse: jarPulse }">
            <div class="candies"><span v-for="n in candyCount" :key="n" class="candy">🍭</span></div>
          </div>
          <p class="jar-label">童年时光储蓄罐</p>
        </div>
        <button class="add-candy-btn" @click="addCandy">为孩子存入自由与快乐</button>
      </div>
      <p class="final-message" :class="{ show: candyCount >= 5 }">
        <span v-if="candyCount < 20">守护童心，请为孩子的童年时光存入自由与快乐，而非流量与数据。</span>
        <span v-else class="jar-full-msg">🎉 储蓄罐已满！让我们一起守护每一个孩子的童年时光。</span>
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

const addCandy = () => {
  if (candyCount.value < 20) {
    candyCount.value++
    jarPulse.value = true
    setTimeout(() => { jarPulse.value = false }, 600)
    allowScreenOff.value = true
    const btn = document.querySelector('.add-candy-btn')
    if (btn) { btn.style.transform = 'scale(0.95)'; setTimeout(() => { btn.style.transform = 'scale(1)' }, 100) }
  } else {
    jarPulse.value = true
    setTimeout(() => { jarPulse.value = false }, 300)
    const btn = document.querySelector('.add-candy-btn')
    if (btn) { btn.style.animation = 'shake 0.5s'; setTimeout(() => { btn.style.animation = '' }, 500) }
  }
}

const restart = () => {
  screenOff.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onScroll = () => {
  const atBottom = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 2)
  if (atBottom && allowScreenOff.value && !screenOff.value) { setTimeout(() => { screenOff.value = true }, 300) }
}

onMounted(() => { window.addEventListener('scroll', onScroll) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll) })
</script>

<style scoped>
.final-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.final-question {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.6;
}

.savings-jar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.jar {
  width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px 20px 40px 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
}

.jar.pulse {
  box-shadow: 0 0 0 0 rgba(255, 255, 255, .6);
  animation: jarPulse 0.6s ease;
}

@keyframes jarPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, .6)
  }

  100% {
    box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0)
  }
}

.jar::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.candies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-content: flex-end;
}

.candy {
  font-size: 2rem;
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }

  to {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

.jar-label {
  text-align: center;
  font-size: 1.3rem;
  margin-top: 20px;
  font-weight: bold;
}

.add-candy-btn {
  padding: 20px 50px;
  font-size: 1.3rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.add-candy-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.add-candy-btn:active::before {
  width: 300px;
  height: 300px;
}

.add-candy-btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.add-candy-btn:active {
  transform: scale(0.98);
}

.final-message {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s;
  line-height: 1.8;
}

.final-message.show {
  opacity: 1;
}

.jar-full-msg {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  animation: jarFullGlow 2s ease-in-out infinite;
}

@keyframes jarFullGlow {

  0%,
  100% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }

  50% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.6);
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
    opacity: 0
  }

  30% {
    height: 6px;
    opacity: 1
  }

  60% {
    height: 2px;
    opacity: .8
  }

  100% {
    height: 0;
    opacity: 0
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
    width: 250px;
    height: 350px;
  }

  .add-candy-btn {
    padding: 15px 35px;
    font-size: 1.1rem;
  }

  .final-message {
    font-size: 1.2rem;
  }
}
</style>