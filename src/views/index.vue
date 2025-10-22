<template>
  <div class="digital-child-labor">
    <!-- 开场 -->
    <section class="section visible">
      <div class="phone-screen">
        <div class="screen-content">
          <div class="opening-text">
            你好，<br>屏幕里的童年
          </div>
        </div>
      </div>
      <div class="scroll-indicator">向下滚动开始 ↓</div>
    </section>

    <!-- 第一章 -->
    <section class="section" ref="section1">
      <h1 class="gradient-text">第一章 你好，屏幕里的童年</h1>

      <div class="glass-card">
        <div class="question">你每天有多少时间在和小小的手机屏幕接触？</div>
        <div class="time-options">
          <div v-for="(time, index) in timeOptions" :key="index" class="time-option"
            :class="{ selected: selectedTime === time }" @click="selectTime(time)">
            {{ time }}
          </div>
        </div>
      </div>

      <div class="chart-container" :class="{ show: showChart1 }">
        <canvas ref="chart1"></canvas>
      </div>
    </section>

    <!-- 社交媒体 -->
    <section class="section" ref="section2">
      <div class="glass-card">
        <div class="question">你每天有多少时间是在和社交媒体平台度过？</div>
        <div class="time-options">
          <div v-for="(time, index) in socialOptions" :key="index" class="time-option"
            :class="{ selected: selectedSocial === time }" @click="selectSocial(time)">
            {{ time }}
          </div>
        </div>
      </div>

      <div class="chart-container" :class="{ show: showChart2 }">
        <div class="data-highlight">日活跃用户</div>
        <div class="data-description">
          抖音: 6亿+ | 快手: 3.8亿+ | 小红书: 2.6亿+<br>
          每天数亿用户在这些平台上消费内容
        </div>
      </div>
    </section>

    <!-- 视频类型 -->
    <section class="section" ref="section3">
      <div class="question">这样的视频有在你的推荐列表吗？</div>
      <div class="image-grid">
        <div class="image-placeholder">儿童萌娃<br>搞笑日常</div>
        <div class="image-placeholder">儿童才艺<br>表演展示</div>
        <div class="image-placeholder">亲子互动<br>温馨时刻</div>
      </div>

      <div class="chart-container show">
        <div class="data-highlight">217%</div>
        <div class="data-description">
          4-12岁网红账号年增长率<br>
          儿童博主正在快速增长
        </div>
      </div>
    </section>

    <!-- 警示 -->
    <section class="section" ref="section4">
      <div class="alert-text">
        当你在刷手机时真的是在进行纯粹的娱乐吗？<br><br>
        你有没有想过屏幕那头的儿童<br>
        或许在进行另一种看不见的劳动
      </div>
    </section>

    <!-- 数字劳工定义 -->
    <section class="section" ref="section5">
      <div class="definition-text">
        <div class="definition-title">什么是数字劳工？</div>
        <p class="definition-para">
          数字劳工是电子媒介生存、使用以及应用这样集体劳动力中的一部分，他们不是一个确定的职业，他们服务的产业定义了他们，在这个产业中，他们受资本的剥削。
        </p>
        <p class="definition-para">
          简单来说就是在互联网世界里，为平台创造价值却可能得不到相应报酬的"隐形打工人"。
        </p>
        <p class="definition-highlight">
          在平台上还有一个特殊群体更值得关注，那就是儿童群体
        </p>
      </div>
    </section>

    <!-- 未成年网民数据 -->
    <section class="section" ref="section6">
      <div class="data-highlight">1.96亿</div>
      <div class="data-description data-desc-max">
        我国未成年网民规模<br>
        未成年人互联网普及率高达 97.3%
      </div>

      <div class="chart-container show chart-margin">
        <div class="data-highlight data-highlight-small">83%</div>
        <div class="data-description">
          的青少年最喜爱的网络活动是看视频<br>
          12岁以下儿童每天平均花费近5小时在数字屏幕上<br>
          13岁以上则攀升到7.5小时
        </div>
      </div>
    </section>

    <!-- 时间轴 -->
    <section class="section section-timeline" ref="section7">
      <h2 class="gradient-text gradient-text-small">
        一个网红儿童的诞生
      </h2>

      <div class="timeline-container">
        <div class="timeline-line"></div>

        <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-event"
          :class="[event.side, { visible: event.visible }]" :ref="el => setTimelineRef(el, index)">
          <div class="timeline-dot" :style="{ top: (index * 25) + '%' }"></div>
          <div class="timeline-content">
            <div class="event-title">
              <span class="event-icon">{{ event.icon }}</span>
              {{ event.title }}
            </div>
            <div class="event-type" :class="event.typeClass">{{ event.desc }}</div>
            <div class="event-detail">{{ event.detail }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 心形到金钱 -->
    <section class="section" ref="section8">
      <div class="heart-container" :class="{ 'heart-pulse': !heartToMoney }">
        {{ heartToMoney ? '💰' : '❤️' }}
      </div>
      <div class="data-description">
        当"养娃"变成"养号"<br>
        爱就开始有了回报率
      </div>
    </section>

    <!-- 第二章 -->
    <section class="section" ref="section9">
      <h1 class="gradient-text gradient-text-multi">
        第二章 童工并未消失<br>而是披上了数字的外衣
      </h1>

      <div class="chapter-text">
        <p class="chapter-para">
          自2000年以来，全球童工总数下降了约1亿，降幅近半。<br>
          中国关于禁止使用童工的法律制度在2000年后经历了重要的完善。
        </p>
        <p class="chapter-highlight">
          然而，传统童工数量大幅下降的同时，<br>
          新型童工——数字童工开始显现
        </p>
      </div>

      <div class="chart-container show chart-margin-lg">
        <canvas ref="chart3"></canvas>
      </div>
    </section>

    <!-- 环形结构 -->
    <section class="section section-circle" ref="section10">
      <h2 class="gradient-text gradient-text-small">
        谁在围绕着孩子？
      </h2>

      <div class="circle-structure">
        <div class="center-child">👶</div>

        <div v-for="item in perspectives" :key="item.type" class="perspective-item" :class="item.position"
          @click="openPerspective(item.type)">
          <div class="icon">{{ item.icon }}</div>
          <div>{{ item.label }}</div>
        </div>
      </div>

      <p class="hint-text">点击查看不同视角</p>
    </section>

    <!-- 弹窗 -->
    <Teleport to="body">
      <div v-if="perspectiveOpen" class="modal-overlay" @click="closePerspective">
        <div class="modal-content" @click.stop>
          <div v-if="perspectiveOpen === 'parents'">
            <h3 class="modal-title">父母视角</h3>
            <div class="data-highlight data-highlight-modal">34%</div>
            <p class="modal-text">
              的家长承认曾强迫孩子配合拍摄<br><br>
              "他们说这只是温情的陪伴<br>
              可陪伴我的其实是冷冰冰的镜头"
            </p>
          </div>

          <div v-if="perspectiveOpen === 'mcn'">
            <h3 class="modal-title">MCN机构视角</h3>
            <p class="modal-flow">
              剧本 → 包装 → 带货 → 涨粉 → 循环
            </p>
            <p class="modal-text">
              "他们不培养孩子，他们孵化账号"<br><br>
              萌娃(40%) + 冲突剧情(30%) + 商品植入(30%) = 爆款模板
            </p>
          </div>

          <div v-if="perspectiveOpen === 'algorithm'">
            <h3 class="modal-title">算法视角</h3>
            <p class="modal-text">
              平台推流机制偏好萌娃类内容<br>
              平均流量是普通内容的3-5倍<br><br>
              "算法没有偏好，它只想放大你想看的"<br><br>
              但这种放大，让儿童内容成为流量密码
            </p>
          </div>

          <div v-if="perspectiveOpen === 'audience'">
            <h3 class="modal-title">观众视角</h3>
            <p class="modal-text">
              <strong>主力粉丝群体:</strong><br>
              18-23岁年轻女性(云养娃)<br>
              31-40岁家长(消费者)<br><br>
              "他们不是在看娃，是在看自己失去的纯真"<br><br>
              每一次点赞、评论、打赏，都在强化这条产业链
            </p>
          </div>

          <button class="close-btn" @click="closePerspective">关闭</button>
        </div>
      </div>
    </Teleport>

    <!-- 第五章 -->
    <section class="section" ref="section11">
      <h1 class="gradient-text gradient-text-multi">
        第五章 如何划定数字时代童年边界<br>
        把童年还给孩子，让爱回到现实
      </h1>

      <div class="solutions-container">
        <div class="solution-card">
          <div class="solution-title">1. 平台监管</div>
          <p class="solution-text">
            从儿童出镜频率、账号收益中儿童贡献的比例、商业化内容占比等维度建立量化标准来识别是分享还是牟利。严格审核。
          </p>
        </div>

        <div class="solution-card">
          <div class="solution-title">2. 法律完善</div>
          <p class="solution-text">
            探索出台未成年人网络保护实施细则，禁止将0-8岁儿童加入带营销性质的账号内容生产中；对于8-12岁的儿童，探索设置儿童同意权。
          </p>
        </div>

        <div class="solution-card">
          <div class="solution-title">3. 收益保护</div>
          <p class="solution-text">
            参考法国，孩子们必须获取相关执照才能成为"网红"，而他们因此获得的收入，必须存入专门的银行账户，供他们年满16岁后使用。
          </p>
        </div>

        <div class="solution-card">
          <div class="solution-title">4. 家长警惕</div>
          <p class="solution-text">
            分享可以，为了盈利而分享则不可取。高光时刻手机可不是一个好的相机，因为很多时候高光时刻转瞬即逝，眼睛和心灵才是最好的相机。
          </p>
        </div>
      </div>
    </section>

    <!-- 明信片 -->
    <section class="section" ref="section12">
      <h2 class="gradient-text gradient-text-small">
        给未来的孩子写一张明信片
      </h2>

      <div class="postcard-container">
        <textarea v-model="postcardText" placeholder="写下你对未来孩子的寄语..." class="postcard-textarea"></textarea>
        <button class="btn" @click="generatePostcard">生成明信片</button>

        <div v-if="showPostcard" class="postcard-result">
          <div class="postcard-result-title">你的明信片</div>
          <p class="postcard-result-text">{{ postcardText }}</p>
        </div>
      </div>
    </section>

    <!-- 结尾 -->
    <section class="section section-ending" ref="section13">
      <div class="ending-content">
        <p class="ending-text">让我们一起</p>
        <p class="ending-main">
          把童年还给孩子<br>
          让爱回到现实
        </p>
        <p class="ending-thanks">
          感谢你的阅读与关注
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

// 数据
const timeOptions = ['1-3小时', '3-5小时', '5-7小时', '7小时以上']
const socialOptions = ['0-1小时', '1-3小时', '3-5小时', '5小时以上']
const selectedTime = ref(null)
const selectedSocial = ref(null)
const showChart1 = ref(false)
const showChart2 = ref(false)
const heartToMoney = ref(false)
const perspectiveOpen = ref(null)
const postcardText = ref('')
const showPostcard = ref(false)

const timelineEvents = ref([
  {
    side: 'left',
    icon: '📸',
    title: '第一条视频',
    desc: '分享: 随手拍摄的温馨时刻',
    detail: '模糊的画面，简单的记录',
    typeClass: 'share',
    visible: false
  },
  {
    side: 'right',
    icon: '💰',
    title: '第一次带货',
    desc: '商业化: 专业灯光、脚本设计',
    detail: '精心布置的场景，设计好的台词',
    typeClass: 'commercial',
    visible: false
  },
  {
    side: 'left',
    icon: '🎂',
    title: '过生日',
    desc: '分享: 家人围坐的真实瞬间',
    detail: '自然的笑容，温暖的拥抱',
    typeClass: 'share',
    visible: false
  },
  {
    side: 'right',
    icon: '📝',
    title: '签约MCN',
    desc: '商业化: 流程化内容生产',
    detail: '固定的更新频率，计划好的剧情',
    typeClass: 'commercial',
    visible: false
  },
  {
    side: 'left',
    icon: '📊',
    title: '百万粉丝',
    desc: '当点赞可以换成钱，会发生什么？',
    detail: '童年变成了流量，爱有了回报率',
    typeClass: 'warning',
    visible: false
  }
])

const perspectives = [
  { type: 'parents', icon: '👨‍👩‍👧', label: '父母', position: 'top' },
  { type: 'mcn', icon: '🏢', label: 'MCN', position: 'right' },
  { type: 'algorithm', icon: '🤖', label: '算法', position: 'bottom' },
  { type: 'audience', icon: '👥', label: '观众', position: 'left' }
]

// Refs
const chart1 = ref(null)
const chart3 = ref(null)
const timelineRefs = ref([])

let chart1Instance = null
let chart3Instance = null
let scrollObserver = null
let timelineObserver = null

// 方法
const selectTime = (time) => {
  selectedTime.value = time
  setTimeout(() => {
    showChart1.value = true
    nextTick(() => {
      createChart1()
    })
  }, 300)
}

const selectSocial = (time) => {
  selectedSocial.value = time
  setTimeout(() => {
    showChart2.value = true
  }, 300)
}

const openPerspective = (type) => {
  perspectiveOpen.value = type
}

const closePerspective = () => {
  perspectiveOpen.value = null
}

const generatePostcard = () => {
  if (postcardText.value.trim()) {
    showPostcard.value = true
  }
}

const createChart1 = () => {
  if (chart1Instance) {
    chart1Instance.destroy()
  }

  const ctx = chart1.value
  if (!ctx) return

  chart1Instance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-1h', '1-3h', '3-5h', '5-7h', '7h+'],
      datasets: [
        {
          label: '用户占比',
          data: [12, 28, 35, 18, 7],
          backgroundColor: '#667eea'
        },
        {
          label: '平均值',
          data: [25, 25, 25, 25, 25],
          backgroundColor: '#333'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#fff' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#fff' },
          grid: { color: '#333' }
        },
        y: {
          ticks: { color: '#fff' },
          grid: { color: '#333' }
        }
      }
    }
  })
}

