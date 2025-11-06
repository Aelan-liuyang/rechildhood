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
                  <p class="stat-text" v-html="processText(stat.text)"></p>
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

// ==================== 处理文本，防止数字和文字分开 ====================
const processText = (text) => {
  // 匹配数字（包括百分号、小数点等）和紧跟的中文字符，用 span 包裹
  // 匹配模式：
  // 1. 数字+百分号+汉字（如"54%的"）
  // 2. 数字+小数点+数字+单位+汉字（如"1小时的"）
  // 3. 数字+汉字（如"6岁前"）
  return text
    .replace(/(\d+[%％])([\u4e00-\u9fa5]{1,2})/g, '<span class="no-break">$1$2</span>')
    .replace(/(\d+\.?\d*)([小时岁分][\u4e00-\u9fa5]{0,2})/g, '<span class="no-break">$1$2</span>')
    .replace(/(\d+)([岁前以上][\u4e00-\u9fa5]{0,1})/g, '<span class="no-break">$1$2</span>')
}

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
  padding: var(--spacing-2xl, 50px) var(--spacing-xl, 40px);
  border-radius: var(--radius-lg, 24px);
  max-width: 1400px;
  width: 95%;
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin: 0 auto;
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
  font-size: var(--font-size-h2, 2.4rem);
  font-weight: 700;
  margin: 0 0 var(--spacing-md, 20px) 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  padding-bottom: var(--spacing-lg, 30px);
  position: relative;
  animation: titleFadeIn 0.6s ease-out;
}

.modal-main-title::after {
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

.modal-main-subtitle {
  text-align: justify;
  text-justify: inter-ideograph;
  color: #666;
  font-size: 1.2rem;
  margin: 0 auto var(--spacing-xl, 40px);
  line-height: 2;
  max-width: 1400px;
  padding: 0 var(--spacing-md, 20px);
  font-weight: 400;
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict;
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
  padding: var(--spacing-2xl, 50px) var(--spacing-xl, 40px);
  background: linear-gradient(135deg, rgba(255, 250, 245, 0.95) 0%, rgba(255, 245, 250, 0.95) 100%);
  border-radius: var(--radius-lg, 24px);
  border: 1px solid rgba(255, 200, 200, 0.2);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  animation: sectionFadeIn 1s ease-out;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
}

.impact-data-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #ff6b6b, #51cf66, #667eea);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
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
  gap: var(--spacing-lg, 20px);
  margin: var(--spacing-xl, 40px) auto var(--spacing-2xl, 50px);
  max-width: 1400px;
  padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-lg, 20px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.example-image-card {
  background: white;
  border-radius: var(--radius-md, 16px);
  overflow: hidden;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  aspect-ratio: 4 / 3;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: imageCardReveal 0.8s ease-out backwards;
  border: 2px solid rgba(255, 255, 255, 0.8);
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 1;
  border-radius: var(--radius-md, 16px);
}

.example-image-card:hover::before {
  opacity: 1;
}

.example-image-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow:
    0 20px 50px rgba(102, 126, 234, 0.25),
    0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
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
  font-size: var(--font-size-h3, 2rem);
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 var(--spacing-lg, 25px) 0;
  position: relative;
  padding-bottom: var(--spacing-lg, 25px);
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.impact-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #ff6b6b, #51cf66, #667eea);
  background-size: 200% 100%;
  border-radius: 2px;
  animation: gradientShift 3s ease infinite;
}

.impact-intro {
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 1.15rem;
  color: #555;
  line-height: 2;
  margin: 0 auto var(--spacing-xl, 45px);
  max-width: 1400px;
  padding: var(--spacing-lg, 25px) var(--spacing-xl, 30px);
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-md, 16px);
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

.impact-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg, 24px);
  margin-bottom: var(--spacing-xl, 40px);
  margin-top: var(--spacing-xl, 40px);
  padding: 0;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.impact-stat-card {
  background: white;
  padding: var(--spacing-xl, 38px) var(--spacing-lg, 28px) var(--spacing-xl, 35px);
  border-radius: var(--radius-lg, 20px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.1),
    0 2px 10px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 22px);
  align-items: center;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  min-height: 320px;
  backdrop-filter: blur(10px);
}

.impact-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, currentColor, transparent);
  opacity: 0.6;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.impact-stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
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
  transform: translateY(-12px) scale(1.02);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 1);
}

.impact-stat-card:hover::before {
  opacity: 1;
  height: 5px;
}

