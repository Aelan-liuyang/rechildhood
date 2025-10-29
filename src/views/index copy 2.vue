<template>
  <div class="rechildhood-container">
    <!-- 开场动画 -->
    <section class="section opening-section" id="chapter0">
      <div class="phone-screen" :class="{ 'phone-show': phoneVisible }">
        <!-- iPhone notch and side buttons -->
        <div class="phone-notch">
          <div class="notch-camera"></div>
          <div class="notch-speaker"></div>
        </div>
        <div class="btn-left volume-up"></div>
        <div class="btn-left volume-down"></div>
        <div class="btn-right power"></div>
        <div class="screen-content">
          <div class="opening-text">
            <span class="char" :class="{ 'char-show': charVisible[0] }">你</span>
            <span class="char" :class="{ 'char-show': charVisible[1] }">好</span>
            <span class="char" :class="{ 'char-show': charVisible[2] }">，</span>
            <br>
            <span class="char" :class="{ 'char-show': charVisible[3] }">屏</span>
            <span class="char" :class="{ 'char-show': charVisible[4] }">幕</span>
            <span class="char" :class="{ 'char-show': charVisible[5] }">里</span>
            <span class="char" :class="{ 'char-show': charVisible[6] }">的</span>
            <span class="char" :class="{ 'char-show': charVisible[7] }">童</span>
            <span class="char" :class="{ 'char-show': charVisible[8] }">年</span>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" :class="{ 'indicator-show': indicatorVisible }">
        <span>向下滚动开始</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>

    <!-- 导航栏 -->
    <nav class="navbar" :class="{ visible: showNav, scrolled: isScrolled }">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-icon">👶</span>
          <span class="brand-text">ReChildhood</span>
        </div>

        <div class="nav-menu" :class="{ active: menuOpen }">
          <a @click.prevent="scrollToSection('intro')" class="nav-link" :class="{ active: activeSection === 'intro' }">
            <span class="link-icon">📊</span>
            <span class="link-text">数据概览</span>
          </a>
          <a @click.prevent="scrollToSection('digital-labor')" class="nav-link"
            :class="{ active: activeSection === 'digital-labor' }">
            <span class="link-icon">💼</span>
            <span class="link-text">数字劳工</span>
          </a>
          <a @click.prevent="scrollToSection('children')" class="nav-link"
            :class="{ active: activeSection === 'children' }">
            <span class="link-icon">👧</span>
            <span class="link-text">儿童网民</span>
          </a>
          <a @click.prevent="scrollToSection('influencer')" class="nav-link"
            :class="{ active: activeSection === 'influencer' }">
            <span class="link-icon">⭐</span>
            <span class="link-text">网红儿童</span>
          </a>
          <a @click.prevent="scrollToSection('impact')" class="nav-link"
            :class="{ active: activeSection === 'impact' }">
            <span class="link-icon">⚠️</span>
            <span class="link-text">影响分析</span>
          </a>
          <a @click.prevent="scrollToSection('solution')" class="nav-link"
            :class="{ active: activeSection === 'solution' }">
            <span class="link-icon">💡</span>
            <span class="link-text">专家建议</span>
          </a>
        </div>

        <div class="nav-toggle" @click="toggleMenu" :class="{ active: menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="nav-progress" :style="{ width: scrollProgress + '%' }"></div>
    </nav>

    <!-- 开场部分 -->
    <section id="intro" class="section intro-section">
      <h1 class="main-title fade-in">你每天有多少时间在和小小的手机屏幕接触？</h1>

      <!-- 图表1：中国居民每日平均互联网使用时间 -->
      <div class="chart-container" ref="chart1"></div>
      <p class="data-source">数据来源：国家统计局、中国互联网络信息中心（CNNIC）、QuestMobile</p>

      <!-- 图表：手机网民占比 -->
      <div class="chart-container" ref="chartPhoneUsers"></div>
    </section>

    <!-- 短视频使用时间 -->
    <section class="section">
      <h2 class="section-title">你每天有多少时间是在和短视频度过？</h2>

      <!-- 时间段选项 -->
      <div class="time-options">
        <div class="time-option">30-60min</div>
        <div class="time-option">60-90min</div>
        <div class="time-option">90-120min</div>
        <div class="time-option">120min以上</div>
      </div>

      <!-- 图表2：短视频使用时间 -->
      <div class="chart-container" ref="chart2"></div>
      <p class="data-source">数据来源：中国互联网络信息中心（CNNIC）、《2020中国网络视听发展研究报告》等</p>
    </section>

    <!-- 视频点赞数据 -->
    <section class="section video-section">
      <h2 class="section-title">这样的视频有在你的喜欢列表吗？</h2>

      <!-- 视频示例图片 -->
      <div class="video-examples">
        <div class="video-card">
          <img src="@/assets/images/1.png" alt="视频示例1" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 123.4万</p>
          </div>
        </div>
        <div class="video-card">
          <img src="@/assets/images/2.png" alt="视频示例2" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 89.2万</p>
          </div>
        </div>
      </div>

      <div class="choice-buttons">
        <button class="choice-btn" @click="showChart = true" :class="{ selected: showChart }">有</button>
        <button class="choice-btn" @click="showChart = true" :class="{ selected: showChart }">没有</button>
      </div>

      <!-- 图表3：视频点赞平均数 - 点击后显示 -->
      <transition name="slide-down">
        <div v-if="showChart" class="chart-reveal">
          <div class="chart-container large" ref="chart3"></div>
          <p class="data-note">
            截至2025年10月23日，某短视频社交媒体平台发布293个作品获得点赞数4.8亿的亲子剧情类达人@朱***凭借3633.8w的粉丝数量位居平台51，超越一众官媒和娱乐明星。
          </p>
        </div>
      </transition>
    </section>

    <!-- 数字劳工概念 -->
    <section id="digital-labor" class="section concept-section">
      <h2 class="highlight-text">当你在刷手机时真的是在进行纯粹的娱乐吗？</h2>
      <p class="concept-intro">
        你有没有想过自己是在劳动，而屏幕那头的儿童或许在进行另一种看不见的劳动。
      </p>

      <div class="concept-box">
        <h3>什么是"数字劳工"？</h3>
        <p class="concept-detail">
          英国学者福克斯在《数字劳动与马克思》(2014)一书中将"数字劳工"定义为：数字劳工是电子媒介生存、使用以及应用这样集体劳动力中的一部分，他们不是一个确定的职业，他们服务的产业定义了他们，在这个产业中，他们受资本的剥削。
        </p>
        <p class="concept-explain">
          简单来说就是在互联网世界里，为平台创造价值却可能得不到相应报酬的"隐形打工人"。平台通过算法和规则，让用户不知不觉投入时间精力，最终把这些变成流量和商业利益。
        </p>
      </div>
    </section>

    <!-- 儿童网民数据 -->
    <section id="children" class="section">
      <h2 class="section-title">在平台上还有一个特殊群体更值得关注</h2>

      <!-- 图表4：年龄层占比 -->
      <div class="chart-container" ref="chart4"></div>

      <!-- 图表5：未成年人网民数量 -->
      <div class="chart-container" ref="chart5"></div>
      <p class="data-source">数据来源：CNNIC</p>

      <div class="highlight-box">
        <p>截至2023年底，我国未成年网民规模达<span class="highlight-num">1.96亿</span>，未成年人互联网普及率高达<span
            class="highlight-num">97.3%</span>。</p>
      </div>

      <!-- 图表6：设备使用情况 -->
      <div class="chart-container" ref="chart6"></div>

      <p class="data-note small">
        截至2024年6月，10岁以前首次"触网"的未成年人占比达52%，较上年提高7.4%。村镇儿童过早接触直播/短视频的比例（82.3%）远高于城市儿童（51.6%）。以刚进入幼儿园的3岁儿童为例，78.6%的儿童屏幕时间超过了每天1小时的指南推荐标准。
      </p>
    </section>

    <!-- 数字童工介绍 -->
    <section class="section dark-section">
      <h2 class="section-title white">儿童作为网络空间中数量庞大的群体，不可避免地被"召唤"，成为数字生产力，沦为"数字童工"</h2>

      <div class="childlabor-types">
        <div class="type-card">
          <h3>�介接触型</h3>
          <p>以短视频的浏览为主要形式，由监护人拍摄发布或自主生产内容</p>
        </div>
        <div class="type-card">
          <h3>身体参与型</h3>
          <p>仍以体力劳动为主要形式，劳动受他人推动或控制，如童模</p>
        </div>
      </div>

      <p class="key-message">
        在这其中，有一部分在父母的包装下成为了<span class="highlight">小网红博主</span>（后文称为"网红儿童"）。当"晒娃"念起了"生意经"，儿童也就变成了"摇钱树"。
      </p>

      <div class="stat-box">
        据第三方数据机构统计，2025年国内3-12岁儿童网红超<span class="big-num">180万</span>，日均直播时长<span
          class="big-num">3.6小时</span>，头部账号月收入可达<span class="big-num">百万</span>。
      </div>
    </section>

    <!-- 童工数量变化 -->
    <section class="section">
      <h1 class="main-title">童工并未消失，而是披上了数字的外衣</h1>

      <p class="section-intro">
        自2000年以来，全球童工总数下降了约1亿，降幅近半。中国关于禁止使用童工的法律制度在2000年后经历了重要的完善，在2002年修订的《禁止使用童工规定》中大幅提高罚款标准，明确并加重使用童工的刑事责任。
      </p>

      <!-- 图表7：全球童工数量变化 -->
      <div class="chart-container" ref="chart7"></div>
      <p class="data-source">数据来源：国际劳工组织（ILO）、联合国儿童基金会（UNICEF）</p>

      <p class="key-message">
        传统童工数量大幅下降，而新型童工——数字童工开始显现，尤其是其中的"网红儿童"更应引起人们重视。
      </p>

      <!-- 图表8：账号数据 -->
      <div class="chart-container" ref="chart8"></div>
      <p class="data-source">数据来源：《法治日报》</p>
    </section>

    <!-- 网红儿童的诞生 -->
    <section id="influencer" class="section timeline-section">
      <h1 class="main-title">一个"网红儿童"的诞生</h1>

      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in timeline" :key="index"
          :class="{ 'timeline-visible': timelineVisible[index] }">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="timeline-icon">{{ item.icon }}</div>
          </div>
        </div>
      </div>

      <p class="insight-text">
        当"养娃"变成了"养号"，爱就开始有了回报率。很多账号最初确实是出于分享和记录的目的。然而，一旦流量涌入，MCN机构伸出橄榄枝，商业合作接踵而至，最初的"爱"就可能被异化。家长的角色可能悄然转变为"经纪人"，而孩子则可能成为家庭中的"数字劳工"。
      </p>
    </section>

    <!-- 皮亚杰理论 -->
    <section class="section piaget-section">
      <h2 class="section-title">儿童认知发展的真相</h2>
      <p class="section-intro">
        皮亚杰理论清晰表明，7岁以下儿童无法理解抽象商业行为，11岁以下难以真正自主决策。当儿童账号展示"想红""爱表演"时，背后往往是父母将自身价值观嫁接给认知能力受限的孩子。
      </p>

      <div class="piaget-container">
        <div v-for="(stage, index) in piagetStages" :key="index" class="piaget-stage" @mouseenter="currentStage = index"
          @mouseleave="currentStage = null">
          <div class="stage-figure" :style="{ height: stage.height }">
            <div class="figure-icon">👶</div>
          </div>
          <div class="stage-info">
            <h3>{{ stage.name }}</h3>
            <p class="stage-age">{{ stage.age }}</p>
          </div>
          <transition name="slide-up">
            <div v-if="currentStage === index" class="stage-detail">
              <p>{{ stage.detail }}</p>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- 四方关系环形图 -->
    <section class="section interactive-section">
      <h2 class="section-title">屏幕背后的利益网络</h2>

      <div class="circle-interaction">
        <div class="center-child" :class="{ shrink: selectedRole }">
          <div class="child-icon">👶</div>
        </div>

        <div class="roles-container">
          <div v-for="role in roles" :key="role.id" class="role-item" :class="{ active: selectedRole === role.id }"
            @click="selectRole(role.id)">
            <div class="role-avatar">{{ role.icon }}</div>
            <div class="role-name">{{ role.name }}</div>
          </div>
        </div>
      </div>

    </section>

    <!-- 角色详情弹窗 - 固定居中 -->
    <transition name="modal-fade">
      <div v-if="selectedRole" class="modal-overlay" @click="selectedRole = null">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="selectedRole = null">✕</button>
          <div class="modal-body" v-html="getRoleContent()"></div>
        </div>
      </div>
    </transition>

    <!-- 观众数据分析 -->
    <section class="section audience-section">
      <h2 class="section-title">谁在观看萌娃视频？</h2>

      <div class="audience-charts">
        <!-- 年龄分布图 -->
        <div class="chart-container" ref="chartAudienceAge"></div>

        <!-- 性别分布图 -->
        <div class="chart-container" ref="chartAudienceGender"></div>
      </div>

      <!-- 评论词云 -->
      <h3 class="subsection-title">评论区的声音</h3>
      <div class="chart-container large" ref="chartWordCloud"></div>

      <p class="insight-text">
        萌娃的天然流量优势再加之粉丝追捧，"晒娃"行为在相关平台越烧越旺。某千万级网红父母为其新生儿"光速"注册账号，仅1条视频，抖音吸粉十几万，点赞超30万。
      </p>

      <!-- 4张示例图片 -->
      <div class="example-images">
        <div class="example-image-card" v-for="(img, index) in exampleImages" :key="index">
          <img :src="img.src" :alt="img.alt" />
        </div>
      </div>
    </section>

    <!-- 过渡动画：孩子缩小成点 -->
    <div class="transition-animation" ref="transitionAnim">
      <div class="child-shrink" :class="{ 'shrinking': isTransitioning }">
        <span class="child-emoji">👶</span>
      </div>
    </div>

    <!-- 儿童影响 -->
    <section id="impact" class="section impact-section">
      <div class="impact-grid">
        <div class="impact-card" v-for="(impact, index) in impacts" :key="index">
          <div class="impact-number">{{ index + 1 }}</div>
          <p class="impact-text">{{ impact }}</p>
        </div>
      </div>
      <p class="data-source">数据来源：新华网、中工网、儿童发展研究学会（SRCD）、《美国医学会杂志（JAMA）》等</p>
    </section>

    <!-- 动机溯源 -->
    <section class="section">
      <h1 class="main-title">动机溯源，爱与利益的罗生门</h1>

      <p class="section-intro">
        "晒娃"行为并非由单一因素驱动，而是家长心理、儿童意愿与社会压力三方互动的结果。
      </p>

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
        记录成长本无对错，但问题在于尺度与动机。"晒娃"行为本身是一个复杂的罗生门。其性质是温暖的记录还是功利的消费，取决于爱、利益与压力三方博弈的结果。
      </p>
    </section>

    <!-- 专家建议 -->
    <section id="solution" class="section expert-section">
      <h1 class="main-title">把童年还给孩子，让爱回到现实</h1>

      <p class="section-intro">要整治"网红儿童"背后的流量牟利乱象，必须多方协同发力。</p>

      <div class="expert-cards">
        <div class="expert-card" v-for="expert in experts" :key="expert.name">
          <h3>{{ expert.name }}</h3>
          <p class="expert-title">{{ expert.title }}</p>
          <p class="expert-advice">{{ expert.advice }}</p>
        </div>
      </div>
    </section>

    <!-- 互动结尾 -->
    <section class="section final-section">
      <h2 class="final-question">如果这些"工作"时间被归还给孩子，他们本可以拥有多少自由玩耍的时光？</h2>

      <div class="savings-jar">
        <div class="jar-container">
          <div class="jar">
            <div class="candies">
              <span v-for="n in candyCount" :key="n" class="candy">🍭</span>
            </div>
          </div>
          <p class="jar-label">童年时光储蓄罐</p>
        </div>

        <button class="add-candy-btn" @click="addCandy">
          为孩子存入自由与快乐
        </button>
      </div>

      <p class="final-message" :class="{ show: candyCount >= 5 }">
        守护童心，请为孩子的童年时光存入自由与快乐，而非流量与数据。
      </p>
    </section>

    <!-- 全屏息屏效果 -->
    <div class="screen-off" :class="{ active: screenOff }">
      <div class="phone-shutdown">
        <div class="shutdown-text">📱</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

