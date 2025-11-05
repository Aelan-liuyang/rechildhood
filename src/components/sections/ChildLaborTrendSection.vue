<template>
  <section class="section">
    <h1 class="main-title">童工并未消失，而是披上了数字的外衣</h1>
    <p class="section-intro">
      自2000年以来，全球童工总数下降了约1亿，降幅近半。中国关于禁止使用童工的法律制度在2000年后经历了重要的完善，在2002年修订的《禁止使用童工规定》中大幅提高罚款标准，明确并加重使用童工的刑事责任。
    </p>

    <div class="chart-container" ref="chart7"></div>

    <p class="key-message">
      传统童工数量大幅下降，而新型童工——数字童工开始显现，尤其是其中的<span
        class="highlight-emphasis">"网红儿童"</span>更应引起人们重视。当孩子们开始赚钱，或者当他们在成年人指导下对着镜头说特定的内容时，这种行为就不再只是游戏或爱好，而是<span
        class="highlight-emphasis">工作</span>。有调查发现，部分平台上粉丝量超20万的"亲子类"账号，其视频中儿童出镜时间占比普遍在<span
        class="highlight-emphasis">70%以上</span>，多数甚至<span
        class="highlight-emphasis">超过95%</span>。而且皮亚杰理论表明，7岁以下儿童无法理解抽象商业行为，11岁以下难以真正自主决策。<span
        class="highlight-emphasis">这直观反映了儿童才是这些账号的绝对主角，而父母在其中启到了导演的作用。且这些账号发布短视频的频率较高，有不少保持日更节奏，有时甚至日更两条。</span>
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
            fontSize: 12
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
/* ==================== 基础布局 ==================== */
.section {
  padding: var(--container-padding, 60px) var(--spacing-md, 20px) var(--container-padding, 80px);
  max-width: 1400px;
  margin: 0 auto;
}

