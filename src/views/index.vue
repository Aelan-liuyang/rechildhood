<template>
  <div class="rechildhood-container">
    <!-- 开场动画 -->
    <section class="section opening-section fullscreen" id="chapter0">
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

        <div class="nav-toggle" @click="toggleMenu" :class="{ active: menuOpen }" :aria-expanded="menuOpen"
          aria-label="打开导航" role="button" tabindex="0">
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
      <!-- 粒子背景 -->
      <canvas ref="particleCanvas" class="particle-bg"></canvas>

      <h1 class="main-title fade-in" data-parallax="0.3">你每天有多少时间在和小小的手机屏幕接触？</h1>

      <!-- 图表1：中国居民每日平均互联网使用时间 -->
      <div class="chart-container" ref="chart1" data-parallax="0.15"></div>
      <p class="data-source">数据来源：国家统计局、中国互联网络信息中心（CNNIC）、QuestMobile</p>

      <!-- 图表：手机网民占比 -->
      <div class="chart-container" ref="chartPhoneUsers" data-parallax="0.15"></div>
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
        <div class="video-card floating-card">
          <img src="@/assets/images/1.png" alt="视频示例1" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 123.4万</p>
          </div>
          <div class="card-glow"></div>
        </div>
        <div class="video-card floating-card">
          <img src="@/assets/images/2.png" alt="视频示例2" class="video-image" />
          <div class="video-info">
            <p class="video-likes">❤️ 89.2万</p>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>

      <div class="choice-buttons">
        <button class="choice-btn" @click="selectChoice('yes')"
          :class="{ selected: selectedChoice === 'yes' }">有</button>
        <button class="choice-btn" @click="selectChoice('no')"
          :class="{ selected: selectedChoice === 'no' }">没有</button>
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
    <section id="digital-labor" class="section concept-section fullscreen">
      <h2 class="highlight-text anim-reveal">当你在刷手机时真的是在进行纯粹的娱乐吗？</h2>
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
          <h3>媒介接触型</h3>
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
        <!-- 首条视频（特殊处理，包含动画） -->
        <div class="timeline-item first-video-item" :class="{ 'timeline-visible': timelineVisible[0] }">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="step-badge">1</div>
            <h3>{{ timeline[0].title }}</h3>
            <div class="first-video-anim" ref="firstVideoAnim">
              <div class="video-frame">
                <img :src="firstVideoSrc" alt="首条视频" class="timeline-video-img" />
                <div class="like-counter">❤️ {{ likeCount.toLocaleString() }}</div>
                <div class="hearts">
                  <span v-for="n in 28" :key="n" class="heart">❤️</span>
                </div>
                <div class="money" :class="{ show: moneyShow }">💰</div>
              </div>
            </div>
            <p>{{ timeline[0].desc }}</p>
            <div class="timeline-icon">{{ timeline[0].icon }}</div>
          </div>
        </div>

        <!-- 其他时间线项 -->
        <div v-for="(item, index) in timeline.slice(1)" :key="index + 1" class="timeline-item"
          :class="{ 'timeline-visible': timelineVisible[index + 1] }">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="step-badge">{{ index + 2 }}</div>
            <h3>{{ item.title }}</h3>
            <img v-if="item.image" :src="item.image" :alt="item.title" class="timeline-image" />
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

    <!-- 四方关系环形图 -->
    <section class="section interactive-section">
      <h2 class="section-title">屏幕背后的利益网络</h2>

      <div class="circle-interaction">
        <svg ref="networkSvg" class="network-lines"></svg>
        <div ref="centerChildEl" class="center-child" :class="{ shrink: selectedRole }">
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

    <!-- 角色详情弹窗 - 固定居中 -->
    <transition name="modal-fade">
      <div v-if="selectedRole" class="modal-overlay" @click="selectedRole = null">
        <div class="modal-content" role="dialog" aria-modal="true" tabindex="0" @keydown.esc="selectedRole = null"
          @click.stop>
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

      <!-- 地域分布图 -->
      <div class="chart-container" ref="chartAudienceRegion"></div>

      <!-- 地域分布提示 -->
      <p class="data-note" style="margin: 30px 0;">
        观看萌娃类短视频的观众中，广东占比最高，辽宁偏好度（TGI指数）最高
      </p>

      <!-- 评论词云 -->
      <h3 class="subsection-title">评论区的声音</h3>
      <div class="chart-container large" ref="chartWordCloud"></div>

      <p class="insight-text anim-reveal">
        萌娃的天然流量优势再加之粉丝追捧，"晒娃"行为在相关平台越烧越旺。某千万级网红父母为其新生儿"光速"注册账号，仅1条视频，抖音吸粉十几万，点赞超30万。
      </p>

      <!-- 4张示例图片 -->
      <div class="example-images">
        <div class="example-image-card" v-for="(img, index) in exampleImages" :key="index">
          <img :src="img.src" :alt="img.alt" />
        </div>
      </div>
    </section>


    <!-- 儿童影响 -->
    <section id="impact" class="section impact-section fullscreen">
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
      <div style="margin-top:20px;">
        <button class="add-candy-btn" @click="showMindmap = true">查看思维导图</button>
      </div>
    </section>

    <!-- 思维导图弹窗 -->
    <transition name="modal-fade">
      <div v-if="showMindmap" class="modal-overlay" @click="showMindmap = false">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="showMindmap = false">✕</button>
          <h3 style="margin:0 0 10px 0;">动机溯源思维导图</h3>
          <div class="chart-container" ref="chartMindMap" style="height:500px;"></div>
        </div>
      </div>
    </transition>

    <!-- 专家建议 -->
    <section id="solution" class="section expert-section">
      <h1 class="main-title anim-reveal">把童年还给孩子，让爱回到现实</h1>

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
    <section class="section final-section fullscreen">
      <h2 class="final-question">如果这些"工作"时间被归还给孩子，他们本可以拥有多少自由玩耍的时光？</h2>

      <div class="savings-jar">
        <div class="jar-container">
          <div class="jar" :class="{ pulse: jarPulse }">
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
        <span v-if="candyCount < 20">守护童心，请为孩子的童年时光存入自由与快乐，而非流量与数据。</span>
        <span v-else class="jar-full-msg">🎉 储蓄罐已满！让我们一起守护每一个孩子的童年时光。</span>
      </p>
    </section>

    <!-- 全屏息屏效果 -->
    <div class="screen-off" :class="{ active: screenOff }">
      <div class="tv-off-bar"></div>
      <div class="phone-shutdown">
        <div class="shutdown-text">📱</div>
      </div>
      <button class="backtop restart-btn" @click="restart">再看一次</button>
    </div>
  </div>
  <!-- 回到顶部按钮 -->
  <button v-show="showBackTop" class="backtop" @click="goTop">↑</button>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
const cleanupFns = []

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
const particleCanvas = ref(null)
const chartAudienceRegion = ref(null)
// 模态内图表引用（运行时实例）
let costMapChart = null
let mcnSignupChart = null
let mcnPenaltyTimer = null