// 图表引用
const chart1 = ref(null)
const chartPhoneUsers = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
const chart4 = ref(null)
const chart5 = ref(null)
const chart6 = ref(null)
const chart7 = ref(null)
const chart8 = ref(null)
const chartAudienceAge = ref(null)
const chartAudienceGender = ref(null)
const chartWordCloud = ref(null)

// 时间轴数据
const timeline = [
  { title: '第一条视频发布', desc: '开始分享日常', icon: '📱' },
  { title: '当流量涌入', desc: '点赞数暴涨，关注度提升', icon: '❤️' },
  { title: '当直播变现', desc: '开启直播带货', icon: '💰' },
  { title: '当商业合作接踵而至', desc: '第一个广告来了', icon: '📢' },
  { title: '当MCN抛出橄榄枝', desc: '签约MCN机构', icon: '🤝' }
]
const timelineVisible = ref([false, false, false, false, false])

// 四方角色数据
const roles = [
  { id: 'parents', name: '父母', icon: '👨‍👩‍👧' },
  { id: 'mcn', name: 'MCN机构', icon: '🏢' },
  { id: 'platform', name: '平台', icon: '📱' },
  { id: 'audience', name: '观众', icon: '👥' }
]

const selectedRole = ref(null)

// 影响数据
const impacts = [
  '54%的青少年最向往的职业是当主播和网红',
  '频繁接触社交媒体的青少年，抑郁和焦虑发生率分别提高45%和38%',
  '40%使用社交媒体的女孩遭遇过网络骚扰或欺凌，这一比例在男孩当中为25%',
  '6岁前日均屏幕时间超过1小时的儿童，其总智商平均下降6.7至8.2分',
  '儿童在成人设计的"剧本"中被"催熟"，15%的萌宝短剧存在此类成人化倾向语言',
  '过早暴露在聚光灯下的儿童，大脑前额叶皮质发育受损率高达67%'
]

