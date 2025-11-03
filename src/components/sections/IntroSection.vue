<template>
  <section id="intro" class="section intro-section">
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <!-- 装饰性渐变背景 -->
    <div class="gradient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <!-- 第一个问题 -->
    <div class="question-container" ref="question1">
      <div class="question-wrapper">
        <h1 class="main-title question-text" data-parallax="0.3">
          <span class="question-icon">📱</span>
          你每天有多少时间在和小小的手机屏幕接触？
        </h1>
        <p class="question-hint animate-float">选择你的使用时长，了解全国数据</p>
      </div>

      <!-- 时间选项 -->
      <div class="time-options">
        <div class="time-option" v-for="(option, index) in timeOptions" :key="option"
          :class="{ selected: selectedTime === option }" @click="selectTime(option)"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <span class="option-icon">⏰</span>
          <span class="option-text">{{ option }}</span>
          <div class="option-glow"></div>
        </div>
      </div>

      <!-- 图表容器：选择后显示，横向排列 -->
      <transition name="slide-down">
        <div v-if="showCharts" class="charts-row">
          <div class="chart-wrapper">
            <div class="chart-container half animated-chart" ref="chart1" data-parallax="0.15"></div>
            <div class="chart-badge">趋势分析</div>
          </div>
          <div class="chart-wrapper">
            <div class="chart-container half animated-chart" ref="chartPhoneUsers" data-parallax="0.15"></div>
            <div class="chart-badge">占比数据</div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const chart1 = ref(null)
const chartPhoneUsers = ref(null)
const particleCanvas = ref(null)
const question1 = ref(null)
const question2 = ref(null)
let particleAnimId = null
const cleanupFns = []

// 时间选项和状态
const timeOptions = ['1h-3h', '3h-5h', '5h-7h', '7h-9h', '9h以上']
const selectedTime = ref(null)
const showCharts = ref(false)

const selectTime = (option) => {
  selectedTime.value = option
  showCharts.value = true

  // 等待DOM更新后初始化图表
  nextTick(() => {
    initCharts()
  })
}

