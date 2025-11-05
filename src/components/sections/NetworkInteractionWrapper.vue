<template>
  <div>
    <!-- 四方关系环形图 -->
    <section class="section interactive-section">
      <h2 class="section-title">屏幕背后的利益网络</h2>
      <p class="section-hint" v-if="!allRolesViewed">💡 点击下方角色查看相关数据，了解各方在利益网络中的角色</p>
      <p class="section-hint viewed-hint" v-else>✨ 所有角色已查看！箭头指向中心的儿童，展现利益网络的核心</p>

      <div class="circle-interaction">
        <svg ref="networkSvg" class="network-lines"></svg>
        <div ref="centerChildEl" class="center-child" :class="{ shrink: selectedRole }" @click="showChildImages = true"
          style="cursor: pointer;" title="点击查看儿童在利益网络中的处境">
          <div class="child-icon">👶</div>
        </div>

        <div ref="rolesContainerEl" class="roles-container">
          <div v-for="role in roles" :key="role.id" class="role-item" :data-role="role.id"
            :data-tip="`点击查看${role.name}详情`"
            :class="{ active: selectedRole === role.id, viewed: viewedRoles.has(role.id) }"
            @click="handleSelectRole(role.id)" @mouseenter="highlightLine(role.id, true)"
            @mouseleave="highlightLine(role.id, false)" tabindex="0" @keydown="onRoleKey($event, role.id)">
            <div class="role-avatar">{{ role.icon }}</div>
            <div class="role-name">{{ role.name }}</div>
            <div class="role-hint">点击查看相关数据</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 角色详情弹窗 -->
    <RoleModalSection :selectedRole="selectedRole" @close="selectedRole = null" @chartInit="initModalCharts" />

    <!-- 儿童被围困图片弹窗 -->
    <ChildSurroundingModal :visible="showChildImages" :data="childSurroundingData" @close="showChildImages = false" />

    <!-- 观众分析 -->
    <!-- <AudienceSection /> -->


    <!-- 动机分析 -->
    <MotivationSection />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import * as echarts from 'echarts'
import RoleModalSection from './RoleModalSection.vue'
import ChildSurroundingModal from './ChildSurroundingModal.vue'
import MotivationSection from './MotivationSection.vue'

// ==================== 四方角色数据 ====================
const roles = [
  { id: 'parents', name: '父母', icon: '👨‍👩‍👧' },
  { id: 'mcn', name: 'MCN机构', icon: '🏢' },
  { id: 'audience', name: '观众', icon: '👥' },
  { id: 'platform', name: '平台', icon: '📱' }
]

// ==================== 儿童被围困数据 ====================
const childSurroundingData = {
  // 只保留空对象，因为模态框现在只显示影响数据
}

// ==================== 儿童影响数据 ====================


// ==================== UI状态管理 ====================
const selectedRole = ref(null)
const showChildImages = ref(false)
const viewedRoles = ref(new Set()) // 跟踪已查看的角色

// ==================== Refs ====================
const networkSvg = ref(null)
const centerChildEl = ref(null)
const rolesContainerEl = ref(null)

// ==================== ECharts 实例 ====================
let mcnSignupChart = null
let costMapChart = null

// ==================== 计算属性 ====================
const allRolesViewed = computed(() => {
  return viewedRoles.value.size === roles.length
})

// ==================== 交互函数 ====================
const handleSelectRole = (roleId) => {
  const wasSelected = selectedRole.value === roleId
  selectedRole.value = wasSelected ? null : roleId

  // 如果选择了角色（打开弹窗），记录为已查看
  if (!wasSelected && roleId) {
    // 重新创建 Set 以确保 Vue 能够检测到变化
    viewedRoles.value = new Set([...viewedRoles.value, roleId])
  }
}

const onRoleKey = (e, roleId) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleSelectRole(roleId)
  }
}

