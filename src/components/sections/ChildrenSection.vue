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

    <!-- 儿童使用数字设备统计图表 -->
    <div class="device-usage-chart">
      <div class="chart-container" ref="chartDeviceUsage"></div>
    </div>

    <p class="data-note small">
      截至2024年6月,10岁以前首次"触网"的未成年人占比达52%,较上年提高7.4%。村镇儿童过早接触直播/短视频的比例(82.3%)远高于城市儿童(51.6%)。以刚进入幼儿园的3岁儿童为例,78.6%的儿童屏幕时间超过了每天1小时的指南推荐标准。
      <span class="data-source-note">
        数据来源：第52次《中国互联网络发展状况统计报告》《中国青少年蓝皮书》、JAMA Pediatrics
      </span>
    </p>



  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart4 = ref(null)
const chart5 = ref(null)
const chartDeviceUsage = ref(null)

let myChart4Instance = null
let myChart5Instance = null
let myChart6Instance = null
let myChartDeviceUsageInstance = null
let deviceUsageResizeHandler = null

// 儿童使用数字设备统计数据
const deviceUsageData = [
  { percentage: 84, label: '使用智能手机', age: '7岁 ' },
  { percentage: 37, label: ' 使用电脑', age: '8岁' },
  { percentage: 30, label: '使用平板电脑', age: '8岁' },
  { percentage: 87, label: '玩电子游戏', age: '7岁' },
  { percentage: 83, label: '看电视', age: '7岁' },
  { percentage: 68, label: '网上社交', age: '9岁' }
]

