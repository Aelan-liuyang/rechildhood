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
                  <p class="stat-text">{{ stat.text }}</p>
                  <div class="stat-highlight" v-if="stat.highlight">{{ stat.highlight }}</div>
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
  z-index: 9999;
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
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  text-align: center;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: 30px auto 40px;
  max-width: 900px;
}

.example-image-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  height: 350px;
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
  transform: translateY(-15px) scale(1.05) rotateZ(2deg);
  box-shadow: 0 25px 60px rgba(102, 126, 234, 0.3);
}

.example-image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  text-align: center;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 35px;
  margin-top: 35px;
}

.impact-stat-card {
  background: white;
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  gap: 20px;
  align-items: flex-start;
  border-left: 5px solid;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.impact-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, currentColor, transparent);
  opacity: 0.3;
}

.card-color-1 {
  border-left-color: #667eea;
}

.card-color-2 {
  border-left-color: #ff6b6b;
}

.card-color-3 {
  border-left-color: #51cf66;
}

.impact-stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.stat-content {
  flex: 1;
}

.stat-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
  margin: 0 0 12px 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.stat-highlight {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
  }
}

.data-source {
  text-align: center;
  font-size: 0.88rem;
  color: #999;
  line-height: 1.7;
  margin: 0;
  padding: 25px 20px 0;
  border-top: 2px dashed rgba(0, 0, 0, 0.12);
  font-style: italic;
  background: linear-gradient(to right, transparent, rgba(102, 126, 234, 0.03), transparent);
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
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .impact-stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 35px 20px;
    max-width: 95%;
  }

  .modal-close {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
    top: 15px;
    right: 15px;
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
    height: 280px;
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

  .impact-stat-card {
    padding: 20px;
    gap: 15px;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-text {
    font-size: 0.95rem;
  }

  .stat-highlight {
    font-size: 1rem;
    padding: 6px 12px;
  }
}
</style>