// 首条视频动画控制
const firstVideoAnim = ref(null)
const moneyShow = ref(false)
const likeCount = ref(100)
let likeTimer = null
const costRefImg = new URL('@/assets/images/9.png', import.meta.url).href
const firstVideoSrc = new URL('@/assets/images/7.png', import.meta.url).href
const liveStreamImg = new URL('@/assets/images/8.png', import.meta.url).href
const showMindmap = ref(false)
const chartMindMap = ref(null)

// 时间轴数据
const timeline = [
  { title: '短视频第一条视频发布', desc: '当流量涌入', icon: '📱', image: firstVideoSrc },
  { title: '直播变现', desc: '开启直播带货', icon: '💰', image: liveStreamImg },
  { title: '商业合作接踵而至', desc: '第一个广告来了', icon: '📢' },
  { title: 'MCN抛出橄榄枝', desc: '签约MCN机构', icon: '🤝' }
]
const timelineVisible = ref([false, false, false, false])

// 四方角色数据
const roles = [
  { id: 'parents', name: '父母', icon: '👨‍👩‍👧' },
  { id: 'mcn', name: 'MCN机构', icon: '🏢' },
  { id: 'platform', name: '平台', icon: '📱' },
  { id: 'audience', name: '观众', icon: '👥' }
]

const selectedRole = ref(null)
const rolesContainerEl = ref(null)
const centerChildEl = ref(null)
const networkSvg = ref(null)

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
const jarPulse = ref(false)
const allowScreenOff = ref(false)

// 开场动画和导航
const openingComplete = ref(false)
const showNav = ref(false)
const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('intro')
const scrollProgress = ref(0)

// 视频图表显示控制
const showChart = ref(false)
const selectedChoice = ref(null)

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
// 回到顶部
const showBackTop = ref(false)

// 皮亚杰理论阶段
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
            <div style="width:100%;margin-top:12px;text-align:center;">
              <img src="${costRefImg}" alt="养育成本参考" style="max-width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.08);" />
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
       <h4 style="margin-top: 40px; color: #2c3e50; font-size: 1.4rem;">各地养育成本交互地图</h4>
      <div id="costMap" style="width:100%;height:500px;background:#f8f9fa;border-radius:16px;margin-top:20px;"></div>
      <p style="text-align:center;color:#999;margin-top:10px;font-size:0.9rem;">数据来源：《中国生育成本报告2024》</p>
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

      <h4 style="margin-top: 20px; color: #2c3e50; font-size: 1.4rem;">MCN签约比例（抖查查）</h4>
      <div id="mcnSignupChart" style="width:100%;height:320px;background:#fff;border-radius:16px;"></div>

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
    const nav = document.querySelector('.navbar')
    const offset = nav ? nav.offsetHeight : 0
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    menuOpen.value = false
  }
}

// 添加糖果时检查是否显示结尾（最多20个），增加反馈效果
const addCandy = () => {
  if (candyCount.value < 20) {
    candyCount.value++
    jarPulse.value = true
    setTimeout(() => { jarPulse.value = false }, 600)
    allowScreenOff.value = true

    // 视觉反馈：按钮短暂缩放
    const btn = document.querySelector('.add-candy-btn')
    if (btn) {
      btn.style.transform = 'scale(0.95)'
      setTimeout(() => { btn.style.transform = 'scale(1)' }, 100)
    }
  } else {
    jarPulse.value = true
    setTimeout(() => { jarPulse.value = false }, 300)

    // 按钮震动反馈
    const btn = document.querySelector('.add-candy-btn')
    if (btn) {
      btn.style.animation = 'shake 0.5s'
      setTimeout(() => { btn.style.animation = '' }, 500)
    }
  }
}

// 选择视频喜好并显示图表
const selectChoice = (v) => {
  selectedChoice.value = v
  showChart.value = true
}

// 角色项键盘可用
const onRoleKey = (e, id) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    selectRole(id)
  }
}

// 重新开始（黑屏结束）
const restart = () => {
  screenOff.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 回到顶部
const goTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (_) {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}

// 进入可视区域后高亮 chart3 的"亲子"条目并渐显说明
const setupChart3HighlightOnReveal = () => {
  if (!chart3.value) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const inst = echarts.getInstanceByDom(chart3.value)
        if (inst) {
          try {
            const opt = inst.getOption()
            const cats = (opt?.yAxis?.[0]?.data) || []
            const idx = cats.indexOf('亲子')
            if (idx >= 0) {
              inst.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx })
              inst.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: idx })
            }
          } catch (e) { /* noop */ }
        }
        const containerEl = entry.target.closest('.chart-reveal') || entry.target.parentElement || document
        const note = containerEl.querySelector?.('.data-note')
        if (note) note.classList.add('emerge')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.6 })
  observer.observe(chart3.value)
}

// 首条视频动画：进入视口后爱心从右侧不断涌出并放大覆盖，随后变成金钱符号
const setupFirstVideoAnimation = () => {
  if (!firstVideoAnim.value) return
  const container = firstVideoAnim.value
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.classList.add('run')
        // 点赞数快速上升动画
        likeTimer && clearInterval(likeTimer)
        likeCount.value = 100
        let acceleration = 1
        likeTimer = setInterval(() => {
          acceleration += 0.1
          likeCount.value += Math.floor(30 * acceleration + Math.random() * 100)
          if (likeCount.value >= 8000) {
            clearInterval(likeTimer)
            likeTimer = null
            likeCount.value = 8000
          }
        }, 60)
        // 2.5秒后结束点赞动画
        setTimeout(() => {
          if (likeTimer) {
            clearInterval(likeTimer)
            likeTimer = null
            likeCount.value = 8000
          }
        }, 2500)
        // 3.5s 后显示金钱符号（爱心覆盖完成后）
        setTimeout(() => { moneyShow.value = true }, 3500)
        observer.unobserve(container)
      }
    })
  }, { threshold: 0.6 })
  observer.observe(container)
}

// 画出角色与中心的连线
const drawNetworkLines = () => {
  const svg = networkSvg.value
  const center = centerChildEl.value
  const rolesWrap = rolesContainerEl.value
  if (!svg || !center || !rolesWrap) return
  const containerRect = svg.parentElement.getBoundingClientRect()
  const centerRect = center.getBoundingClientRect()
  const cx = centerRect.left + centerRect.width / 2 - containerRect.left
  const cy = centerRect.top + centerRect.height / 2 - containerRect.top
  const roles = rolesWrap.querySelectorAll('.role-item')
  const lines = []
  roles.forEach((el) => {
    const r = el.getBoundingClientRect()
    const rx = r.left + r.width / 2 - containerRect.left
    const ry = r.top + r.height / 2 - containerRect.top
    const roleId = el.getAttribute('data-role') || ''
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${rx}" y2="${ry}" data-role="${roleId}" class="net-line" />`)
  })
  svg.setAttribute('width', String(containerRect.width))
  svg.setAttribute('height', String(containerRect.height))
  svg.innerHTML = lines.join('')
}

const highlightLine = (roleId, on) => {
  const svg = networkSvg.value
  if (!svg) return
  const line = svg.querySelector(`.net-line[data-role="${roleId}"]`)
  if (line) {
    if (on) line.classList.add('highlight')
    else line.classList.remove('highlight')
  }
}

