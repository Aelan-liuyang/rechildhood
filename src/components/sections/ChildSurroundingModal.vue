<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay" @click="emit('close')">
      <div class="modal-content" role="dialog" aria-modal="true" tabindex="0" @keydown.esc="emit('close')" @click.stop>
        <button class="modal-close" @click="emit('close')">✕</button>
        <div class="modal-body">
          <!-- 标题区域 -->
          <h3 class="modal-main-title">儿童：被裹挟的主角</h3>
          <p class="modal-main-subtitle">流量狂欢背后，儿童成为最大的受害者</p>

          <!-- 影响数据区域 -->
          <div class="impact-data-section">
            <h4 class="impact-title">萌娃流量狂潮</h4>
            <p class="impact-intro">
              萌娃的天然流量优势再加之粉丝追捧，"晒娃"行为在相关平台越烧越旺。某千万级网红父母为其新生儿"光速"注册账号，仅1条视频，抖音吸粉十几万，点赞超30万。
            </p>

            <!-- 示例图片 -->
            <div class="example-images">
              <div class="example-image-card" v-for="(img, index) in exampleImages" :key="index">
                <img :src="img.src" :alt="img.alt" />
              </div>
            </div>

            <div class="impact-stats-grid">
              <div v-for="(stat, index) in impactStats" :key="index" class="impact-stat-card"
                :class="`card-color-${(index % 3) + 1}`">
                <div class="stat-icon">{{ stat.icon }}</div>
                <div class="stat-content">
                  <div class="stat-metric" v-if="stat.highlight">{{ stat.highlight }}</div>
                  <p class="stat-text">{{ stat.text }}</p>
                </div>
              </div>
            </div>

            <p class="data-source">
              数据来源：新华网、中工网、儿童发展研究学会（SRCD）、《美国医学会杂志（JAMA）》《美国医学协会儿科学（JAMA Pediatrics）》
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
// ==================== Props & Emits ====================
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// ==================== 示例图片 ====================
const exampleImages = [
  { src: new URL('@/assets/images/3.png', import.meta.url).href, alt: '示例图片3' },
  { src: new URL('@/assets/images/4.png', import.meta.url).href, alt: '示例图片4' },
  { src: new URL('@/assets/images/5.png', import.meta.url).href, alt: '示例图片5' },
  { src: new URL('@/assets/images/6.png', import.meta.url).href, alt: '示例图片6' }
]

// ==================== 影响数据 ====================
const impactStats = [
  {
    icon: '🎬',
    text: '54%的青少年最向往的职业是当主播和网红',
    highlight: '54%'
  },
  {
    icon: '😰',
    text: '频繁接触社交媒体的青少年，抑郁和焦虑发生率分别提高45%和38%',
    highlight: '45% ↑ / 38% ↑'
  },
  {
    icon: '⚠️',
    text: '40%使用社交媒体的女孩遭遇过网络骚扰或欺凌，这一比例在男孩当中为25%；40%的女孩睡眠不规律，而男孩的这一比例为28%',
    highlight: '女孩 40% / 男孩 25%'
  },
  {
    icon: '🧠',
    text: '6岁前日均屏幕时间超过1小时的儿童，其总智商平均下降6.7至8.2分，并且在多动与注意力不足方面受损更加明显',
    highlight: 'IQ ↓ 6.7-8.2分'
  },
  {
    icon: '🎭',
    text: '儿童在成人设计的"剧本"中被"催熟"，15%的萌宝短剧存在此类成人化倾向语言',
    highlight: '15%'
  },
  {
    icon: '⚡',
    text: '过早暴露在聚光灯下的儿童，大脑前额叶皮质发育受损率高达67%',
    highlight: '67%'
  }
]
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal, 9999);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 50px 40px;
  border-radius: 24px;
  max-width: 1200px;
  width: 95%;
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 滚动条样式 */
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
  transition: background 0.3s;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-40px) scale(0.92);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.modal-close:hover {
  transform: rotate(90deg) scale(1.15);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.modal-body {
  color: #2c3e50;
}

/* ==================== 主标题区域 ==================== */
.modal-main-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  animation: titleFadeIn 0.6s ease-out;
}

.modal-main-subtitle {
  text-align: justify;
  text-justify: inter-ideograph;
  color: #666;
  font-size: 1.15rem;
  margin: 0 auto 40px;
  line-height: 1.6;
  max-width: 700px;
  padding: 0 20px;
  font-weight: 500;
  animation: subtitleFadeIn 0.8s ease-out;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== 影响数据区域 ==================== */
.impact-data-section {
  margin-top: 0;
  padding: 45px 35px;
  background: linear-gradient(135deg, rgba(255, 245, 235, 0.7) 0%, rgba(255, 235, 238, 0.7) 100%);
  border-radius: 24px;
  border: 2px solid rgba(255, 200, 200, 0.35);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  animation: sectionFadeIn 1s ease-out;
}

@keyframes sectionFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== 示例图片 ==================== */
.example-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: var(--spacing-lg, 30px) auto var(--spacing-xl, 40px);
  max-width: 100%;
  padding: 0 10px;
}

.example-image-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  aspect-ratio: 4 / 3;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: imageCardReveal 0.8s ease-out backwards;
}

