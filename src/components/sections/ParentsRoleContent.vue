<template>
  <div>
    <h3>父母：“晒娃”是为了什么？</h3>
    <p>
      "只是想分享一下"是很多家长在社交媒体"晒娃"的初衷。许多账号由家长运营，或是以父母视角拍摄孩子的有趣瞬间，或是以孩子视角开设儿童账号，但是在流量至上、利益诱惑面前，这份分享可能就会变了味。
    </p>

    <!-- 地图和养育成本上下布局 -->
    <div class="cost-layout-wrapper">
      <h4 class="cost-main-title">养育成本分析</h4>

      <!-- 地图区域 - 占据更大空间 -->
      <div class="map-section">
        <div id="costMap" class="cost-map-chart"></div>
        <div class="map-footer">
          <div class="cost-legend">
            <span class="legend-item"><span class="legend-color"
                style="background: #fee5d9"></span>30-40万</span>
            <span class="legend-item"><span class="legend-color"
                style="background: #fcae91"></span>40-50万</span>
            <span class="legend-item"><span class="legend-color"
                style="background: #fb6a4a"></span>50-60万</span>
            <span class="legend-item"><span class="legend-color"
                style="background: #de2d26"></span>60-80万</span>
            <span class="legend-item"><span class="legend-color"
                style="background: #a50f15"></span>80万以上</span>
          </div>
          <p class="chart-source">各地0-17岁孩子平均养育成本（港澳台未统计）数据来源：《中国生育成本报告2024》</p>
        </div>
      </div>

      <!-- 信息卡片区域 - 横向排列 -->
      <div class="cost-info-section">
        <div class="cost-info-card cost-average-card">
          <div class="money-bag-icon">
            <span class="money-icon">💰</span>
          </div>
          <div class="cost-label">全国家庭0-17岁孩子的养育成本平均为</div>
          <div class="cost-value-wrapper">
            <span class="cost-big">53.8</span>
            <span class="cost-unit">万元</span>
          </div>
        </div>

        <div class="cost-info-card revenue-data-box">
          <div class="revenue-icon">📊</div>
          <p class="revenue-text">据第三方数据，儿童网红@瑶一***其短视频社交媒体账号年广告收入或超<span
              class="revenue-highlight">1650万元</span>，远超90%的同粉丝量级达人。</p>
          <p class="revenue-source">数据来源：澎湃新闻、《齐鲁晚报》</p>
        </div>
      </div>
    </div>
    <div class="sales-highlight">
      <p>2025年7月，儿童博主的平均销售额就达到<span class="sales-big">85万元</span>，约是养育成本的两倍。</p>
    </div>
    <div class="sales-section">
      <h4
        style="margin-top: 20px; color: #2c3e50; font-size: 1.3rem; margin-bottom: 15px;">
        亲子头部网红月销售额趋势</h4>
      <div ref="salesChart" class="sales-chart"></div>
      <p class="chart-source">数据来源：抖查查</p>

      <p class="sales-text">
        以一头部亲子类型网红分析，其近一个月销售额最高可达3750万。可以看到，当前家庭育儿面临高经济压力，而在高额生育成本与亲子网红收益可观的情况下，<span
          class="highlight-text">"网红儿童"</span>这一赛道成为了家长们不错的"减压"方式。</p>
    </div>

    <!-- 儿童认知发展的真相 -->
    <!-- <div class="piaget-section">
      <h3 class="piaget-title">儿童认知发展的真相</h3>
      <p class="piaget-intro">
        皮亚杰理论清晰表明，7岁以下儿童无法理解抽象商业行为，11岁以下难以真正自主决策。当儿童账号展示"想红""爱表演"时，背后往往是父母将自身价值观嫁接给认知能力受限的孩子。
      </p>

      <div class="piaget-container">
        <div v-for="(stage, index) in piagetStages" :key="index" class="piaget-stage" @mouseenter="currentStage = index"
          @mouseleave="currentStage = null">
          <div class="stage-figure" :style="{ height: stage.height }">
            <img v-if="stage.image" :src="stage.image" alt="阶段图片" class="stage-photo" />
            <div class="figure-icon" v-else>👶</div>
          </div>
          <div class="stage-info">
            <p class="stage-age">{{ stage.age }}</p>
            <h4 class="stage-name">{{ stage.name }}</h4>
          </div>
          <transition name="slide-up">
            <div v-if="currentStage === index" class="stage-detail" :class="`detail-pos-${index}`">
              <p>{{ stage.detail }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// ==================== Piaget 阶段数据 ====================
const currentStage = ref(null)
const piagetStages = [
  {
    name: '感知运动阶段',
    age: '0-2岁',
    height: '120px',
    detail: '婴儿通过看、摸、吃、抓来认识世界，就像"用手和嘴思考"。这个阶段的孩子连"藏猫猫"都难以理解，更无法理解网络的意义，他们的一切行为依赖即时反应。',
    image: new URL('@/assets/images/11.jpg', import.meta.url).href
  },
  {
    name: '前运算阶段',
    age: '2-7岁',
    height: '140px',
    detail: '孩子开始用语言和符号表达，但思维充满局限性：认为月亮会跟着自己走，无法理解他人视角。觉得玩具有生命，会和娃娃聊天。如果果汁从高杯倒进矮杯，他们会坚持矮杯"变少了"，无法理解守恒概念。',
    image: new URL('@/assets/images/12.jpg', import.meta.url).href
  },
  {
    name: '具体运算阶段',
    age: '7-11岁',
    height: '160px',
    detail: '孩子开始有逻辑，但必须依赖具体例子。能理解"A比B高，B比C高，所以A比C高"，但无法回答"如果人类不用吃饭会怎样"这种抽象假设。他们严格按规则行事，认为"规则不能变"。',
    image: new URL('@/assets/images/13.jpg', import.meta.url).href
  },
  {
    name: '形式运算阶段',
    age: '11岁以后',
    height: '180px',
    detail: '青少年逐渐能进行假设推理，比如讨论"如果地球没有重力"，但这类能力仍需教育引导才能成熟。此前，儿童对网络风险、长期后果缺乏预判力。',
    image: new URL('@/assets/images/14.jpg', import.meta.url).href
  }
]

// ==================== 数据导入 ====================
const costRefImg = new URL('@/assets/images/cost.png', import.meta.url).href

// 销售额时间线数据
const salesData = [
  { date: '9.26', sales: '1-2.5万', revenueMin: 250, revenueMax: 500, revenueAvg: 375 },
  { date: '10.9', sales: '1-2.5万', revenueMin: 500, revenueMax: 750, revenueAvg: 625 },
  { date: '10.13', sales: '5-7.5万', revenueMin: 1000, revenueMax: 2500, revenueAvg: 1750 },
  { date: '10.15', sales: '10-25万', revenueMin: 2500, revenueMax: 5000, revenueAvg: 3750 },
  { date: '10.17', sales: '10-25万', revenueMin: 1000, revenueMax: 2500, revenueAvg: 1750 },
  { date: '10.19', sales: '5-7.5万', revenueMin: 2500, revenueMax: 5000, revenueAvg: 3750 },
  { date: '10.22', sales: '10-25万', revenueMin: 500, revenueMax: 750, revenueAvg: 625 },
  { date: '10.24', sales: '10-25万', revenueMin: 2500, revenueMax: 5000, revenueAvg: 3750 }
]

const salesChart = ref(null)
let salesChartInstance = null

onMounted(() => {
  // 初始化销售额折线图
  if (salesChart.value) {
    salesChartInstance = echarts.init(salesChart.value)

    const dates = salesData.map(item => item.date)
    const avgRevenues = salesData.map(item => item.revenueAvg)
    const minRevenues = salesData.map(item => item.revenueMin)
    const maxRevenues = salesData.map(item => item.revenueMax)

    // 转换销量数据：将"1-2.5万"转换为数值（取中间值）
    const salesVolumes = salesData.map(item => {
      const match = item.sales.match(/(\d+\.?\d*)-(\d+\.?\d*)/)
      if (match) {
        const min = parseFloat(match[1])
        const max = parseFloat(match[2])
        return (min + max) / 2
      }
      return 0
    })

    salesChartInstance.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const dataIndex = params[0].dataIndex
          const item = salesData[dataIndex]
          let result = `${item.date}<br/>`
          params.forEach(param => {
            if (param.seriesName === '销量（万件）') {
              result += `${param.marker}${param.seriesName}: ${item.sales}<br/>`
            } else {
              result += `${param.marker}${param.seriesName}: ${item.revenueMin}-${item.revenueMax}万元<br/>`
            }
          })
          return result
        },
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        borderColor: '#667eea',
        borderWidth: 2,
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          fontSize: 12,
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '销售额（万元）',
          position: 'left',
          axisLabel: {
            formatter: '{value}',
            fontSize: 12,
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#eee'
            }
          }
        },
        {
          type: 'value',
          name: '销量（万件）',
          position: 'right',
          axisLabel: {
            formatter: '{value}',
            fontSize: 12,
            color: '#666'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '销售额',
          type: 'line',
          yAxisIndex: 0,
          data: avgRevenues,
          smooth: true,
          lineStyle: {
            color: '#667eea',
            width: 3
          },
          itemStyle: {
            color: '#667eea',
            borderWidth: 2,
            borderColor: '#fff'
          },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold',
            color: '#667eea',
            formatter: '{c}'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
            ])
          }
        },
        {
          name: '销量（万件）',
          type: 'line',
          yAxisIndex: 1,
          data: salesVolumes,
          smooth: true,
          lineStyle: {
            color: '#ff6b6b',
            width: 3
          },
          itemStyle: {
            color: '#ff6b6b',
            borderWidth: 2,
            borderColor: '#fff'
          },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'bottom',
            fontSize: 11,
            fontWeight: 'bold',
            color: '#ff6b6b',
            formatter: '{c}'
          }
        }
      ],
      legend: {
        data: ['销售额', '销量（万件）'],
        bottom: 10,
        textStyle: {
          fontSize: 12
        }
      },
    })
  }
})

