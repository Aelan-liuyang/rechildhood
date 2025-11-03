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
      <div class="chart-note-box">
        <div class="note-header">
          <span class="note-icon">📝</span>
          <span class="note-title">数据说明</span>
        </div>
        <div class="note-content">
          <div class="note-item">
            <span class="note-label">1.</span>
            <span class="note-text"><strong>有孩家庭人群</strong>：画像标签为已婚且家庭有孩子（0-18岁）的活跃用户</span>
          </div>
          <div class="note-item">
            <span class="note-label">2.</span>
            <span class="note-text"><strong>Z世代父母</strong>：95后+00后中标签为已婚且家庭有孩子（0-18岁）的活跃用户</span>
          </div>
          <div class="note-item">
            <span class="note-label">3.</span>
            <span class="note-text"><strong>活跃占比</strong>：目标人群具有某个标签属性的月活跃用户数 ÷ 该目标人群的月活跃用户数</span>
          </div>
          <div class="note-item">
            <span class="note-label">4.</span>
            <span class="note-text"><strong>占比差值</strong>：Z世代父母兴趣标签活跃占比 - 有孩家庭人群兴趣标签活跃占比</span>
          </div>
          <div class="note-item">
            <span class="note-label">5.</span>
            <span class="note-text"><strong>活跃占比TGI</strong>：目标人群某个标签属性的月活跃占比 ÷ 全网具有该标签属性的月活跃占比 × 100</span>
          </div>
        </div>
        <div class="note-source">
          <span class="source-icon">📊</span>
          <span class="source-text">数据来源：<strong class="source-highlight">QuestMobile</strong> GROWTH 用户画像标签数据库
            2025年3月</span>
        </div>
      </div>
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
      <div class="penalty-header">
        <span class="warning-icon">⚠️</span>
        <h4>违约条款示例</h4>
        <span class="warning-icon">⚠️</span>
      </div>
      <p class="penalty-hint">鼠标悬停暂停弹幕</p>
      <div class="danmaku-container">
        <div class="danmaku-track" v-for="(line, lineIndex) in 3" :key="lineIndex" :class="`track-${lineIndex + 1}`">
          <div class="danmaku-content" :style="{
            animationDelay: `${lineIndex * 1.5}s`,
            animationDuration: `${40 + lineIndex * 5}s`
          }">
            <span class="danmaku-item" v-for="(item, index) in penaltyItems" :key="`${lineIndex}-${index}`"
              :class="`item-style-${(index % 3) + 1}`">
              <span class="item-icon">{{ getItemIcon(index) }}</span>
              <span class="danmaku-text">{{ item.text }}</span>
              <span class="red-text">{{ item.highlight }}</span>
              <span class="danmaku-text">{{ item.suffix }}</span>
            </span>
            <!-- 复制一份用于无缝循环 -->
            <span class="danmaku-item" v-for="(item, index) in penaltyItems" :key="`${lineIndex}-copy-${index}`"
              :class="`item-style-${(index % 3) + 1}`">
              <span class="item-icon">{{ getItemIcon(index) }}</span>
              <span class="danmaku-text">{{ item.text }}</span>
              <span class="red-text">{{ item.highlight }}</span>
              <span class="danmaku-text">{{ item.suffix }}</span>
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

// 弹幕项图标
const getItemIcon = (index) => {
  const icons = ['⚡', '💰', '⚠️', '🚫', '📄']
  return icons[index % icons.length]
}

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

/* ==================== 图表注释盒子 ==================== */
.chart-note-box {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  border-radius: 12px;
  padding: 20px 25px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.note-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 2px solid #dee2e6;
}

.note-icon {
  font-size: 1.3rem;
}

.note-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #495057;
  letter-spacing: 0.5px;
}

.note-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.note-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.note-label {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.note-text {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #495057;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.note-text strong {
  color: #667eea;
  font-weight: 600;
}

.note-source {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.source-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.source-text {
  font-size: 0.9rem;
  color: #495057;
  line-height: 1.6;
}

.source-highlight {
  color: #667eea;
  font-weight: 700;
  font-size: 1rem;
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #e74c3c;
  padding: 25px 30px;
  margin: 30px 0;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
}

.penalty-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #e74c3c 0%, #ff6b6b 50%, #e74c3c 100%);
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

.penalty-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 12px;
}

.warning-icon {
  font-size: 1.8rem;
  animation: pulse-warning 2s ease-in-out infinite;
}

@keyframes pulse-warning {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

.penalty-box h4 {
  color: #ff6b6b;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(255, 107, 107, 0.5);
}

.penalty-hint {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0 0 15px 0;
  font-style: italic;
}

/* 弹幕容器 */
.danmaku-container {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
}

.danmaku-track {
  position: absolute;
  width: 100%;
  height: 65px;
  overflow: hidden;
}

.track-1 {
  top: 8px;
}

.track-2 {
  top: 78px;
}

.track-3 {
  top: 148px;
}

.danmaku-content {
  display: inline-block;
  white-space: nowrap;
  animation: danmaku-scroll 40s linear infinite;
  padding-left: 100%;
  will-change: transform;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 1rem;
  padding: 12px 20px;
  margin-right: 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-radius: 28px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.danmaku-item::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 28px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

/* 不同样式的弹幕项 */
.item-style-1 {
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.2) 0%, rgba(231, 76, 60, 0.1) 100%);
  border-color: rgba(231, 76, 60, 0.4);
}

.item-style-2 {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 107, 107, 0.1) 100%);
  border-color: rgba(255, 107, 107, 0.4);
}