const initCharts = () => {
  // 响应式配置
  const isMobile = window.innerWidth <= 480
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480

  // chart1: 每日平均互联网使用时间
  if (chart1.value && !echarts.getInstanceByDom(chart1.value)) {
    const myChart1 = echarts.init(chart1.value)
    const titleFontSize = isMobile ? 14 : isTablet ? 16 : 18
    const axisLabelFontSize = isMobile ? 10 : isTablet ? 11 : 12
    const labelFontSize = isMobile ? 10 : isTablet ? 11 : 12
    const sourceFontSize = isMobile ? 9 : isTablet ? 10 : 11
    const gridBottom = isMobile ? '18%' : isTablet ? '16%' : '15%'

    myChart1.setOption({
      title: {
        text: '中国居民每日平均互联网使用时间',
        left: 'center',
        textStyle: { fontSize: titleFontSize, fontWeight: 'bold', color: '#2c3e50' },
        top: isMobile ? 10 : 20
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        borderColor: '#333',
        borderWidth: 1,
        textStyle: { color: '#fff', fontSize: isMobile ? 11 : 12 },
        formatter: '{b}<br/>使用时长: {c}小时'
      },
      grid: {
        left: isMobile ? '8%' : '3%',
        right: isMobile ? '8%' : '4%',
        bottom: gridBottom,
        top: isMobile ? '25%' : '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
        axisLabel: { fontSize: axisLabelFontSize, color: '#666', rotate: isMobile ? 0 : 0 },
        axisLine: { lineStyle: { color: '#ddd' } }
      },
      yAxis: {
        type: 'value',
        name: '小时',
        nameTextStyle: { color: '#666', fontSize: axisLabelFontSize },
        axisLabel: { formatter: '{value}h', color: '#666', fontSize: axisLabelFontSize },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      series: [{
        data: [4.4, 4.07, 4.21, 5.33, 6.05],
        type: 'bar',
        barWidth: isMobile ? '50%' : '45%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#83bff6' }, { offset: 1, color: '#188df0' }]),
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}h',
          color: '#188df0',
          fontWeight: 'bold',
          fontSize: labelFontSize
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#a0d1f7' }, { offset: 1, color: '#3fa3f5' }])
          }
        }
      }],
      graphic: [{
        type: 'text',
        left: 'center',
        bottom: 5,
        z: 100,
        style: {
          text: '数据来源：国家统计局、中国互联网络信息中心（CNNIC）',
          textAlign: 'center',
          fill: '#999',
          fontSize: sourceFontSize,
          fontStyle: 'italic'
        }
      }],
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    })

    // 响应式调整
    window.addEventListener('resize', () => {
      myChart1.resize()
    })
  }

  // 手机网民占比
  if (chartPhoneUsers.value && !echarts.getInstanceByDom(chartPhoneUsers.value)) {
    const myChartPhone = echarts.init(chartPhoneUsers.value)
    const w = chartPhoneUsers.value.clientWidth || 450
    const isNarrow = w < 520 || isMobile
    const percentFont = isMobile ? 18 : isTablet ? 22 : isNarrow ? 22 : 30
    const centerSubSize = isMobile ? 10 : isTablet ? 11 : isNarrow ? 11 : 12
    const labelFont = isMobile ? 0 : isTablet ? 0 : isNarrow ? 0 : 14
    const radiusInner = isMobile ? '44%' : isTablet ? '46%' : isNarrow ? '46%' : '50%'
    const radiusOuter = isMobile ? '64%' : isTablet ? '66%' : isNarrow ? '66%' : '72%'
    const titleFontSize = isMobile ? 14 : isTablet ? 15 : 16
    const subtextFontSize = isMobile ? 10 : isTablet ? 10 : 11
    const sourceFontSize = isMobile ? 9 : isTablet ? 10 : 11
    const legendBottom = isMobile ? 30 : isTablet ? 32 : 35

    myChartPhone.setOption({
      title: {
        text: '截至2025年6月手机网民占比情况',
        subtext: '网民11.23亿 | 手机网民11.16亿 | 占99.4%',
        left: 'center',
        textStyle: { fontSize: titleFontSize, fontWeight: 'bold' },
        subtextStyle: { fontSize: subtextFontSize, color: '#666' },
        top: isMobile ? 8 : 15
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}亿人 ({d}%)',
        textStyle: { fontSize: isMobile ? 11 : 12 }
      },
      legend: {
        bottom: legendBottom,
        left: 'center',
        textStyle: { fontSize: isMobile ? 10 : isTablet ? 11 : 12 }
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '99.4%',
            fontSize: percentFont,
            fontWeight: 800,
            fill: '#2c3e50'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '56%',
          style: {
            text: '手机网民占比',
            fontSize: centerSubSize,
            fill: '#666'
          }
        },
        {
          type: 'text',
          left: 'center',
          bottom: 5,
          z: 100,
          style: {
            text: '数据来源：中国互联网络信息中心（CNNIC）、QuestMobile',
            textAlign: 'center',
            fill: '#999',
            fontSize: sourceFontSize,
            fontStyle: 'italic'
          }
        }
      ],
      series: [{
        type: 'pie',
        radius: [radiusInner, radiusOuter],
        center: ['50%', '50%'],
        startAngle: 60,
        clockwise: true,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLayout: { hideOverlap: true },
        label: {
          show: !isNarrow,
          formatter: (p) => `${p.name}：${p.value}亿人\n(${p.percent}%)`,
          fontSize: labelFont || 12,
          color: '#2c3e50'
        },
        labelLine: {
          length: 12,
          length2: 10,
          lineStyle: { color: '#999' }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: isMobile ? 14 : isTablet ? 15 : 16,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          {
            value: 11.16,
            name: '手机网民',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }])
            }
          },
          {
            value: 0.07,
            name: '非手机网民',
            itemStyle: { color: '#e0e0e0' }
          }
        ]
      }]
    })

    // 响应式调整
    window.addEventListener('resize', () => {
      myChartPhone.resize()
    })
  }
}