// 专家建议
const experts = [
  {
    name: '蒋俏蕾',
    title: '清华大学新闻与传播学院长聘副教授',
    advice: '儿童不适宜出现在公开的网络账号中，不要打开"儿童网红"产业化的"潘多拉魔盒"。如果能够明确禁止未成年人在公开网络账号中出现，就可以从根本上避免利用儿童引流的问题。'
  },
  {
    name: '方增泉',
    title: '北京师范大学新闻传播学院未成年人网络素养研究中心主任',
    advice: '进一步明确设定儿童出镜时长、内容更新频次、商业链接植入等行业规范，以确保在充分发挥网络平台丰富家庭数字记忆、促进儿童成长发展等功能的同时，有效防止儿童被工具化利用。'
  },
  {
    name: '郑宁',
    title: '中国传媒大学文化产业管理学院法律系教授',
    advice: '建议尽快明确"儿童网红"账号的判断和利用未成年人牟利的标准，建议主管部门指导相关行业协会出台细化标准，可以结合未成年人出镜频率、账号收益分配、商业化内容占比等因素综合判断。'
  }
]

// 糖果计数
const candyCount = ref(0)
const screenOff = ref(false)

// 开场动画和导航
const openingComplete = ref(false)
const showNav = ref(false)
const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('intro')
const scrollProgress = ref(0)

// 视频图表显示控制
const showChart = ref(false)

// 开场动画控制
const phoneVisible = ref(false)
const textVisible = ref(false)
const indicatorVisible = ref(false)
const charVisible = ref([false, false, false, false, false, false, false, false, false])

// 示例图片
const exampleImages = [
  { src: new URL('@/assets/images/3.png', import.meta.url).href, alt: '示例图片3' },
  { src: new URL('@/assets/images/4.png', import.meta.url).href, alt: '示例图片4' },
  { src: new URL('@/assets/images/5.png', import.meta.url).href, alt: '示例图片5' },
  { src: new URL('@/assets/images/6.png', import.meta.url).href, alt: '示例图片6' }
]

// 过渡动画控制
const isTransitioning = ref(false)
const transitionAnim = ref(null)

// 皮亚杰理论阶段
const currentStage = ref(null)
const piagetStages = [
  {
    name: '感知运动阶段',
    age: '0-2岁',
    height: '100px',
    detail: '婴儿通过看、摸、吃、抓来认识世界，就像"用手和嘴思考"。这个阶段的孩子连"藏猫猫"都难以理解，更无法理解网络的意义，他们的一切行为依赖即时反应。'
  },
  {
    name: '前运算阶段',
    age: '2-7岁',
    height: '180px',
    detail: '孩子开始用语言和符号表达，但思维充满局限性：认为月亮会跟着自己走，无法理解他人视角。觉得玩具有生命，会和娃娃聊天。如果果汁从高杯倒进矮杯，他们会坚持矮杯"变少了"，无法理解守恒概念。'
  },
  {
    name: '具体运算阶段',
    age: '7-11岁',
    height: '250px',
    detail: '孩子开始有逻辑，但必须依赖具体例子。能理解"A比B高，B比C高，所以A比C高"，但无法回答"如果人类不用吃饭会怎样"这种抽象假设。他们严格按规则行事，认为"规则不能变"。'
  },
  {
    name: '形式运算阶段',
    age: '11岁以后',
    height: '320px',
    detail: '青少年逐渐能进行假设推理，比如讨论"如果地球没有重力"，但这类能力仍需教育引导才能成熟。此前，儿童对网络风险、长期后果缺乏预判力。'
  }
]

// 选择角色
const selectRole = (roleId) => {
  selectedRole.value = selectedRole.value === roleId ? null : roleId
}

