<template>
  <section class="section audience-section">
    <h2 class="section-title">谁在观看萌娃视频？</h2>

    <!-- 顶部示例图（9.png） -->
    <div class="audience-hero">
      <img :src="audienceHero" alt="观众示例图" />
    </div>

    <div class="audience-charts">
      <!-- 年龄分布图 -->
      <div class="chart-container" ref="chartAudienceAge"></div>
      <!-- 性别分布图 -->
      <div class="chart-container" ref="chartAudienceGender"></div>
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

    <p class="insight-text anim-reveal">
      萌娃的天然流量优势再加之粉丝追捧，"晒娃"行为在相关平台越烧越旺。某千万级网红父母为其新生儿"光速"注册账号，仅1条视频，抖音吸粉十几万，点赞超30万。
    </p>

    <!-- 4张示例图片 -->
    <div class="example-images">
      <div class="example-image-card" v-for="(img, index) in exampleImages" :key="index">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartAudienceAge = ref(null)
const chartAudienceGender = ref(null)
const chartAudienceRegion = ref(null)
const chartWordCloud = ref(null)

const audienceHero = new URL('@/assets/images/9.png', import.meta.url).href

const exampleImages = [
  { src: new URL('@/assets/images/3.png', import.meta.url).href, alt: '示例图片3' },
  { src: new URL('@/assets/images/4.png', import.meta.url).href, alt: '示例图片4' },
  { src: new URL('@/assets/images/5.png', import.meta.url).href, alt: '示例图片5' },
  { src: new URL('@/assets/images/6.png', import.meta.url).href, alt: '示例图片6' }
]

let cloudObserver = null

onMounted(() => {
  // 年龄分布
  if (chartAudienceAge.value) {
    const myChartAge = echarts.init(chartAudienceAge.value)
    myChartAge.setOption({
      title: { text: '观看萌娃视频的观众年龄分布', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie', radius: '65%',
        data: [
          { value: 15, name: '18岁以下' },
          { value: 35, name: '18-23岁', itemStyle: { color: '#5470c6' } },
          { value: 25, name: '24-30岁' },
          { value: 15, name: '31-40岁' },
          { value: 10, name: '40岁以上' }
        ],
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
        label: { show: true, formatter: '{b}\n{d}%' }
      }]
    })
  }

  // 性别分布
  if (chartAudienceGender.value) {
    const myChartGender = echarts.init(chartAudienceGender.value)
    myChartGender.setOption({
      title: { text: '观看萌娃视频的观众性别分布', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{d}%', fontSize: 16 },
        data: [
          { value: 68, name: '女性', itemStyle: { color: '#ee6666' } },
          { value: 32, name: '男性', itemStyle: { color: '#5470c6' } }
        ]
      }]
    })
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
          // 如果地图加载失败，保持空白或在控制台提示
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
    ;[chartAudienceAge, chartAudienceGender, chartAudienceRegion, chartWordCloud].forEach(r => {
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
}

.audience-hero {
  max-width: 1100px;
  margin: 20px auto 30px;
  padding: 0 20px;
}

.audience-hero img {
  width: 100%;
  display: block;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.audience-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin: 60px 0 30px;
}

.example-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.example-image-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* 恢复为进入时自动播放动画 */
  animation: imageCardReveal 0.8s ease-out backwards;
}

.example-image-card:nth-child(1) {
  animation-delay: 0.1s;
}

.example-image-card:nth-child(2) {
  animation-delay: 0.2s;
}

.example-image-card:nth-child(3) {
  animation-delay: 0.3s;
}

.example-image-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes imageCardReveal {
  from {
    opacity: 0;
    transform: translateY(40px) rotateX(15deg);
  }

  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

.example-image-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 1;
}

.example-image-card:hover::before {
  opacity: 1;
}

.example-image-card:hover {
  transform: translateY(-15px) scale(1.05) rotateZ(2deg);
  box-shadow: 0 25px 60px rgba(102, 126, 234, 0.3);
}

.example-image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>