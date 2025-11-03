<template>
  <div>
    <!-- 四方关系环形图 -->
    <CircleNetworkSection :roles="roles" :selectedRole="selectedRole" @selectRole="handleSelectRole"
      @showChildModal="showChildImages = true" />

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
import { ref, watch } from 'vue'
import * as echarts from 'echarts'
import CircleNetworkSection from './CircleNetworkSection.vue'
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

// ==================== ECharts 实例 ====================
let mcnSignupChart = null
let costMapChart = null

// ==================== 交互函数 ====================
const handleSelectRole = (roleId) => {
  selectedRole.value = selectedRole.value === roleId ? null : roleId
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

// ==================== 监听角色切换 ====================
watch(selectedRole, (newVal) => {
  if (newVal) {
    initModalCharts()
  }
})
</script>

<style scoped>
/* 这里可以添加包装组件特有的样式 */
</style>