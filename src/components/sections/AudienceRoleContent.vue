<template>
  <div>
    <h3>观众：流量的源头与推手</h3>
    <p class="intro-text">每一个点赞、评论、分享，都在为"网红儿童"产业添砖加瓦。观众的注意力和互动，是这个生态系统的基石。</p>

    <div class="data-highlight">
      <p>儿童短视频的平均播放量比成人内容高出<span class="big">3-5倍</span></p>
      <p>带有"萌娃"标签的视频互动率提升<span class="big">40%</span></p>
    </div>

    <!-- 观众画像分析 -->
    <h4 class="section-subtitle">谁在观看萌娃视频？</h4>

    <div class="audience-summary">
      <p>观看萌娃类短视频的观众画像特征：</p>
      <ul>
        <li><strong>年龄：</strong>31-40岁占比最高，18-23岁偏好度最高</li>
        <li><strong>性别：</strong>女性占比68%，偏好度（TGI）达128</li>
        <li><strong>地域：</strong>广东占比最高，辽宁偏好度（TGI指数）最高</li>
      </ul>
    </div>

    <div class="audience-charts">
      <!-- 年龄分布图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h5>年龄分布</h5>
        </div>
        <div class="chart-summary">
          <span class="highlight-text">31-40岁</span>年龄段占比最高，
          <span class="highlight-text">18-23岁</span>年龄段偏好度（TGI指数）最高
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
          <h5>性别分布</h5>
        </div>
        <div class="chart-summary">
          <span class="highlight-text">女性</span>占比最高，
          <span class="highlight-text">女性</span>偏好度（TGI指数）最高
        </div>
        <div class="chart-container gender-chart" ref="chartAudienceGender"></div>
      </div>
    </div>

    <!-- 地域分布 -->
    <h4 class="section-subtitle">地域分布特征</h4>
    <p class="data-note">
      观看萌娃类短视频的观众中，广东占比最高，辽宁偏好度（TGI指数）最高
    </p>
    <div class="chart-container map-chart" ref="chartAudienceRegion"></div>

    <!-- 评论词云 -->
    <h4 class="section-subtitle">评论区的声音</h4>

    <!-- 观众心理分析 -->
    <div class="audience-psychology">
      <div class="psychology-positive">
        <p>观看者中不乏真正喜爱孩子、通过视频获得情感慰藉的用户。一个有趣的现象是，不少头部萌娃账号的粉丝中，<strong>18-23岁的年轻人对萌娃视频的偏好度最高</strong>。</p>
        <p>
          从进化心理学角度解释，这种现象是因为人类天生会对具有"婴儿图式"（如圆脸、大眼等特征）的幼崽产生保护欲和亲密感，这是一种本能反应，而女性通常对此更为敏感。萌娃们天真无邪的言行和温馨的家庭互动场景，为年轻观众提供了一个逃离现实压力、获得情绪疗愈的窗口。观看这些内容能有效缓解焦虑，带来轻松和快乐。
        </p>
      </div>

      <div class="psychology-negative">
        <p>
          <strong>"啃娃逻辑"</strong>正在逐渐被更多人接受。甚至出现了一批"母婴博主陪跑""宝妈专业运营"等专门教导家长如何打造"小网红"的账号。相关视频评论区里，对幼童擦边内容的追捧、对儿童"小小年纪挣大钱"的羡慕。
        </p>
      </div>
    </div>

    <div class="chart-container wordcloud-chart" ref="chartWordCloud"></div>

    <!-- 流量狂潮案例 -->
    <div class="traffic-craze">
      <p class="craze-intro">
        萌娃的天然流量优势再加之粉丝追捧，"晒娃"行为在相关平台越烧越旺。
      </p>
      <div class="craze-case">
        <div class="case-image-wrapper">
          <img :src="trafficCaseImg" alt="新生儿网红案例" class="case-image" />
        </div>
        <p class="case-caption">
          某千万级网红父母为其新生儿"光速"注册账号。仅1条视频，抖音吸粉十几万，点赞超30万。
        </p>
      </div>
    </div>

    <!-- 观众责任提示 -->
    <div class="responsibility-box">
      <p>观众的每一次点击、每一个赞，都在无形中鼓励着更多父母将孩子推向镜头。而平台的算法会进一步放大这种效应，让"萌娃"内容获得更多曝光，形成正反馈循环。</p>
      <p><strong>作为观众，我们需要意识到：</strong>我们的关注和互动，可能在无意中成为了儿童被过度曝光的推手。理性消费内容，拒绝猎奇和消费儿童隐私的视频，是每个观众应有的责任。</p>
    </div>

    <p class="data-source">
      数据来源：QuestMobile《2024短视频用户研究报告》、巨量算数《萌娃内容观众洞察报告》
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartAudienceAge = ref(null)
const chartAudienceGender = ref(null)
const chartAudienceRegion = ref(null)
const chartWordCloud = ref(null)