onUnmounted(() => {
  if (salesChartInstance) {
    salesChartInstance.dispose()
  }
})
</script>

<style scoped>
/* ==================== 全局段落样式 ==================== */
p {
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: normal;
}

/* ==================== 养育成本平均值样式 ==================== */
.cost-label {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  margin-bottom: 10px;
  word-break: keep-all;
  overflow-wrap: break-word;
  font-weight: 500;
}

.cost-value-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
}

.cost-big {
  font-size: 2.5rem;
  font-weight: 900;
  color: #667eea;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  letter-spacing: -1px;
}

.cost-unit {
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  opacity: 0.85;
}

/* ==================== 地图和养育成本上下布局 ==================== */
.cost-layout-wrapper {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 24px 0;
}

.cost-main-title {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 18px 0;
  text-align: center;
  font-weight: 700;
  padding-bottom: 12px;
  border-bottom: 3px solid #e9ecef;
}

/* 地图区域 - 占据更大空间 */
.map-section {
  width: 100%;
  margin-bottom: 18px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.cost-map-chart {
  width: 100%;
  height: 450px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 12px;
}

.map-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.chart-source {
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

/* 信息卡片区域 - 横向排列 */
.cost-info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 16px;
}

.cost-info-card {
  padding: 18px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cost-info-card:hover {
  transform: translateY(-4px);
}

.cost-average-card {
  background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.cost-average-card:hover {
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
}

.money-bag-icon {
  width: 100%;
  height: auto;
  min-height: 60px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
  position: relative;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}

.money-icon {
  font-size: 3.5rem;
  display: block;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4));
  transition: transform 0.3s ease;
}

.cost-average-card:hover .money-icon {
  transform: rotate(10deg) scale(1.1);
}

.revenue-data-box {
  background: linear-gradient(135deg, #fff9e6 0%, #ffe5cc 100%);
  border-left: 4px solid #ff9800;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.revenue-data-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff9800, #ff6b6b, #ff9800);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 200% 0%;
  }
}

.revenue-data-box:hover {
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.25);
}