// 简单节流函数（用于 resize）
const throttleFn = (fn, limit = 150) => {
  let inThrottle = false
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

// 更新活动section和滚动进度
const updateScrollState = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  // 更新滚动进度
  scrollProgress.value = docHeight <= 0 ? 0 : (scrollTop / docHeight) * 100

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

  // 滚动到底部触发黑屏
  const atBottom = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 2)
  if (atBottom && allowScreenOff.value && !screenOff.value) {
    // 略微延迟，避免滚动抖动
    setTimeout(() => { screenOff.value = true }, 300)
  }
}

// 统一滚动处理：状态与回顶
const onScroll = () => {
  updateScrollState()
  showBackTop.value = window.scrollY > 600
}

// 初始化图表
onMounted(() => {
  // 开场动画序列
  setTimeout(() => {
    phoneVisible.value = true
  }, 500)

  // 字符逐个弹出
  const chars = charVisible.value
  setTimeout(() => { chars[0] = true }, 1500)
  setTimeout(() => {
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
    }, 3200)

    setTimeout(() => {
      showNav.value = true
    }, 3500)

    nextTick(() => {
      initCharts()
      setupScrollAnimations()
      setupNavScroll()
      setupTransitionAnimation()
      setupTimelineAnimation()
      setupChart3HighlightOnReveal()
      setupFirstVideoAnimation()
      drawNetworkLines()
      setupParticles()
      setupParallax()
      setupMagneticEffect()
      setupRevealAnimations()
      const onResizeThrottled = throttleFn(drawNetworkLines, 150)
      window.addEventListener('resize', onResizeThrottled)
      cleanupFns.push(() => window.removeEventListener('resize', onResizeThrottled))
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
          textStyle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
          top: 20
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: { color: '#fff' },
          formatter: '{b}<br/>使用时长: {c}小时'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['2020', '2021', '2022', '2023', '2024'],
          axisLabel: { fontSize: 14, color: '#666' },
          axisLine: { lineStyle: { color: '#ddd' } }
        },
        yAxis: {
          type: 'value',
          name: '小时',
          nameTextStyle: { color: '#666' },
          axisLabel: { formatter: '{value}h', color: '#666' },
          splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        series: [{
          data: [4.4, 4.07, 4.21, 5.33, 6.05],
          type: 'bar',
          barWidth: '45%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 1, color: '#188df0' }
            ]),
            borderRadius: [8, 8, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}h',
            color: '#188df0',
            fontWeight: 'bold'
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#a0d1f7' },
                { offset: 1, color: '#3fa3f5' }
              ])
            }
          }
        }],
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      })
    }

    // 手机网民占比
    if (chartPhoneUsers.value) {
      const myChartPhone = echarts.init(chartPhoneUsers.value)
      const w = chartPhoneUsers.value.clientWidth || 900
      const isNarrow = w < 520
      const percentFont = isNarrow ? 22 : 30
      const centerSubSize = isNarrow ? 11 : 12
      const labelFont = isNarrow ? 0 : 14
      const radiusInner = isNarrow ? '46%' : '50%'
      const radiusOuter = isNarrow ? '66%' : '72%'
      myChartPhone.setOption({
        title: {
          text: '截至2025年6月手机网民占比情况',
          subtext: '网民11.23亿 | 手机网民11.16亿 | 占99.4%',
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold', },
          subtextStyle: { fontSize: 12, color: '#666', }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}亿人 ({d}%)'
        },
        legend: { bottom: 10, left: 'center' },
        graphic: [
          { type: 'text', left: 'center', top: '44%', style: { text: '99.4%', fontSize: percentFont, fontWeight: 800, fill: '#2c3e50' } },
          { type: 'text', left: 'center', top: '56%', style: { text: '手机网民占比', fontSize: centerSubSize, fill: '#666' } }
        ],
        series: [{
          type: 'pie',
          radius: [radiusInner, radiusOuter],
          center: ['50%', '50%'],
          startAngle: 60,
          clockwise: true,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          labelLayout: { hideOverlap: true },
          label: {
            show: !isNarrow,
            formatter: function (params) {
              return params.name + '：' + params.value + '亿人\n(' + params.percent + '%)'
            },
            fontSize: labelFont || 12,
            color: '#2c3e50'
          },
          labelLine: { length: 12, length2: 10, lineStyle: { color: '#999' } },
          emphasis: {
            label: { show: true, fontSize: 16, fontWeight: 'bold' },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            { value: 11.16, name: '手机网民', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }]) } },
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

    // 图表4：年龄层占比
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
    // 观众地域分布图
    if (chartAudienceRegion.value) {
      const myChartRegion = echarts.init(chartAudienceRegion.value)

      // 省份观看占比数据（示例）
      const regionData = [
        { name: '广东', value: 15.2 },
        { name: '辽宁', value: 12.8 },
        { name: '江苏', value: 10.5 },
        { name: '浙江', value: 9.8 },
        { name: '山东', value: 8.6 },
        { name: '河南', value: 7.3 },
        { name: '四川', value: 6.9 },
        { name: '湖北', value: 6.2 },
        { name: '北京', value: 5.8 },
        { name: '上海', value: 5.1 },
        { name: '其他', value: 11.8 }
      ]

      myChartRegion.setOption({
        title: {
          text: '观众地域分布TOP10',
          subtext: '广东占比最高，辽宁偏好度最高',
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 'center'
        },
        series: [{
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            fontSize: 12
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: regionData
        }]
      })
    }
    // 评论词云图（懒加载 + 动态引入插件 + 优化词汇）
    if (chartWordCloud.value) {
      const el = chartWordCloud.value
      let inited = false
      const words = [
        // 正面词汇
        { name: '可爱', value: 1000 },
        { name: '宝宝', value: 950 },
        { name: '漂亮', value: 900 },
        { name: '天使', value: 850 },
        { name: '萌', value: 800 },
        { name: '喜欢', value: 750 },
        { name: '妹妹', value: 700 },
        { name: '女儿', value: 680 },
        { name: '小孩', value: 650 },
        { name: '治愈', value: 620 },
        { name: '童年', value: 600 },
        { name: '幸福', value: 580 },
        { name: '温柔', value: 560 },
        { name: '天真', value: 540 },
        { name: '快乐', value: 520 },
        { name: '妈妈', value: 500 },
        { name: '精致', value: 480 },
        { name: '小裙子', value: 460 },
        { name: '好看', value: 440 },
        { name: '抱抱', value: 420 },
        { name: '打扮', value: 400 },
        { name: '舞蹈', value: 380 },
        // 负面词汇
        { name: '家长', value: 360 },
        { name: '摆拍', value: 340 },
        { name: '炫娃', value: 320 },
        { name: '演戏', value: 300 },
        { name: '虚伪', value: 280 },
        { name: '利用孩子', value: 260 },
        { name: '刻意', value: 240 },
        { name: '离谱', value: 220 },
        { name: '僵硬', value: 200 }
      ]

      const io = new IntersectionObserver((entries) => {
        entries.forEach(async entry => {
          if (entry.isIntersecting && !inited) {
            inited = true
            let loaded = true
            try { await import('echarts-wordcloud') } catch (_) { loaded = false }
            if (!loaded) { io.unobserve(el); return }
            const myChartCloud = echarts.init(el)
            myChartCloud.setOption({
              title: { text: '评论区词云', left: 'center', top: 20, textStyle: { fontSize: 20, fontWeight: 'bold' } },
              tooltip: {
                show: true,
                formatter: (params) => {
                  return `${params.name}<br/>热度: ${params.value}`
                }
              },
              series: [{
                type: 'wordCloud',
                gridSize: 12,
                sizeRange: [16, 70],
                rotationRange: [-15, 15],
                shape: 'circle',
                width: '95%',
                height: '90%',
                drawOutOfBound: false,
                textStyle: {
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  color: (params) => {
                    // 负面词汇用暗色调
                    const negativeWords = ['摆拍', '炫娃', '演戏', '虚伪', '利用孩子', '刻意', '离谱', '僵硬', '家长']
                    if (negativeWords.includes(params.name)) {
                      const darkColors = ['#e74c3c', '#c0392b', '#d35400', '#e67e22']
                      return darkColors[Math.floor(Math.random() * darkColors.length)]
                    }
                    // 正面词汇用亮色调
                    const colors = ['#5470c6', '#91cc75', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
                    return colors[Math.floor(Math.random() * colors.length)]
                  }
                },
                emphasis: {
                  focus: 'self',
                  textStyle: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(0,0,0,0.4)',
                    fontSize: undefined
                  }
                },
                data: words
              }]
            })
            io.unobserve(el)
          }
        })
      }, { threshold: .25 })
      io.observe(el)
      cleanupFns.push(() => io.disconnect())
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

    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-show')
          animObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.35 })
    document.querySelectorAll('.anim-reveal').forEach(el => animObserver.observe(el))

    // 清理
    cleanupFns.push(() => observer.disconnect())
    cleanupFns.push(() => animObserver.disconnect())
  }

  // 设置导航栏滚动效果
  const setupNavScroll = () => {
    window.addEventListener('scroll', onScroll)
    onScroll()
  }

  // 设置过渡动画
  const setupTransitionAnimation = () => {
    const exampleImagesEl = document.querySelector('.example-images')
    if (!exampleImagesEl) return

    let shrinkStarted = false

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !shrinkStarted) {
          shrinkStarted = true
          const onScrollShrink = throttleFn(() => {
            const rect = exampleImagesEl.getBoundingClientRect()
            const viewportH = window.innerHeight

            const containerBottom = rect.bottom
            const shrinkTrigger = viewportH * 0.7

            if (containerBottom > shrinkTrigger) {
              exampleImagesEl.style.transform = 'scale(1)'
              exampleImagesEl.style.opacity = '1'
              isTransitioning.value = false
              return
            }

            const shrinkDistance = viewportH * 1.2
            const traveled = Math.max(0, shrinkTrigger - containerBottom)
            let p = traveled / shrinkDistance
            p = Math.max(0, Math.min(1, p))

            const scale = 1 - p * 0.95
            const opacity = 1 - p * 0.9
            exampleImagesEl.style.transform = `scale(${scale})`
            exampleImagesEl.style.opacity = String(opacity)

            if (p >= 0.85) {
              isTransitioning.value = true
            } else {
              isTransitioning.value = false
            }
          }, 50)
          window.addEventListener('scroll', onScrollShrink)
          cleanupFns.push(() => window.removeEventListener('scroll', onScrollShrink))
        }
      })
    }, { threshold: 0.3 })

    io.observe(exampleImagesEl)
    cleanupFns.push(() => io.disconnect())
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
            }, index * 300)
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

    // 清理
    cleanupFns.push(() => observer.disconnect())
  }

  // （已上移至顶层）

  // 修复：点击"有/没有"后再初始化 chart3
  watch(showChart, async (v) => {
    if (!v) return
    await nextTick()
    if (!chart3.value) return
    const exists = echarts.getInstanceByDom(chart3.value)
    if (exists) { exists.resize(); return }
    const myChart3 = echarts.init(chart3.value)
    const categories = ['随拍', '剧情', '明星八卦', '舞蹈', '游戏', '亲子', '音乐', '颜值', '时政社会', '校园教育', '美食', '医疗健康', '财经', '休闲']
    const values = [108045.7, 37819.9, 34845.9, 27364.2, 19072.4, 13513.8, 13518.6, 10068.6, 5773.9, 4761.7, 4761.7, 2337.6, 2149.5, 1772.5]
    myChart3.setOption({
      title: { text: '各类型视频平均点赞数', subtext: '截至2025年10月23日', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
      yAxis: { type: 'category', data: categories, axisLabel: { fontSize: 12 } },
      series: [{
        data: values,
        type: 'bar',
        itemStyle: { color: (params) => { const colors = ['#ee6666', '#fc8452', '#fac858', '#91cc75', '#73c0de', '#3ba272', '#5470c6', '#9a60b4', '#ea7ccc']; return colors[params.dataIndex % colors.length] } },
        label: { show: true, position: 'right', formatter: '{c}' }
      }]
    })
  })


  // 初始化 MCN 签约比例饼图
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
  // 初始化养育成本地图
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

      // 省份数据（示例数据）
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
        title: {
          text: '各地0-17岁孩子平均养育成本',
          subtext: '单位：万元（港澳台未统计）',
          left: 'center',
          top: 15,
          textStyle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
          subtextStyle: { fontSize: 12, color: '#999' }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.value) {
              return `<strong>${params.name}</strong><br/>养育成本: <span style="color:#e74c3c;font-weight:bold;">${params.value}万元</span>`
            }
            return `${params.name}<br/>暂无数据`
          },
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: { color: '#333' }
        },
        visualMap: {
          min: 30,
          max: 110,
          left: 30,
          bottom: 40,
          text: ['高', '低'],
          inRange: {
            color: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15']
          },
          textStyle: { color: '#666' },
          calculable: true
        },
        series: [{
          type: 'map',
          map: 'china',
          roam: true,
          scaleLimit: { min: 1, max: 3 },
          emphasis: {
            label: { show: true, color: '#fff' },
            itemStyle: {
              areaColor: '#667eea',
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)'
            }
          },
          select: {
            label: { show: true },
            itemStyle: { areaColor: '#764ba2' }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 5,
            shadowColor: 'rgba(0,0,0,0.1)'
          },
          data: provinceData
        }]
      })
    } catch (error) {
      // 如果地图文件加载失败，使用柱状图代替
      const fallbackData = [
        { name: '上海', value: 102.6 },
        { name: '北京', value: 96.9 },
        { name: '浙江', value: 72.8 },
        { name: '广东', value: 71.2 },
        { name: '福建', value: 67.0 },
        { name: '辽宁', value: 64.5 },
        { name: '天津', value: 63.5 },
        { name: '湖北', value: 63.4 }
      ].sort((a, b) => b.value - a.value)

      costMapChart.setOption({
        title: {
          text: '各地0-17岁孩子平均养育成本（TOP8）',
          subtext: '单位：万元',
          left: 'center',
          textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '10%', right: '10%', bottom: '10%', top: '20%', containLabel: true },
        xAxis: {
          type: 'category',
          data: fallbackData.map(i => i.name),
          axisLabel: { rotate: 0, fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          name: '万元',
          axisLabel: { formatter: '{value}万' }
        },
        series: [{
          type: 'bar',
          data: fallbackData.map(i => i.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#a50f15' },
              { offset: 1, color: '#de2d26' }
            ])
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}万',
            color: '#a50f15',
            fontWeight: 'bold'
          }
        }]
      })
    }
  }
  // 监听角色选择，初始化/清理模态内图表与动效
  watch(selectedRole, async (role) => {
    document.body.style.overflow = role ? 'hidden' : ''

    if (role === 'parents') {
      await nextTick()
      initCostMapChart()
    }

    if (role === 'mcn') {
      await nextTick()
      initMcnSignupChart()
      // 违约条款循环高亮
      const items = document.querySelectorAll('.penalty-list li')
      let i = 0
      const tick = () => {
        items.forEach(el => el.classList.remove('active'))
        items[i]?.classList.add('active')
        i = (i + 1) % items.length
      }
      tick()
      mcnPenaltyTimer && clearInterval(mcnPenaltyTimer)
      mcnPenaltyTimer = setInterval(tick, 1800)
      // 分成条动画
      document.querySelector('.modal-content')?.classList.add('animate')
    }

    if (!role) {
      // 关闭弹窗时清理
      costMapChart?.dispose?.(); costMapChart = null
      mcnSignupChart?.dispose?.(); mcnSignupChart = null
      if (mcnPenaltyTimer) { clearInterval(mcnPenaltyTimer); mcnPenaltyTimer = null }
      document.querySelector('.modal-content')?.classList.remove('animate')
    }
  })
  // 粒子背景动画
  let particleAnimId = null
  const setupParticles = () => {
    if (!particleCanvas.value) return
    const canvas = particleCanvas.value
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    cleanupFns.push(() => window.removeEventListener('resize', resize))

    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(102, 126, 234, 0.6)'
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)'

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // 连线
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.globalAlpha = 1 - dist / 120
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      particleAnimId = requestAnimationFrame(animate)
    }
    animate()
    cleanupFns.push(() => { if (particleAnimId) cancelAnimationFrame(particleAnimId) })
  }

  // 视差滚动效果
  const setupParallax = () => {
    const elements = document.querySelectorAll('[data-parallax]')
    const onScroll = throttleFn(() => {
      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax'))
        const scrolled = window.scrollY
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }, 20)
    window.addEventListener('scroll', onScroll)
    cleanupFns.push(() => window.removeEventListener('scroll', onScroll))
  }

  // 磁性悬停效果
  const setupMagneticEffect = () => {
    const items = document.querySelectorAll('.magnetic-item')
    items.forEach(item => {
      const onMove = (e) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const moveX = x * 0.1
        const moveY = y * 0.1
        item.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      const onLeave = () => {
        item.style.transform = 'translate(0, 0)'
      }
      item.addEventListener('mousemove', onMove)
      item.addEventListener('mouseleave', onLeave)
      cleanupFns.push(() => {
        item.removeEventListener('mousemove', onMove)
        item.removeEventListener('mouseleave', onLeave)
      })
    })
  }

  // 元素进入视口时的渐显动画
  const setupRevealAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal-active')
          }, index * 100)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.chart-container, .video-card, .expert-card, .impact-card').forEach(el => {
      el.classList.add('reveal-item')
      observer.observe(el)
    })
    cleanupFns.push(() => observer.disconnect())
  }

  // 思维导图初始化（优化节点布局和样式）
  watch(showMindmap, async (v) => {
    if (!v) {
      if (chartMindMap.value) {
        echarts.getInstanceByDom(chartMindMap.value)?.dispose()
      }
      return
    }
    await nextTick()
    if (!chartMindMap.value) return
    const inst = echarts.init(chartMindMap.value)
    inst.setOption({
      title: {
        text: '"晒娃"动机溯源',
        left: 'center',
        top: 10,
        textStyle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        formatter: (params) => {
          const descriptions = {
            '晒娃动机': '家长心理、儿童意愿与社会压力三方互动的结果',
            '家长心理': '记录成长、分享喜悦、自我表达',
            '儿童意愿': '天性表现、追求认可',
            '社会压力': '经济压力、平台诱导、MCN推动',
            '记录成长': '保存珍贵时光，留存美好回忆',
            '自我表达': '展示育儿理念，获得认同感',
            '亲子陪伴': '通过互动增进感情',
            '经济压力': '养育成本高，寻求补贴',
            '平台机制': '算法推荐，流量奖励',
            'MCN影响': '专业包装，商业运作'
          }
          return `<strong>${params.name}</strong><br/>${descriptions[params.name] || ''}`
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        label: {
          show: true,
          fontSize: 13,
          fontWeight: 'bold',
          color: '#2c3e50',
          position: 'inside'
        },
        labelLayout: {
          hideOverlap: true
        },
        force: {
          repulsion: 400,
          edgeLength: [100, 180],
          gravity: 0.08,
          layoutAnimation: true
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
          width: 2.5,
          opacity: 0.7
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 5,
            shadowBlur: 15,
            shadowColor: 'rgba(0,0,0,0.4)'
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0,0,0,0.5)'
          },
          label: {
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        data: [
          { name: '晒娃动机', symbolSize: 70, itemStyle: { color: '#667eea', shadowBlur: 15, shadowColor: 'rgba(102,126,234,0.6)' }, label: { fontSize: 15 } },
          { name: '家长心理', symbolSize: 50, itemStyle: { color: '#91cc75', shadowBlur: 10, shadowColor: 'rgba(145,204,117,0.5)' } },
          { name: '儿童意愿', symbolSize: 50, itemStyle: { color: '#fac858', shadowBlur: 10, shadowColor: 'rgba(250,200,88,0.5)' } },
          { name: '社会压力', symbolSize: 50, itemStyle: { color: '#ee6666', shadowBlur: 10, shadowColor: 'rgba(238,102,102,0.5)' } },
          { name: '记录成长', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
          { name: '自我表达', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
          { name: '亲子陪伴', symbolSize: 38, itemStyle: { color: '#5cb87a' } },
          { name: '经济压力', symbolSize: 38, itemStyle: { color: '#e67e7e' } },
          { name: '平台机制', symbolSize: 38, itemStyle: { color: '#e67e7e' } },
          { name: 'MCN影响', symbolSize: 38, itemStyle: { color: '#e67e7e' } }
        ],
        edges: [
          { source: '晒娃动机', target: '家长心理' },
          { source: '晒娃动机', target: '儿童意愿' },
          { source: '晒娃动机', target: '社会压力' },
          { source: '家长心理', target: '记录成长' },
          { source: '家长心理', target: '自我表达' },
          { source: '家长心理', target: '亲子陪伴' },
          { source: '社会压力', target: '经济压力' },
          { source: '社会压力', target: '平台机制' },
          { source: '社会压力', target: 'MCN影响' }
        ]
      }]
    })
  })

  // 资源清理和性能优化
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  costMapChart?.dispose?.(); costMapChart = null
  mcnSignupChart?.dispose?.(); mcnSignupChart = null
  if (mcnPenaltyTimer) { clearInterval(mcnPenaltyTimer); mcnPenaltyTimer = null }
  if (likeTimer) { clearInterval(likeTimer); likeTimer = null }

  // 清理所有图表实例
  ;[chart1, chartPhoneUsers, chart2, chart3, chart4, chart5, chart6, chart7, chart8,
    chartAudienceAge, chartAudienceGender, chartAudienceRegion, chartWordCloud, chartMindMap]
    .forEach(r => {
      if (r?.value) {
        const inst = echarts.getInstanceByDom(r.value)
        if (inst) {
          inst.dispose()
        }
      }
    })

  // 执行所有清理函数
  cleanupFns.forEach(fn => {
    try { fn() } catch (e) {
      console.warn('Cleanup error:', e)
    }
  })

  // 清理动态添加的样式
  document.querySelectorAll('style[data-dynamic]').forEach(s => s.remove())
})
</script>
<style scoped>
.rechildhood-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  overflow-x: hidden;
}