// ==================== 连接线绘制 ====================
const drawLines = () => {
  if (!networkSvg.value || !centerChildEl.value || !rolesContainerEl.value) return

  const svg = networkSvg.value
  const centerRect = centerChildEl.value.getBoundingClientRect()
  const containerRect = rolesContainerEl.value.getBoundingClientRect()

  const centerX = centerRect.left + centerRect.width / 2 - containerRect.left
  const centerY = centerRect.top + centerRect.height / 2 - containerRect.top
  const centerRadius = centerRect.width / 2

  svg.innerHTML = ''
  svg.setAttribute('width', containerRect.width)
  svg.setAttribute('height', containerRect.height)

  // 检查是否所有角色都被查看
  const shouldShowArrows = allRolesViewed.value

  // 定义箭头标记（如果所有角色都被查看）
  if (shouldShowArrows) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

    // 创建发光效果
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', 'glow')
    filter.setAttribute('x', '-50%')
    filter.setAttribute('y', '-50%')
    filter.setAttribute('width', '200%')
    filter.setAttribute('height', '200%')
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feGaussianBlur.setAttribute('stdDeviation', '3')
    feGaussianBlur.setAttribute('result', 'coloredBlur')
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode1.setAttribute('in', 'coloredBlur')
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode2.setAttribute('in', 'SourceGraphic')
    feMerge.appendChild(feMergeNode1)
    feMerge.appendChild(feMergeNode2)
    filter.appendChild(feGaussianBlur)
    filter.appendChild(feMerge)
    defs.appendChild(filter)

    // 创建更大的箭头
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
    marker.setAttribute('id', 'arrowhead')
    marker.setAttribute('markerWidth', '20')
    marker.setAttribute('markerHeight', '20')
    marker.setAttribute('refX', '18')
    marker.setAttribute('refY', '6')
    marker.setAttribute('orient', 'auto')
    marker.setAttribute('markerUnits', 'userSpaceOnUse')

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute('points', '0 0, 20 6, 0 12')
    polygon.setAttribute('fill', '#ff1744')
    polygon.setAttribute('stroke', '#ff6b6b')
    polygon.setAttribute('stroke-width', '1')
    polygon.setAttribute('filter', 'url(#glow)')
    marker.appendChild(polygon)
    defs.appendChild(marker)
    svg.appendChild(defs)
  }

  const roleItems = rolesContainerEl.value.querySelectorAll('.role-item')
  roleItems.forEach(item => {
    const rect = item.getBoundingClientRect()
    const x = rect.left + rect.width / 2 - containerRect.left
    const y = rect.top + rect.height / 2 - containerRect.top

    // 计算从角色到中心的方向向量
    const dx = centerX - x
    const dy = centerY - y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const unitX = dx / distance
    const unitY = dy / distance

    // 计算线条的起点和终点（考虑中心圆的半径）
    const startX = x + unitX * (rect.width / 2)
    const startY = y + unitY * (rect.height / 2)
    const endX = centerX - unitX * centerRadius
    const endY = centerY - unitY * centerRadius

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', startX)
    line.setAttribute('y1', startY)
    line.setAttribute('x2', endX)
    line.setAttribute('y2', endY)
    line.setAttribute('class', 'connection-line')
    line.setAttribute('data-role', item.dataset.role)

    // 如果所有角色都被查看，添加箭头
    if (shouldShowArrows) {
      line.setAttribute('marker-end', 'url(#arrowhead)')
      line.classList.add('arrow-line')
    }

    svg.appendChild(line)
  })
}

const highlightLine = (roleId, isHighlight) => {
  if (!networkSvg.value) return
  const line = networkSvg.value.querySelector(`line[data-role="${roleId}"]`)
  if (line) {
    // 如果所有角色都被查看，确保箭头类一直存在
    const shouldShowArrows = allRolesViewed.value
    if (shouldShowArrows) {
      line.classList.add('arrow-line')
      // 确保箭头标记存在
      if (!line.getAttribute('marker-end')) {
        line.setAttribute('marker-end', 'url(#arrowhead)')
      }
    }
    line.classList.toggle('highlight', isHighlight)
  }
}

// ==================== 图表初始化 ====================
const initModalCharts = async () => {
  // 等待 DOM 更新
  await new Promise(resolve => setTimeout(resolve, 100))

  if (selectedRole.value === 'mcn') {
    initMcnSignupChart()
  } else if (selectedRole.value === 'parents') {
    initCostMapChart()
  }
}

const initMcnSignupChart = () => {
  const el = document.getElementById('mcnSignupChart')
  if (!el) return
  mcnSignupChart?.dispose?.()
  mcnSignupChart = echarts.init(el)
  mcnSignupChart.setOption({
    title: { text: '签约 vs 未签约', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 10, left: 'center' },
    series: [{
      type: 'pie', radius: ['40%', '70%'],
      label: { formatter: '{b}：{c}（{d}%）' },
      data: [
        { value: 286, name: '签约', itemStyle: { color: '#667eea' } },
        { value: 235, name: '未签约', itemStyle: { color: '#e0e0e0' } }
      ]
    }]
  })
}