onMounted(() => {
  // chart4 - 堆叠柱状图（参考图片样式）
  if (chart4.value) {
    myChart4Instance = echarts.init(chart4.value)

    const colors = ['#FFB6C1', '#FFA07A', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C']

    // 响应式字体大小
    const isMobile4 = window.innerWidth <= 480
    const isTablet4 = window.innerWidth <= 768 && window.innerWidth > 480
    const sourceFontSize4 = isMobile4 ? 9 : isTablet4 ? 10 : 11

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
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          bottom: 5,
          z: 100,
          style: {
            text: '数据来源：《中国互联网络发展状况统计报告》',
            textAlign: 'center',
            fill: '#666',
            fontSize: sourceFontSize4
          }
        }
      ]
    })
  }

  // 图表5：未成年人网民数量
  if (chart5.value) {
    const myChart5 = echarts.init(chart5.value)

    // 响应式字体大小
    const isMobile5 = window.innerWidth <= 480
    const isTablet5 = window.innerWidth <= 768 && window.innerWidth > 480
    const sourceFontSize5 = isMobile5 ? 9 : isTablet5 ? 10 : 11

    myChart5.setOption({
      title: {
        text: '未成年人网民数量与普及率',
        left: 'center',
        top: 15
      },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['网民数量(万人)', '普及率(%)'],
        top: 50,
        left: 'center',
        orient: 'horizontal',
        itemGap: 20
      },
      grid: {
        top: 90,
        left: '10%',
        right: '10%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023']
      },
      yAxis: [
        { type: 'value', name: '万人' },
        { type: 'value', name: '%', max: 100 }
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
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          bottom: 5,
          z: 100,
          style: {
            text: '数据来源：《全国未成年人互联网使用情况研究报告》',
            textAlign: 'center',
            fill: '#666',
            fontSize: sourceFontSize5
          }
        }
      ]
    })
    myChart5Instance = myChart5
  }

  // 儿童使用数字设备统计图表
  if (chartDeviceUsage.value) {
    myChartDeviceUsageInstance = echarts.init(chartDeviceUsage.value)

    const categories = deviceUsageData.map(item => item.label)
    const percentages = deviceUsageData.map(item => item.percentage)
    const ages = deviceUsageData.map(item => item.age)

    // 响应式布局计算函数
    const getResponsiveConfig = () => {
      const isMobile = window.innerWidth <= 480
      const isTablet = window.innerWidth <= 768 && window.innerWidth > 480

      return {
        gridLeft: isMobile ? '5%' : isTablet ? '5%' : '10%',
        gridRight: isMobile ? '23%' : isTablet ? '21%' : '20%',
        barWidth: isMobile ? 32 : isTablet ? 38 : 42,
        sourceFontSize: isMobile ? 9 : isTablet ? 10 : 11,
        legendRight: isMobile ? '2%' : isTablet ? '1.5%' : '1.5%',
        legendFontSize: isMobile ? 11 : isTablet ? 12 : 13,
        percentageFontSize: isMobile ? 12 : isTablet ? 13 : 14
      }
    }

    // 更新图例位置以精确对齐条形图
    const updateLegendPositions = () => {
      if (!myChartDeviceUsageInstance) return

      const config = getResponsiveConfig()
      const updatedGraphic = []

      categories.forEach((label, index) => {
        // 正确的 convertToPixel 用法：传入坐标系ID和值
        // 对于 category 轴，index 就是对应的值
        const pixelPos = myChartDeviceUsageInstance.convertToPixel('grid', [50, index])

        if (pixelPos && Array.isArray(pixelPos)) {
          const barCenterY = pixelPos[1] - 8 // 微调垂直对齐

          updatedGraphic.push({
            type: 'text',
            right: config.legendRight,
            top: barCenterY,
            z: 100,
            id: `legend-${index}`,
            style: {
              text: `${label.trim()}  ${ages[index].trim()}`,
              fill: '#333',
              fontSize: config.legendFontSize,
              fontWeight: 500
            }
          })
        }
      })

      // 添加数据来源
      updatedGraphic.push({
        type: 'text',
        left: 'center',
        bottom: 5,
        z: 100,
        style: {
          text: '数据来源：中国互联网络信息中心（CNNIC）《第53次中国互联网络发展状况统计报告》、《中国儿童发展报告（2024）》',
          textAlign: 'center',
          fill: '#666',
          fontSize: config.sourceFontSize
        }
      })

      myChartDeviceUsageInstance.setOption({
        graphic: updatedGraphic
      })
    }

    const config = getResponsiveConfig()

    myChartDeviceUsageInstance.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        show: false
      },
      grid: {
        left: config.gridLeft,
        right: config.gridRight,
        top: '50px',
        bottom: '50px',
        containLabel: false
      },
      xAxis: {
        type: 'value',
        max: 100,
        min: 0,
        show: true,
        position: 'top',
        axisLabel: {
          show: true,
          formatter: '{value}%',
          fontSize: 12,
          color: '#999',
          margin: 10
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#f5f5f5',
            type: 'solid',
            width: 1
          }
        }
      },
      yAxis: {
        type: 'category',
        data: categories,
        inverse: true,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '百分比',
          type: 'bar',
          data: percentages.map((val) => ({
            value: val,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ffeb3b' },
                { offset: 0.5, color: '#ffd54f' },
                { offset: 1, color: '#ffc107' }
              ]),
              borderRadius: [0, 4, 4, 0]
            }
          })),
          barWidth: config.barWidth,
          barGap: '25%',
          label: {
            show: true,
            position: 'left',
            distance: 8,
            formatter: (params) => {
              return `{percent|${params.value}%}`
            },
            rich: {
              percent: {
                fontSize: config.percentageFontSize,
                color: '#333',
                fontWeight: 600
              }
            }
          },
          emphasis: {
            disabled: true
          },
          z: 2,
          animationDelay: (idx) => idx * 100
        },
        {
          name: '背景',
          type: 'bar',
          data: categories.map(() => 100),
          barWidth: config.barWidth,
          barGap: '25%',
          itemStyle: {
            color: '#f5f5f5',
            borderRadius: [0, 4, 4, 0]
          },
          silent: true,
          z: 1
        }
      ],
      graphic: [],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
      animationDelayUpdate: (idx) => idx * 100
    })

    // 使用 finished 事件确保图表渲染完成后更新图例
    myChartDeviceUsageInstance.on('finished', () => {
      updateLegendPositions()
    })

    // 首次手动触发一次（某些情况下 finished 可能不触发）
    setTimeout(() => {
      updateLegendPositions()
    }, 100)

    // 响应式调整
    deviceUsageResizeHandler = () => {
      if (myChartDeviceUsageInstance) {
        const newConfig = getResponsiveConfig()

        myChartDeviceUsageInstance.setOption({
          grid: {
            left: newConfig.gridLeft,
            right: newConfig.gridRight
          },
          series: [
            {
              barWidth: newConfig.barWidth,
              label: {
                rich: {
                  percent: {
                    fontSize: newConfig.percentageFontSize
                  }
                }
              }
            },
            {
              barWidth: newConfig.barWidth
            }
          ]
        })

        myChartDeviceUsageInstance.resize()

        // resize 后更新图例位置
        setTimeout(() => {
          updateLegendPositions()
        }, 50)
      }
    }

    window.addEventListener('resize', deviceUsageResizeHandler)
  }
})

onUnmounted(() => {
  if (myChart4Instance) myChart4Instance.dispose()
  if (myChart5Instance) myChart5Instance.dispose()
  if (myChart6Instance) myChart6Instance.dispose()
  if (myChartDeviceUsageInstance) {
    myChartDeviceUsageInstance.dispose()
  }
  if (deviceUsageResizeHandler) {
    window.removeEventListener('resize', deviceUsageResizeHandler)
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

.section-title {
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

.section-title::after {
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

/* ==================== 图表行布局 ==================== */
.chart-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg, 25px);
  width: 95%;
  max-width: 1200px;
  margin: 0 auto var(--spacing-lg, 30px);
  align-items: start;
}

.chart-container {
  width: 100%;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

/* ==================== 副标题 ==================== */
.chart-subtitle {
  text-align: center;
  font-size: 2.8rem;
  color: #e74c3c;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 10px rgba(231, 76, 60, 0.2);
}

/* ==================== 高亮框 ==================== */
.highlight-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: var(--radius-lg, 20px);
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 1.3rem;
  max-width: 1200px;
  margin: 0 auto var(--spacing-2xl, 60px);
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: break-word;
  box-shadow: 0 10px 40px rgba(240, 147, 251, 0.3);
  position: relative;
  overflow: hidden;

}

.highlight-box p {
  word-break: normal;
}

.highlight-box::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {

  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
}

.highlight-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffd700;
  animation: metricPulse 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin: 0 4px;
}

@keyframes metricPulse {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(243, 156, 18, 0));
    transform: scale(1);
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(243, 156, 18, 0.5));
    transform: scale(1.05);
  }
}

