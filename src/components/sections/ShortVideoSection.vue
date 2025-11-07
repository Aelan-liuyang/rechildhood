<template>
  <div>
    <section class="section time-section">
      <h2 class="section-title gradient-title">你每天有多少时间是在和短视频度过？</h2>
      <p class="section-subtitle animate-float">选择你的平均使用时长</p>
      <div class="time-options">
        <div class="time-option" :class="{ selected: selectedTimeOption === '30-60min' }"
          @click="selectTimeOption('30-60min')">
          <span class="time-icon">⏱️</span>
          <span class="time-text">30-60min</span>
          <div class="option-ripple"></div>
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '60-90min' }"
          @click="selectTimeOption('60-90min')">
          <span class="time-icon">⏰</span>
          <span class="time-text">60-90min</span>
          <div class="option-ripple"></div>
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '90-120min' }"
          @click="selectTimeOption('90-120min')">
          <span class="time-icon">⌚</span>
          <span class="time-text">90-120min</span>
          <div class="option-ripple"></div>
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '120min以上' }"
          @click="selectTimeOption('120min以上')">
          <span class="time-icon">⏳</span>
          <span class="time-text">120min以上</span>
          <div class="option-ripple"></div>
        </div>
      </div>
      <transition name="chart-fade">
        <div v-if="showChart2" class="chart-container animated-chart" ref="chart2"></div>
      </transition>
      <transition name="chart-fade">
        <p v-if="showChart2" class="data-note chart-explanation">
          2024年，中国居民人均单日观看短视频时长超2.5小时，较2020年提升0.8小时。如今，短视频因其碎片化、场景适配性已超越电视、网络视频，成为使用率最高，具有高渗透率、高使用粘度的视频形式。
        </p>
      </transition>
    </section>

    <section class="section video-section">
      <h2 class="section-title gradient-title-light">这样的视频有在你的喜欢列表吗？</h2>
      <p class="section-subtitle-light animate-float">向下滑动查看典型的儿童短视频内容</p>
      <div class="video-examples">
        <div class="video-card floating-card" @mouseenter="activeCard = 0" @mouseleave="activeCard = null">
          <div class="video-badge">热门</div>
          <img src="@/assets/images/1.png" alt="视频示例1" class="video-image" />
          <div class="video-info">
            <p class="video-likes">
              <span class="heart-icon">❤️</span>
              <span class="likes-number">123.4万</span>
            </p>
            <div class="video-tags">
              <span class="tag">#亲子</span>
              <span class="tag">#日常</span>
            </div>
          </div>
          <div class="card-glow"></div>
          <div class="card-shine"></div>
        </div>
        <div class="video-card floating-card" @mouseenter="activeCard = 1" @mouseleave="activeCard = null">
          <div class="video-badge trending">爆款</div>
          <img src="@/assets/images/2.png" alt="视频示例2" class="video-image" />
          <div class="video-info">
            <p class="video-likes">
              <span class="heart-icon">❤️</span>
              <span class="likes-number">89.2万</span>
            </p>
            <div class="video-tags">
              <span class="tag">#萌娃</span>
              <span class="tag">#记录</span>
            </div>
          </div>
          <div class="card-glow"></div>
          <div class="card-shine"></div>
        </div>
      </div>

      <div class="choice-buttons">
        <button class="choice-btn choice-yes" @click="selectChoice('yes')"
          :class="{ selected: selectedChoice === 'yes' }">
          <span class="btn-icon">✓</span>
          <span class="btn-text">有</span>
        </button>
        <button class="choice-btn choice-no" @click="selectChoice('no')" :class="{ selected: selectedChoice === 'no' }">
          <span class="btn-icon">✗</span>
          <span class="btn-text">没有</span>
        </button>
      </div>

      <transition name="slide-down">
        <div v-if="showChart" class="chart-reveal">
          <div class="chart-container large" ref="chart3"></div>
          <p class="data-note">
            在某短视频社交媒体平台，亲子类视频的平均点赞量超1w，在众多视频类型里稳居前列。且在该平台粉丝量排行榜中，获得总点赞数4.8亿的亲子类达人@朱***凭借3633.8w的粉丝数量位居平台51，超越一众官媒和娱乐明星。
          </p>
        </div>
      </transition>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart2 = ref(null)