.example-image-card:nth-child(1) {
  animation-delay: 0.1s;
}

.example-image-card:nth-child(2) {
  animation-delay: 0.2s;
}

.example-image-card:nth-child(3) {
  animation-delay: 0.3s;
}

.example-image-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes imageCardReveal {
  from {
    opacity: 0;
    transform: translateY(40px) rotateX(15deg);
  }

  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

.example-image-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 1;
}

.example-image-card:hover::before {
  opacity: 1;
}

.example-image-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
}

.example-image-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 10px;
}

.impact-title {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 18px 0;
  position: relative;
  padding-bottom: 15px;
}

.impact-title::after {
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

.impact-intro {
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 1.05rem;
  color: #555;
  line-height: 1.8;
  margin: 0 auto 35px;
  max-width: 900px;
  padding: 0 20px;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.impact-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  margin-top: 40px;
  padding: 0;
}

.impact-stat-card {
  background: white;
  padding: 32px 24px;
  border-radius: var(--radius-md, 16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: visible;
  min-height: 280px;
}

.impact-stat-card::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 18px;
  background: linear-gradient(135deg, currentColor, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.impact-stat-card::after {
  display: none;
}

.card-color-1 {
  color: #667eea;
}

.card-color-2 {
  color: #ff6b6b;
}

.card-color-3 {
  color: #51cf66;
}

.impact-stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.impact-stat-card:hover::before {
  opacity: 0.15;
}

.stat-icon {
  font-size: 3.2rem;
  line-height: 1;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.impact-stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
}

.stat-metric {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.25rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  min-height: 44px;
  flex-shrink: 0;
}

.card-color-1 .stat-metric {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-color-2 .stat-metric {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
}

.card-color-3 .stat-metric {
  background: linear-gradient(135deg, #51cf66 0%, #4ade80 100%);
}

.stat-metric::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2.5s infinite;
}

.stat-text {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #666;
  margin: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
  font-weight: 400;
  max-width: 100%;
  hyphens: none;
  flex: 1;
  display: flex;
  align-items: center;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.data-source {
  text-align: center;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
  padding: 25px 20px 0;
  border-top: 2px dashed rgba(0, 0, 0, 0.12);
  background: linear-gradient(to right, transparent, rgba(102, 126, 234, 0.03), transparent);
  word-break: keep-all;
  overflow-wrap: break-word;
  max-width: 100%;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 1024px) {
  .example-images {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 0 5px;
  }

  .example-image-card {
    height: auto;
  }

  .impact-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .impact-stat-card {
    padding: 28px 20px;
    min-height: 260px;
  }

  .stat-icon {
    font-size: 2.8rem;
    height: 56px;
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 35px 20px;
    max-width: 96%;
    max-height: 88vh;
  }

  .modal-close {
    width: var(--touch-target-min, 44px);
    height: var(--touch-target-min, 44px);
    font-size: 1.6rem;
    top: 15px;
    right: 15px;
  }

  .example-images {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .example-image-card {
    height: auto;
  }

  .impact-stats-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .impact-stat-card {
    padding: 26px 20px;
    gap: 16px;
    min-height: 200px;
    /* 减小最小高度 */
  }

  .stat-icon {
    font-size: 2.8rem;
    height: 52px;
  }

  .stat-metric {
    font-size: 1.15rem;
    padding: 9px 18px;
    min-height: 40px;
  }

  .stat-text {
    font-size: 0.88rem;
  }

  .modal-main-title {
    font-size: 1.7rem;
    margin-bottom: 12px;
  }

  .modal-main-subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .example-images {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .example-image-card {
    height: auto;
  }

  .impact-data-section {
    padding: 30px 20px;
  }

  .impact-title {
    font-size: 1.4rem;
  }

  .impact-title::after {
    width: 60px;
    height: 3px;
  }

  .impact-intro {
    font-size: 0.95rem;
  }


  .data-source {
    font-size: 0.8rem;
    padding: 20px 15px 0;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 25px 15px;
    max-width: 98%;
  }

  .modal-main-title {
    font-size: var(--font-size-h2, 1.5rem);
  }

  .modal-main-subtitle {
    font-size: var(--font-size-small, 0.9rem);
  }

  .example-images {
    grid-template-columns: 1fr;
    /* 改为单列 */
    gap: 12px;
  }

  .example-image-card {
    height: auto;
    aspect-ratio: 16 / 9;
    /* 更适合单列显示 */
  }

  .impact-title {
    font-size: 1.2rem;
  }

  .impact-intro {
    font-size: 0.9rem;
  }

  .impact-stats-grid {
    gap: 16px;
    margin-top: var(--spacing-lg, 30px);
    margin-bottom: var(--spacing-lg, 30px);
  }

  .impact-stat-card {
    padding: 22px 18px;
    gap: 14px;
    min-height: auto;
    /* 移除固定高度，自适应内容 */
  }

  .stat-icon {
    font-size: 2.5rem;
    height: 48px;
  }

  .stat-metric {
    font-size: 1.05rem;
    padding: 8px 14px;
    min-height: 38px;
  }

  .stat-text {
    font-size: 0.82rem;
    line-height: 1.6;
  }
}
</style>