/* ==================== 数据说明 ==================== */
.data-note.small {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border-radius: 16px;
  border-left: 4px solid #667eea;
  max-width: 1200px;
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: keep-all;
  overflow-wrap: break-word;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
}

.data-source-note {
  display: block;
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  max-width: 1200px;
  margin: 10px auto 0;
  padding-left: 10px;
}

/* 平板优化 */
@media (max-width: 1024px) {
  .chart-row {
    gap: var(--spacing-lg, 30px);
    max-width: 100%;
  }

  .section {
    padding: var(--container-padding, 50px) var(--spacing-md, 20px) var(--container-padding, 70px);
  }
}


/* ==================== 儿童使用数字设备统计图表 ==================== */
.device-usage-chart {
  width: 95%;
  max-width: 1200px;
  margin: var(--spacing-lg, 30px) auto;
}

.device-usage-chart .chart-container {
  width: 100%;
  height: var(--chart-height, 450px);
  background: white;
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md, 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.device-usage-chart .chart-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

.chart-title-small {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.chart-subtitle-small {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin: 0 0 var(--spacing-xl, 40px) 0;
  line-height: 1.8;
  font-weight: 500;
}

/* 移动端优化 - 平板 */
@media (max-width: 768px) {
  .section {
    padding: var(--spacing-xl, 40px) var(--spacing-md, 20px) var(--spacing-xl, 50px);
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-xl, 40px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .section-title::after {
    width: 60px;
    height: 3px;
  }

  .chart-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 20px);
    margin-bottom: var(--spacing-lg, 30px);
    width: 100%;
  }

  .chart-container {
    height: 380px;
    padding: 18px;
    border-radius: 16px;
  }

  .chart-subtitle {
    font-size: 2.2rem;
    margin: var(--spacing-xl, 40px) auto var(--spacing-lg, 30px);
  }

  .highlight-box {
    padding: var(--spacing-xl, 35px) var(--spacing-lg, 30px);
    font-size: 1.15rem;
    margin-bottom: var(--spacing-xl, 40px);
    border-radius: 16px;
  }

  .highlight-num {
    font-size: 1.9rem;
  }

  .device-usage-chart {
    margin: var(--spacing-lg, 30px) auto;
    width: 100%;
  }

  .chart-title-small {
    font-size: 1.05rem;
  }

  .chart-subtitle-small {
    font-size: 0.95rem;
    margin-bottom: var(--spacing-lg, 30px);
  }

  .device-usage-chart .chart-container {
    height: 380px;
    padding: 18px;
    border-radius: 16px;
  }

  .data-note.small {
    padding: var(--spacing-lg, 25px) var(--spacing-md, 25px);
    margin: var(--spacing-xl, 40px) auto;
    font-size: 0.95rem;
    border-radius: 14px;
  }
}

/* 移动端优化 - 手机 */
@media (max-width: 480px) {
  .section {
    padding: var(--spacing-lg, 30px) 12px var(--spacing-xl, 40px);
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding-bottom: var(--spacing-sm, 15px);
    line-height: 1.5;
  }

  .section-title::after {
    width: 50px;
    height: 3px;
  }

  .chart-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 20px);
    margin-bottom: var(--spacing-lg, 30px);
    width: 100%;
  }

  .chart-container {
    height: 320px;
    padding: 15px 12px;
    border-radius: 14px;
  }

  .chart-subtitle {
    font-size: 1.8rem;
    margin: var(--spacing-lg, 30px) auto var(--spacing-md, 25px);
    line-height: 1.4;
  }

  .highlight-box {
    padding: var(--spacing-lg, 25px) var(--spacing-md, 20px);
    font-size: 1.05rem;
    margin-bottom: var(--spacing-lg, 30px);
    border-radius: 14px;
    line-height: 1.7;
  }

  .highlight-num {
    font-size: 1.7rem;
    margin: 0 3px;
  }

  .device-usage-chart {
    margin: var(--spacing-md, 25px) auto;
    max-width: 100%;
  }

  .chart-title-small {
    font-size: 1rem;
  }

  .chart-subtitle-small {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-md, 25px);
    line-height: 1.7;
    padding: 0 10px;
  }

  .device-usage-chart .chart-container {
    height: 320px;
    padding: 15px 12px;
    border-radius: 14px;
  }

  .data-note.small {
    font-size: 0.9rem;
    padding: var(--spacing-md, 20px) var(--spacing-sm, 18px);
    margin: var(--spacing-lg, 30px) auto;
    border-radius: 12px;
    line-height: 1.7;
  }
}
</style>