const chart3 = ref(null)
const showChart = ref(false)
const selectedChoice = ref(null)
const showChart2 = ref(false)
const selectedTimeOption = ref('')
const activeCard = ref(null)

const selectChoice = (v) => { selectedChoice.value = v; showChart.value = true }

const selectTimeOption = (option) => {
  selectedTimeOption.value = option
  showChart2.value = true
  nextTick(() => {
    if (chart2.value) {
      const isMobile = window.innerWidth <= 480
      const isTablet = window.innerWidth <= 768 && window.innerWidth > 480
      const titleFontSize = isMobile ? 14 : isTablet ? 16 : 20
      const axisLabelFontSize = isMobile ? 10 : isTablet ? 11 : 12
      const labelFontSize = isMobile ? 10 : isTablet ? 11 : 12
      const sourceFontSize = isMobile ? 9 : isTablet ? 10 : 12

      const myChart2 = echarts.init(chart2.value)
      myChart2.setOption({
        title: {
          text: '中国居民人均单日观看短视频时长',
          left: 'center',
          textStyle: { fontSize: titleFontSize, fontWeight: 'bold' },
          top: isMobile ? 10 : 15
        },
        tooltip: {
          trigger: 'axis',
          textStyle: { fontSize: isMobile ? 11 : 12 }
        },
        grid: {
          left: isMobile ? '8%' : '3%',
          right: isMobile ? '8%' : '4%',
          bottom: isMobile ? '18%' : '15%',
          top: isMobile ? '25%' : '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['2020', '2021', '2022', '2023', '2024'],
          axisLabel: { fontSize: axisLabelFontSize }
        },
        yAxis: {
          type: 'value',
          name: '分钟',
          nameTextStyle: { fontSize: axisLabelFontSize },
          axisLabel: { formatter: '{value}min', fontSize: axisLabelFontSize }
        },
        series: [{
          data: [110, 87, 150, 151, 156],
          type: 'bar',
          barWidth: isMobile ? '50%' : '45%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#fbc658' }, { offset: 1, color: '#f77825' }])
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}min',
            fontSize: labelFontSize
          }
        }],
        graphic: [{
          type: 'text',
          left: 'center',
          bottom: 0,
          z: 100,
          style: {
            text: '数据来源：中国互联网络信息中心（CNNIC）、《2020中国网络视听发展研究报告》等',
            textAlign: 'center',
            fill: '#666',
            fontSize: sourceFontSize
          }
        }]
      })

      // 响应式调整
      window.addEventListener('resize', () => {
        myChart2.resize()
      })
    }
  })
}