/* 粒子背景 */
.particle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.intro-section {
  position: relative;
  overflow: hidden;
}

.intro-section>* {
  position: relative;
  z-index: 1;
}

/* 磁性悬停效果 */
.magnetic-item {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

/* 渐显动画 */
.reveal-item {
  opacity: 0;
  transform: translateY(60px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-item.reveal-active {
  opacity: 1;
  transform: translateY(0) scale(1);
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
  position: relative;
}

.screen-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1), transparent 60%);
  pointer-events: none;
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
  transform: translateY(-50px) scale(0) rotate(-180deg);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.opening-text .char.char-show {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
  animation: charGlow 3s ease-in-out infinite 0.6s;
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

@keyframes titleGlow {

  0%,
  100% {
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.15);
  }

  50% {
    text-shadow: 0 0 24px rgba(118, 75, 162, 0.25), 0 0 36px rgba(240, 147, 251, 0.18);
  }
}

@keyframes metricPulse {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(243, 156, 18, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(243, 156, 18, 0.5));
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
  padding: 0 40px;
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
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4),
    0 0 0 2px rgba(102, 126, 234, 0.15) inset;
  animation: navGlow 2s ease-in-out infinite;
}

@keyframes navGlow {

  0%,
  100% {
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4),
      0 0 0 2px rgba(102, 126, 234, 0.15) inset;
  }

  50% {
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6),
      0 0 0 2px rgba(102, 126, 234, 0.3) inset;
  }
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
  min-height: auto;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.section.fullscreen {
  min-height: 100vh;
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
  animation: titleGlow 6s ease-in-out infinite;
}