// 获取角色内容
const getRoleContent = () => {
  const contents = {
    parents: `
      <h3>父母："只是想分享一下"</h3>
      <p>是很多家长在社交媒体"晒娃"的初衷。许多账号由家长运营，或是以父母视角拍摄孩子的有趣瞬间，或是以孩子视角开设儿童账号，但是在流量至上、利益诱惑面前，这份分享可能就会变了味。</p>
      <div class="cost-comparison">
        <div class="cost-item">
          <h4>养育成本</h4>
          <div class="cost-map-container">
            <div class="child-silhouette">
              <span class="silhouette-value">85万</span>
            </div>
            <div class="map-note">各地0-17岁孩子平均养育成本（港澳台未统计）</div>
            <div class="cost-legend">
              <span class="legend-item"><span class="legend-color" style="background: #fee5d9"></span> 30-40万</span>
              <span class="legend-item"><span class="legend-color" style="background: #fcae91"></span> 40-50万</span>
              <span class="legend-item"><span class="legend-color" style="background: #fb6a4a"></span> 50-60万</span>
              <span class="legend-item"><span class="legend-color" style="background: #de2d26"></span> 60-80万</span>
              <span class="legend-item"><span class="legend-color" style="background: #a50f15"></span> 80万以上</span>
            </div>
          </div>
        </div>
      </div>
      <div class="data-highlight">
        <p>全国家庭0-17岁孩子的养育成本平均为<span class="big">53.8万元</span></p>
        <p>而仅2023年7月内，儿童博主的平均累计销售额就超过<span class="big">85万元</span>，约是养育成本的两倍。</p>
      </div>

      <h4 style="margin-top: 30px; color: #2c3e50; font-size: 1.4rem;">头部网红月销售额（悬停查看详情）</h4>
      <div class="sales-timeline">
        <div class="sales-item" data-date="9.26" data-sales="250-500万">
          <div class="date">9.26</div>
          <div class="bar" style="height: 30%;"></div>
          <div class="sales-tooltip">
            <p>销量: 1-2.5万</p>
            <p>销售额: 250-500万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.9" data-sales="500-750万">
          <div class="date">10.9</div>
          <div class="bar" style="height: 45%;"></div>
          <div class="sales-tooltip">
            <p>销量: 1-2.5万</p>
            <p>销售额: 500-750万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.13" data-sales="1000-2500万">
          <div class="date">10.13</div>
          <div class="bar" style="height: 75%;"></div>
          <div class="sales-tooltip">
            <p>销量: 5-7.5万</p>
            <p>销售额: 1000-2500万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.15" data-sales="2500-5000万">
          <div class="date">10.15</div>
          <div class="bar" style="height: 100%;"></div>
          <div class="sales-tooltip">
            <p>销量: 10-25万</p>
            <p>销售额: 2500-5000万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.17" data-sales="1000-2500万">
          <div class="date">10.17</div>
          <div class="bar" style="height: 70%;"></div>
          <div class="sales-tooltip">
            <p>销量: 10-25万</p>
            <p>销售额: 1000-2500万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.19" data-sales="2500-5000万">
          <div class="date">10.19</div>
          <div class="bar" style="height: 95%;"></div>
          <div class="sales-tooltip">
            <p>销量: 5-7.5万</p>
            <p>销售额: 2500-5000万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.22" data-sales="500-750万">
          <div class="date">10.22</div>
          <div class="bar" style="height: 40%;"></div>
          <div class="sales-tooltip">
            <p>销量: 10-25万</p>
            <p>销售额: 500-750万</p>
          </div>
        </div>
        <div class="sales-item" data-date="10.24" data-sales="2500-5000万">
          <div class="date">10.24</div>
          <div class="bar" style="height: 100%;"></div>
          <div class="sales-tooltip">
            <p>销量: 10-25万</p>
            <p>销售额: 2500-5000万</p>
          </div>
        </div>
      </div>

      <p>以一头部亲子类型网红分析，其近一个月销售额最高可达2500万-5000万。据第三方数据，儿童网红@瑶一***其短视频社交媒体账号年广告收入或超1650万元，远超90%的同粉丝量级达人。</p>
    `,
    mcn: `
      <h3>MCN机构：流量公式的制造者</h3>
      <p>"网红儿童"内容的制作者远不止是分享生活的父母，其背后通常有专业的推手。MCN机构看到了儿童群体在线上商业变现上的潜力。</p>
      <div class="formula-box">
        <p class="formula">萌娃(40%) + 冲突剧情(30%) + 商品植入(30%) = 爆款模板</p>
      </div>
      <p>MCN常会套用这样的流量公式，主动签约有潜力的素人账号，提供从人设定位、剧本编写到拍摄剪辑、商业变现的全套服务。</p>
      <div class="data-highlight">
        <p>粉丝量百万以上账号中，<span class="big">54.9%</span>已与MCN签约</p>
      </div>

      <h4 style="margin-top: 30px; color: #2c3e50; font-size: 1.4rem;">MCN合作模式与分成比例</h4>
      <div class="mcn-revenue-chart">
        <div class="revenue-model">
          <div class="model-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h5>自营模式</h5>
            <p class="model-desc">MCN全程运营</p>
          </div>
          <div class="revenue-split">
            <div class="split-bar">
              <div class="creator-share" style="width: 30%; background: #e74c3c;">创作者 30%</div>
              <div class="mcn-share" style="width: 70%; background: #3498db;">MCN 70%</div>
            </div>
          </div>
        </div>

        <div class="revenue-model">
          <div class="model-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            <h5>联营模式</h5>
            <p class="model-desc">共同运营管理</p>
          </div>
          <div class="revenue-split">
            <div class="split-bar">
              <div class="creator-share" style="width: 50%; background: #e74c3c;">创作者 50%</div>
              <div class="mcn-share" style="width: 50%; background: #3498db;">MCN 50%</div>
            </div>
          </div>
        </div>

        <div class="revenue-model">
          <div class="model-header" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
            <h5>签约模式</h5>
            <p class="model-desc">创作者主导运营</p>
          </div>
          <div class="revenue-split">
            <div class="split-bar">
              <div class="creator-share" style="width: 70%; background: #27ae60;">创作者 70%</div>
              <div class="mcn-share" style="width: 30%; background: #3498db;">MCN 30%</div>
            </div>
          </div>
        </div>
      </div>

      <p class="warning">但是MCN资质参差不齐，签约后伴随着的是：</p>
      <ul>
        <li>高频率的视频发表（亲子类头部达人月发布视频最高达96条）</li>
        <li>不平等的分成比例（自营模式分成最低仅30%）</li>
        <li>困难的解约方式以及高昂的违约金（最高可达单月流水的24倍）</li>
      </ul>
      <div class="penalty-box">
        <h4>违约条款示例：</h4>
        <ul class="penalty-list">
          <li>未经同意在非指定平台表演，违规一次需承担合同期内单月最高流水收入的<span class="red-text">24倍</span>赔偿</li>
          <li>未经同意擅自接第三方活动的，发生一次须赔偿公司<span class="red-text">50万元</span></li>
          <li>主播擅自提取账号佣金的，需赔偿不低于<span class="red-text">50万元</span></li>
        </ul>
      </div>
    `,
    platform: `
      <h3>平台：算法推荐的推手</h3>
      <p>平台的推荐算法会识别出完播率、互动率更高的内容类型，并给予更大的流量推荐，从而形成"表现越好-推荐越多"的循环。</p>
      <div class="data-highlight">
        <p>东北财经大学研究显示，儿童网红账号的完播率比成人账号高<span class="big">47%</span></p>
        <p>平台因此加大流量倾斜，形成"数据越好-流量越多-变现越强"的恶性循环。</p>
      </div>
      <p>为了追求流量和商业利益，部分平台对晒娃视频的内容审核把关不严，任由带有广告植入、过度商业化的视频肆意传播。</p>
    `,
    audience: `
      <h3>观众：天然流量的来源</h3>
      <p>观看者中不乏真正喜爱孩子、通过视频获得情感慰藉的用户。一个有趣的现象是，不少头部萌娃账号的粉丝中，18-23岁的年轻人对萌娃视频的偏好度最高。</p>
      <div class="insight-box">
        <p>从进化心理学角度解释，这种现象是因为人类天生会对具有"婴儿图式"（如圆脸、大眼等特征）的幼崽产生保护欲和亲密感，这是一种本能反应，而女性通常对此更为敏感。</p>
      </div>
      <p>萌娃们天真无邪的言行和温馨的家庭互动场景，为年轻观众提供了一个逃离现实压力、获得情绪疗愈的窗口。</p>
      <p class="warning">"啃娃逻辑"正在逐渐被更多人接受。甚至出现了一批"母婴博主陪跑""宝妈专业运营"等专门教导家长如何打造"小网红"的账号。</p>
    `
  }
  return contents[selectedRole.value] || ''
}