onMounted(() => {
  // 移除原来的图表初始化代码，因为现在在选择时间选项后初始化

  // 高亮 chart3 的 "亲子"
  const setupChart3HighlightOnReveal = () => {
    if (!chart3.value) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const inst = echarts.getInstanceByDom(chart3.value)
          if (inst) {
            try {
              const opt = inst.getOption()
              const cats = (opt?.yAxis?.[0]?.data) || []
              const idx = cats.indexOf('亲子')
              if (idx >= 0) {
                inst.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx })
                inst.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: idx })
              }
            } catch (e) { }
          }
          const containerEl = entry.target.closest('.chart-reveal') || entry.target.parentElement || document
          const note = containerEl.querySelector?.('.data-note')
          if (note) note.classList.add('emerge')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.6 })
    observer.observe(chart3.value)
  }

  watch(showChart, async (v) => {
    if (!v) return
    await nextTick()
    if (!chart3.value) return
    const exists = echarts.getInstanceByDom(chart3.value)
    if (exists) { exists.resize(); setupChart3HighlightOnReveal(); return }
    const myChart3 = echarts.init(chart3.value)
    // 过滤掉"随拍"类型
    const originalCategories = ['剧情', '明星八卦', '舞蹈', '游戏', '音乐', '亲子', '颜值', '时政社会', '校园教育', '美食', '医疗健康', '财经', '休闲']
    const originalValues = [37819.9, 34845.9, 27364.2, 19072.4, 13518.6, 13513.8, 10068.6, 5773.9, 4761.7, 4761.7, 2337.6, 2149.5, 1772.5]

    const isMobile = window.innerWidth <= 480
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 480
    const sourceFontSize = isMobile ? 9 : isTablet ? 10 : 12
    myChart3.setOption({
      title: { text: '各类型视频平均点赞数', subtext: '截至2025年10月23日', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
      yAxis: { type: 'category', data: originalCategories, axisLabel: { fontSize: 12 } },
      series: [{
        data: originalValues,
        type: 'bar',
        itemStyle: {
          color: (params) => {
            // 如果是"亲子"类型，使用醒目的颜色，否则使用较暗淡的颜色
            if (params.name === '亲子') {
              return '#e74c3c' // 醒目的红色
            } else {
              // 其他类型使用更暗淡的颜色
              const dullColors = ['#bdc3c7', '#95a5a6', '#7f8c8d', '#34495e']
              return dullColors[params.dataIndex % dullColors.length]
            }
          },
          // 为"亲子"类型添加更明显的视觉效果
          emphasis: {
            color: (params) => {
              if (params.name === '亲子') {
                return '#c0392b' // 悬停时更深的红色
              } else {
                return null // 使用默认的暗淡颜色
              }
            },
            borderWidth: 2,
            borderColor: (params) => {
              if (params.name === '亲子') {
                return '#e74c3c' // 添加边框
              } else {
                return null
              }
            }
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params) => {
            // 为"亲子"类型添加特殊标签样式
            if (params.name === '亲子') {
              return `{highlight|${params.value}}`
            } else {
              return params.value
            }
          },
          rich: {
            highlight: {
              color: '#e74c3c',
              fontWeight: 'bold',
              fontSize: 14
            }
          }
        }
      }],
      graphic: [{
        type: 'text',
        left: 'center',
        bottom: 0,
        z: 100,
        style: {
          text: '数据来源：抖查查（短视频第三方数据采集平台）',
          textAlign: 'center',
          fill: '#666',
          fontSize: sourceFontSize
        }
      }]
    })

    // 添加定时器，让"亲子"类型更加高亮
    const highlightInterval = setTimeout(() => {
      const cats = originalCategories || []
      const idx = cats.indexOf('亲子')
      if (idx >= 0 && myChart3) {
        // 高亮显示"亲子"类型
        myChart3.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx })
        // 显示工具提示
        myChart3.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: idx })

        // 每1秒切换一次高亮状态，增强视觉效果
        let isHighlighted = true
        const interval = setInterval(() => {
          if (myChart3) {
            if (isHighlighted) {
              myChart3.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: idx })
            } else {
              myChart3.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx })
            }
            isHighlighted = !isHighlighted
          }
        }, 1000)

        // 保存interval ID以便清理
        myChart3.__highlightInterval = interval
      }
    }, 500)

    // 保存定时器ID以便清理
    myChart3.__highlightTimeout = highlightInterval

    setupChart3HighlightOnReveal()
  })

  // 窗口尺寸变化时自适应 chart3 宽度
  const onResize = () => {
    if (!chart3.value) return
    const inst = echarts.getInstanceByDom(chart3.value)
    if (inst) inst.resize()
  }
  window.addEventListener('resize', onResize)
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)

    // 清理图表相关的定时器
    if (chart3.value) {
      const inst = echarts.getInstanceByDom(chart3.value)
      if (inst) {
        // 清理高亮定时器
        if (inst.__highlightTimeout) {
          clearTimeout(inst.__highlightTimeout)
        }
        // 清理高亮切换间隔
        if (inst.__highlightInterval) {
          clearInterval(inst.__highlightInterval)
        }
      }
    }
  })
})

</script>

<style scoped>
/* ==================== Section 样式 ==================== */
.section {
  padding: var(--container-padding, 60px) var(--spacing-md, 20px) var(--container-padding, 80px);
  max-width: 1400px;
  margin: 0 auto;
}

.time-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.time-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(243, 156, 18, 0.1) 0%, transparent 70%);
  animation: rotateBackground 20s linear infinite;
}