const createChart3 = () => {
  if (chart3Instance) {
    chart3Instance.destroy()
  }

  const ctx = chart3.value
  if (!ctx) return

  chart3Instance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023'],
      datasets: [{
        label: '账号数量增长',
        data: [100, 145, 217, 317],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#fff' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#fff' },
          grid: { color: '#333' }
        },
        y: {
          ticks: { color: '#fff' },
          grid: { color: '#333' }
        }
      }
    }
  })
}

const setTimelineRef = (el, index) => {
  if (el) {
    timelineRefs.value[index] = el
  }
}

const setupScrollObserver = () => {
  const sections = document.querySelectorAll('.section')
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )

  sections.forEach((section) => {
    scrollObserver.observe(section)
  })

  // 时间轴观察
  setTimeout(() => {
    timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timelineElements = Array.from(entry.target.parentElement.children)
              .filter(el => el.classList.contains('timeline-event'))
            const index = timelineElements.indexOf(entry.target)
            if (index !== -1 && timelineEvents.value[index]) {
              timelineEvents.value[index].visible = true
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    timelineRefs.value.forEach(ref => {
      if (ref) timelineObserver.observe(ref)
    })
  }, 1000)
}

const setupScrollListener = () => {
  let ticking = false

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY

        // 心形转换
        if (scrolled > 3500) {
          heartToMoney.value = true
        }

        // 创建图表3
        if (scrolled > 5000 && !chart3Instance) {
          nextTick(() => {
            createChart3()
          })
        }

        ticking = false
      })

      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

