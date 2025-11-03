<template>
  <section class="section">
    <h1 class="main-title">动机溯源，爱与利益的罗生门</h1>

    <!-- <p class="section-intro">
      <span class="highlight-quote">"晒娃"</span>行为并非由<span class="highlight-emphasis">单一因素</span>驱动，而是<span
        class="highlight-key">家长心理</span>、<span class="highlight-key">儿童意愿</span>与<span
        class="highlight-key">社会压力</span>三方互动的结果。
    </p> -->

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
      <span class="highlight-quote">"晒娃"</span>行为并非由<span class="highlight-emphasis">单一因素</span>驱动，而是<span
        class="highlight-key">家长心理</span>、<span class="highlight-key">儿童意愿</span>与<span
        class="highlight-key">社会压力</span>三方互动的结果。
      当行为主要由<span class="highlight-positive">"记录成长"</span>、<span class="highlight-positive">"自我表达"</span>和<span
        class="highlight-positive">"亲子陪伴"</span>驱动时，它更多地表现为<span class="highlight-positive">才华展示与亲子互动</span>，<span
        class="highlight-success">守护了童年的本真</span>。
      而当<span class="highlight-negative">"经济压力"</span>和<span class="highlight-negative">"MCN机构"</span>等<span
        class="highlight-warning">商业驱动</span>成为主导力量时，<span class="highlight-quote">"晒娃"</span>就容易<span
        class="highlight-warning">异化为表演</span>，最终导向<span class="highlight-danger">消费童年</span>的负面结局。
    </p>
    <div style="margin-top:20px;">
      <button class="add-candy-btn" @click="showMindmap = true">查看思维导图</button>
    </div>

    <!-- 思维导图弹窗 -->
    <transition name="modal-fade">
      <div v-if="showMindmap" class="modal-overlay" @click="showMindmap = false">
        <div class="modal-content mindmap-modal" @click.stop>
          <button class="modal-close" @click="showMindmap = false">✕</button>
          <h3 class="modal-title">动机溯源思维导图</h3>
          <p class="modal-subtitle">探索"晒娃"行为背后的复杂动机</p>
          <div class="chart-container" ref="chartMindMap"></div>
          <div class="legend-container">
            <div class="legend-item">
              <span class="legend-dot positive"></span>
              <span>正向驱动</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot negative"></span>
              <span>负向压力</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot neutral"></span>
              <span>中性因素</span>
            </div>
          </div>
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
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: (params) => {
        const descriptions = {
          '晒娃动机': '家长心理、儿童意愿与社会压力<br/>三方互动的结果',
          '家长心理': '💚 记录成长、分享喜悦、自我表达',
          '儿童意愿': '⚠️ 天性表现、追求认可',
          '社会压力': '❌ 经济压力、平台诱导、MCN推动',
          '记录成长': '📸 保存珍贵时光，留存美好回忆',
          '自我表达': '✍️ 展示育儿理念，获得认同感',
          '亲子陪伴': '👨‍👩‍👧 通过互动增进感情',
          '经济压力': '💰 养育成本高，寻求补贴',
          '平台机制': '📱 算法推荐，流量奖励',
          'MCN影响': '🏢 专业包装，商业运作'
        }
        return `<div style="padding:5px;"><strong style="font-size:15px;">${params.name}</strong><br/><span style="opacity:0.9;">${descriptions[params.name] || ''}</span></div>`
      }
    },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      animation: true,
      animationDuration: 1500,
      animationEasing: 'cubicOut',
      label: {
        show: true,
        fontSize: 15,
        fontWeight: '700',
        color: '#2c3e50',
        position: 'inside',
        formatter: '{b}'
      },
      labelLayout: { hideOverlap: true },
      force: {
        repulsion: 500,
        edgeLength: [120, 200],
        gravity: 0.05,
        layoutAnimation: true,
        friction: 0.3
      },
      lineStyle: {
        color: 'source',
        curveness: 0.25,
        width: 3,
        opacity: 0.6
      },
      emphasis: {
        focus: 'adjacency',
        scale: 1.2,
        lineStyle: {
          width: 6,
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.5)'
        },
        itemStyle: {
          shadowBlur: 25,
          shadowColor: 'rgba(0,0,0,0.6)',
          borderWidth: 3,
          borderColor: '#fff'
        },
        label: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      data: [
        {
          name: '晒娃动机',
          symbolSize: 80,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ]),
            shadowBlur: 20,
            shadowColor: 'rgba(102,126,234,0.7)',
            borderColor: '#fff',
            borderWidth: 3
          },
          label: { fontSize: 17, fontWeight: 'bold', color: '#fff' }
        },
        {
          name: '家长心理',
          symbolSize: 55,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#91cc75' },
              { offset: 1, color: '#5cb87a' }
            ]),
            shadowBlur: 15,
            shadowColor: 'rgba(145,204,117,0.6)'
          }
        },
        {
          name: '儿童意愿',
          symbolSize: 55,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#fac858' },
              { offset: 1, color: '#f7b731' }
            ]),
            shadowBlur: 15,
            shadowColor: 'rgba(250,200,88,0.6)'
          }
        },
        {
          name: '社会压力',
          symbolSize: 55,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#ee6666' },
              { offset: 1, color: '#e74c3c' }
            ]),
            shadowBlur: 15,
            shadowColor: 'rgba(238,102,102,0.6)'
          }
        },
        { name: '记录成长', symbolSize: 42, itemStyle: { color: '#5cb87a', shadowBlur: 8, shadowColor: 'rgba(92,184,122,0.4)' } },
        { name: '自我表达', symbolSize: 42, itemStyle: { color: '#5cb87a', shadowBlur: 8, shadowColor: 'rgba(92,184,122,0.4)' } },
        { name: '亲子陪伴', symbolSize: 42, itemStyle: { color: '#5cb87a', shadowBlur: 8, shadowColor: 'rgba(92,184,122,0.4)' } },
        { name: '经济压力', symbolSize: 42, itemStyle: { color: '#e67e7e', shadowBlur: 8, shadowColor: 'rgba(230,126,126,0.4)' } },
        { name: '平台机制', symbolSize: 42, itemStyle: { color: '#e67e7e', shadowBlur: 8, shadowColor: 'rgba(230,126,126,0.4)' } },
        { name: 'MCN影响', symbolSize: 42, itemStyle: { color: '#e67e7e', shadowBlur: 8, shadowColor: 'rgba(230,126,126,0.4)' } }
      ],
      edges: [
        { source: '晒娃动机', target: '家长心理', lineStyle: { width: 4 } },
        { source: '晒娃动机', target: '儿童意愿', lineStyle: { width: 4 } },
        { source: '晒娃动机', target: '社会压力', lineStyle: { width: 4 } },
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
/* ==================== 关键词高亮样式 ==================== */
.highlight-quote {
  color: #667eea;
  font-weight: 700;
  border-bottom: 2px solid rgba(102, 126, 234, 0.3);
}

.highlight-key {
  color: #764ba2;
  font-weight: 600;
  border-bottom: 2px solid rgba(118, 75, 162, 0.3);
}

.highlight-emphasis {
  color: #f39c12;
  font-weight: 600;
}

.highlight-positive {
  color: #27ae60;
  font-weight: 600;
}

.highlight-success {
  color: #16a085;
  font-weight: 700;
  background: linear-gradient(to bottom, transparent 60%, rgba(22, 160, 133, 0.15) 60%);
  padding: 0 3px;
}

.highlight-negative {
  color: #e74c3c;
  font-weight: 600;
}

.highlight-warning {
  color: #e67e22;
  font-weight: 600;
}

.highlight-danger {
  color: #c0392b;
  font-weight: 700;
  background: linear-gradient(to bottom, transparent 60%, rgba(192, 57, 43, 0.15) 60%);
  padding: 0 3px;
}

/* ==================== 动机流程卡片 ==================== */
.motivation-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--card-gap, 30px);
  width: 100%;
  max-width: 1000px;
  margin: var(--spacing-2xl, 60px) auto;
}