const initCostMapChart = async () => {
  const el = document.getElementById('costMap')
  if (!el) return
  costMapChart?.dispose?.()
  costMapChart = echarts.init(el)

  const mapUrl = `${import.meta.env.BASE_URL}china.json`
  try {
    const res = await fetch(mapUrl)
    if (!res.ok) throw new Error('map not found')
    const mapJson = await res.json()
    echarts.registerMap('china', mapJson)

    const provinceData = [
      { name: '北京', value: 96.9 },
      { name: '天津', value: 63.5 },
      { name: '河北', value: 62.7 },
      { name: '山西', value: 49.8 },
      { name: '内蒙古', value: 54.2 },
      { name: '辽宁', value: 64.5 },
      { name: '吉林', value: 55.0 },
      { name: '黑龙江', value: 52.0 },
      { name: '上海', value: 102.6 },
      { name: '江苏', value: 62.6 },
      { name: '浙江', value: 72.8 },
      { name: '安徽', value: 62.9 },
      { name: '福建', value: 67.0 },
      { name: '江西', value: 58.3 },
      { name: '山东', value: 63.1 },
      { name: '河南', value: 58.5 },
      { name: '湖北', value: 63.4 },
      { name: '湖南', value: 61.1 },
      { name: '广东', value: 71.2 },
      { name: '广西', value: 54.8 },
      { name: '海南', value: 58.6 },
      { name: '重庆', value: 63.0 },
      { name: '四川', value: 56.0 },
      { name: '贵州', value: 53.3 },
      { name: '云南', value: 52.8 },
      { name: '西藏', value: 58.1 },
      { name: '陕西', value: 54.1 },
      { name: '甘肃', value: 51.4 },
      { name: '青海', value: 62.1 },
      { name: '宁夏', value: 59.3 },
      { name: '新疆', value: 55.4 }
    ]

    costMapChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params) => `${params.name}<br/>养育成本：${params.value || '暂无数据'}万元`
      },
      visualMap: {
        min: 30,
        max: 110,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: { color: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'] },
        left: 'left',
        bottom: '10%'
      },
      series: [{
        name: '养育成本',
        type: 'map',
        map: 'china',
        roam: true,
        label: { show: false },
        emphasis: {
          label: { show: true, color: '#000' },
          itemStyle: { areaColor: '#ffa726' }
        },
        data: provinceData
      }]
    })
  } catch (error) {
    console.error('地图加载失败:', error)
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  drawLines()
  window.addEventListener('resize', drawLines)
})

onUnmounted(() => {
  window.removeEventListener('resize', drawLines)
})

// ==================== 监听角色切换 ====================
watch(selectedRole, async (newVal) => {
  if (newVal) {
    initModalCharts()
  }
  // 角色切换后重新绘制连接线
  await nextTick()
  drawLines()
})

// ==================== 监听所有角色查看状态 ====================
watch(allRolesViewed, async (newVal) => {
  // 当所有角色查看状态改变时，重新绘制连接线
  await nextTick()
  drawLines()
  // 如果所有角色都被查看，确保箭头一直显示
  if (newVal) {
    setTimeout(() => {
      if (allRolesViewed.value) {
        drawLines()
      }
    }, 300)
  }
})
</script>