.section-title {
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #34495e;
  animation: titleGlow 8s ease-in-out infinite;
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
  margin: 20px auto;
  max-width: 800px;
  line-height: 1.6;
  padding: 0 20px;
}

.data-note {
  font-size: 0.95rem;
  color: #555;
}

.data-note.small {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
  background: rgba(102, 126, 234, 0.05);
  padding: 20px 25px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin: 30px auto;
}

.data-note.emerge {
  opacity: 1 !important;
  animation: noteSlideIn 0.6s ease-out;
}

@keyframes noteSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.video-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  filter: blur(20px);
  transition: opacity 0.5s;
}

.video-card:hover .card-glow {
  opacity: 0.6;
  animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.floating-card {
  animation: cardFloat 6s ease-in-out infinite;
}

.floating-card:nth-child(2) {
  animation-delay: -3s;
}

@keyframes cardFloat {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
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
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
}

.choice-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(-50%, -50%);
  z-index: 0;
}

.choice-btn::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #3498db, #2980b9, #3498db);
  border-radius: 50px;
  opacity: 0;
  z-index: -1;
  filter: blur(10px);
  background-size: 200% 200%;
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

.choice-btn:hover::before {
  width: 400px;
  height: 400px;
}

.choice-btn:hover::after {
  opacity: 0.8;
}