@keyframes rotateBackground {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.section-title {
  text-align: center;
  font-size: var(--font-size-h2, 2.4rem);
  color: #2c3e50;
  margin-bottom: var(--spacing-2xl, 60px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: var(--spacing-lg, 30px);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.gradient-title {
  background: linear-gradient(135deg, #f39c12, #e74c3c, #f39c12);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientFlow 3s linear infinite;
}

.gradient-title-light {
  background: linear-gradient(135deg, #fff, #fffaf0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 20px rgba(255, 255, 255, 0.5);
}

@keyframes gradientFlow {
  0% {
    background-position: 0% center;
  }

  100% {
    background-position: 200% center;
  }
}

.section-subtitle {
  text-align: center;
  color: #f39412;
  font-size: 1.15rem;
  /* font-style: italic; */
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

.section-subtitle-light {
  text-align: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: -15px 0 var(--spacing-xl, 40px);
  /* font-style: italic; */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* ==================== 时间选项样式 ==================== */
.time-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg, 30px);
  margin: var(--spacing-2xl, 60px) auto;
  max-width: 1200px;
  padding: 0 var(--spacing-md, 20px);
  position: relative;
  z-index: 1;
}

.time-option {
  padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  font-size: 1.2rem;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #f39c12, #e74c3c) border-box;
  color: #f39c12;
  border-radius: var(--radius-xl, 24px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 600;
  min-height: var(--touch-target-min, 44px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  box-shadow: 0 8px 25px rgba(243, 156, 18, 0.15);
}

.time-icon {
  font-size: 2.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: grayscale(50%);
}

.time-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.option-ripple {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl, 24px);
  background: radial-gradient(circle, rgba(243, 156, 18, 0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.time-option:hover {
  background: linear-gradient(135deg, #f39c12, #e74c3c);
  color: white;
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 40px rgba(243, 156, 18, 0.4);
}

.time-option:hover .time-icon {
  transform: scale(1.2) rotate(10deg);
  filter: grayscale(0%);
}

.time-option:hover .option-ripple {
  transform: scale(1);
  opacity: 1;
}

.time-option:active {
  transform: translateY(-5px) scale(0.98);
}

.time-option.selected {
  background: linear-gradient(135deg, #f39c12, #e74c3c);
  color: white;
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 40px rgba(243, 156, 18, 0.5);
  animation: selectedPulse 2s ease-in-out infinite;
}

.time-option.selected .time-icon {
  filter: grayscale(0%);
  animation: iconBounce 1s ease-in-out infinite;
}

@keyframes selectedPulse {

  0%,
  100% {
    box-shadow: 0 15px 40px rgba(243, 156, 18, 0.5);
  }

  50% {
    box-shadow: 0 20px 50px rgba(243, 156, 18, 0.7);
  }
}

@keyframes iconBounce {

  0%,
  100% {
    transform: scale(1.2) translateY(0);
  }

  50% {
    transform: scale(1.3) translateY(-5px);
  }
}

/* ==================== 视频 Section ==================== */
.video-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  position: relative;
  overflow: hidden;
}

.video-section::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.video-examples {
  display: flex;
  gap: var(--spacing-2xl, 60px);
  justify-content: center;
  margin: var(--spacing-2xl, 60px) auto;
  max-width: 1200px;
  padding: 0 var(--spacing-md, 20px);
}

.video-card {
  flex: 1;
  max-width: 450px;
  background: white;
  border-radius: var(--radius-xl, 24px);
  overflow: hidden;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-20px) scale(1.03);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
}

/* 视频徽章 */
.video-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  animation: badgePulse 2s ease-in-out infinite;
}

.video-badge.trending {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

@keyframes badgePulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }
}

.card-glow {
  position: absolute;
  inset: -3px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea);
  border-radius: var(--radius-xl, 24px);
  opacity: 0;
  z-index: -1;
  filter: blur(25px);
  transition: opacity 0.5s;
  background-size: 300% 300%;
}

.video-card:hover .card-glow {
  opacity: 0.7;
  animation: rotateBorder 4s linear infinite;
}

@keyframes rotateBorder {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.video-card:hover .card-shine {
  left: 100%;
}

.floating-card {
  animation: cardFloat 6s ease-in-out infinite;
}

.floating-card:nth-child(2) {
  animation-delay: -3s;
}

@keyframes cardFloat {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

.video-image {
  width: 100%;
  aspect-ratio: 9/16;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.video-card:hover .video-image {
  transform: scale(1.05);
}

.video-info {
  padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), white);
  backdrop-filter: blur(10px);
}

.video-likes {
  font-size: 1.3rem;
  font-weight: 800;
  color: #e74c3c;
  margin-bottom: var(--spacing-sm, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs, 8px);
}

.heart-icon {
  font-size: 1.5rem;
  animation: heartBeat 1.5s ease-in-out infinite;
}



@keyframes heartBeat {

  0%,
  100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
  }
}

.likes-number {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.video-tags {
  display: flex;
  gap: var(--spacing-xs, 8px);
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.2);
}

/* ==================== 选择按钮 ==================== */
.choice-buttons {
  display: flex;
  gap: var(--spacing-2xl, 60px);
  margin: var(--spacing-2xl, 60px) auto;
  justify-content: center;
  max-width: 1200px;
  padding: 0 var(--spacing-md, 20px);
}

.choice-btn {
  padding: var(--spacing-lg, 30px) 70px;
  font-size: 1.4rem;
  border: 4px solid transparent;
  background: white;
  border-radius: 60px;
  cursor: pointer;
  font-weight: 800;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-height: var(--touch-target-min, 44px);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  letter-spacing: 1px;
}

.choice-yes {
  color: #27ae60;
  box-shadow: 0 8px 30px rgba(39, 174, 96, 0.25);
  border-color: #27ae60;
}

.choice-no {
  color: #e74c3c;
  box-shadow: 0 8px 30px rgba(231, 76, 60, 0.25);
  border-color: #e74c3c;
}

.btn-icon {
  font-size: 1.8rem;
  font-weight: 900;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.choice-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(-50%, -50%);
  z-index: 0;
}

.choice-yes::before {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.choice-no::before {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.choice-btn::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 60px;
  opacity: 0;
  z-index: -1;
  filter: blur(15px);
  background-size: 300% 300%;
  animation: gradientShift 4s ease infinite;
}

.choice-yes::after {
  background: linear-gradient(45deg, #27ae60, #229954, #27ae60);
}

.choice-no::after {
  background: linear-gradient(45deg, #e74c3c, #c0392b, #e74c3c);
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

.choice-btn:hover::before {
  width: 500px;
  height: 500px;
}

.choice-btn:hover::after {
  opacity: 0.9;
}

.choice-btn:hover {
  color: white;
  transform: translateY(-8px) scale(1.1);
  border-color: transparent;
}

.choice-yes:hover {
  box-shadow: 0 20px 50px rgba(39, 174, 96, 0.6);
}

.choice-no:hover {
  box-shadow: 0 20px 50px rgba(231, 76, 60, 0.6);
}

.choice-btn:hover .btn-icon {
  transform: scale(1.3) rotate(360deg);
}

.choice-btn:active {
  transform: translateY(-5px) scale(1.05);
}

.choice-btn.selected {
  color: white;
  border-color: transparent;
  animation: pulseButton 2s ease-in-out infinite;
}

.choice-yes.selected {
  background: linear-gradient(135deg, #27ae60, #229954);
  box-shadow: 0 15px 45px rgba(39, 174, 96, 0.7);
}

.choice-no.selected {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 15px 45px rgba(231, 76, 60, 0.7);
}

.choice-btn.selected .btn-icon {
  animation: iconSpin 1s ease-in-out infinite;
}

@keyframes pulseButton {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}

@keyframes iconSpin {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.2);
  }
}

/* ==================== 图表样式 ==================== */
.animated-chart {
  animation: chartFadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes chartFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chart-fade-enter-active {
  animation: chartFadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chart-fade-leave-active {
  animation: chartFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) reverse;
}

/* ==================== 图表容器样式 ==================== */
.chart-container {
  width: 100%;
  max-width: 1200px;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

.chart-container.large {
  height: 500px;
}

.chart-reveal {
  margin-top: var(--spacing-2xl, 60px);
  animation: chartRevealAnimation 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

@keyframes chartRevealAnimation {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down-enter-active {
  animation: slideDown 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
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

.data-note {
  padding: var(--spacing-xl, 30px) var(--spacing-lg, 35px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: var(--radius-lg, 20px);
  margin-top: var(--spacing-xl, 40px);
  margin-left: auto;
  margin-right: auto;
  line-height: 2;
  font-size: 1.05rem;
  color: #555;
  border-left: 4px solid #667eea;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.data-note.chart-explanation {
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* ==================== 响应式样式 ==================== */
@media (max-width: 1024px) {
  .section {
    padding: var(--container-padding, 50px) var(--spacing-md, 20px) var(--container-padding, 70px);
  }
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-xl, 40px) var(--spacing-md, 20px) var(--spacing-xl, 50px);
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-xl, 40px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .section-title::after {
    width: 60px;
    height: 3px;
  }

  .time-options {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md, 20px);
    max-width: 100%;
  }

  .time-option {
    padding: var(--spacing-md, 20px);
  }

  .time-icon {
    font-size: 2rem;
  }

  .time-text {
    font-size: 1rem;
  }

  .video-examples {
    flex-direction: column;
    gap: var(--spacing-xl, 40px);
  }

  .video-card {
    max-width: 100%;
  }

  .choice-buttons {
    gap: var(--spacing-lg, 30px);
    flex-wrap: wrap;
  }

  .choice-btn {
    padding: var(--spacing-md, 20px) 50px;
    font-size: 1.2rem;
    min-height: var(--touch-target-min, 44px);
  }

  .btn-icon {
    font-size: 1.5rem;
  }

  .chart-reveal {
    margin-top: var(--spacing-xl, 40px);
  }

  .chart-container {
    max-width: 100%;
    height: 380px;
    padding: 18px;
    border-radius: 16px;
  }

  .chart-container.large {
    height: 400px;
  }

  .chart-reveal {
    max-width: 100%;
  }

  .data-note {
    padding: var(--spacing-lg, 25px) var(--spacing-md, 25px);
    font-size: 1rem;
    margin-top: var(--spacing-lg, 30px);
    max-width: 100%;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .data-note.chart-explanation {
    text-align: justify;
    text-justify: inter-ideograph;
    padding: var(--spacing-lg, 25px) var(--spacing-md, 25px);
    max-width: 100%;
  }

  .choice-buttons {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-lg, 30px) 12px var(--spacing-xl, 40px);
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-sm, 15px);
    line-height: 1.5;
  }

  .section-title::after {
    width: 50px;
    height: 3px;
  }

  .time-options {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 10px;
  }

  .time-option {
    padding: 16px 12px;
    min-height: 44px;
  }

  .time-icon {
    font-size: 1.6rem;
  }

  .time-text {
    font-size: 0.9rem;
  }

  .section-subtitle,
  .section-subtitle-light {
    font-size: 0.95rem;
    margin: -8px 0 25px;
    padding: 0 10px;
  }

  .video-examples {
    gap: 25px;
    padding: 0 10px;
  }

  .video-card {
    max-width: 100%;
  }

  .video-badge {
    top: 8px;
    right: 8px;
    padding: 5px 10px;
    font-size: 0.7rem;
  }

  .video-info {
    padding: 15px 12px;
  }

  .video-title {
    font-size: 0.95rem;
  }

  .video-likes {
    font-size: 1rem;
  }

  .heart-icon {
    font-size: 1.1rem;
  }

  .video-tags {
    gap: 6px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 4px 8px;
  }

  .choice-buttons {
    gap: 15px;
    flex-direction: column;
    padding: 0 10px;
  }

  .choice-btn {
    padding: 16px 35px;
    font-size: 1rem;
    width: 100%;
    min-height: 48px;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  .btn-text {
    font-size: 1rem;
  }

  .chart-reveal {
    margin-top: 30px;
    padding: 0 5px;
  }

  .chart-container {
    max-width: 100%;
    height: 320px;
    padding: 15px 12px;
    border-radius: 14px;
  }

  .chart-container.large {
    height: 350px;
    padding: 15px 12px;
  }

  .chart-reveal {
    max-width: 100%;
  }

  .data-note {
    padding: var(--spacing-md, 20px) var(--spacing-sm, 18px);
    font-size: 0.9rem;
    line-height: 1.9;
    margin-top: var(--spacing-md, 25px);
    border-radius: var(--radius-md, 12px);
    max-width: 100%;
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .data-note.chart-explanation {
    text-align: justify;
    text-justify: inter-ideograph;
    padding: var(--spacing-md, 20px) var(--spacing-sm, 18px);
    max-width: 100%;
  }

  .choice-buttons {
    max-width: 100%;
  }
}
</style>