<style scoped>
/* ==================== 交互式网络区域 ==================== */
.interactive-section {
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-hint {
  font-size: 1.1rem;
  color: #667eea;
  text-align: center;
  margin: 0 auto 40px;
  padding: 15px 30px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 25px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  display: block;
  max-width: 90%;
  line-height: 1.6;
  animation: hintFadeIn 0.5s ease-out;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.section-hint.viewed-hint {
  color: #ff1744;
  background: rgba(255, 23, 68, 0.1);
  border-color: rgba(255, 23, 68, 0.3);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 23, 68, 0.3);
  animation: viewedHintPulse 2s ease-in-out infinite;
}

@keyframes viewedHintPulse {

  0%,
  100% {
    box-shadow: 0 4px 15px rgba(255, 23, 68, 0.3);
  }

  50% {
    box-shadow: 0 6px 20px rgba(255, 23, 68, 0.5);
  }
}

@keyframes hintFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.circle-interaction {
  position: relative;
  width: 600px;
  height: 600px;
  max-width: 90vw;
  max-height: 90vw;
}

.network-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.connection-line {
  stroke: #667eea;
  stroke-width: 2;
  opacity: 0.3;
  transition: all 0.3s;
}

.connection-line.highlight {
  stroke: #ff6b6b;
  stroke-width: 3;
  opacity: 0.8;
}

.connection-line.arrow-line {
  stroke: #ff1744 !important;
  stroke-width: 5 !important;
  opacity: 1 !important;
  filter: drop-shadow(0 0 8px rgba(255, 23, 68, 0.8));
  animation: arrowPulse 1.5s ease-in-out infinite;
}

/* 确保箭头样式优先级最高，即使同时有 highlight 类 */
.connection-line.arrow-line.highlight {
  stroke: #ff1744 !important;
  stroke-width: 5 !important;
  opacity: 1 !important;
  filter: drop-shadow(0 0 8px rgba(255, 23, 68, 0.8));
  animation: arrowPulse 1.5s ease-in-out infinite;
}

@keyframes arrowPulse {

  0%,
  100% {
    opacity: 0.9;
    stroke-width: 5;
    filter: drop-shadow(0 0 8px rgba(255, 23, 68, 0.8));
  }

  50% {
    opacity: 1;
    stroke-width: 6;
    filter: drop-shadow(0 0 15px rgba(255, 23, 68, 1));
  }
}

.center-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.center-child:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.center-child.shrink {
  width: 60px;
  height: 60px;
}

.child-icon {
  font-size: 3rem;
  transition: font-size 0.3s;
}

.center-child.shrink .child-icon {
  font-size: 1.8rem;
}

.roles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.role-item {
  position: absolute;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 3;
}

.role-item:nth-child(1) {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.role-item:nth-child(2) {
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}

.role-item:nth-child(3) {
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.role-item:nth-child(4) {
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}

.role-item:hover,
.role-item.active {
  transform: translateX(-50%) scale(1.15);
}

.role-item:nth-child(2):hover,
.role-item:nth-child(2).active {
  transform: translateY(-50%) scale(1.15);
}

.role-item:nth-child(3):hover,
.role-item:nth-child(3).active {
  transform: translateX(-50%) scale(1.15);
}

.role-item:nth-child(4):hover,
.role-item:nth-child(4).active {
  transform: translateY(-50%) scale(1.15);
}

.role-avatar {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  margin: 0 auto 10px;
}

.role-item:hover .role-avatar,
.role-item.active .role-avatar {
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  transform: translateY(-5px);
}

.role-name {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  margin-bottom: 4px;
}

.role-hint {
  text-align: center;
  font-size: 0.75rem;
  color: #667eea;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.3s ease;
  font-weight: 500;
  margin-top: 4px;
}

.role-item:hover .role-hint,
.role-item.active .role-hint {
  opacity: 1;
  transform: translateY(0);
}

.role-item.viewed .role-hint {
  color: #ff6b6b;
  font-weight: 600;
}

.role-item.viewed .role-avatar {
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  border: 2px solid rgba(255, 107, 107, 0.5);
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .circle-interaction {
    width: 400px;
    height: 400px;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .section-hint {
    font-size: 0.95rem;
    padding: 12px 20px;
    margin-bottom: 30px;
  }

  .center-child {
    width: 70px;
    height: 70px;
  }

  .center-child.shrink {
    width: 45px;
    height: 45px;
  }

  .child-icon {
    font-size: 2rem;
  }

  .center-child.shrink .child-icon {
    font-size: 1.2rem;
  }

  .role-avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .role-name {
    font-size: 0.85rem;
  }

  .role-hint {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .interactive-section {
    padding: 40px 10px;
  }

  .section-title {
    font-size: 1.4rem;
    padding: 0 5px;
    margin-bottom: 12px;
  }

  .section-hint {
    font-size: 0.85rem;
    padding: 10px 15px;
    margin-bottom: 25px;
    max-width: 95%;
  }

  .circle-interaction {
    height: 420px;
  }

  .center-child {
    width: 90px;
    height: 90px;
  }

  .child-icon {
    font-size: 2.5rem;
  }

  .center-child.shrink {
    width: 70px;
    height: 70px;
  }

  .center-child.shrink .child-icon {
    font-size: 1.8rem;
  }

  .role-item {
    padding: 8px;
  }

  .role-avatar {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }

  .role-name {
    font-size: 0.75rem;
  }

  .role-hint {
    font-size: 0.65rem;
  }
}
</style>