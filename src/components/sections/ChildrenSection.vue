<template>
  <section id="children" class="section">
    <h2 class="section-title">在平台上还有一个特殊群体更值得关注</h2>

    <!-- 横向排列 chart5 和 chart4 -->
    <div class="chart-row">
      <div class="chart-container" ref="chart5"></div>
      <div class="chart-container" ref="chart4"></div>
    </div>

    <h2 class="chart-subtitle">那就是儿童群体</h2>

    <div class="highlight-box">
      <p>
        截至2023年底,我国未成年网民规模达
        <span class="highlight-num">1.96亿</span>,
        未成年人互联网普及率高达
        <span class="highlight-num">97.3%</span>。
        未成年人的互联网普及率已基本达到饱和状态。他们很早就开始使用数字设备,已经是重要的互联网用户群。
      </p>
    </div>


    <p class="data-note small">
      截至2024年6月,10岁以前首次"触网"的未成年人占比达52%,较上年提高7.4%。村镇儿童过早接触直播/短视频的比例(82.3%)远高于城市儿童(51.6%)。以刚进入幼儿园的3岁儿童为例,78.6%的儿童屏幕时间超过了每天1小时的指南推荐标准。
    </p>

    <p class="data-source">
      数据来源：中国互联网络信息中心（CNNIC）《第53次中国互联网络发展状况统计报告》、《中国儿童发展报告（2024）》
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart4 = ref(null)
const chart5 = ref(null)

let myChart4Instance = null
let myChart5Instance = null
let myChart6Instance = null

onMounted(() => {
  // chart4 - 堆叠柱状图（参考图片样式）
  if (chart4.value) {
    myChart4Instance = echarts.init(chart4.value)

    const colors = ['#FFB6C1', '#FFA07A', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C']

    myChart4Instance.setOption({
      title: {
        text: '不同年龄层网民在整体网民中的占比',
        left: 'center',
        top: 15,
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 15,
        textStyle: {
          color: '#333',
          fontSize: 13
        },
        formatter: (params) => {
          let result = `<div style="font-weight:bold;margin-bottom:8px;">${params[0].axisValue}年</div>`
          params.forEach(item => {
            result += `<div style="margin:4px 0;">${item.marker} ${item.seriesName}: <span style="font-weight:bold;">${item.value}%</span></div>`
          })
          return result
        }
      },
      legend: {
        data: ['10岁以下', '10-19岁', '20-29岁', '30-39岁', '40-49岁', '50-59岁', '60岁及以上'],
        top: 'middle',
        right: '2%',
        orient: 'vertical',
        textStyle: {
          fontSize: 12,
          color: '#666'
        },
        itemGap: 10,
        itemWidth: 16,
        itemHeight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: [10, 15],
        borderRadius: 8
      },
      grid: {
        left: '8%',
        right: '20%',
        bottom: '10%',
        top: '80',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023'],
        axisLabel: {
          fontSize: 13,
          color: '#666',
          fontWeight: 'bold'
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%',
          fontSize: 13,
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
            type: 'solid'
          }
        },
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: '10岁以下',
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          data: [3.1, 4.3, 4.4, 3.8],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '10-19岁',
          type: 'bar',
          stack: 'total',
          data: [11.2, 11.5, 14.2, 13.7],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '20-29岁',
          type: 'bar',
          stack: 'total',
          data: [13.5, 13.3, 14.3, 14.7],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '30-39岁',
          type: 'bar',
          stack: 'total',
          data: [15.1, 15.3, 14.3, 15.6],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '40-49岁',
          type: 'bar',
          stack: 'total',
          data: [17.8, 17.3, 16.5, 16],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '50-59岁',
          type: 'bar',
          stack: 'total',
          data: [18.8, 18.4, 16.7, 16.9],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: '60岁及以上',
          type: 'bar',
          stack: 'total',
          data: [20.5, 19.9, 19.6, 19.2],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          emphasis: {
            focus: 'series'
          }
        }
      ]
    })
  }

  // 图表5：未成年人网民数量
  if (chart5.value) {
    const myChart5 = echarts.init(chart5.value)
    myChart5.setOption({
      title: {
        text: '未成年人网民数量与普及率',
        left: 'center'
      },
      tooltip: { trigger: 'axis' },
      legend: { data: ['网民数量(万人)', '普及率(%)'], bottom: 10 },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023']
      },
      yAxis: [
        { type: 'value', name: '网民数量(万人)' },
        { type: 'value', name: '普及率(%)', max: 100 }
      ],
      series: [
        {
          name: '网民数量(万人)',
          type: 'bar',
          data: [18281, 19062, 19347, 19630],
          itemStyle: { color: '#5470c6' }
        },
        {
          name: '普及率(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [94.9, 96.8, 97.2, 97.3],
          itemStyle: { color: '#ee6666' }
        }
      ]
    })
  }
})