.revenue-icon {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 8px;
  display: block;
}

.revenue-text {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #495057;
  margin: 0 0 8px 0;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: normal;
  overflow-wrap: break-word;
}

.revenue-highlight {
  font-weight: 800;
  color: #ff6b6b;
  font-size: 1.1em;
  text-shadow: 0 1px 3px rgba(255, 107, 107, 0.3);
}

.revenue-source {
  font-size: 0.72rem;
  color: #6c757d;
  margin: 0;
  text-align: left;
  font-style: italic;
  padding-top: 6px;
  border-top: 1px solid rgba(108, 117, 125, 0.2);
}

.cost-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 15px 0;
  padding: 12px;
  background: rgba(248, 249, 250, 0.6);
  border-radius: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
  padding: 4px 8px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.legend-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.legend-color {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* ==================== 销售额折线图 ==================== */
.sales-section {
  margin: 16px 0;
  background: white;
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.sales-chart {
  width: 100%;
  height: 300px;
  margin: 0;
  padding: 0;
}

.sales-highlight {
  margin: 10px 0;
  padding: 8px 12px;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe5cc 100%);
  border-radius: 8px;
  border-left: 3px solid #ff9800;
}

.sales-highlight p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #2c3e50;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.sales-big {
  font-size: 1.3rem;
  font-weight: 800;
  color: #ff9800;
}