// 切换菜单
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 平滑滚动到指定区域
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // 导航栏高度
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
    menuOpen.value = false
  }
}

// 更新活动section和滚动进度
const updateScrollState = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  // 更新滚动进度
  scrollProgress.value = (scrollTop / docHeight) * 100

  // 更新滚动状态
  isScrolled.value = scrollTop > 100

  // 更新当前激活的section
  const sections = ['intro', 'digital-labor', 'children', 'influencer', 'impact', 'solution']
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

// 初始化图表
onMounted(() => {
  // 开场动画序列
  setTimeout(() => {
    phoneVisible.value = true
  }, 500) // 0.5秒后手机弹出

  // 字符逐个弹出
  const chars = charVisible.value
  setTimeout(() => { chars[0] = true }, 1500)
  setTimeout(() => { chars[1] = true }, 1650)
  setTimeout(() => { chars[2] = true }, 1800)
  setTimeout(() => { chars[3] = true }, 1950)
  setTimeout(() => { chars[4] = true }, 2100)
  setTimeout(() => { chars[5] = true }, 2250)
  setTimeout(() => { chars[6] = true }, 2400)
  setTimeout(() => { chars[7] = true }, 2550)
  setTimeout(() => { chars[8] = true }, 2700)

  setTimeout(() => {
    indicatorVisible.value = true
  }, 3200) // 3.2秒后提示显示

  setTimeout(() => {
    showNav.value = true
  }, 3500) // 3.5秒后导航栏出现

  nextTick(() => {
    initCharts()
    setupScrollAnimations()
    setupNavScroll()
    setupTransitionAnimation()
    setupTimelineAnimation()
  })
})