.item-style-3 {
  background: linear-gradient(135deg, rgba(255, 71, 87, 0.2) 0%, rgba(255, 71, 87, 0.1) 100%);
  border-color: rgba(255, 71, 87, 0.4);
}

.danmaku-container:hover .danmaku-item {
  transform: scale(1.05);
}

.item-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.danmaku-text {
  display: inline;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.red-text {
  display: inline-block;
  color: #ff4757;
  font-weight: 900;
  font-size: 1.35rem;
  text-shadow: 0 0 12px rgba(255, 71, 87, 0.9),
    0 0 24px rgba(255, 71, 87, 0.6),
    0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0 10px;
  animation: glow-intense 2.5s ease-in-out infinite;
  letter-spacing: 1px;
  position: relative;
}

.red-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff4757, transparent);
  opacity: 0.6;
}

@keyframes glow-intense {

  0%,
  100% {
    text-shadow: 0 0 12px rgba(255, 71, 87, 0.9),
      0 0 24px rgba(255, 71, 87, 0.6),
      0 2px 4px rgba(0, 0, 0, 0.5);
    transform: scale(1);
  }

  50% {
    text-shadow: 0 0 18px rgba(255, 71, 87, 1),
      0 0 35px rgba(255, 71, 87, 0.8),
      0 0 50px rgba(255, 71, 87, 0.6),
      0 2px 4px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
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

  .chart-note-box {
    padding: 18px 20px;
    margin-top: 18px;
  }

  .note-header {
    margin-bottom: 12px;
    padding-bottom: 10px;
  }

  .note-icon {
    font-size: 1.2rem;
  }

  .note-title {
    font-size: 1rem;
  }

  .note-content {
    gap: 10px;
    margin-bottom: 12px;
  }

  .note-label {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
  }

  .note-text {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .note-source {
    padding: 10px 14px;
  }

  .source-icon {
    font-size: 1.1rem;
  }

  .source-text {
    font-size: 0.85rem;
  }

  .source-highlight {
    font-size: 0.95rem;
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

  .penalty-box {
    padding: 20px 18px;
  }

  .penalty-header {
    gap: 12px;
  }

  .warning-icon {
    font-size: 1.5rem;
  }

  .penalty-box h4 {
    font-size: 1.2rem;
  }

  .penalty-hint {
    font-size: 0.8rem;
    margin-bottom: 12px;
  }

  .danmaku-container {
    height: 170px;
  }

  .danmaku-track {
    height: 52px;
  }

  .track-1 {
    top: 6px;
  }

  .track-2 {
    top: 60px;
  }

  .track-3 {
    top: 114px;
  }

  .danmaku-item {
    font-size: 0.9rem;
    padding: 10px 16px;
    margin-right: 30px;
    gap: 6px;
  }

  .item-icon {
    font-size: 1rem;
  }

  .red-text {
    font-size: 1.15rem;
    padding: 0 6px;
  }

  .conclusion-text {
    font-size: 1rem;
    padding: 18px 20px;
  }
}

@media (max-width: 480px) {
  .chart-note-box {
    padding: 16px 15px;
    margin-top: 15px;
    border-radius: 10px;
  }

  .note-header {
    gap: 8px;
    margin-bottom: 10px;
    padding-bottom: 8px;
  }

  .note-icon {
    font-size: 1.1rem;
  }

  .note-title {
    font-size: 0.95rem;
  }

  .note-content {
    gap: 8px;
    margin-bottom: 10px;
  }

  .note-label {
    width: 18px;
    height: 18px;
    font-size: 0.75rem;
  }

  .note-text {
    font-size: 0.85rem;
    line-height: 1.8;
  }

  .note-text strong {
    font-size: 0.85rem;
  }

  .note-source {
    padding: 10px 12px;
    gap: 6px;
    border-radius: 6px;
  }

  .source-icon {
    font-size: 1rem;
  }

  .source-text {
    font-size: 0.8rem;
    line-height: 1.6;
  }

  .source-highlight {
    font-size: 0.85rem;
  }

  .penalty-box {
    padding: 18px 15px;
    margin: 25px 0;
  }

  .penalty-header {
    gap: 10px;
  }

  .warning-icon {
    font-size: 1.3rem;
  }

  .penalty-box h4 {
    font-size: 1.1rem;
  }

  .penalty-hint {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }

  .danmaku-container {
    height: 150px;
  }

  .danmaku-track {
    height: 46px;
  }

  .track-1 {
    top: 4px;
  }

  .track-2 {
    top: 52px;
  }

  .track-3 {
    top: 100px;
  }

  .danmaku-content {
    animation-duration: 35s;
  }

  .danmaku-item {
    font-size: 0.85rem;
    padding: 8px 14px;
    margin-right: 25px;
    gap: 5px;
    border-radius: 24px;
  }

  .item-icon {
    font-size: 0.9rem;
  }

  .danmaku-text {
    font-size: 0.85rem;
  }

  .red-text {
    font-size: 1.05rem;
    padding: 0 5px;
    letter-spacing: 0.5px;
  }

  .red-text::after {
    height: 1.5px;
  }

  .conclusion-text {
    font-size: 0.95rem;
    padding: 16px 16px;
    line-height: 2;
  }
}
</style>