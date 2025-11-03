<template>
  <div>
    <h3>MCN机构：流量公式的制造者</h3>
    <p>"网红儿童"内容的制作者远不止是分享生活的父母，其背后通常有专业的推手。MCN机构看到了儿童群体在线上商业变现上的潜力。</p>

    <!-- 两个图表横向布局 -->
    <div class="charts-row">
      <div class="chart-item">
        <h4 class="chart-title">2023年3月 有孩家庭人群线上消费能力</h4>
        <div ref="chart1" class="chart-container-small"></div>
        <!-- <p class="chart-note">注：1、有孩家庭人群指图像标签为已婚且家庭有孩子（0-18岁）的活跃用户;2、世代父母指95后+00后中标签为已婚且
          家庭有孩子(0-18岁)的活跃用户;3、活跃占比TG1:目标人群某个标签属性的月活跃占比除以全网具有该标签属性的月活跃比*100
        </p> -->
      </div>
      <div class="chart-item">
        <h4 class="chart-title">2023年3月 有孩家庭人群线上消费意愿</h4>
        <div ref="chart2" class="chart-container-small"></div>
        <!-- <p class="chart-note">Source：QuestMobile
          GROWTH 用户画像标签数据库 2025年3月。</p> -->
      </div>
    </div>

    <!-- 第三个图表单独占一行 -->
    <div class="chart-full">
      <h4 class="chart-title">2025年3月 有孩家庭人群&Z世代父母 兴趣偏好活跃占比TOP15</h4>
      <div ref="chart3" class="chart-container-large"></div>
      <p class="chart-note">
        注：1、有孩家庭人群指画像标签为已婚且家庭有孩子（0-18岁）的活跃用户;2、Z世代父母指95后+00后中标签为已婚目家庭有孩子（0-18岁）的活跃用户:3、活跃占比：目标人群具有某个标签属性的月活跃用户教除以该目标人群的月活跃用户数;4、占比差值=Z世代父母兴趣标签活跃占比-有孩家庭人群兴趣标签活跃占比。5、活跃占比TGI:目标人群某个标签属性的月活跃占比除以全网具有该标签属性的月活跃比*100<br>Source：<span
          style="color: #ffd700; font-weight: bold;">QuestMobile</span>
        GROWTH 用户画像标签数据库 2025年3月</p>
    </div>

    <div class="formula-box">
      <p class="formula">萌娃(40%) + 冲突剧情(30%) + 商品植入(30%) = 爆款模板</p>
    </div>

    <p>MCN常会套用这样的流量公式，主动签约有潜力的素人账号，提供从人设定位、剧本编写到拍摄剪辑、商业变现的全套服务。</p>

    <div class="data-highlight">
      <p>粉丝量百万以上账号中，<span class="big">54.9%</span>已与MCN签约</p>
    </div>
    <p class="warning">但是MCN资质参差不齐，签约后伴随着的是：</p>
    <ul>
      <li>高频率的视频发表（亲子类头部达人月发布视频最高达96条）</li>
      <li>不平等的分成比例（自营模式分成最低仅30%）</li>
      <li>困难的解约方式以及高昂的违约金（最高可达单月流水的24倍）</li>
    </ul>
    <h4 style="margin-top: 30px; color: #2c3e50; font-size: 1.4rem;">MCN合作模式与分成比例</h4>
    <div class="mcn-revenue-chart">
      <div class="revenue-model" v-for="model in mcnModels" :key="model.name">
        <div class="model-header" :style="{ background: model.gradient }">
          <h5>{{ model.name }}</h5>
          <p class="model-desc">{{ model.desc }}</p>
        </div>
        <div class="revenue-split">
          <div class="split-bar">
            <div class="creator-share" :style="{
              width: model.creatorShare,
              background: model.creatorColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.05rem',
              height: '100%',
              minHeight: '50px',
              padding: '0 10px',
              boxSizing: 'border-box'
            }">
              创作者 {{ model.creatorShare }}
            </div>
            <div class="mcn-share" :style="{
              width: model.mcnShare,
              background: '#3498db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.05rem',
              height: '100%',
              minHeight: '50px',
              padding: '0 10px',
              boxSizing: 'border-box'
            }">
              MCN {{ model.mcnShare }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="penalty-box">
      <h4>违约条款示例：</h4>
      <div class="danmaku-container">
        <div class="danmaku-track" v-for="(line, lineIndex) in 3" :key="lineIndex">
          <div class="danmaku-content" :style="{ animationDelay: `${lineIndex * 2}s` }">
            <span class="danmaku-item" v-for="(item, index) in penaltyItems" :key="`${lineIndex}-${index}`">
              <span class="danmaku-text">{{ item.text }}</span><span class="red-text">{{ item.highlight }}</span><span
                class="danmaku-text">{{ item.suffix }}</span>
            </span>
            <!-- 复制一份用于无缝循环 -->
            <span class="danmaku-item" v-for="(item, index) in penaltyItems" :key="`${lineIndex}-copy-${index}`">
              <span class="danmaku-text">{{ item.text }}</span><span class="red-text">{{ item.highlight }}</span><span
                class="danmaku-text">{{ item.suffix }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <p class="conclusion-text">这促使着父母不得不将儿童账号的商业性提高。</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
let myChart1Instance = null
let myChart2Instance = null
let myChart3Instance = null

// 违约条款数据
const penaltyItems = [
  { text: '未经同意在非指定平台表演，违规一次需承担合同期内单月最高流水收入的', highlight: '24倍', suffix: '赔偿　' },
  { text: '未经同意擅自带公司平台的消费者去其他平台消费的，发生一次，需承担最高单月流水收入的', highlight: '24倍', suffix: '赔偿　' },
  { text: '未经同意擅自接第三方活动的，发生一次须赔偿公司', highlight: '50万元', suffix: '　' },
  { text: '主播擅自提取账号佣金的，需赔偿不低于', highlight: '50万元', suffix: '　' },
  { text: '劝诱、帮助其他员工及合作伙伴离职、终止合作的，公司可解除合同并索赔不低于', highlight: '50万元', suffix: '　' }
]

// MCN合作模式数据
const mcnModels = [
  {
    name: '自营模式',
    desc: 'MCN全程运营',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    creatorShare: '30%',
    mcnShare: '70%',
    creatorColor: '#e74c3c'
  },
  {
    name: '联营模式',
    desc: '共同运营管理',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    creatorShare: '50%',
    mcnShare: '50%',
    creatorColor: '#e74c3c'
  },
  {
    name: '签约模式',
    desc: '创作者主导运营',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    creatorShare: '70%',
    mcnShare: '30%',
    creatorColor: '#27ae60'
  }
]

onMounted(() => {
  // chart1 - 2023年有孩家庭人群线上消费能力（折线+柱状）
  if (chart1.value) {
    myChart1Instance = echarts.init(chart1.value)
    myChart1Instance.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['有孩家庭人群活跃占比TGI', 'Z世代父母活跃占比TGI', '有孩家庭人群活跃占比'],
        bottom: 5,
        textStyle: { fontSize: 10 }
      },
      grid: {
        left: '8%',
        right: '10%',
        bottom: '22%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['1-299元', '300-999元', '1000-1999元', '2000-22999元', '3000元以上'],
        axisLabel: { fontSize: 10, rotate: 20, interval: 0 }
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          max: 100,
          axisLabel: { formatter: '{value}%', fontSize: 10 }
        },
        {
          type: 'value',
          name: '',
          max: 160,
          axisLabel: { formatter: '{value}', fontSize: 10 }
        }
      ],
      series: [
        {
          name: 'Z世代父母活跃占比TGI',
          type: 'line',
          data: [9.9, 39.0, 107.1, 153.4, 154.6],
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { color: '#FFD700', width: 3 },
          itemStyle: { color: '#FFD700' },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold',
            formatter: '{c}'
          }
        },
        {
          name: '有孩家庭人群活跃占比TGI',
          type: 'line',
          data: [24.8, 57.7, 103.6, 134.6, 155.6],
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { color: '#1E90FF', width: 2 },
          itemStyle: { color: '#1E90FF' },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            position: 'bottom',
            fontSize: 10,
            formatter: '{c}'
          }
        },
        {
          name: '有孩家庭人群活跃占比',
          type: 'bar',
          data: [0.0, 13.20, 44.20, 26.60, 14.70],
          yAxisIndex: 0,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FFD700' },
              { offset: 1, color: '#FFA500' }
            ])
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold',
            formatter: '{c}%'
          },
          barWidth: '45%'
        }
      ]
    })
  }

  // chart2 - 2023年有孩家庭人群线上消费意愿（折线+柱状）
  if (chart2.value) {
    myChart2Instance = echarts.init(chart2.value)
    myChart2Instance.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['有孩家庭人群活跃占比TGI', 'Z世代父母活跃占比TGI', '有孩家庭人群活跃占比'],
        bottom: 5,
        textStyle: { fontSize: 10 }
      },
      grid: {
        left: '8%',
        right: '10%',
        bottom: '22%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['低', '中', '高'],
        axisLabel: { fontSize: 12 }
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          max: 100,
          axisLabel: { formatter: '{value}%', fontSize: 10 }
        },
        {
          type: 'value',
          name: '',
          max: 120,
          axisLabel: { formatter: '{value}', fontSize: 10 }
        }
      ],
      series: [
        {
          name: '有孩家庭人群活跃占比TGI',
          type: 'line',
          data: [45.3, 104.3, 145.6],
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { color: '#FFD700', width: 3 },
          itemStyle: { color: '#FFD700' },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold',
            formatter: '{c}'
          }
        },
        {
          name: 'Z世代父母活跃占比TGI',
          type: 'line',
          data: [25.4, 105.7, 162.9],
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { color: '#1E90FF', width: 2 },
          itemStyle: { color: '#1E90FF' },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            position: 'bottom',
            fontSize: 10,
            formatter: '{c}'
          }
        },
        {
          name: '有孩家庭人群活跃占比',
          type: 'bar',
          data: [10.0, 59.5, 30.6],
          yAxisIndex: 0,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#87CEEB' },
              { offset: 1, color: '#4682B4' }
            ])
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold',
            formatter: '{c}%'
          },
          barWidth: '45%'
        }
      ]
    })
  }

  // chart3 - 有孩家庭人群与Z世代父母兴趣偏好对比（分组柱状图 + 折线）
  if (chart3.value) {
    myChart3Instance = echarts.init(chart3.value)

    const categories = ['达人内容', '短视频', '时尚', '音乐', '分享', '影视剧/综艺', '智能生活', '游戏',
      '阅读', '美食', '拍摄/美图', '咨讯', '理财', 'AIGC', '旅游']
    const parentData = [73.1, 64.3, 62.4, 61.3, 59.7, 54.6, 47.7, 44.5, 40.4, 32.8, 31.1, 31.0, 24.5, 22.0, 21.0]
    const zGenData = [79.9, 65.4, 60.1, 66.4, 61.2, 44.8, 41.2, 38.9, 37.1, 34.2, 27.8, 23.4, 24.5, 21.5, 18.5]

    // 计算占比差值 = Z世代父母 - 有孩家庭人群
    const diffData = zGenData.map((val, idx) => (val - parentData[idx]).toFixed(1))

    myChart3Instance.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          let result = params[0].name + '<br/>'
          params.forEach(param => {
            result += param.marker + param.seriesName + ': ' + param.value + (param.seriesName === '占比差值' ? '' : '%') + '<br/>'
          })
          return result
        }
      },
      legend: {
        data: ['有孩家庭人群', 'Z世代父母', '占比差值'],
        top: 5,
        textStyle: { fontSize: 11 }
      },
      grid: {
        left: '8%',
        right: '8%',
        bottom: '15%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          fontSize: 10,
          rotate: 35,
          interval: 0
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '活跃占比',
          max: 100,
          axisLabel: {
            formatter: '{value}%',
            fontSize: 10
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
          name: '占比差值',
          min: -10,
          max: 20,
          axisLabel: {
            formatter: '{value}',
            fontSize: 10
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '有孩家庭人群',
          type: 'bar',
          yAxisIndex: 0,
          data: parentData,
          itemStyle: {
            color: '#5470c6'
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 9,
            formatter: '{c}%'
          },
          barWidth: '20%'
        },
        {
          name: 'Z世代父母',
          type: 'bar',
          yAxisIndex: 0,
          data: zGenData,
          itemStyle: {
            color: '#fac858'
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 9,
            formatter: '{c}%'
          },
          barWidth: '20%'
        },
        {
          name: '占比差值',
          type: 'line',
          yAxisIndex: 1,
          data: diffData,
          smooth: true,
          lineStyle: {
            color: '#ee6666',
            width: 3,
            type: 'solid'
          },
          itemStyle: {
            color: '#ee6666',
            borderWidth: 2
          },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#ee6666',
            formatter: function (params) {
              return params.value > 0 ? '+' + params.value : params.value
            }
          },
          markLine: {
            silent: true,
            symbol: 'none',
            data: [
              {
                yAxis: 0,
                lineStyle: {
                  color: '#999',
                  type: 'dashed',
                  width: 1
                },
                label: {
                  show: false
                }
              }
            ]
          }
        }
      ]
    })
  }
})