// 初始化所有图表
const initCharts = () => {
  // 图表1：中国居民每日平均互联网使用时间
  if (chart1.value) {
    const myChart1 = echarts.init(chart1.value)
    myChart1.setOption({
      title: {
        text: '中国居民每日平均互联网使用时间',
        left: 'center',
        textStyle: { fontSize: 20, fontWeight: 'bold' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
        axisLabel: { fontSize: 14 }
      },
      yAxis: {
        type: 'value',
        name: '小时',
        axisLabel: { formatter: '{value}h' }
      },
      series: [{
        data: [4.4, 4.07, 4.21, 5.33, 6.05],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 1, color: '#188df0' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}h'
        }
      }]
    })
  }

  // 手机网民占比
  if (chartPhoneUsers.value) {
    const myChartPhone = echarts.init(chartPhoneUsers.value)
    myChartPhone.setOption({
      title: {
        text: '截至2025年6月手机网民占比情况',
        left: 'center',
        textStyle: { fontSize: 20, fontWeight: 'bold' }
      },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {d}%\n{c}亿人',
          fontSize: 14
        },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' }
        },
        data: [
          { value: 11.16, name: '手机网民', itemStyle: { color: '#5470c6' } },
          { value: 0.07, name: '非手机网民', itemStyle: { color: '#e0e0e0' } }
        ]
      }]
    })
  }

  // 图表2：短视频使用时间
  if (chart2.value) {
    const myChart2 = echarts.init(chart2.value)
    myChart2.setOption({
      title: {
        text: '中国居民每日平均短视频使用时间',
        left: 'center',
        textStyle: { fontSize: 20, fontWeight: 'bold' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024']
      },
      yAxis: {
        type: 'value',
        name: '分钟',
        axisLabel: { formatter: '{value}min' }
      },
      series: [{
        data: [110, 87, 150, 151, 156],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fbc658' },
            { offset: 1, color: '#f77825' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}min'
        }
      }]
    })
  }

  // 图表3：视频点赞平均数
  if (chart3.value) {
    const myChart3 = echarts.init(chart3.value)
    const categories = ['随拍', '剧情', '明星八卦', '舞蹈', '游戏', '亲子', '音乐', '颜值', '时政社会', '校园教育', '美食', '医疗健康', '财经', '休闲']
    const values = [108045.7, 37819.9, 34845.9, 27364.2, 19072.4, 13513.8, 13518.6, 10068.6, 5773.9, 4761.7, 4761.7, 2337.6, 2149.5, 1772.5]

    myChart3.setOption({
      title: {
        text: '各类型视频平均点赞数',
        subtext: '截至2025年10月23日',
        left: 'center'
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}' }
      },
      yAxis: {
        type: 'category',
        data: categories,
        axisLabel: { fontSize: 12 }
      },
      series: [{
        data: values,
        type: 'bar',
        itemStyle: {
          color: (params) => {
            const colors = ['#ee6666', '#fc8452', '#fac858', '#91cc75', '#73c0de', '#3ba272', '#5470c6', '#9a60b4', '#ea7ccc']
            return colors[params.dataIndex % colors.length]
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
      }]
    })
  }

  // 图表4：年龄层占比（简化版）
  if (chart4.value) {
    const myChart4 = echarts.init(chart4.value)
    myChart4.setOption({
      title: {
        text: '不同年龄层群体在整体网民中的占比',
        left: 'center'
      },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie',
        radius: '60%',
        data: [
          { value: 20, name: '0-18岁' },
          { value: 35, name: '19-35岁' },
          { value: 25, name: '36-50岁' },
          { value: 15, name: '51-65岁' },
          { value: 5, name: '65岁以上' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    })
  }

  // 图表5：未成年人网民数量
  if (chart5.value) {
    const myChart5 = echarts.init(chart5.value)
    myChart5.setOption({
      title: {
        text: '未成年人网民数量与普及率',
        left: 'center'
      },
      tooltip: { trigger: 'axis' },
      legend: { data: ['网民数量(万人)', '普及率(%)'], bottom: 10 },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023']
      },
      yAxis: [
        { type: 'value', name: '网民数量(万人)' },
        { type: 'value', name: '普及率(%)', max: 100 }
      ],
      series: [
        {
          name: '网民数量(万人)',
          type: 'bar',
          data: [18281, 19062, 19347, 19630],
          itemStyle: { color: '#5470c6' }
        },
        {
          name: '普及率(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [94.9, 96.8, 97.2, 97.3],
          itemStyle: { color: '#ee6666' }
        }
      ]
    })
  }

  // 图表6：设备使用情况
  if (chart6.value) {
    const myChart6 = echarts.init(chart6.value)
    myChart6.setOption({
      title: {
        text: '儿童数字设备使用情况',
        left: 'center'
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['使用比例(%)', '平均开始年龄'], bottom: 10 },
      xAxis: {
        type: 'category',
        data: ['智能手机', '电子游戏', '电视', '网上社交', '电脑', '平板电脑']
      },
      yAxis: [
        { type: 'value', name: '使用比例(%)', max: 100 },
        { type: 'value', name: '平均年龄', max: 10 }
      ],
      series: [
        {
          name: '使用比例(%)',
          type: 'bar',
          data: [84, 87, 83, 68, 37, 30],
          itemStyle: { color: '#91cc75' }
        },
        {
          name: '平均开始年龄',
          type: 'line',
          yAxisIndex: 1,
          data: [7, 7, 7, 9, 8, 8],
          itemStyle: { color: '#fac858' },
          label: { show: true, formatter: '{c}岁' }
        }
      ]
    })
  }

  // 图表7：全球童工数量变化
  if (chart7.value) {
    const myChart7 = echarts.init(chart7.value)
    myChart7.setOption({
      title: {
        text: '全球童工数量变化',
        subtext: '自2000年以来下降约1亿',
        left: 'center'
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['2000', '2004', '2008', '2012', '2016', '2020']
      },
      yAxis: {
        type: 'value',
        name: '百万人',
        axisLabel: { formatter: '{value}M' }
      },
      series: [{
        data: [246, 222, 215, 168, 152, 160],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(238, 102, 102, 0.3)' },
            { offset: 1, color: 'rgba(238, 102, 102, 0.1)' }
          ])
        },
        lineStyle: { color: '#ee6666', width: 3 },
        itemStyle: { color: '#ee6666' },
        label: {
          show: true,
          formatter: '{c}M'
        }
      }]
    })
  }

  // 图表8：账号出镜数据
  if (chart8.value) {
    const myChart8 = echarts.init(chart8.value)
    myChart8.setOption({
      title: {
        text: '粉丝超20万账号儿童出镜时间占比',
        left: 'center'
      },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: true, formatter: '{b}: {d}%' },
        data: [
          { value: 5, name: '50-70%' },
          { value: 25, name: '70-95%' },
          { value: 70, name: '95%以上' }
        ]
      }]
    })
  }

  // 观众年龄分布图
  if (chartAudienceAge.value) {
    const myChartAge = echarts.init(chartAudienceAge.value)
    myChartAge.setOption({
      title: {
        text: '观看萌娃视频的观众年龄分布',
        left: 'center'
      },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie',
        radius: '65%',
        data: [
          { value: 15, name: '18岁以下' },
          { value: 35, name: '18-23岁', itemStyle: { color: '#5470c6' } },
          { value: 25, name: '24-30岁' },
          { value: 15, name: '31-40岁' },
          { value: 10, name: '40岁以上' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%'
        }
      }]
    })
  }

  // 观众性别分布图
  if (chartAudienceGender.value) {
    const myChartGender = echarts.init(chartAudienceGender.value)
    myChartGender.setOption({
      title: {
        text: '观看萌娃视频的观众性别分布',
        left: 'center'
      },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, left: 'center' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 16
        },
        data: [
          { value: 68, name: '女性', itemStyle: { color: '#ee6666' } },
          { value: 32, name: '男性', itemStyle: { color: '#5470c6' } }
        ]
      }]
    })
  }

  // 评论词云图
  if (chartWordCloud.value) {
    const myChartCloud = echarts.init(chartWordCloud.value)
    const words = [
      { name: '可爱', value: 1000 },
      { name: '宝宝', value: 900 },
      { name: '漂亮', value: 850 },
      { name: '天使', value: 800 },
      { name: '萌', value: 750 },
      { name: '喜欢', value: 700 },
      { name: '妹妹', value: 650 },
      { name: '女儿', value: 600 },
      { name: '小孩', value: 550 },
      { name: '治愈', value: 500 },
      { name: '童年', value: 480 },
      { name: '幸福', value: 450 },
      { name: '温柔', value: 420 },
      { name: '天真', value: 400 },
      { name: '快乐', value: 380 },
      { name: '妈妈', value: 350 },
      { name: '家长', value: 320 },
      { name: '摆拍', value: 300 },
      { name: '炫娃', value: 280 },
      { name: '演戏', value: 260 },
      { name: '虚伪', value: 240 },
      { name: '利用孩子', value: 220 },
      { name: '刻意', value: 200 },
      { name: '离谱', value: 180 }
    ]

    myChartCloud.setOption({
      title: {
        text: '评论区词云',
        left: 'center',
        top: 20
      },
      tooltip: { show: true },
      series: [{
        type: 'wordCloud',
        gridSize: 15,
        sizeRange: [14, 60],
        rotationRange: [0, 0],
        shape: 'circle',
        width: '90%',
        height: '90%',
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
            return colors[Math.floor(Math.random() * colors.length)]
          }
        },
        emphasis: {
          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: words
      }]
    })
  }
}

// 设置滚动动画
const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section)
  })
}

// 设置导航栏滚动效果
const setupNavScroll = () => {
  window.addEventListener('scroll', updateScrollState)
  updateScrollState() // 初始调用
}

// 设置过渡动画
const setupTransitionAnimation = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('example-images')) {
        // 当用户看到4张图片后，触发过渡动画
        setTimeout(() => {
          isTransitioning.value = true
        }, 2000) // 2秒后开始缩小
      }
    })
  }, { threshold: 0.8 })

  const exampleImagesEl = document.querySelector('.example-images')
  if (exampleImagesEl) {
    observer.observe(exampleImagesEl)
  }
}

// 设置时间轴动画
const setupTimelineAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          setTimeout(() => {
            timelineVisible.value[index] = true
          }, index * 300) // 每个item延迟300ms
        }
      })
    },
    { threshold: 0.5 }
  )

  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, index) => {
      item.dataset.index = index
      observer.observe(item)
    })
  }, 500)
}

// 添加糖果时检查是否显示结尾
const addCandy = () => {
  if (candyCount.value < 10) {
    candyCount.value++
    if (candyCount.value >= 5) {
      // 当糖果够5个时，2秒后触发息屏
      setTimeout(() => {
        screenOff.value = true
      }, 2000)
    }
  }
}
</script>

<style scoped>
.rechildhood-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  overflow-x: hidden;
}

/* 开场部分 */
.opening-section {
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
}

.phone-screen {
  width: 280px;
  height: 560px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8),
    0 0 0 2px #333,
    inset 0 0 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100vh) scale(0.5);
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.phone-screen.phone-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: phoneFloat 3s ease-in-out infinite 1.5s;
}

@keyframes phoneFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

/* iPhone刘海 */
.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 25px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
}

.notch-camera {
  width: 10px;
  height: 10px;
  background: #333;
  border-radius: 50%;
}

.notch-speaker {
  width: 50px;
  height: 5px;
  background: #333;
  border-radius: 3px;
}

/* 侧边按钮 */
.btn-left,
.btn-right {
  position: absolute;
  background: #1a1a1a;
  border-radius: 2px;
}

.volume-up {
  left: -3px;
  top: 120px;
  width: 3px;
  height: 60px;
}

