<template>
  <transition name="modal-fade">
    <div v-if="selectedRole" class="modal-overlay" @click="emit('close')">
      <div class="modal-content" role="dialog" aria-modal="true" tabindex="0" @keydown.esc="emit('close')" @click.stop>
        <button class="modal-close" @click="emit('close')">✕</button>
        <div class="modal-body">
          <!-- 父母角色内容 -->
          <ParentsRoleContent v-if="selectedRole === 'parents'" />

          <!-- MCN机构角色内容 -->
          <McnRoleContent v-if="selectedRole === 'mcn'" />

          <!-- 观众角色内容 -->
          <AudienceRoleContent v-if="selectedRole === 'audience'" />

          <!-- 平台角色内容 -->
          <PlatformRoleContent v-if="selectedRole === 'platform'" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch, nextTick } from 'vue'
import ParentsRoleContent from './ParentsRoleContent.vue'
import McnRoleContent from './McnRoleContent.vue'
import AudienceRoleContent from './AudienceRoleContent.vue'
import PlatformRoleContent from './PlatformRoleContent.vue'

// ==================== Props & Emits ====================
const props = defineProps({
  selectedRole: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close', 'chartInit'])

// ==================== 监听角色变化，触发图表初始化 ====================
watch(() => props.selectedRole, async (newRole) => {
  if (newRole) {
    await nextTick()
    // 添加动画类以触发分成条展开动画
    const modalContent = document.querySelector('.modal-content')
    if (modalContent) {
      modalContent.classList.add('animate')
    }
    emit('chartInit')
  } else {
    // 移除动画类
    const modalContent = document.querySelector('.modal-content')
    if (modalContent) {
      modalContent.classList.remove('animate')
    }
  }
})
</script>

<style scoped>
/* ==================== 模态框基础样式 ==================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 20px;
}

.modal-content {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 24px;
  padding: 50px 40px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.4s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  z-index: 10;
}

.modal-close:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.modal-body {
  color: #2c3e50;
  line-height: 1.8;
}

.modal-body h3 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.modal-body p {
  margin: 15px 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: #555;
}

.modal-body h4 {
  color: #2c3e50;
  margin: 30px 0 15px;
  font-size: 1.4rem;
  font-weight: 700;
}

/* ==================== 滚动条样式 ==================== */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* ==================== 动画过渡 ==================== */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ==================== 使用 :deep() 选择器来覆盖子组件动态内容的样式 ==================== */
.modal-body :deep(.creator-share),
.modal-body :deep(.mcn-share) {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s;
  position: relative;
}

/* 初始缩放为0，打开模态后展开到各自宽度 */
.modal-content:not(.animate) :deep(.creator-share),
.modal-content:not(.animate) :deep(.mcn-share) {
  transform: scaleX(0);
  transform-origin: left center;
}

.modal-content.animate :deep(.creator-share),
.modal-content.animate :deep(.mcn-share) {
  transform: scaleX(1);
  transition: transform .6s ease;
}

.modal-body :deep(.revenue-model:hover .creator-share),
.modal-body :deep(.revenue-model:hover .mcn-share) {
  filter: brightness(1.1);
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .modal-content {
    padding: 30px 20px;
    max-width: 95%;
    max-height: 85vh;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    top: 15px;
    right: 15px;
  }

  .modal-body h3 {
    font-size: 1.5rem;
  }

  .modal-body p {
    font-size: 1rem;
  }

  .modal-body :deep(.creator-share),
  .modal-body :deep(.mcn-share) {
    font-size: 0.9rem;
  }
}
</style>