.impact-stat-card:hover::after {
  opacity: 1;
}

.stat-icon {
  font-size: 3.5rem;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.impact-stat-card:hover .stat-icon {
  transform: scale(1.15) rotate(5deg);
  filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.2));
}

.stat-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 20px);
  align-items: center;
  flex: 1;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: var(--spacing-xs, 5px) 0;
}

.stat-metric {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm, 14px) var(--spacing-xl, 28px);
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.35rem;
  color: white;
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  letter-spacing: 0.8px;
  position: relative;
  overflow: hidden;
  min-height: 52px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
  line-height: 1.2;
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

.impact-stat-card:hover .stat-metric {
  transform: scale(1.05);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.impact-stat-card:hover .stat-text {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.stat-metric::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2.5s infinite;
}

.stat-text {
  font-size: 1.05rem;
  line-height: 2;
  color: #555;
  margin: 0;
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict;
  font-weight: 400;
  max-width: 100%;
  text-align: justify;
  text-justify: inter-ideograph;
  flex: 1;
  display: block;
  padding: var(--spacing-md, 15px) var(--spacing-lg, 20px);
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-sm, 12px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  width: 100%;
}

.stat-text :deep(.no-break) {
  white-space: nowrap;
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
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 0.95rem;
  color: #666;
  line-height: 2;
  margin: var(--spacing-xl, 40px) 0 0;
  padding: var(--spacing-lg, 25px) var(--spacing-xl, 30px) var(--spacing-lg, 25px) var(--spacing-2xl, 50px);
  border-top: 2px dashed rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md, 16px);
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict;
  max-width: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
}

