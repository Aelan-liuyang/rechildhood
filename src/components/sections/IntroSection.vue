<template>
  <section id="intro" class="section intro-section">
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <!-- 第一个问题 -->
    <div class="question-container" ref="question1">
      <h1 class="main-title question-text" data-parallax="0.3">
        你每天有多少时间在和小小的手机屏幕接触？
      </h1>

      <!-- 时间选项 -->
      <div class="time-options">
        <div class="time-option" v-for="option in timeOptions" :key="option"
          :class="{ selected: selectedTime === option }" @click="selectTime(option)">
          {{ option }}
        </div>
      </div>

      <!-- 图表容器：选择后显示，横向排列 -->
      <transition name="slide-down">
        <div v-if="showCharts" class="charts-row">
          <div class="chart-container half" ref="chart1" data-parallax="0.15"></div>
          <div class="chart-container half" ref="chartPhoneUsers" data-parallax="0.15"></div>
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
  // chart1: 每日平均互联网使用时间
  if (chart1.value && !echarts.getInstanceByDom(chart1.value)) {
    const myChart1 = echarts.init(chart1.value)
    myChart1.setOption({
      title: { text: '中国居民每日平均互联网使用时间', left: 'center', textStyle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }, top: 20 },
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(50, 50, 50, 0.9)', borderColor: '#333', borderWidth: 1, textStyle: { color: '#fff' }, formatter: '{b}<br/>使用时长: {c}小时' },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '20%', containLabel: true },
      xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023', '2024'], axisLabel: { fontSize: 12, color: '#666' }, axisLine: { lineStyle: { color: '#ddd' } } },
      yAxis: { type: 'value', name: '小时', nameTextStyle: { color: '#666' }, axisLabel: { formatter: '{value}h', color: '#666' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
      series: [{ data: [4.4, 4.07, 4.21, 5.33, 6.05], type: 'bar', barWidth: '45%', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#83bff6' }, { offset: 1, color: '#188df0' }]), borderRadius: [8, 8, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: '#188df0', fontWeight: 'bold' }, emphasis: { itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#a0d1f7' }, { offset: 1, color: '#3fa3f5' }]) } } }],
      graphic: [{
        type: 'text',
        left: 'center',
        bottom: 5,
        z: 100,
        style: {
          text: '数据来源：国家统计局、中国互联网络信息中心（CNNIC）',
          textAlign: 'center',
          fill: '#999',
          fontSize: 11,
          fontStyle: 'italic'
        }
      }],
      animationDuration: 1000, animationEasing: 'cubicOut'
    })
  }

  // 手机网民占比
  if (chartPhoneUsers.value && !echarts.getInstanceByDom(chartPhoneUsers.value)) {
    const myChartPhone = echarts.init(chartPhoneUsers.value)
    const w = chartPhoneUsers.value.clientWidth || 450
    const isNarrow = w < 520
    const percentFont = isNarrow ? 22 : 30
    const centerSubSize = isNarrow ? 11 : 12
    const labelFont = isNarrow ? 0 : 14
    const radiusInner = isNarrow ? '46%' : '50%'
    const radiusOuter = isNarrow ? '66%' : '72%'
    myChartPhone.setOption({
      title: { text: '截至2025年6月手机网民占比情况', subtext: '网民11.23亿 | 手机网民11.16亿 | 占99.4%', left: 'center', textStyle: { fontSize: 16, fontWeight: 'bold' }, subtextStyle: { fontSize: 11, color: '#666' } },
      tooltip: { trigger: 'item', formatter: '{b}: {c}亿人 ({d}%)' },
      legend: { bottom: 35, left: 'center' },
      graphic: [
        { type: 'text', left: 'center', top: '44%', style: { text: '99.4%', fontSize: percentFont, fontWeight: 800, fill: '#2c3e50' } },
        { type: 'text', left: 'center', top: '56%', style: { text: '手机网民占比', fontSize: centerSubSize, fill: '#666' } },
        { type: 'text', left: 'center', bottom: 5, z: 100, style: { text: '数据来源：中国互联网络信息中心（CNNIC）、QuestMobile', textAlign: 'center', fill: '#999', fontSize: 11, fontStyle: 'italic' } }
      ],
      series: [{ type: 'pie', radius: [radiusInner, radiusOuter], center: ['50%', '50%'], startAngle: 60, clockwise: true, avoidLabelOverlap: false, itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 }, labelLayout: { hideOverlap: true }, label: { show: !isNarrow, formatter: (p) => `${p.name}：${p.value}亿人\n(${p.percent}%)`, fontSize: labelFont || 12, color: '#2c3e50' }, labelLine: { length: 12, length2: 10, lineStyle: { color: '#999' } }, emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' }, itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }, data: [{ value: 11.16, name: '手机网民', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }]) } }, { value: 0.07, name: '非手机网民', itemStyle: { color: '#e0e0e0' } }] }]
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
.particle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.intro-section {
  position: relative;
  overflow: hidden;
  padding: 80px 20px 120px;
}

.intro-section>* {
  position: relative;
  z-index: 1;
}

/* 问题容器 */
.question-container {
  margin-bottom: 60px;
  transition: all 0.3s ease;
}

/* 增加第二个问题的间距 */
.question-spacer {
  margin-top: 200px;
  margin-bottom: 100px;
}

/* 问题文字样式 */
.question-text {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

/* 滚动到问题时放大 */
.question-text.scale-active {
  transform: scale(1.15);
  text-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

/* 问题提示 */
.question-hint {
  text-align: center;
  color: #999;
  font-size: 1rem;
  margin-top: 20px;
  font-style: italic;
  opacity: 0.7;
}

.time-options {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.time-option {
  padding: 12px 30px;
  font-size: 1.1rem;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.time-option:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.time-option.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
  animation: pulseButton 1.5s ease-in-out;
}

@keyframes pulseButton {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg, 30px);
  width: 90%;
  max-width: 1100px;
  margin: var(--spacing-lg, 30px) auto;
}

.chart-container.half {
  width: 100%;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
}

.slide-down-enter-active {
  animation: slideDown 0.6s ease-out;
}

.slide-down-leave-active {
  animation: slideDown 0.6s ease-out reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .intro-section {
    padding: 60px 15px 100px;
  }

  .question-spacer {
    margin-top: 150px;
    margin-bottom: 80px;
  }

  .question-text.scale-active {
    transform: scale(1.1);
  }

  .time-options {
    gap: 15px;
  }

  .time-option {
    padding: 10px 20px;
    font-size: 1rem;
    min-height: var(--touch-target-min, 44px);
  }

  .charts-row {
    grid-template-columns: 1fr;
    /* 改为单列 */
    gap: var(--spacing-md, 20px);
    width: 95%;
  }

  .chart-container.half {
    height: 320px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .intro-section {
    padding: 40px 10px 80px;
  }

  .question-spacer {
    margin-top: 120px;
    margin-bottom: 60px;
  }

  .question-text.scale-active {
    transform: scale(1.08);
  }

  .question-hint {
    font-size: var(--font-size-small, 0.9rem);
  }

  .time-option {
    padding: var(--spacing-sm, 12px) var(--spacing-md, 20px);
    font-size: var(--font-size-small, 0.9rem);
    min-height: var(--touch-target-min, 44px);
  }

  .charts-row {
    width: 100%;
  }

  .chart-container.half {
    height: 280px;
    padding: 12px;
  }
}
</style>