.volume-down {
  left: -3px;
  top: 200px;
  width: 3px;
  height: 60px;
}

.power {
  right: -3px;
  top: 160px;
  width: 3px;
  height: 80px;
}

.screen-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 25px;
}

.opening-text {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.6;
}

.opening-text .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(-50px) scale(0);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.opening-text .char.char-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: charGlow 2s ease-in-out infinite;
}

@keyframes charGlow {

  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(100, 181, 246, 0.6);
  }
}

@keyframes textGlow {

  0%,
  100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  50% {
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.8),
      0 0 60px rgba(255, 255, 255, 0.6);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.scroll-indicator.indicator-show {
  opacity: 1;
  transform: translateY(0);
  animation: bounce 2s ease-in-out infinite;
}

.scroll-indicator span {
  font-size: 1.1rem;
  opacity: 0.8;
}

.scroll-arrow {
  font-size: 2rem;
  animation: arrowBounce 1s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes arrowBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: 1000;
  transform: translateY(-100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar.visible {
  transform: translateY(0);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.12);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.3s;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 2rem;
  animation: brandPulse 2s ease-in-out infinite;
}

@keyframes brandPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 600;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}

.nav-link:hover::before,
.nav-link.active::before {
  opacity: 0.1;
}

.nav-link:hover {
  color: #667eea;
  transform: translateY(-2px);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.nav-link.active::before {
  opacity: 0;
}

.link-icon {
  font-size: 1.1rem;
}

.link-text {
  font-size: 0.9rem;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.nav-toggle span {
  width: 28px;
  height: 3px;
  background: #2c3e50;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 进度条 */
.nav-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.section {
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  color: #2c3e50;
  line-height: 1.4;
}

.section-title {
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #34495e;
}

.section-title.white {
  color: #ffffff;
}

.chart-container {
  width: 90%;
  max-width: 900px;
  height: 500px;
  margin: 30px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.chart-container.large {
  height: 700px;
}

.data-source,
.data-note {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 20px;
  max-width: 800px;
}

.data-note.small {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
}

.time-options {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.time-option {
  padding: 12px 30px;
  font-size: 1.1rem;
  border: 2px solid #f39c12;
  background: white;
  color: #f39c12;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.time-option:hover {
  background: #f39c12;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
}

/* 视频展示部分 */
.video-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.video-examples {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 40px auto;
  max-width: 900px;
}

.video-card {
  flex: 1;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.video-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.video-placeholder {
  aspect-ratio: 9/16;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px;
}

.placeholder-icon {
  font-size: 4rem;
  animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.placeholder-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}

.video-image {
  width: 100%;
  aspect-ratio: 9/16;
  object-fit: cover;
  display: block;
}

.video-info {
  padding: 20px;
  text-align: center;
}

.video-likes {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.choice-buttons {
  display: flex;
  gap: 30px;
  margin: 40px 0;
  justify-content: center;
}

.choice-btn {
  padding: 18px 60px;
  font-size: 1.3rem;
  border: 3px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.choice-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #3498db;
  transition: all 0.5s;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.choice-btn:hover::before {
  width: 300px;
  height: 300px;
}

.choice-btn:hover {
  color: white;
  transform: scale(1.08);
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.4);
}

.choice-btn.selected {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.5);
  animation: pulseButton 1.5s ease-in-out;
}

@keyframes pulseButton {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* 图表展开动画 */
.chart-reveal {
  margin-top: 50px;
}

.slide-down-enter-active {
  animation: slideDown 0.6s ease-out;
}

.slide-down-leave-active {
  animation: slideDown 0.6s ease-out reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight-text {
  font-size: 2rem;
  text-align: center;
  color: #e74c3c;
  margin-bottom: 30px;
}

.concept-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.concept-intro {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
}

.concept-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  max-width: 900px;
}

.concept-box h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffd700;
}

.concept-detail,
.concept-explain {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
}

.highlight-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
  margin: 40px auto;
}

.highlight-num {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
}

.dark-section {
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  color: white;
}

.childlabor-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
  margin: 40px 0;
}

.type-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.type-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #3498db;
}

.key-message {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.8;
  max-width: 800px;
  margin: 30px 0;
}

.highlight {
  color: #f39c12;
  font-weight: bold;
}

.stat-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.2rem;
  max-width: 800px;
  margin-top: 40px;
}

.big-num {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f39c12;
  margin: 0 10px;
}

.section-intro {
  font-size: 1.1rem;
  text-align: center;
  max-width: 900px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 40px;
}

.timeline {
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #3498db, #9b59b6);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin: 50px 0;
  position: relative;
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.timeline-visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 8px rgba(52, 152, 219, 0.2);
  z-index: 2;
}

.timeline-content {
  width: 45%;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
  margin-right: 55%;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 55%;
}

.timeline-content h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.timeline-icon {
  font-size: 2rem;
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-item:nth-child(even) .timeline-icon {
  left: -60px;
  right: auto;
}

.insight-text {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 900px;
  text-align: center;
  margin-top: 50px;
  color: #555;
}

/* 皮亚杰理论阶段 */
.piaget-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.piaget-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-end;
  max-width: 1200px;
  margin: 50px auto;
  padding: 40px 20px;
}

.piaget-stage {
  flex: 1;
  max-width: 250px;
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

.stage-info h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.stage-age {
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: bold;
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

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* 观众分析部分 */
.audience-section {
  background: linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%);
}

.audience-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin: 60px 0 30px;
}

/* 示例图片展示 */
.example-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
}

.example-image-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-image-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.example-image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 过渡动画 */
.transition-animation {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #e3ffe7 0%, #ffffff 100%);
}

.child-shrink {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
}

.child-shrink.shrinking {
  width: 20px;
  height: 20px;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.6);
}

.child-emoji {
  font-size: 5rem;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.child-shrink.shrinking .child-emoji {
  font-size: 0;
  opacity: 0;
}

.circle-interaction {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 50px auto;
}

.center-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  z-index: 10;
}

.center-child.shrink {
  width: 80px;
  height: 80px;
}

.child-icon {
  font-size: 4rem;
}

.center-child.shrink .child-icon {
  font-size: 2rem;
}

.roles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.role-item {
  position: absolute;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.role-item:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.role-item:nth-child(2) {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.role-item:nth-child(3) {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.role-item:nth-child(4) {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.role-avatar {
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.role-item:hover .role-avatar,
.role-item.active .role-avatar {
  transform: scale(1.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.role-name {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color: #2c3e50;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  background: white;
  border-radius: 30px;
  padding: 50px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

.modal-body {
  padding-right: 20px;
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

.impact-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 50px 0;
}

.impact-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s;
}

.impact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.impact-number {
  position: absolute;
  top: -20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.impact-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #34495e;
  padding-top: 20px;
}

.motivation-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  width: 100%;
  max-width: 1000px;
  margin: 50px 0;
}

.flow-left,
.flow-right {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

.expert-section {
  background: linear-gradient(to bottom, #ece9e6, #ffffff);
}

.expert-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 50px 0;
}

.expert-card {
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-top: 5px solid #3498db;
  transition: all 0.3s;
}

.expert-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.expert-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.expert-title {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.expert-advice {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #555;
}

.final-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.final-question {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.6;
}

.savings-jar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.jar-container {
  position: relative;
}

.jar {
  width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px 20px 40px 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
}

.jar::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.candies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-content: flex-end;
}

.candy {
  font-size: 2rem;
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }

  to {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

.jar-label {
  text-align: center;
  font-size: 1.3rem;
  margin-top: 20px;
  font-weight: bold;
}

.add-candy-btn {
  padding: 20px 50px;
  font-size: 1.3rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.add-candy-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.add-candy-btn:active {
  transform: scale(0.95);
}

.final-message {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s;
  line-height: 1.8;
}

.final-message.show {
  opacity: 1;
}

.screen-off {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  pointer-events: none;
  transition: opacity 3s ease-in-out;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-off.active {
  opacity: 1;
  pointer-events: all;
}

.phone-shutdown {
  opacity: 0;
  transition: opacity 1s ease-in-out 1s;
}

.screen-off.active .phone-shutdown {
  opacity: 1;
  animation: phoneShutdown 2s ease-in-out 1s forwards;
}

.shutdown-text {
  font-size: 4rem;
  filter: brightness(0.5);
}

@keyframes phoneShutdown {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .phone-screen {
    width: 220px;
    height: 440px;
    border: 8px solid #1a1a1a;
  }

  .opening-text {
    font-size: 1.3rem;
  }

  .phone-notch {
    width: 130px;
    height: 20px;
  }

  .opening-title {
    font-size: 1.5rem;
    padding: 30px;
  }

  .navbar {
    padding: 0 20px;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    gap: 0;
    padding: 20px 0;
    transform: translateX(-100%);
    transition: transform 0.3s;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-link {
    padding: 15px 30px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }

  .nav-toggle {
    display: flex;
  }

  .main-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .chart-container {
    width: 100%;
    height: 400px;
  }

  .timeline::before {
    left: 30px;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    width: calc(100% - 80px);
    margin-left: 80px;
    margin-right: 0;
  }

  .timeline-dot {
    left: 30px;
    transform: none;
  }

  .timeline-icon {
    display: none;
  }

  .circle-interaction {
    width: 100%;
    height: 500px;
  }

  .role-item {
    width: 80px;
    height: 80px;
  }

  .role-avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .impact-grid,
  .expert-cards,
  .motivation-flow {
    grid-template-columns: 1fr;
  }
}

/* 角色详情内容样式 */
/* 弹窗内部内容样式 */
.modal-body :deep(h3) {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid #667eea;
}

.modal-body :deep(p) {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  margin-bottom: 20px;
}

/* 养育成本对比 */
.modal-body :deep(.cost-comparison) {
  margin: 30px 0;
}

.modal-body :deep(.cost-item h4) {
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 20px;
}

.modal-body :deep(.cost-map-container) {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.modal-body :deep(.child-silhouette) {
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #a50f15 0%, #67000d 100%);
  border-radius: 100px 100px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(165, 15, 21, 0.3);
  position: relative;
}

.modal-body :deep(.child-silhouette::before) {
  content: '👶';
  font-size: 4rem;
  position: absolute;
  top: 30px;
  opacity: 0.3;
}

.modal-body :deep(.silhouette-value) {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.modal-body :deep(.map-note) {
  font-size: 1rem;
  color: #666;
  text-align: center;
  font-style: italic;
}

.modal-body :deep(.cost-legend) {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
}

.modal-body :deep(.legend-item) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
}

.modal-body :deep(.legend-color) {
  width: 30px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-body :deep(.data-highlight) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.modal-body :deep(.data-highlight .big) {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-body :deep(.formula-box) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  border-left: 6px solid #3498db;
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.1);
}

.modal-body :deep(.formula) {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

.modal-body :deep(.warning) {
  color: #e74c3c;
  font-weight: 700;
  margin-top: 25px;
  font-size: 1.1rem;
}

.modal-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

.modal-body :deep(li) {
  padding: 12px 0 12px 35px;
  position: relative;
  font-size: 1.05rem;
  line-height: 1.7;
}

.modal-body :deep(li::before) {
  content: '●';
  position: absolute;
  left: 10px;
  color: #3498db;
  font-weight: bold;
  font-size: 1.2rem;
}

.modal-body :deep(.insight-box) {
  background: linear-gradient(135deg, #e8f5e9 0%, #d4edda 100%);
  padding: 25px;
  border-radius: 15px;
  margin: 25px 0;
  border-left: 5px solid #27ae60;
  box-shadow: 0 5px 15px rgba(39, 174, 96, 0.1);
}

.modal-body :deep(.penalty-box) {
  background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  border-left: 6px solid #f39c12;
  box-shadow: 0 5px 20px rgba(243, 156, 18, 0.15);
}

.modal-body :deep(.penalty-box h4) {
  color: #e74c3c;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 800;
}

.modal-body :deep(.penalty-list) {
  list-style: none;
  padding-left: 0;
}

.modal-body :deep(.penalty-list li) {
  padding: 15px 0 15px 40px;
  position: relative;
  font-size: 1.05rem;
  line-height: 1.7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-body :deep(.penalty-list li:last-child) {
  border-bottom: none;
}

.modal-body :deep(.penalty-list li::before) {
  content: '⚠️';
  position: absolute;
  left: 0;
  font-size: 1.3rem;
}

.modal-body :deep(.red-text) {
  color: #e74c3c;
  font-weight: 900;
  font-size: 1.3rem;
  text-shadow: 0 1px 3px rgba(231, 76, 60, 0.2);
}

/* 销售额时间线图表 */
.modal-body :deep(.sales-timeline) {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 300px;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
  padding: 30px 20px 50px;
  border-radius: 20px;
  margin: 30px 0;
  position: relative;
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.modal-body :deep(.sales-timeline::before) {
  content: '销售额';
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
}

.modal-body :deep(.sales-item) {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.modal-body :deep(.sales-item:hover) {
  transform: translateY(-10px);
}

.modal-body :deep(.sales-item .bar) {
  width: 80%;
  background: linear-gradient(to top, #667eea 0%, #764ba2 100%);
  border-radius: 10px 10px 0 0;
  transition: all 0.3s;
  box-shadow: 0 -5px 15px rgba(102, 126, 234, 0.3);
  min-height: 20px;
}

.modal-body :deep(.sales-item:hover .bar) {
  background: linear-gradient(to top, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 -10px 25px rgba(245, 87, 108, 0.5);
}

.modal-body :deep(.sales-item .date) {
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.modal-body :deep(.sales-tooltip) {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: white;
  color: #2c3e50;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  z-index: 10;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid #667eea;
}

.modal-body :deep(.sales-tooltip::after) {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: white;
}

.modal-body :deep(.sales-item:hover .sales-tooltip) {
  opacity: 1;
  transform: translateX(-50%) translateY(-20px);
}

.modal-body :deep(.sales-tooltip p) {
  margin: 4px 0;
  font-size: 0.9rem;
}

/* MCN分成图表 */
.modal-body :deep(.mcn-revenue-chart) {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 30px 0;
}

.modal-body :deep(.revenue-model) {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.modal-body :deep(.revenue-model:hover) {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.modal-body :deep(.model-header) {
  padding: 20px 25px;
  color: white;
}

.modal-body :deep(.model-header h5) {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.modal-body :deep(.model-desc) {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.modal-body :deep(.revenue-split) {
  padding: 25px;
  background: #f8f9fa;
}

.modal-body :deep(.split-bar) {
  display: flex;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

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

.modal-body :deep(.revenue-model:hover .creator-share),
.modal-body :deep(.revenue-model:hover .mcn-share) {
  filter: brightness(1.1);
}
</style>