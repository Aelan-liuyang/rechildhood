<template>
  <section class="section interactive-section">
    <h2 class="section-title">屏幕背后的利益网络</h2>

    <div class="circle-interaction">
      <svg ref="networkSvg" class="network-lines"></svg>
      <div ref="centerChildEl" class="center-child" :class="{ shrink: selectedRole }" @click="emit('showChildModal')"
        style="cursor: pointer;" title="点击查看儿童在利益网络中的处境">
        <div class="child-icon">👶</div>
      </div>

      <div ref="rolesContainerEl" class="roles-container">
        <div v-for="role in roles" :key="role.id" class="role-item" :data-role="role.id"
          :data-tip="`点击查看${role.name}详情`" :class="{ active: selectedRole === role.id }" @click="selectRole(role.id)"
          @mouseenter="highlightLine(role.id, true)" @mouseleave="highlightLine(role.id, false)" tabindex="0"
          @keydown="onRoleKey($event, role.id)">
          <div class="role-avatar">{{ role.icon }}</div>
          <div class="role-name">{{ role.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ==================== Props & Emits ====================
const props = defineProps({
  roles: {
    type: Array,
    required: true
  },
  selectedRole: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['selectRole', 'showChildModal'])

// ==================== Refs ====================
const networkSvg = ref(null)
const centerChildEl = ref(null)
const rolesContainerEl = ref(null)

// ==================== 交互函数 ====================
const selectRole = (roleId) => {
  emit('selectRole', roleId)
}

const onRoleKey = (e, roleId) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    selectRole(roleId)
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

  svg.innerHTML = ''
  svg.setAttribute('width', containerRect.width)
  svg.setAttribute('height', containerRect.height)

  const roleItems = rolesContainerEl.value.querySelectorAll('.role-item')
  roleItems.forEach(item => {
    const rect = item.getBoundingClientRect()
    const x = rect.left + rect.width / 2 - containerRect.left
    const y = rect.top + rect.height / 2 - containerRect.top

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', centerX)
    line.setAttribute('y1', centerY)
    line.setAttribute('x2', x)
    line.setAttribute('y2', y)
    line.setAttribute('class', 'connection-line')
    line.setAttribute('data-role', item.dataset.role)
    svg.appendChild(line)
  })
}

const highlightLine = (roleId, isHighlight) => {
  if (!networkSvg.value) return
  const line = networkSvg.value.querySelector(`line[data-role="${roleId}"]`)
  if (line) {
    line.classList.toggle('highlight', isHighlight)
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
</script>

<style scoped>
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
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  z-index: 1;
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
}

/* 响应式设计 */
@media (max-width: 768px) {
  .circle-interaction {
    width: 400px;
    height: 400px;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 40px;
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
}
</style>