.data-source::before {
  /* content: '📊'; */
  position: absolute;
  left: var(--spacing-lg, 25px);
  top: var(--spacing-lg, 25px);
  font-size: 1.2rem;
  opacity: 0.6;
  line-height: 2;
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
  .modal-content {
    padding: var(--spacing-xl, 40px) var(--spacing-lg, 30px);
  }

  .modal-main-title {
    font-size: 2rem;
    padding-bottom: var(--spacing-md, 20px);
  }

  .modal-main-title::after {
    width: 70px;
    height: 3px;
  }

  .modal-main-subtitle {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg, 30px);
  }

  .example-images {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm, 12px);
    padding: 0 var(--spacing-xs, 5px);
  }

  .example-image-card {
    height: auto;
  }

  .impact-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md, 20px);
  }

  .impact-stat-card {
    padding: var(--spacing-lg, 28px) var(--spacing-md, 20px);
    min-height: 260px;
  }

  .stat-icon {
    font-size: 2.8rem;
    height: 56px;
  }

  .stat-text {
    font-size: 0.95rem;
    text-align: justify;
    text-justify: inter-ideograph;
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: var(--spacing-xl, 35px) var(--spacing-md, 20px);
    max-width: 96%;
    max-height: 88vh;
  }

  .modal-close {
    width: var(--touch-target-min, 44px);
    height: var(--touch-target-min, 44px);
    font-size: 1.6rem;
    top: var(--spacing-sm, 15px);
    right: var(--spacing-sm, 15px);
  }

  .modal-main-title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-sm, 12px);
    padding-bottom: var(--spacing-md, 20px);
  }

  .modal-main-title::after {
    width: 60px;
    height: 3px;
  }

  .modal-main-subtitle {
    font-size: 1rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding: 0 var(--spacing-sm, 15px);
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .example-images {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md, 15px);
    padding: var(--spacing-md, 20px) var(--spacing-sm, 12px);
    background: rgba(255, 255, 255, 0.6);
    border-radius: var(--radius-md, 16px);
  }

  .example-image-card {
    height: auto;
  }

  .impact-data-section {
    padding: var(--spacing-lg, 30px) var(--spacing-md, 20px);
  }

  .impact-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md, 18px);
  }

  .impact-title::after {
    width: 60px;
    height: 3px;
  }

  .impact-intro {
    font-size: 1rem;
    margin-bottom: var(--spacing-lg, 30px);
    padding: var(--spacing-md, 20px) var(--spacing-sm, 15px);
    text-align: justify;
    text-justify: inter-ideograph;
    background: rgba(255, 255, 255, 0.7);
    border-left: 4px solid #667eea;
    border-radius: var(--radius-md, 16px);
  }

  .impact-stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 18px);
    margin-top: var(--spacing-lg, 30px);
    margin-bottom: var(--spacing-lg, 30px);
  }

  .impact-stat-card {
    padding: var(--spacing-lg, 28px) var(--spacing-md, 20px) var(--spacing-lg, 26px);
    gap: var(--spacing-lg, 20px);
    min-height: auto;
  }

  .stat-content {
    gap: var(--spacing-md, 18px);
    padding: var(--spacing-xs, 5px) 0;
  }

  .stat-icon {
    font-size: 2.8rem;
    height: 55px;
  }

  .stat-metric {
    font-size: 1.15rem;
    padding: var(--spacing-sm, 12px) var(--spacing-lg, 22px);
    min-height: 44px;
    letter-spacing: 0.6px;
  }

  .stat-text {
    font-size: 0.95rem;
    line-height: 2;
    text-align: justify;
    text-justify: inter-ideograph;
    padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
    background: rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-sm, 12px);
    width: 100%;
  }

  .data-source {
    font-size: 0.85rem;
    padding: var(--spacing-md, 20px) var(--spacing-sm, 15px) var(--spacing-md, 20px) var(--spacing-xl, 40px);
    text-align: justify;
    text-justify: inter-ideograph;
    margin-top: var(--spacing-lg, 30px);
  }

  .data-source::before {
    left: var(--spacing-md, 20px);
    top: var(--spacing-md, 20px);
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: var(--spacing-lg, 25px) var(--spacing-sm, 15px);
    max-width: 98%;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    top: var(--spacing-xs, 10px);
    right: var(--spacing-xs, 10px);
  }

  .modal-main-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs, 10px);
    padding-bottom: var(--spacing-sm, 15px);
  }

  .modal-main-title::after {
    width: 50px;
    height: 3px;
  }

  .modal-main-subtitle {
    font-size: 0.95rem;
    margin-bottom: var(--spacing-md, 25px);
    padding: 0 var(--spacing-xs, 10px);
    text-align: justify;
    text-justify: inter-ideograph;
  }

  .example-images {
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 15px);
    padding: var(--spacing-md, 18px) var(--spacing-xs, 10px);
    background: rgba(255, 255, 255, 0.6);
    border-radius: var(--radius-md, 16px);
  }

  .example-image-card {
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .impact-data-section {
    padding: var(--spacing-md, 25px) var(--spacing-sm, 15px);
  }

  .impact-title {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-sm, 15px);
  }

  .impact-title::after {
    width: 50px;
    height: 3px;
  }

  .impact-intro {
    font-size: 0.95rem;
    margin-bottom: var(--spacing-md, 25px);
    padding: var(--spacing-sm, 15px) var(--spacing-xs, 10px);
    text-align: justify;
    text-justify: inter-ideograph;
    background: rgba(255, 255, 255, 0.7);
    border-left: 4px solid #667eea;
    border-radius: var(--radius-md, 16px);
  }

  .impact-stats-grid {
    gap: var(--spacing-md, 16px);
    margin-top: var(--spacing-md, 25px);
    margin-bottom: var(--spacing-md, 25px);
  }

  .impact-stat-card {
    padding: var(--spacing-md, 24px) var(--spacing-sm, 18px) var(--spacing-md, 22px);
    gap: var(--spacing-md, 16px);
    min-height: auto;
  }

  .stat-content {
    gap: var(--spacing-md, 16px);
    padding: var(--spacing-xs, 5px) 0;
  }

  .stat-icon {
    font-size: 2.4rem;
    height: 50px;
  }

  .stat-metric {
    font-size: 1.05rem;
    padding: var(--spacing-xs, 10px) var(--spacing-md, 18px);
    min-height: 40px;
    letter-spacing: 0.5px;
  }

  .stat-text {
    font-size: 0.88rem;
    line-height: 2;
    text-align: justify;
    text-justify: inter-ideograph;
    padding: var(--spacing-sm, 12px) var(--spacing-sm, 14px);
    background: rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-sm, 12px);
    width: 100%;
  }

  .data-source {
    font-size: 0.8rem;
    padding: var(--spacing-md, 18px) var(--spacing-xs, 10px) var(--spacing-md, 18px) var(--spacing-lg, 35px);
    text-align: justify;
    text-justify: inter-ideograph;
    margin-top: var(--spacing-md, 25px);
  }

  .data-source::before {
    left: var(--spacing-sm, 15px);
    top: var(--spacing-md, 18px);
    font-size: 0.9rem;
  }
}
</style>