onMounted(() => {
  setupScrollObserver()
  const cleanupScroll = setupScrollListener()

  onUnmounted(() => {
    if (chart1Instance) chart1Instance.destroy()
    if (chart3Instance) chart3Instance.destroy()
    if (scrollObserver) scrollObserver.disconnect()
    if (timelineObserver) timelineObserver.disconnect()
    cleanupScroll()
  })
})
</script>

<style scoped>
.digital-child-labor {
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s, transform 0.8s;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-timeline {
  min-height: 150vh;
}

.section-circle {
  min-height: 120vh;
}

.section-ending {
  min-height: 60vh;
}

/* 开场动画 */
@keyframes phoneAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes screenOn {
  from {
    opacity: 0;
    background: #000;
  }

  to {
    opacity: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}

@keyframes textFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

@keyframes heartPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.phone-screen {
  width: 300px;
  height: 600px;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 40px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  animation: phoneAppear 1.5s ease-out;
}

.screen-content {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 60px;
  background: #000;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  animation: screenOn 1s ease-out 1s both;
}

.opening-text {
  font-size: 24px;
  text-align: center;
  line-height: 1.6;
  animation: textFadeIn 1s ease-out 2s both;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  font-size: 14px;
  opacity: 0.6;
  animation: bounce 2s infinite;
}

/* 渐变文字 */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
}

.gradient-text-small {
  font-size: 36px;
}

.gradient-text-multi {
  line-height: 1.3;
}

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
}

