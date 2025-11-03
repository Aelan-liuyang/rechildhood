<template>
  <div>
    <section class="section">
      <h2 class="section-title">你每天有多少时间是在和短视频度过？</h2>
      <div class="time-options">
        <div class="time-option" :class="{ selected: selectedTimeOption === '30-60min' }"
          @click="selectTimeOption('30-60min')">
          30-60min
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '60-90min' }"
          @click="selectTimeOption('60-90min')">
          60-90min
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '90-120min' }"
          @click="selectTimeOption('90-120min')">
          90-120min
        </div>
        <div class="time-option" :class="{ selected: selectedTimeOption === '120min以上' }"
          @click="selectTimeOption('120min以上')">
          120min以上
        </div>
      </div>
      <div v-if="showChart2" class="chart-container" ref="chart2"></div>
    </section>

    <section class="section video-section">
      <h2 class="section-title">这样的视频有在你的喜欢列表吗？</h2>
      <div class="video-examples">
        <div class="video-card floating-card">
          <img src="@/assets/images/1.png" alt="视频示例1" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 123.4万</p>
          </div>
          <div class="card-glow"></div>
        </div>
        <div class="video-card floating-card">
          <img src="@/assets/images/2.png" alt="视频示例2" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 89.2万</p>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>

      <div class="choice-buttons">
        <button class="choice-btn" @click="selectChoice('yes')"
          :class="{ selected: selectedChoice === 'yes' }">有</button>
        <button class="choice-btn" @click="selectChoice('no')"
          :class="{ selected: selectedChoice === 'no' }">没有</button>
      </div>

      <transition name="slide-down">
        <div v-if="showChart" class="chart-reveal">
          <div class="chart-container large" ref="chart3"></div>
          <p class="data-note">
            截至2025年10月23日，某短视频社交媒体平台发布293个作品获得点赞数4.8亿的亲子剧情类达人@朱***凭借3633.8w的粉丝数量位居平台51，超越一众官媒和娱乐明星。
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

const selectChoice = (v) => { selectedChoice.value = v; showChart.value = true }

const selectTimeOption = (option) => {
  selectedTimeOption.value = option
  showChart2.value = true
  nextTick(() => {
    if (chart2.value) {
      const myChart2 = echarts.init(chart2.value)
      myChart2.setOption({
        title: { text: '中国居民每日平均短视频使用时间', left: 'center', textStyle: { fontSize: 20, fontWeight: 'bold' } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023', '2024'] },
        yAxis: { type: 'value', name: '分钟', axisLabel: { formatter: '{value}min' } },
        series: [{ data: [110, 87, 150, 151, 156], type: 'bar', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#fbc658' }, { offset: 1, color: '#f77825' }]) }, label: { show: true, position: 'top', formatter: '{c}min' } }],
        graphic: [{
          type: 'text',
          left: 'center',
          bottom: 0,
          z: 100,
          style: {
            text: '数据来源：中国互联网络信息中心（CNNIC）、《2020中国网络视听发展研究报告》等',
            textAlign: 'center',
            fill: '#666',
            fontSize: 12,
            fontStyle: 'italic'
          }
        }]
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
    const originalCategories = ['随拍', '剧情', '明星八卦', '舞蹈', '游戏', '亲子', '音乐', '颜值', '时政社会', '校园教育', '美食', '医疗健康', '财经', '休闲']
    const originalValues = [108045.7, 37819.9, 34845.9, 27364.2, 19072.4, 13513.8, 13518.6, 10068.6, 5773.9, 4761.7, 4761.7, 2337.6, 2149.5, 1772.5]

    // 找到"随拍"的索引并移除
    const skipIndex = originalCategories.indexOf('随拍')
    const categories = originalCategories.filter((_, index) => index !== skipIndex)
    const values = originalValues.filter((_, index) => index !== skipIndex)

    myChart3.setOption({
      title: { text: '各类型视频平均点赞数', subtext: '截至2025年10月23日', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
      yAxis: { type: 'category', data: categories, axisLabel: { fontSize: 12 } },
      series: [{
        data: values,
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
      }]
    })

    // 添加定时器，让"亲子"类型更加高亮
    const highlightInterval = setTimeout(() => {
      const cats = categories || []
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
.time-options {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.time-option {
  padding: var(--spacing-sm, 12px) var(--spacing-lg, 30px);
  font-size: 1.1rem;
  border: 2px solid #f39c12;
  background: white;
  color: #f39c12;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  min-height: var(--touch-target-min, 44px);
}

.time-option:hover {
  background: #f39c12;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
}

.time-option.selected {
  background: #f39c12;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
}

.video-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.video-examples {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 40px auto;
  max-width: 900px;
}

.video-card {
  flex: 1;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.video-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  filter: blur(20px);
  transition: opacity 0.5s;
}

.video-card:hover .card-glow {
  opacity: 0.6;
  animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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
}

.video-info {
  padding: 20px;
  text-align: center;
}

.video-likes {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.choice-buttons {
  display: flex;
  gap: 30px;
  margin: 40px 0;
  justify-content: center;
}

.choice-btn {
  padding: 18px 60px;
  font-size: 1.3rem;
  border: 3px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
  min-height: var(--touch-target-min, 44px);
}

.choice-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(-50%, -50%);
  z-index: 0;
}

.choice-btn::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #3498db, #2980b9, #3498db);
  border-radius: 50px;
  opacity: 0;
  z-index: -1;
  filter: blur(10px);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
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
  width: 400px;
  height: 400px;
}

.choice-btn:hover::after {
  opacity: 0.8;
}

.choice-btn:hover {
  color: white;
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 15px 40px rgba(52, 152, 219, 0.5);
  border-color: transparent;
}

.choice-btn.selected {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.5);
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

.chart-reveal {
  margin-top: 50px;
}

/* 图表宽度交由内联样式控制（见模板），避免层叠冲突 */

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
  .video-examples {
    flex-direction: column;
    gap: var(--spacing-lg, 30px);
  }

  .video-card {
    max-width: 100%;
  }

  .choice-buttons {
    gap: var(--spacing-md, 20px);
    flex-wrap: wrap;
  }

  .choice-btn {
    padding: 15px 40px;
    font-size: 1.1rem;
    min-height: var(--touch-target-min, 44px);
  }

  .time-option {
    padding: var(--spacing-sm, 12px) var(--spacing-md, 20px);
    font-size: 1rem;
  }

  /* 移动端宽度由内联 + ECharts 自适应控制 */
}

@media (max-width: 480px) {
  .video-examples {
    gap: var(--spacing-md, 20px);
  }

  .choice-buttons {
    gap: 15px;
  }

  .choice-btn {
    padding: var(--spacing-sm, 12px) var(--spacing-lg, 30px);
    font-size: 1rem;
  }

  .time-option {
    padding: 10px 18px;
    font-size: var(--font-size-small, 0.9rem);
  }
}
</style>