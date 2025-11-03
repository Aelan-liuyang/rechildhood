<template>
  <section class="section audience-section">
    <h2 class="section-title">谁在观看萌娃视频？</h2>

    <div class="audience-charts">
      <!-- 年龄分布图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>年龄分布</h3>
          <span class="info-icon">?</span>
        </div>
        <div class="chart-summary">
          <span class="highlight-orange">31-40岁</span>年龄段占比最高，
          <span class="highlight-orange">18-23岁</span>年龄段偏好度（TGI指数）最高
        </div>
        <div class="chart-legend">
          <span class="legend-item">
            <span class="legend-color" style="background: #5B8FF9"></span>
            占比
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #5AD8A6"></span>
            TGI
          </span>
        </div>
        <div class="chart-container" ref="chartAudienceAge"></div>
      </div>

      <!-- 性别分布图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>性别分布</h3>
          <span class="info-icon">?</span>
        </div>
        <div class="chart-summary">
          <span class="highlight-orange">女性</span>占比最高，
          <span class="highlight-orange">女性</span>偏好度（TGI指数）最高
        </div>
        <div class="chart-container gender-chart" ref="chartAudienceGender"></div>
      </div>
    </div>

    <!-- 地域分布提示 -->
    <p class="data-note" style="margin: 30px 0;">
      观看萌娃类短视频的观众中，广东占比最高，辽宁偏好度（TGI指数）最高
    </p>

    <!-- 地域分布图（独占一行） -->
    <div class="chart-container" ref="chartAudienceRegion"></div>

    <!-- 评论词云 -->
    <h3 class="subsection-title">评论区的声音</h3>
    <div class="chart-container large" ref="chartWordCloud"></div>

    <p class="data-source">
      数据来源：QuestMobile《2024短视频用户研究报告》、巨量算数《萌娃内容观众洞察报告》
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartAudienceAge = ref(null)
const chartAudienceGender = ref(null)
const chartAudienceRegion = ref(null)
const chartWordCloud = ref(null)

let cloudObserver = null

