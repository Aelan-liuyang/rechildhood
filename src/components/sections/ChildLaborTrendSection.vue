<template>
  <section class="section">
    <h1 class="main-title">童工并未消失，而是披上了数字的外衣</h1>
    <p class="section-intro">
      自2000年以来，全球童工总数下降了约1亿，降幅近半。中国关于禁止使用童工的法律制度在2000年后经历了重要的完善，在2002年修订的《禁止使用童工规定》中大幅提高罚款标准，明确并加重使用童工的刑事责任。
    </p>
    <div class="chart-container" ref="chart7"></div>
    <p class="data-source">数据来源：国际劳工组织（ILO）、联合国儿童基金会（UNICEF）</p>
    <p class="key-message">
      传统童工数量大幅下降，而新型童工——数字童工开始显现，尤其是其中的"网红儿童"更应引起人们重视。
    </p>
    <div class="chart-container" ref="chart8"></div>
    <p class="data-source">数据来源：《法治日报》</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart7 = ref(null)
const chart8 = ref(null)

onMounted(() => {
  if (chart7.value) {
    const myChart7 = echarts.init(chart7.value)
    myChart7.setOption({
      title: { text: '全球童工数量变化', subtext: '自2000年以来下降约1亿', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['2000', '2004', '2008', '2012', '2016', '2020'] },
      yAxis: { type: 'value', name: '百万人', axisLabel: { formatter: '{value}M' } },
      series: [{ data: [246, 222, 215, 168, 152, 160], type: 'line', smooth: true, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(238, 102, 102, 0.3)' }, { offset: 1, color: 'rgba(238, 102, 102, 0.1)' }]) }, lineStyle: { color: '#ee6666', width: 3 }, itemStyle: { color: '#ee6666' }, label: { show: true, formatter: '{c}M' } }]
    })
  }
  if (chart8.value) {
    const myChart8 = echarts.init(chart8.value)
    myChart8.setOption({
      title: { text: '粉丝超20万账号儿童出镜时间占比', left: 'center' }, tooltip: { trigger: 'item' },
      series: [{ type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 }, label: { show: true, formatter: '{b}: {d}%' }, data: [{ value: 5, name: '50-70%' }, { value: 25, name: '70-95%' }, { value: 70, name: '95%以上' }] }]
    })
  }
})

onUnmounted(() => {
  ;[chart7, chart8].forEach(r => { if (r?.value) { const inst = echarts.getInstanceByDom(r.value); inst && inst.dispose() } })
})
</script>

<style scoped>
.section-intro {
  font-size: 1.1rem;
  text-align: center;
  max-width: 900px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 40px;
}

.key-message {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.8;
  max-width: 800px;
  margin: 30px 0;
}
</style>