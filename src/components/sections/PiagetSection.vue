<template>
  <section class="section piaget-section">
    <h2 class="section-title">儿童认知发展的真相</h2>
    <p class="section-intro">
      皮亚杰理论清晰表明，7岁以下儿童无法理解抽象商业行为，11岁以下难以真正自主决策。当儿童账号展示"想红""爱表演"时，背后往往是父母将自身价值观嫁接给认知能力受限的孩子。
    </p>

    <div class="piaget-container">
      <div v-for="(stage, index) in piagetStages" :key="index" class="piaget-stage" @mouseenter="currentStage = index"
        @mouseleave="currentStage = null">
        <div class="stage-figure" :style="{ height: stage.height }">
          <img v-if="stage.image" :src="stage.image" alt="阶段图片" class="stage-photo" />
          <div class="figure-icon" v-else>👶</div>
        </div>
        <div class="stage-info">
          <p class="stage-age">{{ stage.age }}</p>
          <h3 class="stage-name">{{ stage.name }}</h3>
        </div>
        <transition name="slide-up">
          <div v-if="currentStage === index" class="stage-detail">
            <p>{{ stage.detail }}</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(null)
const piagetStages = [
  {
    name: '感知运动阶段',
    age: '0-2岁',
    height: '180px',
    detail: '婴儿通过看、摸、吃、抓来认识世界，就像"用手和嘴思考"。这个阶段的孩子连"藏猫猫"都难以理解，更无法理解网络的意义，他们的一切行为依赖即时反应。',
    image: new URL('@/assets/images/11.jpg', import.meta.url).href
  },
  {
    name: '前运算阶段',
    age: '2-7岁',
    height: '250px',
    detail: '孩子开始用语言和符号表达，但思维充满局限性：认为月亮会跟着自己走，无法理解他人视角。觉得玩具有生命，会和娃娃聊天。如果果汁从高杯倒进矮杯，他们会坚持矮杯"变少了"，无法理解守恒概念。',
    image: new URL('@/assets/images/12.jpg', import.meta.url).href
  },
  {
    name: '具体运算阶段',
    age: '7-11岁',
    height: '320px',
    detail: '孩子开始有逻辑，但必须依赖具体例子。能理解"A比B高，B比C高，所以A比C高"，但无法回答"如果人类不用吃饭会怎样"这种抽象假设。他们严格按规则行事，认为"规则不能变"。',
    image: new URL('@/assets/images/13.jpg', import.meta.url).href
  },
  {
    name: '形式运算阶段',
    age: '11岁以后',
    height: '390px',
    detail: '青少年逐渐能进行假设推理，比如讨论"如果地球没有重力"，但这类能力仍需教育引导才能成熟。此前，儿童对网络风险、长期后果缺乏预判力。',
    image: new URL('@/assets/images/14.jpg', import.meta.url).href
  }
]
</script>

<style scoped>
.piaget-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.piaget-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
  align-items: end;
  max-width: 1200px;
  margin: 50px auto;
  padding: 40px 20px;
}

.piaget-stage {
  flex: 1;
  max-width: 360px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.piaget-stage:hover {
  transform: translateY(-10px);
}

.stage-figure {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50% 50% 20px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  transition: all 0.5s;
  position: relative;
}

.piaget-stage:hover .stage-figure {
  box-shadow: 0 14px 40px rgba(102, 126, 234, 0.45);
  transform: translateZ(0) scale(1.03);
}

.stage-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  border-radius: 50% 50% 20px 20px;
  opacity: .9;
  padding: 10px;
}

.figure-icon {
  font-size: 3rem;
  transition: font-size 0.5s;
}

.stage-info {
  background: white;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stage-age {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 8px;
}

.stage-name {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.stage-detail {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 62, 80, 0.95);
  color: white;
  padding: 20px;
  border-radius: 15px;
  width: 300px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.stage-detail::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: rgba(44, 62, 80, 0.95);
}

.stage-detail p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 768px) {
  .piaget-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .section-intro {
    font-size: 1rem;
  }

  .piaget-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .stage-name {
    font-size: 1.1rem;
  }

  .stage-age {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .piaget-section {
    padding: 40px 12px;
  }

  .section-title {
    font-size: 1.4rem;
    padding: 0 5px;
  }

  .section-intro {
    font-size: 0.95rem;
    padding: 0 5px;
  }

  .piaget-container {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 0 5px;
  }

  .piaget-stage {
    padding: 15px;
  }

  .stage-figure {
    height: 140px !important;
  }

  .figure-icon {
    font-size: 2.5rem;
  }

  .stage-photo {
    width: 100%;
    max-height: 140px;
  }

  .stage-age {
    font-size: 0.85rem;
  }

  .stage-name {
    font-size: 1.05rem;
  }

  .stage-detail {
    padding: 12px;
    font-size: 0.85rem;
  }

  .stage-detail p {
    font-size: 0.85rem;
    line-height: 1.5;
  }
}
</style>