// 流量案例图片
const trafficCaseImg = new URL('@/assets/images/10.png', import.meta.url).href

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
      <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 320px; padding: 30px 20px;">
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="position: relative; margin-bottom: 20px;">
            <svg width="110" height="170" viewBox="0 0 120 180">
              <circle cx="60" cy="30" r="25" fill="#B0B0B0"/>
              <rect x="35" y="55" width="50" height="60" rx="8" fill="#B0B0B0"/>
              <rect x="42" y="115" width="15" height="60" rx="8" fill="#5B8FF9"/>
              <rect x="63" y="115" width="15" height="60" rx="8" fill="#5B8FF9"/>
            </svg>
          </div>
          <div style="font-size: 18px; color: #5B8FF9; font-weight: bold; margin-bottom: 8px;">男性</div>
          <div style="font-size: 15px; color: #666; margin-bottom: 4px;">
            占比: <span style="font-weight: bold; color: #333;">32%</span>
          </div>
          <div style="font-size: 15px; color: #666;">
            TGI: <span style="font-weight: bold; color: #333;">68</span>
          </div>
        </div>

        <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="position: relative; margin-bottom: 20px;">
            <svg width="110" height="170" viewBox="0 0 120 180">
              <circle cx="60" cy="30" r="25" fill="#B0B0B0"/>
              <path d="M 40 55 L 35 115 L 85 115 L 80 55 Z" fill="#FF6B9D" rx="5"/>
              <rect x="37" y="55" width="46" height="25" rx="8" fill="#B0B0B0"/>
              <rect x="42" y="115" width="15" height="60" rx="8" fill="#FF6B9D"/>
              <rect x="63" y="115" width="15" height="60" rx="8" fill="#FF6B9D"/>
            </svg>
          </div>
          <div style="font-size: 18px; color: #FF6B9D; font-weight: bold; margin-bottom: 8px;">女性</div>
          <div style="font-size: 15px; color: #666; margin-bottom: 4px;">
            占比: <span style="font-weight: bold; color: #333;">68%</span>
          </div>
          <div style="font-size: 15px; color: #666;">
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
            tooltip: {
              trigger: 'item',
              formatter: (p) => (p?.value
                ? `<strong>${p.name}</strong><br/>占比：<span style="color:#667eea;font-weight:bold;">${p.value}%</span>`
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

    // 创建手机形状的遮罩图片
    const createPhoneMask = () => {
      const canvas = document.createElement('canvas')
      const size = 600
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      // 绘制手机外形
      ctx.fillStyle = '#000'
      ctx.beginPath()

      // 手机主体 - 圆角矩形
      const phoneWidth = 300
      const phoneHeight = 520
      const offsetX = (size - phoneWidth) / 2
      const offsetY = (size - phoneHeight) / 2
      const radius = 40

      ctx.moveTo(offsetX + radius, offsetY)
      ctx.lineTo(offsetX + phoneWidth - radius, offsetY)
      ctx.arcTo(offsetX + phoneWidth, offsetY, offsetX + phoneWidth, offsetY + radius, radius)
      ctx.lineTo(offsetX + phoneWidth, offsetY + phoneHeight - radius)
      ctx.arcTo(offsetX + phoneWidth, offsetY + phoneHeight, offsetX + phoneWidth - radius, offsetY + phoneHeight, radius)
      ctx.lineTo(offsetX + radius, offsetY + phoneHeight)
      ctx.arcTo(offsetX, offsetY + phoneHeight, offsetX, offsetY + phoneHeight - radius, radius)
      ctx.lineTo(offsetX, offsetY + radius)
      ctx.arcTo(offsetX, offsetY, offsetX + radius, offsetY, radius)
      ctx.closePath()
      ctx.fill()

      // 绘制顶部刘海（可选）
      ctx.fillRect(offsetX + phoneWidth / 2 - 60, offsetY + 10, 120, 25)

      return canvas
    }

    cloudObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !inited) {
          inited = true
          let loaded = true
          try { await import('echarts-wordcloud') } catch (_) { loaded = false }
          if (!loaded) { cloudObserver?.unobserve(el); return }

          const maskImage = createPhoneMask()
          const inst = echarts.init(el)

          inst.setOption({
            tooltip: { show: true, formatter: (p) => `${p.name}<br/>热度: ${p.value}` },
            series: [{
              type: 'wordCloud',
              gridSize: 8,
              sizeRange: [14, 55],
              rotationRange: [-20, 20],
              maskImage: maskImage,
              width: '100%',
              height: '100%',
              drawOutOfBound: false,
              layoutAnimation: true,
              textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
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
              emphasis: {
                focus: 'self',
                textStyle: {
                  shadowBlur: 15,
                  shadowColor: 'rgba(0,0,0,0.4)',
                  fontSize: 18
                }
              },
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
    ;[chartAudienceAge, chartAudienceGender, chartAudienceRegion, chartWordCloud].forEach(r => {
      if (r?.value) {
        const inst = echarts.getInstanceByDom(r.value)
        inst && inst.dispose()
      }
    })
})
</script>

<style scoped>
/* ==================== 文本样式 ==================== */
.intro-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 25px;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 数据高亮样式 ==================== */
.data-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 35px;
  border-radius: 18px;
  color: white;
  margin: 25px 0 40px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
}

.data-highlight p {
  margin: 12px 0;
  font-size: 1.1rem;
  line-height: 1.9;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.data-highlight .big {
  font-size: 1.9rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  padding: 0 5px;
}

/* ==================== 小标题样式 ==================== */
.section-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 40px 0 25px;
  padding-bottom: 12px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #667eea, #764ba2) 1;
  position: relative;
}

/* ==================== 观众总结框 ==================== */
.audience-summary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  padding: 20px 25px;
  border-radius: 14px;
  margin: 20px 0 30px;
  border-left: 4px solid #667eea;
  box-shadow: 0 3px 15px rgba(102, 126, 234, 0.1);
}

.audience-summary p {
  font-size: 1.05rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.audience-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.audience-summary li {
  font-size: 1rem;
  color: #555;
  line-height: 2;
  padding-left: 25px;
  position: relative;
}

.audience-summary li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #667eea;
  font-size: 1.2rem;
  font-weight: bold;
}

.audience-summary li strong {
  color: #667eea;
  font-weight: 700;
}

/* ==================== 图表容器样式 ==================== */
.audience-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin: 25px 0 40px;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.chart-header h5 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.chart-summary {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.7;
  border-left: 4px solid #667eea;
}

.highlight-text {
  color: #667eea;
  font-weight: 700;
  font-size: 1.05rem;
}

.chart-legend {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  padding-left: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
}

.chart-container {
  width: 100%;
  height: 340px;
}

.gender-chart {
  height: 320px;
}

.map-chart {
  height: 450px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 20px 0 40px;
}

.wordcloud-chart {
  height: 550px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 20px 0 30px;
  position: relative;
}

.data-note {
  text-align: justify;
  text-justify: inter-ideograph;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 20px auto;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

/* ==================== 观众心理分析 ==================== */
.audience-psychology {
  margin: 25px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.psychology-positive {
  background: linear-gradient(135deg, rgba(91, 143, 249, 0.08), rgba(90, 216, 166, 0.08));
  padding: 25px 30px;
  border-radius: 16px;
  border-left: 5px solid #5B8FF9;
  box-shadow: 0 4px 15px rgba(91, 143, 249, 0.1);
  position: relative;
}

.psychology-positive::before {
  content: '💙';
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2rem;
  opacity: 0.3;
}

.psychology-positive p {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.9;
  margin: 12px 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.psychology-positive strong {
  color: #5B8FF9;
  font-weight: 700;
}

.psychology-negative {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 152, 0, 0.08));
  padding: 25px 30px;
  border-radius: 16px;
  border-left: 5px solid #ff6b6b;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.1);
  position: relative;
}

.psychology-negative::before {
  content: '⚠️';
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2rem;
  opacity: 0.4;
}

.psychology-negative p {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.9;
  margin: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.psychology-negative strong {
  color: #ff6b6b;
  font-weight: 700;
}

/* ==================== 流量狂潮案例 ==================== */
.traffic-craze {
  margin: 40px 0;
  padding: 30px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border-radius: 18px;
  border: 2px dashed rgba(102, 126, 234, 0.3);
}

.craze-intro {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: center;
  margin: 0 0 30px 0;
  font-weight: 500;
}

.craze-case {
  max-width: 550px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.craze-case:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 45px rgba(102, 126, 234, 0.25);
}

.case-image-wrapper {
  width: 100%;
  overflow: hidden;
  background: #f8f9fa;
  position: relative;
}

.case-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.craze-case:hover .case-image {
  transform: scale(1.08);
}

.case-caption {
  padding: 25px 30px;
  font-size: 1.1rem;
  line-height: 1.9;
  color: #2c3e50;
  font-weight: 600;
  text-align: center;
  margin: 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-top: 3px solid #667eea;
}

/* ==================== 责任提示框 ==================== */
.responsibility-box {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
  padding: 25px 30px;
  border-radius: 16px;
  margin: 40px 0 20px;
  border-left: 5px solid #ff9800;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.1);
}

.responsibility-box p {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 12px 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.responsibility-box strong {
  color: #ff9800;
  font-weight: 700;
}

.data-source {
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  margin: 30px auto 20px;
  max-width: 900px;
  padding: 0 20px;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 1024px) {
  .audience-charts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .data-highlight {
    padding: 20px 25px;
  }

  .data-highlight .big {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 1.3rem;
  }

  .audience-summary {
    padding: 18px 20px;
  }

  .audience-summary p {
    font-size: 1rem;
  }

  .audience-summary li {
    font-size: 0.95rem;
    line-height: 1.8;
  }

  .chart-card {
    padding: 20px;
  }

  .chart-container {
    height: 300px;
  }

  .map-chart {
    height: 350px;
  }

  .wordcloud-chart {
    height: 450px;
  }

  .psychology-positive,
  .psychology-negative {
    padding: 20px 25px;
  }

  .psychology-positive::before,
  .psychology-negative::before {
    font-size: 1.5rem;
    top: 15px;
    right: 20px;
  }

  .psychology-positive p,
  .psychology-negative p {
    font-size: 1rem;
    line-height: 1.8;
  }

  .traffic-craze {
    padding: 25px 20px;
    margin: 30px 0;
  }

  .craze-intro {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .case-caption {
    padding: 20px 25px;
    font-size: 1rem;
  }

  .responsibility-box {
    padding: 20px 20px;
  }

  .responsibility-box p {
    font-size: 1rem;
  }
}
</style>