onMounted(() => {
  // 问题滚动放大效果
  const setupQuestionScaleEffect = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const questionText = entry.target.querySelector('.question-text')
        if (questionText) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            questionText.classList.add('scale-active')
          } else {
            questionText.classList.remove('scale-active')
          }
        }
      })
    }, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      rootMargin: '-20% 0px -20% 0px'
    })

    if (question1.value) observer.observe(question1.value)
    if (question2.value) observer.observe(question2.value)

    cleanupFns.push(() => observer.disconnect())
  }
  setupQuestionScaleEffect()

  // 粒子背景
  const setupParticles = () => {
    if (!particleCanvas.value) return
    const canvas = particleCanvas.value
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    cleanupFns.push(() => window.removeEventListener('resize', resize))
    const particles = []
    const particleCount = 50
    for (let i = 0; i < particleCount; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 2 + 1 }) }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(102, 126, 234, 0.6)'
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)'
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill()
        particles.slice(i + 1).forEach(p2 => { const dx = p.x - p2.x; const dy = p.y - p2.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.globalAlpha = 1 - dist / 120; ctx.stroke(); ctx.globalAlpha = 1 } })
      })
      particleAnimId = requestAnimationFrame(animate)
    }
    animate()
  }
  setupParticles()

  // 视差
  const setupParallax = () => {
    const elements = document.querySelectorAll('[data-parallax]')
    const onScroll = () => {
      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax'))
        const scrolled = window.scrollY
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }
    window.addEventListener('scroll', onScroll)
    cleanupFns.push(() => window.removeEventListener('scroll', onScroll))
  }
  setupParallax()

  // 窗口resize时重新渲染图表
  const onResize = () => {
    if (chart1.value) {
      const inst = echarts.getInstanceByDom(chart1.value)
      inst?.resize()
    }
    if (chartPhoneUsers.value) {
      const inst = echarts.getInstanceByDom(chartPhoneUsers.value)
      inst?.resize()
    }
  }
  window.addEventListener('resize', onResize)
  cleanupFns.push(() => window.removeEventListener('resize', onResize))
})

onUnmounted(() => {
  if (particleAnimId) cancelAnimationFrame(particleAnimId)
    ;[chart1, chartPhoneUsers].forEach(r => {
      if (r?.value) {
        const inst = echarts.getInstanceByDom(r.value)
        inst && inst.dispose()
      }
    })
  cleanupFns.forEach(fn => { try { fn() } catch (_) { } })
})
</script>

<style scoped>
/* ==================== 背景效果 ==================== */
.particle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: var(--z-below, -1);
  opacity: 0.8;
}

.gradient-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: var(--z-below, -1);
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: floatOrb 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.4), transparent);
  top: 50%;
  right: -150px;
  animation-delay: -7s;
}

.orb-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.3), transparent);
  bottom: -300px;
  left: 50%;
  animation-delay: -14s;
}

@keyframes floatOrb {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(50px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

/* ==================== Section 样式 ==================== */
.intro-section {
  position: relative;
  overflow: hidden;
  padding: var(--section-padding-top, 80px) var(--container-padding, 40px) calc(var(--section-padding-bottom, 80px) + 40px);
  background: linear-gradient(180deg,
      rgba(248, 249, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.95) 50%,
      rgba(248, 249, 255, 0.9) 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.intro-section>* {
  position: relative;
  z-index: var(--z-base, 1);
}

/* ==================== 问题容器 ==================== */
.question-container {
  margin-bottom: var(--spacing-2xl, 60px);
  transition: all 0.3s ease;
}

.question-wrapper {
  text-align: center;
  margin-bottom: var(--spacing-2xl, 60px);
  animation: fadeInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 问题文字样式 */
.question-text {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientShift 5s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md, 20px);
  flex-wrap: wrap;
}

@keyframes gradientShift {
  0% {
    background-position: 0% center;
  }

  100% {
    background-position: 200% center;
  }
}

.question-icon {
  font-size: 3rem;
  display: inline-block;
  animation: phoneRotate 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));
}

@keyframes phoneRotate {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }

  25% {
    transform: rotate(-10deg) scale(1.1);
  }

  75% {
    transform: rotate(10deg) scale(1.1);
  }
}

/* 滚动到问题时放大 */
.question-text.scale-active {
  transform: scale(1.15);
  text-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

/* 问题提示 */
.question-hint {
  text-align: center;
  color: #667eea;
  font-size: 1.15rem;
  margin-top: var(--spacing-lg, 30px);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.animate-float {
  animation: gentleFloat 3s ease-in-out infinite;
}

@keyframes gentleFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* ==================== 时间选项 ==================== */
.time-options {
  display: flex;
  gap: var(--spacing-lg, 30px);
  margin: var(--spacing-2xl, 60px) auto;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
}

.time-option {
  padding: var(--spacing-md, 20px) var(--spacing-xl, 40px);
  font-size: 1.2rem;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #667eea, #764ba2) border-box;
  color: #667eea;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 600;
  min-height: var(--touch-target-min, 44px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm, 12px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  animation: optionFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  letter-spacing: 0.5px;
}

@keyframes optionFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.option-icon {
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: grayscale(30%);
}

.option-text {
  position: relative;
  z-index: 2;
  font-weight: 700;
}

.option-glow {
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.time-option:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.time-option:hover .option-icon {
  transform: scale(1.3) rotate(15deg);
  filter: grayscale(0%);
}

.time-option:hover .option-glow {
  transform: scale(1.2);
  opacity: 1;
}

.time-option:active {
  transform: translateY(-5px) scale(1);
}

.time-option.selected {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
  box-shadow: 0 15px 45px rgba(102, 126, 234, 0.6);
  animation: pulseSelected 2s ease-in-out infinite;
}

.time-option.selected .option-icon {
  filter: grayscale(0%);
  animation: iconBounce 1.5s ease-in-out infinite;
}

@keyframes pulseSelected {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 15px 45px rgba(102, 126, 234, 0.6);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 20px 55px rgba(102, 126, 234, 0.8);
  }
}

@keyframes iconBounce {

  0%,
  100% {
    transform: scale(1) translateY(0);
  }

  50% {
    transform: scale(1.2) translateY(-5px);
  }
}

/* ==================== 图表容器 ==================== */
.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl, 60px);
  width: 90%;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto;
}

.chart-wrapper {
  position: relative;
  animation: chartWrapperFadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chart-wrapper:nth-child(1) {
  animation-delay: 0.2s;
}

.chart-wrapper:nth-child(2) {
  animation-delay: 0.4s;
}

@keyframes chartWrapperFadeIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chart-badge {
  position: absolute;
  top: -15px;
  right: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  animation: badgeFloat 2s ease-in-out infinite;
  letter-spacing: 0.5px;
}

@keyframes badgeFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.chart-container.half {
  width: 100%;
  height: var(--chart-height, 450px);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: var(--radius-xl, 24px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.15);
  padding: var(--spacing-lg, 30px);
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.chart-container.half::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%);
  animation: rotateChartBg 20s linear infinite;
  pointer-events: none;
}

@keyframes rotateChartBg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.chart-container.half:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 70px rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.3);
}