onUnmounted(() => {
  if (myChart1Instance) myChart1Instance.dispose()
  if (myChart2Instance) myChart2Instance.dispose()
  if (myChart3Instance) myChart3Instance.dispose()
})
</script>

<style scoped>
/* ==================== 图表布局样式 ==================== */
.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 25px 0;
}

.chart-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.chart-full {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 15px 0;
  font-weight: 600;
  text-align: center;
}

.chart-container-small {
  width: 100%;
  height: 320px;
}

.chart-container-large {
  width: 100%;
  height: 380px;
}

.chart-note {
  font-size: 0.85rem;
  color: #666;
  margin: 10px 0 0 0;
  line-height: 1.6;
  text-align: left;
}

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

/* ==================== 流量公式 ==================== */
.formula-box {
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 5px solid #e17055;
  box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4);
}

.formula {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
  text-align: center;
  letter-spacing: 0.5px;
}

/* ==================== MCN分成图表 ==================== */
.mcn-revenue-chart {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 25px 0;
}

.revenue-model {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.revenue-model:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.model-header {
  padding: 20px;
  color: white;
  text-align: center;
}

.model-header h5 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.model-desc {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.95;
}

.revenue-split {
  padding: 20px;
}

.split-bar {
  display: flex;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.creator-share),
:deep(.mcn-share) {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s;
  position: relative;
  animation: scaleIn 0.6s ease forwards;
}

@keyframes scaleIn {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.revenue-model:hover :deep(.creator-share),
.revenue-model:hover :deep(.mcn-share) {
  filter: brightness(1.1);
}

/* ==================== 警告样式 ==================== */
.warning {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe5cc 100%);
  border-left: 4px solid #f39c12;
  padding: 15px 20px;
  margin: 25px 0 15px;
  border-radius: 8px;
  color: #856404;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.2);
}

ul {
  list-style: none;
  padding-left: 0;
}

ul li {
  position: relative;
  padding-left: 30px;
  margin: 12px 0;
  line-height: 1.8;
  color: #2c3e50;
  word-break: keep-all;
  overflow-wrap: break-word;
}

ul li::before {
  content: '▸';
  position: absolute;
  left: 15px;
  color: #667eea;
  font-weight: bold;
}

.penalty-box {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-left: 4px solid #e74c3c;
  padding: 20px 25px;
  margin: 25px 0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.2);
  overflow: hidden;
  position: relative;
}

