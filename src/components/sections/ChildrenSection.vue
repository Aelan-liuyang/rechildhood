<template>
  <section id="children" class="section">
    <h2 class="section-title">在平台上还有一个特殊群体更值得关注</h2>
    <div class="chart-container" ref="chart5"></div>
    <div class="chart-container" ref="chart4"></div>
    <h2 class="chart-subtitle">那就是儿童群体</h2>
    <!-- <p class="data-source">数据来源：CNNIC</p> -->
    <div class="highlight-box">
      <p>截至2023年底，我国未成年网民规模达<span
          class="highlight-num">1.96亿</span>，未成年人互联网普及率高达<span
          class="highlight-num">97.3%</span>。</p>
    </div>
    <div class="chart-container" ref="chart6"></div>
    <p class="data-note small">
      截至2024年6月，10岁以前首次"触网"的未成年人占比达52%，较上年提高7.4%。村镇儿童过早接触直播/短视频的比例（82.3%）远高于城市儿童（51.6%）。以刚进入幼儿园的3岁儿童为例，78.6%的儿童屏幕时间超过了每天1小时的指南推荐标准。
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart4 = ref(null)
const chart5 = ref(null)
const chart6 = ref(null)
let myChart4Instance = null

// 创建一个函数来高亮0-18岁部分
const highlightZeroToEighteen = () => {
  if (myChart4Instance) {
    // 高亮显示"0-18岁"部分
    myChart4Instance.dispatchAction({
      type: 'highlight',
      name: '0-18岁'
    })

    // 显示工具提示
    myChart4Instance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 0
    })

    // 设置一个定时器，创建闪烁效果
    let isHighlighted = true
    const interval = setInterval(() => {
      if (myChart4Instance) {
        if (isHighlighted) {
          myChart4Instance.dispatchAction({
            type: 'downplay',
            name: '0-18岁'
          })
        } else {
          myChart4Instance.dispatchAction({
            type: 'highlight',
            name: '0-18岁'
          })
        }
        isHighlighted = !isHighlighted
      }
    }, 1000)

    // 保存interval ID以便清理
    myChart4Instance.__highlightInterval = interval
  }
}

// 创建一个函数来取消高亮
const downplayZeroToEighteen = () => {
  if (myChart4Instance) {
    // 取消高亮显示"0-18岁"部分
    myChart4Instance.dispatchAction({
      type: 'downplay',
      name: '0-18岁'
    })

    // 清理定时器
    if (myChart4Instance.__highlightInterval) {
      clearInterval(myChart4Instance.__highlightInterval)
      myChart4Instance.__highlightInterval = null
    }
  }
}

// 滚动监听函数
let scrollHandler = null

onMounted(() => {
  if (chart4.value) {
    const myChart4 = echarts.init(chart4.value)
    myChart4Instance = myChart4
    myChart4.setOption({
      title: { text: '不同年龄层群体在整体网民中的占比', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie',
        radius: '60%',
        data: [
          {
            value: 20,
            name: '0-18岁',
            itemStyle: {
              // 为0-18岁设置更醒目的颜色
              color: '#e74c3c'
            }
          },
          { value: 35, name: '19-35岁' },
          { value: 25, name: '36-50岁' },
          { value: 15, name: '51-65岁' },
          { value: 5, name: '65岁以上' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }],
      graphic: [{
        type: 'text',
        left: 'center',
        bottom: 0,
        z: 100,
        style: {
          text: '数据来源：CNNIC',
          marginTop: 6,
          textAlign: 'center',
          fill: '#666',
          fontSize: 12,
          fontStyle: 'italic'
        }
      }]
    })

    // 添加滚动监听
    scrollHandler = () => {
      if (!chart4.value) return

      const rect = chart4.value.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // 当图表进入视窗时触发高亮
      if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
        highlightZeroToEighteen()
      } else {
        downplayZeroToEighteen()
      }
    }

    window.addEventListener('scroll', scrollHandler)

    // 初始化时检查是否应该高亮
    setTimeout(() => {
      scrollHandler()
    }, 100)
  }
  if (chart5.value) {
    const myChart5 = echarts.init(chart5.value)
    myChart5.setOption({
      title: { text: '未成年人网民数量与普及率', left: 'center' },
      tooltip: { trigger: 'axis' }, legend: { data: ['网民数量(万人)', '普及率(%)'], bottom: 10 },
      xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023'] },
      yAxis: [{ type: 'value', name: '网民数量(万人)' }, { type: 'value', name: '普及率(%)', max: 100 }],
      series: [{ name: '网民数量(万人)', type: 'bar', data: [18281, 19062, 19347, 19630], itemStyle: { color: '#5470c6' } }, { name: '普及率(%)', type: 'line', yAxisIndex: 1, data: [94.9, 96.8, 97.2, 97.3], itemStyle: { color: '#ee6666' } }],
    })
  }
  if (chart6.value) {
    const myChart6 = echarts.init(chart6.value)
    myChart6.setOption({
      title: { text: '儿童数字设备使用情况', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, legend: { data: ['使用比例(%)', '平均开始年龄'], bottom: 10 },
      xAxis: { type: 'category', data: ['智能手机', '电子游戏', '电视', '网上社交', '电脑', '平板电脑'] },
      yAxis: [{ type: 'value', name: '使用比例(%)', max: 100 }, { type: 'value', name: '平均年龄', max: 10 }],
      series: [{ name: '使用比例(%)', type: 'bar', data: [84, 87, 83, 68, 37, 30], itemStyle: { color: '#91cc75' } }, { name: '平均开始年龄', type: 'line', yAxisIndex: 1, data: [7, 7, 7, 9, 8, 8], itemStyle: { color: '#fac858' }, label: { show: true, formatter: '{c}岁' } }]
    })
  }
})

onUnmounted(() => {
  ;[chart4, chart5, chart6].forEach(r => { if (r?.value) { const inst = echarts.getInstanceByDom(r.value); inst && inst.dispose() } })

  // 清理滚动监听器
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }

  // 清理高亮定时器
  if (myChart4Instance && myChart4Instance.__highlightInterval) {
    clearInterval(myChart4Instance.__highlightInterval)
  }
})
</script>

<style scoped>
.highlight-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
  margin: 40px auto;
}

.highlight-num {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
  animation: metricPulse 4s ease-in-out infinite;
}

@keyframes metricPulse {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(243, 156, 18, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(243, 156, 18, 0.5));
  }
}

.chart-subtitle {
  text-align: center;
  font-size: 2.8rem;
  color: #e74c3c;
  margin: 20px 0;
  font-weight: bold;
}

.data-note.small {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
  background: rgba(102, 126, 234, 0.05);
  padding: 20px 25px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin: 30px auto;
}
</style>