.animated-chart {
  animation: chartReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes chartReveal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ==================== 过渡动画 ==================== */
.slide-down-enter-active {
  animation: slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-down-leave-active {
  animation: slideDown 0.5s ease-out reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ==================== 响应式样式 ==================== */
@media (max-width: 768px) {
  .intro-section {
    padding: var(--spacing-2xl, 60px) 15px 100px;
    min-height: auto;
  }

  .orb-1 {
    width: 350px;
    height: 350px;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
  }

  .orb-3 {
    width: 400px;
    height: 400px;
  }

  .question-icon {
    font-size: 2.5rem;
  }

  .question-hint {
    font-size: 1rem;
  }

  .question-text.scale-active {
    transform: scale(1.1);
  }

  .time-options {
    gap: var(--spacing-md, 20px);
  }

  .time-option {
    padding: var(--spacing-md, 20px) var(--spacing-lg, 30px);
    font-size: 1.1rem;
    min-height: var(--touch-target-min, 44px);
  }

  .option-icon {
    font-size: 1.3rem;
  }

  .charts-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl, 40px);
    width: 95%;
  }

  .chart-badge {
    font-size: 0.75rem;
    padding: 6px 15px;
  }

  .chart-container.half {
    height: 350px;
    padding: var(--spacing-md, 20px);
  }
}

@media (max-width: 480px) {
  .intro-section {
    padding: 30px 10px 60px;
  }

  .orb-1,
  .orb-2,
  .orb-3 {
    width: 250px;
    height: 250px;
  }

  .question-wrapper {
    margin-bottom: 30px;
  }

  .question-text {
    gap: 10px;
    font-size: 1.3rem;
    padding: 0 5px;
  }

  .question-icon {
    font-size: 1.8rem;
  }

  .question-text.scale-active {
    transform: scale(1.05);
  }

  .question-hint {
    font-size: 0.85rem;
    margin-top: 15px;
  }

  .time-options {
    gap: 12px;
    margin: 30px auto;
    padding: 0 5px;
  }

  .time-option {
    padding: 12px 20px;
    font-size: 0.9rem;
    min-height: 44px;
  }

  .option-icon {
    font-size: 1.1rem;
  }

  .option-text {
    font-size: 0.9rem;
  }

  .charts-row {
    width: 100%;
    gap: 25px;
    padding: 0 5px;
  }

  .chart-badge {
    top: -10px;
    right: 12px;
    font-size: 0.65rem;
    padding: 4px 10px;
  }

  .chart-wrapper {
    width: 100%;
  }

  .chart-container.half {
    height: 280px;
    padding: 15px;
  }
}
</style>