.penalty-box h4 {
  color: #ff6b6b;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
  text-align: center;
}

/* 弹幕容器 */
.danmaku-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.danmaku-track {
  position: absolute;
  width: 100%;
  height: 60px;
  overflow: hidden;
}

.danmaku-track:nth-child(1) {
  top: 10px;
}

.danmaku-track:nth-child(2) {
  top: 75px;
}

.danmaku-track:nth-child(3) {
  top: 140px;
}

.danmaku-content {
  display: inline-block;
  white-space: nowrap;
  animation: danmaku-scroll 60s linear infinite;
  padding-left: 100%;
}

@keyframes danmaku-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.danmaku-container:hover .danmaku-content {
  animation-play-state: paused;
}

.danmaku-item {
  display: inline-block;
  color: #fff;
  font-size: 1rem;
  padding: 10px 24px;
  margin-right: 50px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  white-space: nowrap;
}

.danmaku-text {
  display: inline;
  color: #fff;
}

.red-text {
  color: #ff4757;
  font-weight: 900;
  font-size: 1.3rem;
  text-shadow: 0 0 10px rgba(255, 71, 87, 0.8),
    0 0 20px rgba(255, 71, 87, 0.5);
  padding: 0 8px;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {

  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 71, 87, 0.8),
      0 0 20px rgba(255, 71, 87, 0.5);
  }

  50% {
    text-shadow: 0 0 20px rgba(255, 71, 87, 1),
      0 0 30px rgba(255, 71, 87, 0.8),
      0 0 40px rgba(255, 71, 87, 0.5);
  }
}

/* 结束语样式 */
.conclusion-text {
  margin-top: 30px;
  padding: 20px 30px;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-left: 5px solid #ff9800;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #e65100;
  text-align: center;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
  letter-spacing: 0.5px;
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .charts-row {
    grid-template-columns: 1fr;
  }

  .chart-container-small {
    height: 280px;
  }

  .chart-container-large {
    height: 320px;
  }

  .data-highlight .big {
    font-size: 1.4rem;
  }

  .formula {
    font-size: 1rem;
  }

  .split-bar {
    height: 40px;
  }

  :deep(.creator-share),
  :deep(.mcn-share) {
    font-size: 0.9rem;
  }

  .model-header h5 {
    font-size: 1.1rem;
  }

  .danmaku-container {
    height: 150px;
  }

  .danmaku-track {
    height: 50px;
  }

  .danmaku-track:nth-child(2) {
    top: 55px;
  }

  .danmaku-track:nth-child(3) {
    top: 105px;
  }

  .danmaku-item {
    font-size: 0.85rem;
    padding: 6px 15px;
    margin-right: 30px;
  }

  .red-text {
    font-size: 1.1rem;
  }

  .conclusion-text {
    font-size: 1rem;
    padding: 15px 20px;
  }
}
</style>