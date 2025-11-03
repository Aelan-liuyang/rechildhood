<template>
  <div>
    <h3>父母：记录成长还是谋取利益？</h3>
    <p>"只是想分享一下"</p>
    <p>是很多家长在社交媒体"晒娃"的初衷。许多账号由家长运营，或是以父母视角拍摄孩子的有趣瞬间，或是以孩子视角开设儿童账号，但是在流量至上、利益诱惑面前，这份分享可能就会变了味。</p>

    <!-- 地图和养育成本左右布局 -->
    <div class="cost-layout">
      <!-- 左侧：地图 -->
      <div class="map-section">
        <h4>各地养育成本交互地图</h4>
        <div id="costMap" class="cost-map-chart"></div>
        <p class="chart-source">数据来源：《中国生育成本报告2024》</p>
      </div>

      <!-- 右侧：养育成本 -->
      <div class="cost-section">
        <h4>养育成本</h4>
        <div class="cost-info-box">
          <div class="child-silhouette">
            <span class="silhouette-value">85万</span>
          </div>
          <div class="map-note">各地0-17岁孩子平均养育成本（港澳台未统计）</div>
          <div class="cost-legend">
            <span class="legend-item"><span class="legend-color" style="background: #fee5d9"></span>30-40万</span>
            <span class="legend-item"><span class="legend-color" style="background: #fcae91"></span>40-50万</span>
            <span class="legend-item"><span class="legend-color" style="background: #fb6a4a"></span>50-60万</span>
            <span class="legend-item"><span class="legend-color" style="background: #de2d26"></span>60-80万</span>
            <span class="legend-item"><span class="legend-color" style="background: #a50f15"></span>80万以上</span>
          </div>
        </div>
      </div>
    </div>

    <div class="data-highlight">
      <p>全国家庭0-17岁孩子的养育成本平均为<span class="big">53.8万元</span></p>
      <p>而仅2023年7月内，儿童博主的平均累计销售额就超过<span class="big">85万元</span>，约是养育成本的两倍。</p>
    </div>

    <h4 style="margin-top: 30px; color: #2c3e50; font-size: 1.4rem;">头部网红月销售额趋势</h4>
    <div ref="salesChart" class="sales-chart"></div>

    <p style="margin-top: 20px;">
      以一头部亲子类型网红分析，其近一个月销售额最高可达2500万-5000万。据第三方数据，儿童网红@瑶一***其短视频社交媒体账号年广告收入或超1650万元，远超90%的同粉丝量级达人。​（《齐鲁晚报》）</p>

    <!-- 儿童认知发展的真相 -->
    <div class="piaget-section">
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
            <div v-if="currentStage === index" class="stage-detail">
              <p>{{ stage.detail }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
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
    height: '180px',
    detail: '婴儿通过看、摸、吃、抓来认识世界，就像"用手和嘴思考"。这个阶段的孩子连"藏猫猫"都难以理解，更无法理解网络的意义，他们的一切行为依赖即时反应。',
    image: new URL('@/assets/images/11.jpg', import.meta.url).href
  },
  {
    name: '前运算阶段',
    age: '2-7岁',
    height: '250px',
    detail: '孩子开始用语言和符号表达，但思维充满局限性：认为月亮会跟着自己走，无法理解他人视角。觉得玩具有生命，会和娃娃聊天。如果果汁从高杯倒进矮杯，他们会坚持矮杯"变少了"，无法理解守恒概念。',
    image: new URL('@/assets/images/12.jpg', import.meta.url).href
  },
  {
    name: '具体运算阶段',
    age: '7-11岁',
    height: '320px',
    detail: '孩子开始有逻辑，但必须依赖具体例子。能理解"A比B高，B比C高，所以A比C高"，但无法回答"如果人类不用吃饭会怎样"这种抽象假设。他们严格按规则行事，认为"规则不能变"。',
    image: new URL('@/assets/images/13.jpg', import.meta.url).href
  },
  {
    name: '形式运算阶段',
    age: '11岁以后',
    height: '390px',
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
      }
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
/* ==================== 数据高亮样式 ==================== */
.data-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px 30px;
  border-radius: 15px;
  color: white;
  margin: 25px 0;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.data-highlight p {
  margin: 12px 0;
  font-size: 1.1rem;
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.data-highlight .big {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* ==================== 地图和养育成本左右布局 ==================== */
.cost-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 30px 0;
}

.map-section,
.cost-section {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.map-section:hover,
.cost-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.map-section h4,
.cost-section h4 {
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
}

.cost-map-chart {
  width: 100%;
  height: 500px;
  background: #f8f9fa;
  border-radius: 12px;
}

.chart-source {
  text-align: center;
  color: #999;
  margin-top: 10px;
  font-size: 0.9rem;
}

.cost-info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.child-silhouette {
  width: 120px;
  height: 180px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 60px 60px 120px 120px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.silhouette-value {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.map-note {
  text-align: center;
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.cost-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #555;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* ==================== 销售额折线图 ==================== */
.sales-chart {
  width: 100%;
  height: 400px;
  background: white;
  border-radius: 16px;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
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
  .cost-layout {
    grid-template-columns: 1fr;
  }

  .cost-map-chart {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .data-highlight .big {
    font-size: 1.4rem;
  }

  .sales-chart {
    height: 320px;
    padding: 15px;
  }

  .map-section,
  .cost-section {
    padding: 20px;
  }

  .cost-map-chart {
    height: 350px;
  }

  .child-silhouette {
    width: 100px;
    height: 150px;
  }

  .silhouette-value {
    font-size: 1.6rem;
  }

  .cost-legend {
    flex-direction: column;
    align-items: flex-start;
  }

  .piaget-container {
    gap: 25px;
  }

  .piaget-stage {
    max-width: 100%;
  }

  .stage-detail {
    width: 280px;
  }
}

/* ==================== Piaget 阶段样式 ==================== */
.piaget-section {
  margin-top: 60px;
  padding: 40px 30px;
  background: linear-gradient(135deg, rgba(255, 236, 210, 0.4) 0%, rgba(252, 182, 159, 0.4) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.piaget-title {
  color: #2c3e50;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 20px 0;
}

.piaget-intro {
  color: #555;
  font-size: 1rem;
  line-height: 1.8;
  text-align: center;
  max-width: 900px;
  margin: 0 auto 40px;
  padding: 0 20px;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.piaget-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 35px;
  align-items: end;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.piaget-stage {
  max-width: 360px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.piaget-stage:hover {
  transform: translateY(-12px);
}

.stage-figure {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50% 50% 20px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
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
  border-radius: 50% 50% 20px 20px;
  opacity: 0.92;
  padding: 12px;
  transition: opacity 0.3s, transform 0.3s;
}

.piaget-stage:hover .stage-photo {
  opacity: 1;
  transform: scale(1.05);
}

.figure-icon {
  font-size: 3rem;
  transition: font-size 0.4s;
}

.piaget-stage:hover .figure-icon {
  font-size: 3.3rem;
}

.stage-info {
  background: white;
  padding: 20px 15px;
  border-radius: 16px;
  margin-top: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s;
}

.piaget-stage:hover .stage-info {
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  transform: translateY(-3px);
}

.stage-age {
  font-size: 1.05rem;
  color: #667eea;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.stage-name {
  font-size: 1.1rem;
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
  padding: 22px 24px;
  border-radius: 16px;
  width: 320px;
  max-width: 90vw;
  margin-bottom: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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