.sales-text {
  margin-top: 12px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #2c3e50;
  text-align: justify;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.highlight-text {
  font-weight: 700;
  color: #ff9800;
}

/* ==================== 养育成本图片 ==================== */
.cost-image-wrapper {
  width: 100%;
  margin-top: 15px;
  text-align: center;
}

.cost-ref-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 1024px) {
  .cost-layout-wrapper {
    padding: 18px;
    margin: 20px 0;
  }

  .cost-main-title {
    font-size: 1.2rem;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .cost-map-chart {
    height: 420px;
  }

  .cost-info-section {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 14px;
  }

  .map-section {
    margin-bottom: 16px;
    padding: 14px;
  }

  .sales-section {
    margin: 14px 0;
    padding: 14px 16px;
  }

  .sales-chart {
    height: 280px;
  }

  .piaget-section {
    margin-top: 24px;
    padding: 18px 16px;
  }
}

@media (max-width: 768px) {
  .cost-layout-wrapper {
    padding: 14px;
    margin: 18px 0;
  }

  .cost-main-title {
    font-size: 1.15rem;
    margin-bottom: 16px;
    padding-bottom: 8px;
  }

  .map-section {
    padding: 12px;
    margin-bottom: 16px;
  }

  .cost-map-chart {
    height: 380px;
    margin-bottom: 10px;
  }

  .cost-info-section {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 14px;
  }

  .sales-section {
    margin: 12px 0;
    padding: 14px 15px;
  }

  .sales-chart {
    height: 260px;
  }

  .sales-highlight {
    margin: 8px 0;
    padding: 7px 10px;
  }

  .sales-text {
    margin-top: 10px;
  }

  .piaget-section {
    margin-top: 20px;
    padding: 16px 14px;
  }

  .piaget-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .piaget-intro {
    margin-bottom: 14px;
    line-height: 1.55;
  }

  .piaget-container {
    gap: 10px;
    padding: 6px 0;
  }

  .cost-info-card {
    padding: 16px 14px;
  }

  .money-bag-icon {
    min-height: 55px;
    margin-bottom: 10px;
  }

  .money-icon {
    font-size: 3rem;
  }

  .cost-label {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  .cost-big {
    font-size: 1.9rem;
  }

  .cost-unit {
    font-size: 1rem;
  }

  .revenue-icon {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }

  .revenue-text {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 6px;
  }

  .revenue-highlight {
    font-size: 1.05em;
  }

  .revenue-source {
    font-size: 0.7rem;
    padding-top: 6px;
  }

  .cost-legend {
    gap: 8px;
    margin: 10px 0;
  }

  .legend-item {
    font-size: 0.85rem;
  }

  .sales-highlight {
    padding: 10px 12px;
    margin: 10px 0;
  }

  .sales-highlight p {
    font-size: 0.85rem;
  }

  .sales-big {
    font-size: 1.1rem;
  }

  .sales-section {
    padding: 15px 18px;
  }

  .sales-chart {
    height: 280px;
  }

  .sales-text {
    font-size: 0.9rem;
    margin-top: 12px;
  }

  .piaget-section {
    padding: 20px 15px;
  }

  .piaget-title {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }

  .piaget-intro {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }

  .piaget-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 8px 0;
  }

  .piaget-stage {
    max-width: 100%;
  }

  .stage-detail {
    width: 350px;
    max-width: calc(100vw - 30px);
  }

  .stage-detail.detail-pos-0,
  .stage-detail.detail-pos-3 {
    left: 50%;
    transform: translateX(-50%);
  }

  .stage-detail.detail-pos-0::after,
  .stage-detail.detail-pos-3::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .cost-layout-wrapper {
    padding: 12px;
    margin: 16px 0;
  }

  .cost-main-title {
    font-size: 1.05rem;
    margin-bottom: 12px;
    padding-bottom: 6px;
  }

  .map-section {
    padding: 10px;
    margin-bottom: 12px;
  }

  .cost-map-chart {
    height: 320px;
    margin-bottom: 8px;
  }

  .cost-info-section {
    gap: 10px;
    margin-top: 12px;
  }

  .sales-section {
    margin: 10px 0;
    padding: 12px 14px;
  }

  .sales-chart {
    height: 240px;
  }

  .sales-highlight {
    margin: 6px 0;
    padding: 6px 10px;
  }

  .sales-text {
    margin-top: 8px;
  }

  .piaget-section {
    margin-top: 18px;
    padding: 14px 12px;
  }

  .piaget-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .piaget-intro {
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .piaget-container {
    gap: 8px;
    padding: 5px 0;
  }

  .cost-info-card {
    padding: 14px 12px;
  }

  .money-bag-icon {
    min-height: 50px;
    margin-bottom: 8px;
  }

  .money-icon {
    font-size: 2.5rem;
  }

  .cost-label {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .cost-big {
    font-size: 1.7rem;
  }

  .cost-unit {
    font-size: 0.95rem;
  }

  .revenue-icon {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  .revenue-text {
    font-size: 0.8rem;
    line-height: 1.5;
    margin-bottom: 6px;
  }

  .revenue-highlight {
    font-size: 1em;
  }

  .revenue-source {
    font-size: 0.7rem;
    padding-top: 6px;
  }

  .cost-legend {
    gap: 6px;
    padding: 10px;
    margin: 8px 0;
  }

  .legend-item {
    font-size: 0.8rem;
    padding: 3px 6px;
  }

  .legend-color {
    width: 18px;
    height: 18px;
  }

  .chart-source {
    font-size: 0.8rem;
  }

  .piaget-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stage-detail {
    width: 280px;
    max-width: calc(100vw - 20px);
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
  }

  .stage-detail::after {
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
  }
}

/* ==================== Piaget 阶段样式 ==================== */
.piaget-section {
  margin-top: 30px;
  padding: 20px 18px;
  background: linear-gradient(135deg, rgba(255, 236, 210, 0.4) 0%, rgba(252, 182, 159, 0.4) 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.piaget-title {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 12px 0;
}

.piaget-intro {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
  text-justify: inter-ideograph;
  max-width: 1200px;
  margin: 0 auto 16px;
  padding: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.piaget-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  align-items: end;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 0;
}

.piaget-stage {
  max-width: 100%;
  margin: 0;
  position: relative;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.piaget-stage:hover {
  transform: translateY(-8px);
}

.stage-figure {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50% 50% 15px 15px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.piaget-stage:hover .stage-figure {
  box-shadow: 0 16px 45px rgba(102, 126, 234, 0.5);
  transform: scale(1.04);
}

.stage-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  border-radius: 50% 50% 15px 15px;
  opacity: 0.92;
  padding: 6px;
  transition: opacity 0.3s, transform 0.3s;
}

.piaget-stage:hover .stage-photo {
  opacity: 1;
  transform: scale(1.05);
}

.figure-icon {
  font-size: 2rem;
  transition: font-size 0.4s;
}

.piaget-stage:hover .figure-icon {
  font-size: 2.2rem;
}

.stage-info {
  background: white;
  padding: 10px 8px;
  border-radius: 12px;
  margin-top: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s;
}

.piaget-stage:hover .stage-info {
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  transform: translateY(-3px);
}

.stage-age {
  text-align: center;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 700;
  margin: 0 0 0 0;
}

.stage-name {
  font-size: 0.95rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.stage-detail {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 62, 80, 0.96);
  color: white;
  padding: 18px 20px;
  border-radius: 12px;
  width: 450px;
  max-width: calc(100vw - 40px);
  margin-bottom: 15px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 第一个图表（最左边）的弹出框靠右对齐 */
.stage-detail.detail-pos-0 {
  left: 0;
  transform: translateX(0);
}

.stage-detail.detail-pos-0::after {
  left: 30px;
  transform: translateX(0);
}

/* 最后一个图表（最右边）的弹出框靠左对齐 */
.stage-detail.detail-pos-3 {
  left: auto;
  right: 0;
  transform: translateX(0);
}

.stage-detail.detail-pos-3::after {
  left: auto;
  right: 30px;
  transform: translateX(0);
}

/* 中间两个图表保持居中 */
.stage-detail.detail-pos-1,
.stage-detail.detail-pos-2 {
  left: 50%;
  transform: translateX(-50%);
}

.stage-detail::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 12px solid transparent;
  border-top-color: rgba(44, 62, 80, 0.96);
}

.stage-detail p {
  font-size: 0.96rem;
  line-height: 1.7;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: justify;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(25px);
}
</style>