.choice-btn:hover {
  color: white;
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 15px 40px rgba(52, 152, 219, 0.5);
  border-color: transparent;
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
  animation: metricPulse 4s ease-in-out infinite;
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
  animation: metricPulse 4s ease-in-out infinite;
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

.step-badge {
  position: absolute;
  top: -14px;
  left: -14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.35);
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

.timeline-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.timeline-image:hover {
  transform: scale(1.05);
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

.anim-reveal {
  opacity: 0;
  transform: translateY(12px);
}

.anim-reveal.anim-show {
  opacity: 1;
  transform: translateY(0);
  transition: all .6s ease;
}

/* 皮亚杰理论阶段 */
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.example-image-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  height: 400px;
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

.circle-interaction {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 50px auto;
}

.network-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.net-line {
  stroke: rgba(102, 126, 234, .4);
  stroke-width: 2;
  stroke-dasharray: 5 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, .1));
  transition: stroke .2s ease, stroke-width .2s ease;
  animation: lineDash 1.5s linear infinite;
}

@keyframes lineDash {
  to {
    stroke-dashoffset: -10;
  }
}

.net-line.highlight {
  stroke: #667eea;
  stroke-width: 3;
  stroke-dasharray: 0;
  filter: drop-shadow(0 0 8px #667eea);
  animation: none;
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

.role-item::before {
  content: attr(data-tip);
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.role-item::after {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}

.role-item:hover::before,
.role-item:hover::after {
  transform: translateX(-50%) scale(1);
  opacity: 1;
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

.jar.pulse {
  box-shadow: 0 0 0 0 rgba(255, 255, 255, .6);
  animation: jarPulse 0.6s ease;
}

@keyframes jarPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, .6)
  }

  100% {
    box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0)
  }
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.add-candy-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.add-candy-btn:active::before {
  width: 300px;
  height: 300px;
}

.add-candy-btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.add-candy-btn:active {
  transform: scale(0.98);
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  75% {
    transform: translateX(10px);
  }
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

.jar-full-msg {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  animation: jarFullGlow 2s ease-in-out infinite;
}

@keyframes jarFullGlow {

  0%,
  100% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }

  50% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.6);
  }
}

.first-video-anim {
  width: 100%;
  margin: 20px 0;
}

.first-video-anim .video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background: #000;
}

.timeline-video-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 1s ease;
}

.first-video-anim.run .timeline-video-img {
  opacity: 0.3;
}

.like-counter {
  position: absolute;
  right: 14px;
  top: 14px;
  color: #fff;
  font-weight: 800;
  background: rgba(0, 0, 0, .5);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .3);
  z-index: 20;
  transition: all 0.3s ease;
}

.first-video-anim.run .like-counter {
  background: rgba(255, 20, 147, 0.9);
  animation: counterPulse 0.5s ease infinite;
}

@keyframes counterPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.first-video-anim .hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.first-video-anim .heart {
  position: absolute;
  right: -50px;
  bottom: 20px;
  font-size: 20px;
  opacity: 0;
}