.flow-left,
.flow-right {
  background: white;
  padding: var(--spacing-xl, 40px);
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.flow-left:hover,
.flow-right:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
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
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: var(--z-modal, 2000);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-content {
  max-width: 1300px;
  max-height: 85vh;
  width: 90%;
  background: white;
  border-radius: var(--radius-xl, 24px);
  padding: var(--spacing-xl, 40px) var(--spacing-lg, 30px);
  position: relative;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  margin: auto;
}

.mindmap-modal {
  padding: var(--spacing-lg, 30px);
}

.mindmap-modal .chart-container {
  height: 500px;
  flex: 1;
  min-height: 400px;
  margin: var(--spacing-md, 20px) 0;
  border-radius: var(--radius-md, 12px);
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.modal-title {
  margin: 0 0 var(--spacing-xs, 8px) 0;
  font-size: 1.8rem;
  color: #2c3e50;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-shrink: 0;
}

.modal-subtitle {
  margin: 0 0 var(--spacing-md, 20px) 0;
  font-size: 0.95rem;
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
  flex-shrink: 0;
}

.legend-container {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg, 30px);
  margin-top: var(--spacing-md, 20px);
  padding: var(--spacing-sm, 12px) var(--spacing-md, 20px);
  background: rgba(250, 250, 250, 0.8);
  border-radius: var(--radius-md, 12px);
  flex-wrap: wrap;
  flex-shrink: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  font-size: 0.95rem;
  color: #2c3e50;
  font-weight: 500;
}

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.legend-dot.positive {
  background: linear-gradient(135deg, #91cc75 0%, #5cb87a 100%);
}

.legend-dot.negative {
  background: linear-gradient(135deg, #ee6666 0%, #e74c3c 100%);
}

.legend-dot.neutral {
  background: linear-gradient(135deg, #fac858 0%, #f7b731 100%);
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

/* ==================== 移动端适配 ==================== */
@media (max-width: 768px) {
  .motivation-flow {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg, 30px);
    margin: var(--spacing-xl, 40px) auto;
  }

  .flow-left,
  .flow-right {
    padding: var(--spacing-lg, 30px);
  }

  .flow-left h3,
  .flow-right h3 {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
    max-height: 90vh;
    width: 95%;
  }

  .mindmap-modal {
    padding: var(--spacing-md, 20px);
  }

  .mindmap-modal .chart-container {
    height: 400px;
    min-height: 350px;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-subtitle {
    font-size: 0.85rem;
    margin-bottom: var(--spacing-sm, 12px);
  }

  .legend-container {
    gap: var(--spacing-md, 20px);
    padding: var(--spacing-xs, 8px) var(--spacing-sm, 12px);
    margin-top: var(--spacing-sm, 12px);
  }

  .legend-item {
    font-size: 0.85rem;
    gap: var(--spacing-xs, 8px);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
  }

  .modal-close {
    width: 42px;
    height: 42px;
    font-size: 1.5rem;
    top: 12px;
    right: 12px;
  }
}

@media (max-width: 480px) {
  .motivation-flow {
    margin: var(--spacing-lg, 30px) auto;
  }

  .flow-left,
  .flow-right {
    padding: var(--spacing-md, 20px);
  }

  .mindmap-modal {
    padding: 15px;
  }

  .mindmap-modal .chart-container {
    height: 320px;
    min-height: 300px;
    margin: var(--spacing-sm, 12px) 0;
  }

  .modal-content {
    padding: var(--spacing-md, 20px) 15px;
    width: 100%;
    max-height: 92vh;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-subtitle {
    font-size: 0.8rem;
    margin-bottom: var(--spacing-xs, 8px);
  }

  .legend-container {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs, 8px);
    padding: var(--spacing-xs, 8px);
    margin-top: var(--spacing-xs, 8px);
  }

  .legend-item {
    font-size: 0.8rem;
  }
}
</style>