.question {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.time-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.time-option {
  background: rgba(102, 126, 234, 0.2);
  border: 2px solid #667eea;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  font-size: 18px;
}

.time-option:hover {
  background: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
}

.time-option.selected {
  background: #667eea;
  transform: scale(1.05);
}

/* 图表 */
.chart-container {
  width: 100%;
  max-width: 800px;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin: 30px auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.chart-container.show {
  opacity: 1;
  transform: translateY(0);
}

.chart-margin {
  margin-top: 60px;
}

.chart-margin-lg {
  margin-top: 60px;
}

.data-highlight {
  font-size: 56px;
  font-weight: bold;
  color: #667eea;
  text-align: center;
  margin: 20px 0;
}

.data-highlight-small {
  font-size: 40px;
}

.data-highlight-modal {
  font-size: 36px;
}

.data-description {
  font-size: 20px;
  text-align: center;
  line-height: 1.8;
  opacity: 0.9;
}

.data-desc-max {
  max-width: 600px;
}

/* 图片网格 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 30px auto;
  width: 100%;
}

.image-placeholder {
  aspect-ratio: 9/16;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 警示文本 */
.alert-text {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: 1.6;
  max-width: 800px;
  padding: 40px;
  background: rgba(255, 59, 48, 0.1);
  border-left: 4px solid #ff3b30;
  border-radius: 8px;
}

/* 定义文本 */
.definition-text {
  max-width: 900px;
  font-size: 18px;
  line-height: 2;
  text-align: left;
}

.definition-title {
  color: #667eea;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.definition-para {
  margin-bottom: 20px;
}

.definition-highlight {
  color: #764ba2;
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
}

/* 章节文本 */
.chapter-text {
  max-width: 800px;
  font-size: 18px;
  line-height: 2;
  text-align: center;
}

.chapter-para {
  margin-bottom: 20px;
}

.chapter-highlight {
  color: #667eea;
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
}

/* 时间轴 */
.timeline-container {
  max-width: 1000px;
  width: 100%;
  position: relative;
  padding: 60px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
}

.timeline-event {
  display: flex;
  align-items: center;
  margin: 60px 0;
  opacity: 0;
  transition: opacity 0.6s, transform 0.6s;
}

.timeline-event.visible {
  opacity: 1;
}

.timeline-event.left {
  justify-content: flex-end;
  transform: translateX(-30px);
}

.timeline-event.left.visible {
  transform: translateX(0);
}

.timeline-event.right {
  justify-content: flex-start;
  transform: translateX(30px);
}

.timeline-event.right.visible {
  transform: translateX(0);
}

.timeline-content {
  width: 45%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-event.left .timeline-content {
  margin-right: 5%;
}

.timeline-event.right .timeline-content {
  margin-left: 5%;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: #667eea;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px #667eea;
}

.event-icon {
  font-size: 32px;
  display: inline-block;
  margin-right: 10px;
}

.event-title {
  color: #667eea;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.event-type {
  margin-bottom: 8px;
}

.event-type.share {
  color: #90EE90;
}

.event-type.commercial {
  color: #FFA500;
}

.event-type.warning {
  color: #FF4444;
}

.event-detail {
  font-size: 14px;
  opacity: 0.7;
}

/* 心形动画 */
.heart-container {
  font-size: 100px;
  margin: 60px 0;
  transition: all 1s ease;
}

.heart-pulse {
  animation: heartPulse 2s infinite;
}

/* 环形结构 */
.circle-structure {
  width: 500px;
  height: 500px;
  position: relative;
  margin: 60px auto;
}

.center-child {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  z-index: 2;
}

.perspective-item {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #667eea;
  border-radius: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
}

.perspective-item:hover {
  background: rgba(102, 126, 234, 0.3);
  transform: scale(1.1);
}

.perspective-item .icon {
  font-size: 28px;
}

.perspective-item.top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.perspective-item.top:hover {
  transform: translateX(-50%) scale(1.1);
}

.perspective-item.right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.perspective-item.right:hover {
  transform: translateY(-50%) scale(1.1);
}

.perspective-item.bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.perspective-item.bottom:hover {
  transform: translateX(-50%) scale(1.1);
}

.perspective-item.left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.perspective-item.left:hover {
  transform: translateY(-50%) scale(1.1);
}

.hint-text {
  text-align: center;
  margin-top: 40px;
  opacity: 0.7;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #667eea;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-title {
  color: #667eea;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-text {
  font-size: 18px;
  line-height: 1.8;
}

.modal-flow {
  font-size: 24px;
  margin: 30px 0;
  text-align: center;
}

.close-btn {
  background: #667eea;
  border: none;
  color: white;
  padding: 12px 40px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

/* 解决方案 */
.solutions-container {
  max-width: 900px;
  width: 100%;
}

.solution-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.solution-title {
  color: #667eea;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.solution-text {
  font-size: 18px;
  line-height: 1.8;
}

/* 明信片 */
.postcard-container {
  max-width: 600px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.postcard-textarea {
  width: 100%;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
}

.postcard-textarea:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 15px 40px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.postcard-result {
  margin-top: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.postcard-result-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #667eea;
}

.postcard-result-text {
  line-height: 1.8;
  white-space: pre-wrap;
}

/* 结尾 */
.ending-content {
  font-size: 28px;
  text-align: center;
  line-height: 2;
  max-width: 800px;
}

.ending-text {
  opacity: 0.8;
}

.ending-main {
  font-size: 36px;
  font-weight: bold;
  color: #667eea;
  margin: 30px 0;
}

.ending-thanks {
  font-size: 18px;
  opacity: 0.6;
  margin-top: 60px;
}

/* 响应式 */
@media (max-width: 768px) {
  .gradient-text {
    font-size: 32px;
  }

  .gradient-text-small {
    font-size: 28px;
  }

  .timeline-content {
    width: 90%;
  }

  .timeline-event.left .timeline-content,
  .timeline-event.right .timeline-content {
    margin: 0 5%;
  }

  .circle-structure {
    width: 350px;
    height: 350px;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .definition-text,
  .chapter-text {
    font-size: 16px;
  }

  .alert-text {
    font-size: 24px;
  }

  .ending-main {
    font-size: 28px;
  }
}
</style>