onUnmounted(() => {
  if (myChart4Instance) myChart4Instance.dispose()
  if (myChart5Instance) myChart5Instance.dispose()
  if (myChart6Instance) myChart6Instance.dispose()
})
</script>

<style scoped>
.chart-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg, 30px);
  width: 90%;
  margin: var(--spacing-lg, 30px) auto;
}

.chart-container {
  width: 100%;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
}

/* 平板优化 */
@media (max-width: 1024px) {
  .chart-row {
    gap: 20px;
    width: 92%;
  }
}

/* 移动端优化 - 改为单列布局 */
@media (max-width: 768px) {
  .chart-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 20px);
    width: 95%;
    margin: var(--spacing-md, 20px) auto;
  }

  .chart-container {
    height: 350px;
    padding: 15px;
  }
}

/* 小屏幕优化 */
@media (max-width: 480px) {
  .chart-row {
    width: 100%;
    gap: 15px;
    margin: 15px auto;
  }

  .chart-container {
    height: 280px;
    padding: 12px;
    border-radius: var(--radius-md, 12px);
  }
}

.highlight-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: var(--spacing-xl, 40px);
  border-radius: var(--radius-lg, 20px);
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
  margin: var(--spacing-xl, 40px) auto;
  line-height: 1.8;
}

.highlight-num {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
  animation: metricPulse 4s ease-in-out infinite;
}

@keyframes metricPulse {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(243, 156, 18, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(243, 156, 18, 0.5));
  }
}

.chart-subtitle {
  text-align: center;
  font-size: 2.8rem;
  color: #e74c3c;
  margin: var(--subtitle-margin-bottom, 25px) 0;
  font-weight: bold;
  line-height: 1.3;
}

.data-note.small {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
  background: rgba(102, 126, 234, 0.05);
  padding: 20px 25px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin: 30px auto;
}

.data-source {
  text-align: center;
  color: #999;
  font-size: 0.85rem;
  margin: 20px auto;
  max-width: 900px;
  font-style: italic;
  padding: 0 20px;
}

.section {
  padding: var(--container-padding, 40px) var(--spacing-md, 20px);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-h2, 2.2rem);
  color: #333;
  margin-bottom: var(--title-margin-bottom, 40px);
  font-weight: bold;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .section {
    padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: var(--spacing-md, 20px);
  }

  .chart-subtitle {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 30px 12px;
  }

  .section-title {
    font-size: 1.3rem;
    padding: 0 5px;
  }

  .chart-subtitle {
    font-size: 1.4rem;
    padding: 0 5px;
  }

  .section-intro {
    font-size: 1rem;
    padding: 0 5px;
  }

  .highlight-box {
    padding: 18px 15px;
    font-size: 1.05rem;
  }

  .chart-container {
    padding: 15px 10px;
  }

  .data-note.small {
    font-size: 0.85rem;
    padding: 12px 15px;
  }
}
</style>