.first-video-anim.run .heart {
  animation: heartRise 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.first-video-anim.run .heart:nth-child(odd) {
  animation-delay: 0s;
}

.first-video-anim.run .heart:nth-child(even) {
  animation-delay: 0.1s;
}

.first-video-anim.run .heart:nth-child(3n) {
  animation-delay: 0.2s;
}

.first-video-anim.run .heart:nth-child(4n) {
  animation-delay: 0.3s;
}

.first-video-anim.run .heart:nth-child(5n) {
  animation-delay: 0.4s;
}


.first-video-anim.run .heart:nth-child(1) {
  animation-delay: 0s;
}

.first-video-anim.run .heart:nth-child(2) {
  animation-delay: 0.1s;
}

.first-video-anim.run .heart:nth-child(3) {
  animation-delay: 0.15s;
}

.first-video-anim.run .heart:nth-child(4) {
  animation-delay: 0.2s;
}

.first-video-anim.run .heart:nth-child(5) {
  animation-delay: 0.25s;
}

.first-video-anim.run .heart:nth-child(6) {
  animation-delay: 0.3s;
}

.first-video-anim.run .heart:nth-child(7) {
  animation-delay: 0.35s;
}

.first-video-anim.run .heart:nth-child(8) {
  animation-delay: 0.4s;
}

.first-video-anim.run .heart:nth-child(9) {
  animation-delay: 0.45s;
}

.first-video-anim.run .heart:nth-child(10) {
  animation-delay: 0.5s;
}


@keyframes heartRise {
  0% {
    right: -50px;
    bottom: 20px;
    transform: scale(0.5) rotate(0deg);
    opacity: 0;
  }

  10% {
    right: 30px;
    opacity: 1;
  }

  20% {
    right: 50%;
    bottom: 30%;
    transform: scale(1.5) rotate(15deg);
  }

  40% {
    right: 45%;
    bottom: 40%;
    transform: scale(2.5) rotate(30deg);
    opacity: 1;
  }

  60% {
    right: 40%;
    bottom: 50%;
    transform: scale(4) rotate(45deg);
    opacity: 0.9;
  }

  80% {
    right: 35%;
    bottom: 55%;
    transform: scale(6) rotate(60deg);
    opacity: 0.7;
  }

  100% {
    right: 30%;
    bottom: 60%;
    transform: scale(8) rotate(90deg);
    opacity: 0;
  }
}

.first-video-anim .money {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  opacity: 0;
  color: #ffd700;
  text-shadow: 0 10px 30px rgba(0, 0, 0, .6);
  z-index: 15;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.first-video-anim .money.show {
  font-size: 8rem;
  opacity: 1;
  animation: moneyBounce 1s ease-in-out;
}

@keyframes moneyBounce {
  0% {
    transform: scale(0) rotate(-180deg);
  }

  50% {
    transform: scale(1.2) rotate(10deg);
  }

  70% {
    transform: scale(0.9) rotate(-5deg);
  }

  85% {
    transform: scale(1.05) rotate(2deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* 添加发光效果 */
.first-video-anim .money.show::after {
  content: '💰';
  position: absolute;
  font-size: 8rem;
  opacity: 0.3;
  filter: blur(20px);
  animation: moneyGlow 2s ease-in-out infinite;
}

@keyframes moneyGlow {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

.first-video-anim .video-tip {
  text-align: center;
  color: #7f8c8d;
  margin-top: 10px;
  font-size: 0.9rem;
  font-style: italic;
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

.tv-off-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  background: #fff;
  opacity: 0;
}

.screen-off.active .tv-off-bar {
  animation: tvOff 1.2s ease forwards;
}

@keyframes tvOff {
  0% {
    height: 100%;
    opacity: 0
  }

  30% {
    height: 6px;
    opacity: 1
  }

  60% {
    height: 2px;
    opacity: .8
  }

  100% {
    height: 0;
    opacity: 0
  }
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

/* 性能优化：减少动画复杂度 */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 回到顶部与重播按钮 */
.backtop {
  position: fixed;
  right: 20px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1100;
}

.restart-btn {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
}

/* 角色详情弹窗内容样式 */
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

.modal-body :deep(.penalty-list li.active .red-text) {
  transform: scale(1.2);
  transition: transform .3s ease;
  display: inline-block;
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

  /* 简化首条视频动画，减轻移动端性能负担 */
  .first-video-anim .heart {
    display: none;
  }

  .first-video-anim .money.show {
    font-size: 4rem;
  }

  .first-video-anim .money.show::after {
    font-size: 4rem;
  }

  .first-video-anim.run .money.show {
    animation: simplePulse 0.5s ease;
  }

  @keyframes simplePulse {

    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }
  }

  /* 优化模态框移动端显示 */
  .modal-content {
    max-height: 85vh;
    padding: 30px 20px;
    border-radius: 20px;
  }

  /* 简化网络连线动画 */
  .net-line {
    animation: none;
  }

  /* 角色提示卡在移动端隐藏，避免误触 */
  .role-item::before,
  .role-item::after {
    display: none;
  }

  .phone-notch {
    width: 130px;
    height: 20px;
  }

  .navbar {
    padding: 0 20px;
  }

  .nav-container {
    padding: 0 20px;
    height: 70px;
  }

  .nav-menu {
    position: fixed;
    top: 80px;
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
    border-radius: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .main-title {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .chart-container {
    width: 100%;
    height: 350px;
    padding: 15px;
  }

  .chart-container.large {
    height: 500px;
  }

  .time-options {
    gap: 15px;
  }

  .time-option {
    padding: 10px 20px;
    font-size: 1rem;
  }

  .video-examples {
    flex-direction: column;
    gap: 30px;
  }

  .video-card {
    max-width: 100%;
  }

  .choice-buttons {
    gap: 20px;
    flex-wrap: wrap;
  }

  .choice-btn {
    padding: 15px 40px;
    font-size: 1.1rem;
  }

  .concept-box {
    padding: 25px;
  }

  .concept-box h3 {
    font-size: 1.5rem;
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

  .step-badge {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }

  .piaget-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
  }

  .stage-figure {
    height: auto;
    min-height: 200px;
  }

  .stage-detail {
    width: 250px;
    padding: 15px;
  }

  .circle-interaction {
    width: 100%;
    max-width: 400px;
    height: 400px;
  }

  .center-child {
    width: 100px;
    height: 100px;
  }

  .center-child.shrink {
    width: 60px;
    height: 60px;
  }

  .child-icon {
    font-size: 3rem;
  }

  .center-child.shrink .child-icon {
    font-size: 1.5rem;
  }

  .role-item {
    width: 70px;
    height: 70px;
  }

  .role-avatar {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }

  .role-name {
    font-size: 0.8rem;
  }

  .audience-charts {
    grid-template-columns: 1fr;
  }

  .example-images {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }

  .example-image-card {
    height: 300px;
  }

  .impact-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .impact-card {
    padding: 25px;
  }

  .childlabor-types {
    grid-template-columns: 1fr;
  }

  .motivation-flow {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .expert-cards {
    grid-template-columns: 1fr;
  }

  .expert-card {
    padding: 25px;
  }

  .final-question {
    font-size: 1.5rem;
  }

  .jar {
    width: 250px;
    height: 350px;
  }

  .add-candy-btn {
    padding: 15px 35px;
    font-size: 1.1rem;
  }

  .final-message {
    font-size: 1.2rem;
  }

  /* 弹窗内容响应式 */
  .modal-body :deep(.sales-timeline) {
    height: 250px;
    padding: 20px 10px 40px;
  }

  .modal-body :deep(.sales-item .bar) {
    width: 90%;
  }

  .modal-body :deep(.cost-map-container) {
    padding: 20px;
  }

  .modal-body :deep(.child-silhouette) {
    width: 150px;
    height: 225px;
  }

  .modal-body :deep(.silhouette-value) {
    font-size: 2rem;
  }

  .modal-body :deep(.data-highlight .big) {
    font-size: 1.8rem;
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 15px;
    height: 65px;
  }

  .nav-brand {
    font-size: 1.3rem;
  }

  .brand-icon {
    font-size: 1.6rem;
  }

  .main-title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 1.3rem;
    margin-bottom: 30px;
  }

  .section {
    padding: 60px 15px;
  }

  .chart-container {
    height: 300px;
    padding: 10px;
  }

  .chart-container.large {
    height: 400px;
  }

  .time-option {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .choice-btn {
    padding: 12px 30px;
    font-size: 1rem;
  }

  .concept-box {
    padding: 20px;
  }

  .concept-box h3 {
    font-size: 1.3rem;
  }

  .concept-detail,
  .concept-explain {
    font-size: 1rem;
  }

  .highlight-box {
    padding: 20px;
    font-size: 1.1rem;
  }

  .highlight-num {
    font-size: 1.6rem;
  }

  .type-card {
    padding: 20px;
  }

  .type-card h3 {
    font-size: 1.3rem;
  }

  .stat-box {
    padding: 25px;
    font-size: 1rem;
  }

  .big-num {
    font-size: 2rem;
  }

  .timeline-item {
    margin: 30px 0;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-content h3 {
    font-size: 1.1rem;
  }

  .piaget-container {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 20px 10px;
  }

  .stage-detail {
    width: 200px;
    padding: 12px;
    font-size: 0.85rem;
  }

  .circle-interaction {
    max-width: 350px;
    height: 350px;
  }

  .center-child {
    width: 80px;
    height: 80px;
  }

  .center-child.shrink {
    width: 50px;
    height: 50px;
  }

  .child-icon {
    font-size: 2.5rem;
  }

  .center-child.shrink .child-icon {
    font-size: 1.2rem;
  }

  .role-item {
    width: 60px;
    height: 60px;
  }

  .role-avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .role-name {
    font-size: 0.7rem;
    margin-top: 5px;
  }

  .modal-content {
    padding: 25px 15px;
    border-radius: 15px;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    top: 15px;
    right: 15px;
  }

  .modal-body :deep(h3) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .modal-body :deep(p) {
    font-size: 1rem;
  }

  .modal-body :deep(.child-silhouette) {
    width: 120px;
    height: 180px;
  }

  .modal-body :deep(.child-silhouette::before) {
    font-size: 3rem;
  }

  .modal-body :deep(.silhouette-value) {
    font-size: 1.5rem;
  }

  .modal-body :deep(.cost-legend) {
    gap: 10px;
  }

  .modal-body :deep(.legend-item) {
    font-size: 0.8rem;
  }

  .modal-body :deep(.legend-color) {
    width: 20px;
    height: 12px;
  }

  .modal-body :deep(.data-highlight) {
    padding: 20px;
  }

  .modal-body :deep(.data-highlight .big) {
    font-size: 1.5rem;
  }

  .modal-body :deep(.formula-box) {
    padding: 20px;
  }

  .modal-body :deep(.formula) {
    font-size: 1rem;
  }

  .modal-body :deep(.sales-timeline) {
    height: 200px;
    padding: 15px 5px 35px;
  }

  .modal-body :deep(.sales-item .date) {
    font-size: 0.75rem;
  }

  .modal-body :deep(.model-header h5) {
    font-size: 1.1rem;
  }

  .modal-body :deep(.model-desc) {
    font-size: 0.85rem;
  }

  .modal-body :deep(.split-bar) {
    height: 40px;
  }

  .modal-body :deep(.creator-share),
  .modal-body :deep(.mcn-share) {
    font-size: 0.9rem;
  }

  .example-images {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .example-image-card {
    height: 250px;
  }

  .impact-card {
    padding: 20px;
  }

  .impact-number {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    top: -15px;
  }

  .impact-text {
    font-size: 1rem;
    padding-top: 15px;
  }

  .flow-left,
  .flow-right {
    padding: 25px;
  }

  .flow-left h3,
  .flow-right h3 {
    font-size: 1.5rem;
  }

  .flow-left li,
  .flow-right li {
    font-size: 1rem;
    padding-left: 25px;
  }

  .flow-result {
    font-size: 1rem;
    padding: 12px;
  }

  .expert-card {
    padding: 20px;
  }

  .expert-card h3 {
    font-size: 1.3rem;
  }

  .expert-title {
    font-size: 0.85rem;
  }

  .expert-advice {
    font-size: 0.95rem;
  }

  .final-question {
    font-size: 1.3rem;
    margin-bottom: 40px;
  }

  .jar {
    width: 200px;
    height: 280px;
    padding: 15px;
  }

  .jar::before {
    width: 100px;
    height: 25px;
  }

  .candy {
    font-size: 1.5rem;
  }

  .jar-label {
    font-size: 1.1rem;
    margin-top: 15px;
  }

  .add-candy-btn {
    padding: 12px 28px;
    font-size: 1rem;
  }

  .final-message {
    font-size: 1rem;
    margin-top: 40px;
  }

  .jar-full-msg {
    font-size: 1.4rem;
  }

  .backtop {
    width: 40px;
    height: 40px;
    right: 15px;
    bottom: 20px;
  }

  .restart-btn {
    bottom: 10vh;
    padding: 8px 14px;
    font-size: 0.9rem;
  }
}

/* 平板横屏优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-container {
    padding: 0 30px;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .chart-container {
    height: 450px;
  }

  .chart-container.large {
    height: 600px;
  }

  .timeline-content {
    width: 48%;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    margin-right: 52%;
  }

  .timeline-item:nth-child(even) .timeline-content {
    margin-left: 52%;
  }

  .circle-interaction {
    width: 500px;
    height: 500px;
  }

  .piaget-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .audience-charts {
    grid-template-columns: repeat(2, 1fr);
  }

  .example-images {
    grid-template-columns: repeat(2, 1fr);
  }

  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .motivation-flow {
    grid-template-columns: repeat(2, 1fr);
  }

  .expert-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .nav-container {
    max-width: 1600px;
    padding: 0 60px;
  }

  .main-title {
    font-size: 3.5rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .chart-container {
    max-width: 1100px;
    height: 550px;
  }

  .chart-container.large {
    height: 750px;
  }

  .timeline {
    max-width: 1000px;
  }

  .circle-interaction {
    width: 700px;
    height: 700px;
  }

  .center-child {
    width: 180px;
    height: 180px;
  }

  .child-icon {
    font-size: 5rem;
  }

  .role-item {
    width: 140px;
    height: 140px;
  }

  .role-avatar {
    width: 140px;
    height: 140px;
    font-size: 3.5rem;
  }

  .example-images {
    max-width: 1400px;
  }

  .impact-grid {
    max-width: 1400px;
  }

  .expert-cards {
    max-width: 1400px;
  }
}

/* 打印样式 */
@media print {

  .navbar,
  .nav-toggle,
  .backtop,
  .restart-btn,
  .add-candy-btn,
  .choice-buttons,
  .scroll-indicator {
    display: none !important;
  }

  .section {
    page-break-inside: avoid;
  }

  .chart-container {
    page-break-inside: avoid;
  }

  .modal-overlay {
    display: none !important;
  }
}
</style>