/* ==================== 标题样式 ==================== */
.main-title {
  text-align: center;
  font-size: var(--font-size-h2, 2.4rem);
  color: #2c3e50;
  margin-bottom: var(--spacing-2xl, 60px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: var(--spacing-lg, 30px);
}

.main-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

/* ==================== 介绍文本 ==================== */
.section-intro {
  font-size: 1.15rem;
  text-align: justify;
  text-justify: inter-ideograph;
  max-width: 1200px;
  line-height: 2;
  color: #444;
  margin: 0 auto var(--spacing-2xl, 60px);
  padding: 0 var(--spacing-md, 20px);
  font-weight: 400;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ==================== 关键信息 ==================== */
.key-message {
  font-size: 1.3rem;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 2;
  max-width: 1200px;
  margin: var(--spacing-2xl, 60px) auto;
  padding: var(--spacing-xl, 30px) var(--spacing-lg, 35px);
  color: #2c3e50;
  font-weight: 400;
  word-break: keep-all;
  overflow-wrap: break-word;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: var(--radius-lg, 20px);
  border-left: 4px solid #667eea;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

/* 统一高亮样式 */
.highlight-emphasis {
  color: #5e35b1;
  font-weight: 700;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ==================== 图表容器 ==================== */
.chart-container {
  width: 100%;
  max-width: 1200px;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
  margin: 0 auto var(--spacing-2xl, 60px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

/* ==================== 表格容器 ==================== */
.table-container {
  background: #fff;
  border-radius: var(--radius-lg, 20px);
  padding: 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto var(--spacing-2xl, 60px);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: auto !important;
  /* 覆盖图表容器的固定高度 */
  min-height: auto;
}

.chart-container.table-container {
  height: auto !important;
  min-height: auto;
}

.table-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

/* ==================== 表格标题 ==================== */
.table-title {
  background: linear-gradient(90deg, #6a5acd, #9370db);
  color: white;
  font-size: 1.3rem;
  text-align: center;
  padding: var(--spacing-lg, 20px) 0;
  margin: 0;
  letter-spacing: 0.5px;
  font-weight: 600;
}

/* ==================== 表格本体 ==================== */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.95rem;
  overflow: hidden;
}

.styled-table th {
  background: linear-gradient(90deg, #f3f0ff, #eae4fa);
  color: #4a3f78;
  font-weight: 600;
  padding: var(--spacing-md, 15px) var(--spacing-sm, 12px);
  border-bottom: 2px solid #d5c7f0;
}

.styled-table td {
  padding: var(--spacing-md, 12px) var(--spacing-sm, 10px);
  color: #444;
  border-bottom: 1px solid #e8e2f8;
}

.styled-table tr:nth-child(even) {
  background-color: #f9f7ff;
}

.styled-table tr:hover {
  background-color: #f0ecff;
  transition: background-color 0.2s ease-in-out;
}

/* ==================== 来源样式 ==================== */
.table-source {
  text-align: center;
  font-size: 0.85rem;
  color: #666;
  margin: var(--spacing-md, 15px) 0;
  padding: 0 var(--spacing-md, 20px);
  letter-spacing: 0.3px;
}

/* ==================== 响应式样式 ==================== */
@media (max-width: 1024px) {
  .section {
    padding: var(--container-padding, 50px) var(--spacing-md, 20px) var(--container-padding, 70px);
  }
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-xl, 40px) var(--spacing-md, 20px) var(--spacing-xl, 50px);
  }

  .main-title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-xl, 40px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .main-title::after {
    width: 60px;
    height: 3px;
  }

  .section-intro {
    font-size: 1.1rem;
    padding: 0 var(--spacing-md, 20px);
    line-height: 2;
    margin-bottom: var(--spacing-xl, 40px);
    text-align: justify;
    text-justify: inter-ideograph;
    max-width: 100%;
  }

  .key-message {
    font-size: 1.15rem;
    padding: var(--spacing-lg, 25px) var(--spacing-md, 25px);
    margin: var(--spacing-xl, 40px) auto;
    text-align: justify;
    text-justify: inter-ideograph;
    max-width: 100%;
  }

  .chart-container {
    padding: 18px;
    margin: var(--spacing-xl, 40px) auto;
    height: 380px;
    max-width: 100%;
  }

  .table-container {
    margin: var(--spacing-xl, 40px) auto;
    max-width: 100%;
    height: auto !important;
  }

  .chart-container.table-container {
    height: auto !important;
  }

  .table-title {
    font-size: 1.15rem;
    padding: var(--spacing-md, 15px) 0;
  }

  .styled-table {
    font-size: 0.85rem;
  }

  .styled-table th,
  .styled-table td {
    padding: var(--spacing-sm, 10px) 8px;
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-lg, 30px) 12px var(--spacing-xl, 40px);
  }

  .main-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-sm, 15px);
    line-height: 1.5;
  }

  .main-title::after {
    width: 50px;
    height: 3px;
  }

  .section-intro {
    font-size: 1.05rem;
    padding: 0 12px;
    line-height: 1.9;
    margin-bottom: var(--spacing-lg, 30px);
    text-align: justify;
    text-justify: inter-ideograph;
    max-width: 100%;
  }

  .key-message {
    font-size: 1.05rem;
    padding: var(--spacing-md, 20px) var(--spacing-sm, 18px);
    margin: var(--spacing-lg, 30px) auto;
    line-height: 1.9;
    text-align: justify;
    text-justify: inter-ideograph;
    max-width: 100%;
  }

  .highlight-emphasis {
    font-size: 1.1rem;
  }

  .chart-container {
    padding: 15px 12px;
    margin: var(--spacing-lg, 30px) auto;
    height: 320px;
    max-width: 100%;
    border-radius: 14px;
  }

  .table-container {
    margin: var(--spacing-lg, 30px) auto;
    max-width: 100%;
    border-radius: 14px;
    height: auto !important;
  }

  .chart-container.table-container {
    height: auto !important;
  }

  .table-title {
    font-size: 1.05rem;
    padding: var(--spacing-sm, 12px) 0;
  }

  .styled-table {
    font-size: 0.75rem;
  }

  .styled-table th {
    font-size: 0.8rem;
    padding: var(--spacing-sm, 10px) 6px;
  }

  .styled-table td {
    padding: var(--spacing-sm, 10px) 6px;
  }

  .table-source {
    font-size: 0.75rem;
    padding: 0 12px;
    margin: var(--spacing-sm, 12px) 0;
  }
}
</style>