onMounted(() => {
  // 年龄分布（双轴柱状图）
  if (chartAudienceAge.value) {
    const myChartAge = echarts.init(chartAudienceAge.value)
    myChartAge.setOption({
      grid: { left: '12%', right: '12%', top: '15%', bottom: '15%' },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: ['18-23岁', '24-30岁', '31-40岁', '41-50岁', '51岁+'],
        axisLine: { lineStyle: { color: '#E5E5E5' } },
        axisTick: { show: false },
        axisLabel: { color: '#666' }
      },
      yAxis: [
        {
          type: 'value',
          name: '占比',
          position: 'left',
          axisLabel: { formatter: '{value}%', color: '#666' },
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#F0F0F0', type: 'dashed' } },
          max: 32
        },
        {
          type: 'value',
          name: 'TGI',
          position: 'right',
          axisLabel: { color: '#666' },
          axisLine: { show: false },
          splitLine: { show: false },
          max: 280
        }
      ],
      series: [
        {
          name: '占比',
          type: 'bar',
          data: [24, 24, 30, 12, 10],
          barWidth: '35%',
          itemStyle: {
            color: '#5B8FF9',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: false
          }
        },
        {
          name: 'TGI',
          type: 'line',
          yAxisIndex: 1,
          data: [250, 180, 95, 60, 100],
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#5AD8A6',
            borderWidth: 2,
            borderColor: '#fff'
          },
          lineStyle: {
            color: '#5AD8A6',
            width: 3
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params) => params.value === 100 ? 'TGI: 100' : '',
            color: '#5AD8A6',
            fontWeight: 'bold'
          },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              color: '#FFBB00',
              type: 'dashed',
              width: 2
            },
            data: [{ yAxis: 100 }],
            label: { show: false }
          }
        }
      ]
    })
  }

  // 性别分布（人形图标展示）
  if (chartAudienceGender.value) {
    const container = chartAudienceGender.value
    container.innerHTML = `
      <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 300px; padding: 40px 20px;">
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="position: relative; margin-bottom: 20px;">
            <svg width="120" height="180" viewBox="0 0 120 180">
              <!-- 头部 -->
              <circle cx="60" cy="30" r="25" fill="#B0B0B0"/>
              <!-- 身体 -->
              <rect x="35" y="55" width="50" height="60" rx="8" fill="#B0B0B0"/>
              <!-- 腿部 -->
              <rect x="42" y="115" width="15" height="60" rx="8" fill="#5B8FF9"/>
              <rect x="63" y="115" width="15" height="60" rx="8" fill="#5B8FF9"/>
            </svg>
          </div>
          <div style="font-size: 20px; color: #5B8FF9; font-weight: bold; margin-bottom: 8px;">男性</div>
          <div style="font-size: 16px; color: #666; margin-bottom: 4px;">
            占比: <span style="font-weight: bold; color: #333;">32%</span>
          </div>
          <div style="font-size: 16px; color: #666;">
            TGI: <span style="font-weight: bold; color: #333;">68</span>
          </div>
        </div>

        <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="position: relative; margin-bottom: 20px;">
            <svg width="120" height="180" viewBox="0 0 120 180">
              <!-- 头部 -->
              <circle cx="60" cy="30" r="25" fill="#B0B0B0"/>
              <!-- 身体（裙子形状） -->
              <path d="M 40 55 L 35 115 L 85 115 L 80 55 Z" fill="#FF6B9D" rx="5"/>
              <rect x="37" y="55" width="46" height="25" rx="8" fill="#B0B0B0"/>
              <!-- 腿部 -->
              <rect x="42" y="115" width="15" height="60" rx="8" fill="#FF6B9D"/>
              <rect x="63" y="115" width="15" height="60" rx="8" fill="#FF6B9D"/>
            </svg>
          </div>
          <div style="font-size: 20px; color: #FF6B9D; font-weight: bold; margin-bottom: 8px;">女性</div>
          <div style="font-size: 16px; color: #666; margin-bottom: 4px;">
            占比: <span style="font-weight: bold; color: #333;">68%</span>
          </div>
          <div style="font-size: 16px; color: #666;">
            TGI: <span style="font-weight: bold; color: #333;">128</span>
          </div>
        </div>
      </div>
    `
  }

  // 地域分布（交互地图）
  if (chartAudienceRegion.value) {
    const el = chartAudienceRegion.value
    const myChartRegion = echarts.init(el)
    const regionData = [
      { name: '广东', value: 15.2 },
      { name: '辽宁', value: 12.8 },
      { name: '江苏', value: 10.5 },
      { name: '浙江', value: 9.8 },
      { name: '山东', value: 8.6 },
      { name: '河南', value: 7.3 },
      { name: '四川', value: 6.9 },
      { name: '湖北', value: 6.2 },
      { name: '北京', value: 5.8 },
      { name: '上海', value: 5.1 }
    ]
      ; (async () => {
        try {
          const mapUrl = `${import.meta.env.BASE_URL}china.json`
          const res = await fetch(mapUrl)
          if (!res.ok) throw new Error('map not found')
          const mapJson = await res.json()
          echarts.registerMap('china', mapJson)

          const values = regionData.map(d => d.value)
          const minVal = Math.min(...values)
          const maxVal = Math.max(...values)

          myChartRegion.setOption({
            title: {
              text: '观众地域分布',
              subtext: '单位：占比（%）',
              left: 'center',
              top: 15,
              textStyle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
              subtextStyle: { fontSize: 12, color: '#999' }
            },
            tooltip: {
              trigger: 'item',
              formatter: (p) => (p?.value
                ? `<strong>${p.name}</strong><br/>占比：<span style="color:#e74c3c;font-weight:bold;">${p.value}%</span>`
                : `${p.name}<br/>暂无数据`),
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderColor: '#ddd',
              borderWidth: 1,
              textStyle: { color: '#333' }
            },
            visualMap: {
              min: Math.floor(minVal),
              max: Math.ceil(maxVal),
              left: 30,
              bottom: 40,
              text: ['高', '低'],
              inRange: { color: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'] },
              textStyle: { color: '#666' },
              calculable: true
            },
            series: [{
              type: 'map',
              map: 'china',
              roam: true,
              scaleLimit: { min: 1, max: 3 },
              emphasis: {
                label: { show: true, color: '#fff' },
                itemStyle: { areaColor: '#667eea', shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' }
              },
              select: { label: { show: true }, itemStyle: { areaColor: '#764ba2' } },
              itemStyle: { borderColor: '#fff', borderWidth: 1, shadowBlur: 5, shadowColor: 'rgba(0,0,0,0.1)' },
              data: regionData
            }]
          })
        } catch (e) {
          console.warn('China map load failed:', e)
        }
      })()
  }

  // 评论词云（懒加载）
  if (chartWordCloud.value) {
    const el = chartWordCloud.value
    let inited = false
    const words = [
      { name: '可爱', value: 1000 }, { name: '宝宝', value: 950 }, { name: '漂亮', value: 900 },
      { name: '天使', value: 850 }, { name: '萌', value: 800 }, { name: '喜欢', value: 750 },
      { name: '妹妹', value: 700 }, { name: '女儿', value: 680 }, { name: '小孩', value: 650 },
      { name: '治愈', value: 620 }, { name: '童年', value: 600 }, { name: '幸福', value: 580 },
      { name: '温柔', value: 560 }, { name: '天真', value: 540 }, { name: '快乐', value: 520 },
      { name: '妈妈', value: 500 }, { name: '精致', value: 480 }, { name: '小裙子', value: 460 },
      { name: '好看', value: 440 }, { name: '抱抱', value: 420 }, { name: '打扮', value: 400 },
      { name: '舞蹈', value: 380 }, { name: '家长', value: 360 }, { name: '摆拍', value: 340 },
      { name: '炫娃', value: 320 }, { name: '演戏', value: 300 }, { name: '虚伪', value: 280 },
      { name: '利用孩子', value: 260 }, { name: '刻意', value: 240 }, { name: '离谱', value: 220 },
      { name: '僵硬', value: 200 }
    ]

    cloudObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !inited) {
          inited = true
          let loaded = true
          try { await import('echarts-wordcloud') } catch (_) { loaded = false }
          if (!loaded) { cloudObserver?.unobserve(el); return }
          const inst = echarts.init(el)
          inst.setOption({
            title: { text: '评论区词云', left: 'center', top: 20, textStyle: { fontSize: 20, fontWeight: 'bold' } },
            tooltip: { show: true, formatter: (p) => `${p.name}<br/>热度: ${p.value}` },
            series: [{
              type: 'wordCloud', gridSize: 12, sizeRange: [16, 70], rotationRange: [-15, 15], shape: 'circle', width: '95%', height: '90%', drawOutOfBound: false,
              textStyle: {
                fontFamily: 'sans-serif', fontWeight: 'bold',
                color: (params) => {
                  const negative = ['摆拍', '炫娃', '演戏', '虚伪', '利用孩子', '刻意', '离谱', '僵硬', '家长']
                  if (negative.includes(params.name)) {
                    const dark = ['#e74c3c', '#c0392b', '#d35400', '#e67e22']
                    return dark[Math.floor(Math.random() * dark.length)]
                  }
                  const colors = ['#5470c6', '#91cc75', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
                  return colors[Math.floor(Math.random() * colors.length)]
                }
              },
              emphasis: { focus: 'self', textStyle: { shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.4)' } },
              data: words
            }]
          })
          cloudObserver?.unobserve(el)
        }
      })
    }, { threshold: 0.25 })
    cloudObserver.observe(el)
  }
})

