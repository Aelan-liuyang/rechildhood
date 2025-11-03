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
  // chart4 - 堆叠面积图
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
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 2
          }
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
          params.reverse().forEach(item => {
            result += `<div style="margin:4px 0;">${item.marker} ${item.seriesName}: <span style="font-weight:bold;">${item.value}%</span></div>`
          })
          return result
        }
      },
      legend: {
        data: ['10岁以下', '10-19岁', '20-29岁', '30-39岁', '40-49岁', '50-59岁', '60岁及以上'],
        top: 55,
        right: 30,
        orient: 'vertical',
        textStyle: {
          fontSize: 13,
          color: '#666'
        },
        itemGap: 12,
        itemWidth: 18,
        itemHeight: 12
      },
      grid: {
        left: '5%',
        right: '18%',
        bottom: '8%',
        top: '100',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: '10岁以下',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [3.1, 4.3, 4.4, 3.8],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '10-19岁',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [11.2, 13.5, 14.2, 13.7],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '20-29岁',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [15.1, 15.3, 14.3, 15.6],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '30-39岁',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [12.8, 17.3, 16.5, 16],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '40-49岁',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [18.8, 18.4, 14.3, 14.7],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '50-59岁',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [18.6, 18.4, 16.7, 16.9],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        {
          name: '60岁及以上',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series',
            areaStyle: {
              opacity: 1
            }
          },
          data: [20.3, 19.9, 19.6, 19.2],
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            fontSize: 11,
            color: '#333',
            fontWeight: 'bold'
          }
        }
      ]
    })
  }

  // chart5 - 示例图表(需要根据实际数据补充)
  if (chart5.value) {
    myChart5Instance = echarts.init(chart5.value)
    myChart5Instance.setOption({
      title: {
        text: '示例图表5',
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '类别A' },
          { value: 735, name: '类别B' },
          { value: 580, name: '类别C' },
          { value: 484, name: '类别D' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
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
  gap: 30px;
  width: 90%;
  margin: 30px auto;
}

.chart-container {
  width: 100%;
  height: 450px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.highlight-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
  margin: 40px auto;
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
  margin: 20px 0;
  font-weight: bold;
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

.section {
  padding: 40px 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}
</style>