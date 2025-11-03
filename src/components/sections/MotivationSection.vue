<template>
  <section class="section">
    <h1 class="main-title">动机溯源，爱与利益的罗生门</h1>

    <p class="section-intro">
      "晒娃"行为并非由单一因素驱动，而是家长心理、儿童意愿与社会压力三方互动的结果。
    </p>

    <div class="motivation-flow">
      <div class="flow-left">
        <h3>守护童年</h3>
        <ul>
          <li>记录成长</li>
          <li>自我表达</li>
          <li>亲子陪伴</li>
        </ul>
        <p class="flow-result positive">→ 才华展示与亲子互动</p>
      </div>

      <div class="flow-right">
        <h3>消费童年</h3>
        <ul>
          <li>经济压力</li>
          <li>MCN机构</li>
          <li>流量诱惑</li>
        </ul>
        <p class="flow-result negative">→ 表演与商业化</p>
      </div>
    </div>

    <p class="insight-text">
      “晒娃”行为并非由单一因素驱动，而是家长心理、儿童意愿与社会压力三方互动的结果。
      当行为主要由“记录成长”、“自我表达”和“亲子陪伴”驱动时，它更多地表现为才华展示与亲子互动，守护了童年的本真。
      而当“经济压力”和“MCN机构”等商业驱动成为主导力量时，“晒娃”就容易异化为表演，最终导向消费童年的负面结局。
    </p>
    <div style="margin-top:20px;">
      <button class="add-candy-btn" @click="showMindmap = true">查看思维导图</button>
    </div>

    <!-- 思维导图弹窗 -->
    <transition name="modal-fade">
      <div v-if="showMindmap" class="modal-overlay" @click="showMindmap = false">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="showMindmap = false">✕</button>
          <h3 style="margin:0 0 10px 0;">动机溯源思维导图</h3>
          <div class="chart-container" ref="chartMindMap" style="height:500px;"></div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const showMindmap = ref(false)
const chartMindMap = ref(null)

watch(showMindmap, async (v) => {
  if (!v) {
    if (chartMindMap.value) {
      echarts.getInstanceByDom(chartMindMap.value)?.dispose()
    }
    return
  }
  await nextTick()
  if (!chartMindMap.value) return
  const inst = echarts.init(chartMindMap.value)
  inst.setOption({
    title: {
      text: '"晒娃"动机溯源',
      left: 'center',
      top: 10,
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }
    },
    tooltip: {
      formatter: (params) => {
        const descriptions = {
          '晒娃动机': '家长心理、儿童意愿与社会压力三方互动的结果',
          '家长心理': '记录成长、分享喜悦、自我表达',
          '儿童意愿': '天性表现、追求认可',
          '社会压力': '经济压力、平台诱导、MCN推动',
          '记录成长': '保存珍贵时光，留存美好回忆',
          '自我表达': '展示育儿理念，获得认同感',
          '亲子陪伴': '通过互动增进感情',
          '经济压力': '养育成本高，寻求补贴',
          '平台机制': '算法推荐，流量奖励',
          'MCN影响': '专业包装，商业运作'
        }
        return `<strong>${params.name}</strong><br/>${descriptions[params.name] || ''}`
      }
    },
    series: [{
      type: 'graph', layout: 'force', roam: true, draggable: true,
      label: { show: true, fontSize: 13, fontWeight: 'bold', color: '#2c3e50', position: 'inside' },
      labelLayout: { hideOverlap: true },
      force: { repulsion: 400, edgeLength: [100, 180], gravity: 0.08, layoutAnimation: true },
      lineStyle: { color: 'source', curveness: 0.3, width: 2.5, opacity: 0.7 },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 5, shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.4)' },
        itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.5)' },
        label: { fontSize: 15, fontWeight: 'bold' }
      },
      data: [
        { name: '晒娃动机', symbolSize: 70, itemStyle: { color: '#667eea', shadowBlur: 15, shadowColor: 'rgba(102,126,234,0.6)' }, label: { fontSize: 15 } },
        { name: '家长心理', symbolSize: 50, itemStyle: { color: '#91cc75', shadowBlur: 10, shadowColor: 'rgba(145,204,117,0.5)' } },
        { name: '儿童意愿', symbolSize: 50, itemStyle: { color: '#fac858', shadowBlur: 10, shadowColor: 'rgba(250,200,88,0.5)' } },
        { name: '社会压力', symbolSize: 50, itemStyle: { color: '#ee6666', shadowBlur: 10, shadowColor: 'rgba(238,102,102,0.5)' } },
        { name: '记录成长', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
        { name: '自我表达', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
        { name: '亲子陪伴', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
        { name: '经济压力', symbolSize: 38, itemStyle: { color: '#e67e7e' } },
        { name: '平台机制', symbolSize: 38, itemStyle: { color: '#e67e7e' } },
        { name: 'MCN影响', symbolSize: 38, itemStyle: { color: '#e67e7e' } }
      ],
      edges: [
        { source: '晒娃动机', target: '家长心理' },
        { source: '晒娃动机', target: '儿童意愿' },
        { source: '晒娃动机', target: '社会压力' },
        { source: '家长心理', target: '记录成长' },
        { source: '家长心理', target: '自我表达' },
        { source: '家长心理', target: '亲子陪伴' },
        { source: '社会压力', target: '经济压力' },
        { source: '社会压力', target: '平台机制' },
        { source: '社会压力', target: 'MCN影响' }
      ]
    }]
  })
})
</script>

<style scoped>
.motivation-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  width: 100%;
  max-width: 1000px;
  margin: 50px 0;
}

.flow-left,
.flow-right {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.flow-left h3 {
  color: #27ae60;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.flow-right h3 {
  color: #e74c3c;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.flow-left ul,
.flow-right ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.flow-left li,
.flow-right li {
  padding: 10px 0;
  font-size: 1.1rem;
  padding-left: 30px;
  position: relative;
}

.flow-left li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

.flow-right li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #e74c3c;
  font-weight: bold;
}

.flow-result {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.flow-result.positive {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.flow-result.negative {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  background: white;
  border-radius: 30px;
  padding: 50px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.9) translateY(50px);
    opacity: 0;
  }

  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  z-index: 10;
}

.modal-close:hover {
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 8px 20px rgba(231, 76, 60, 0.5);
}

.modal-fade-enter-active {
  animation: modalFadeIn 0.3s ease-out;
}

.modal-fade-leave-active {
  animation: modalFadeIn 0.3s ease-out reverse;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>