onUnmounted(() => {
  cloudObserver?.disconnect?.()
    ;[chartAudienceAge, chartAudienceRegion, chartWordCloud].forEach(r => {
      if (r?.value) {
        const inst = echarts.getInstanceByDom(r.value)
        inst && inst.dispose()
      }
    })
})
</script>

<style scoped>
.audience-section {
  background: linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%);
  padding: 60px 20px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
}

.audience-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 40px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h3 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.info-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E5E5E5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
}

.chart-summary {
  background: #F7F9FC;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

.highlight-orange {
  color: #FF8C42;
  font-weight: bold;
}

.chart-legend {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  padding-left: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #666;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.chart-container {
  width: 100%;
  height: 350px;
}

.gender-chart {
  height: 300px;
}

.data-note {
  text-align: center;
  color: #666;
  font-size: 1rem;
  max-width: 800px;
  margin: 30px auto;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin: 60px 0 30px;
}

.chart-container.large {
  height: 500px;
  max-width: 1200px;
  margin: 0 auto;
}

.data-source {
  text-align: center;
  color: #999;
  font-size: 0.85rem;
  margin: 30px auto 20px;
  max-width: 900px;
  font-style: italic;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .audience-charts {
    grid-template-columns: 1fr;
  }

  .chart-card {
    padding: 16px;
  }
}
</style>