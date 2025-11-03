<template>
  <section class="section">
    <h1 class="main-title">童工并未消失，而是披上了数字的外衣</h1>
    <p class="section-intro">
      自2000年以来，全球童工总数下降了约1亿，降幅近半。中国关于禁止使用童工的法律制度在2000年后经历了重要的完善，在2002年修订的《禁止使用童工规定》中大幅提高罚款标准，明确并加重使用童工的刑事责任。
    </p>

    <div class="chart-container" ref="chart7"></div>

    <p class="key-message">
      传统童工数量大幅下降，而新型童工——数字童工开始显现，尤其是其中的"网红儿童"更应引起人们重视。当孩子们开始赚钱，或者当他们在成年人指导下对着镜头说特定的内容时，这种行为就不再只是游戏或爱好，而是工作。
      有调查发现，部分平台上粉丝量超20万的“亲子类”账号，其视频中儿童出镜时间占比普遍在70%以上，多数甚至超过95%。这直观反映了儿童才是这些账号的绝对主角。且这些账号发布短视频的频率较高，有不少保持日更节奏，有时甚至日更两条。
    </p>

    <div class="chart-container table-container">
      <h3 class="table-title">短视频中未成年人出镜占比</h3>
      <table class="styled-table">
        <thead>
          <tr>
            <th>平台</th>
            <th>视频条数</th>
            <th>视频总时长（单位秒）</th>
            <th>儿童出镜总时长（单位秒）</th>
            <th>出镜占比</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>母婴博主，粉丝量169万</td>
            <td>10</td>
            <td>397</td>
            <td>384</td>
            <td>96.73%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量102.8万</td>
            <td>10</td>
            <td>484</td>
            <td>461</td>
            <td>95.25%</td>
          </tr>
          <tr>
            <td>记录孩子成长，粉丝量94.6万</td>
            <td>10</td>
            <td>384</td>
            <td>339</td>
            <td>88.28%</td>
          </tr>
          <tr>
            <td>记录孩子生活，粉丝量78.3万</td>
            <td>10</td>
            <td>498</td>
            <td>379</td>
            <td>76.10%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量54.7万</td>
            <td>10</td>
            <td>175</td>
            <td>154</td>
            <td>88.00%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量65万</td>
            <td>10</td>
            <td>540</td>
            <td>535</td>
            <td>99.07%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量53.5万</td>
            <td>10</td>
            <td>531</td>
            <td>524</td>
            <td>98.68%</td>
          </tr>
          <tr>
            <td>育儿博主，粉丝量35万</td>
            <td>10</td>
            <td>768</td>
            <td>715</td>
            <td>93.08%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量22.7万</td>
            <td>10</td>
            <td>343</td>
            <td>343</td>
            <td>100.00%</td>
          </tr>
          <tr>
            <td>母婴博主，粉丝量191.9万</td>
            <td>10</td>
            <td>325</td>
            <td>306</td>
            <td>94.15%</td>
          </tr>
        </tbody>
      </table>
      <p class="table-source">数据来源：《法治日报》</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart7 = ref(null)

onMounted(() => {
  if (chart7.value) {
    const myChart7 = echarts.init(chart7.value)
    myChart7.setOption({
      title: {
        text: '全球童工数量变化',
        subtext: '自2000年以来下降约1亿',
        left: 'center'
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['2000', '2004', '2008', '2012', '2016', '2020']
      },
      yAxis: {
        type: 'value',
        name: '百万人',
        axisLabel: { formatter: '{value}M' }
      },
      series: [
        {
          data: [246, 222, 215, 168, 152, 160],
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(147, 112, 219, 0.3)' },
              { offset: 1, color: 'rgba(173, 216, 230, 0.1)' }
            ])
          },
          lineStyle: { color: '#9370db', width: 3 },
          itemStyle: { color: '#9370db' },
          label: { show: true, formatter: '{c}M' }
        }
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          bottom: 0,
          z: 100,
          style: {
            text: '数据来源：国际劳工组织（ILO）、联合国儿童基金会（UNICEF）',
            textAlign: 'center',
            fill: '#666',
            fontSize: 12,
            fontStyle: 'italic'
          }
        }
      ]
    })
  }
})

onUnmounted(() => {
  if (chart7.value) {
    const inst = echarts.getInstanceByDom(chart7.value)
    inst && inst.dispose()
  }
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

/* 表格容器 */
.table-container {
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: auto;
}

/* 表格标题 */
.table-title {
  background: linear-gradient(90deg, #6a5acd, #9370db);
  color: white;
  font-size: 1.25rem;
  text-align: center;
  padding: 12px 0;
  border-radius: 10px 10px 0 0;
  margin-bottom: 0;
  letter-spacing: 1px;
}

/* 表格本体 */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
}

.styled-table th {
  background: linear-gradient(90deg, #f3f0ff, #eae4fa);
  color: #4a3f78;
  font-weight: 600;
  padding: 12px;
  border-bottom: 2px solid #d5c7f0;
}

.styled-table td {
  padding: 10px;
  color: #444;
  border-bottom: 1px solid #e8e2f8;
}

.styled-table tr:nth-child(even) {
  background-color: #f9f7ff;
}

.styled-table tr:hover {
  background-color: #f0ecff;
  transition: 0.2s ease-in-out;
}

/* 来源样式 */
.table-source {
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-top: 10px;
  font-style: italic;
  letter-spacing: 0.5px;
}
</style>