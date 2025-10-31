<template>
  <div class="rechildhood-container">
    <OpeningNavbarSection />

    <IntroSection />

    <ShortVideoSection />

    <DigitalLaborSection />

    <ChildrenSection />

    <ChildLaborIntroSection />

    <ChildLaborTrendSection />

    <InfluencerTimelineSection />

    <PiagetSection />

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

    <AudienceSection />


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

    <MotivationSection />

    <ExpertSection />

    <FinalInteractionSection />
  </div>
  <!-- 回到顶部按钮 -->
  <button v-show="showBackTop" class="backtop" @click="goTop">↑</button>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import AudienceSection from '@/components/sections/AudienceSection.vue'
import PiagetSection from '@/components/sections/PiagetSection.vue'
import ExpertSection from '@/components/sections/ExpertSection.vue'
import InfluencerTimelineSection from '@/components/sections/InfluencerTimelineSection.vue'
import MotivationSection from '@/components/sections/MotivationSection.vue'
import OpeningNavbarSection from '@/components/sections/OpeningNavbarSection.vue'
import IntroSection from '@/components/sections/IntroSection.vue'
import ShortVideoSection from '@/components/sections/ShortVideoSection.vue'
import DigitalLaborSection from '@/components/sections/DigitalLaborSection.vue'
import ChildrenSection from '@/components/sections/ChildrenSection.vue'
import ChildLaborIntroSection from '@/components/sections/ChildLaborIntroSection.vue'
import ChildLaborTrendSection from '@/components/sections/ChildLaborTrendSection.vue'
import FinalInteractionSection from '@/components/sections/FinalInteractionSection.vue'
const cleanupFns = []

// 图表引用
// moved to IntroSection
// moved to ShortVideoSection
// moved to ChildrenSection / ChildLaborTrendSection
// moved to AudienceSection
// moved to IntroSection
// moved to AudienceSection
// 模态内图表引用（运行时实例）
let costMapChart = null
let mcnSignupChart = null
let mcnPenaltyTimer = null

// 首条视频动画控制
const costRefImg = new URL('@/assets/images/9.png', import.meta.url).href

// moved to InfluencerTimelineSection

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

// moved to ExpertSection

// moved to FinalInteractionSection

// 开场动画和导航
const openingComplete = ref(false)
const showNav = ref(false)
const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('intro')
const scrollProgress = ref(0)

// moved to ShortVideoSection

// 开场动画控制
const phoneVisible = ref(false)
const textVisible = ref(false)
const indicatorVisible = ref(false)
const charVisible = ref([false, false, false, false, false, false, false, false, false])

// moved to AudienceSection

// 过渡动画控制
const isTransitioning = ref(false)
const transitionAnim = ref(null)
// 回到顶部
const showBackTop = ref(false)

// moved to PiagetSection

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
// moved to FinalInteractionSection

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
// moved to FinalInteractionSection

// 回到顶部
const goTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (_) {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}

// moved to ShortVideoSection

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

  // 底部息屏逻辑已迁移到 FinalInteractionSection
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
      drawNetworkLines()
      setupMagneticEffect()
      setupRevealAnimations()
      const onResizeThrottled = throttleFn(drawNetworkLines, 150)
      window.addEventListener('resize', onResizeThrottled)
      cleanupFns.push(() => window.removeEventListener('resize', onResizeThrottled))
    })
  })

  // 初始化所有图表
  const initCharts = () => {
    // moved chart1 & chartPhoneUsers to IntroSection

    // moved chart2 & chart3 to ShortVideoSection

    // moved chart4 to ChildrenSection

    // moved chart5 to ChildrenSection

    // moved chart6 to ChildrenSection

    // moved chart7 to ChildLaborTrendSection

    // moved chart8 to ChildLaborTrendSection

    // moved audience charts and wordcloud into AudienceSection
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

  // moved: example images transition & timeline animation handled in components

  // moved: chart3 init to ShortVideoSection


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
  // moved particles & parallax to IntroSection

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

  // moved to MotivationSection

  // 资源清理和性能优化
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  costMapChart?.dispose?.(); costMapChart = null
  mcnSignupChart?.dispose?.(); mcnSignupChart = null
  if (mcnPenaltyTimer) { clearInterval(mcnPenaltyTimer); mcnPenaltyTimer = null }
  // moved likeTimer usage to InfluencerTimelineSection

  // 清理所有图表实例
  ;[chartMindMap]
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
<style>
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

/* 皮亚杰理论样式已迁移到 PiagetSection.vue */

/* 观众分析部分样式已迁移到 AudienceSection.vue */

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

/* 专家建议样式已迁移到 ExpertSection.vue */

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

/* 屏幕背后的利益网络：增加作用域前缀，避免其它组件样式干扰 */
.interactive-section .circle-interaction {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 50px auto;
}

.interactive-section .network-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.interactive-section .net-line {
  stroke: rgba(102, 126, 234, .4);
  stroke-width: 2;
  stroke-dasharray: 5 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, .1));
  transition: stroke .2s ease, stroke-width .2s ease;
  animation: lineDash 1.5s linear infinite;
}

.interactive-section .net-line.highlight {
  stroke: #667eea;
  stroke-width: 3;
  stroke-dasharray: 0;
  filter: drop-shadow(0 0 8px #667eea);
  animation: none;
}

.interactive-section .center-child {
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

.interactive-section .center-child.shrink {
  width: 80px;
  height: 80px;
}

.interactive-section .child-icon {
  font-size: 4rem;
}

.interactive-section .center-child.shrink .child-icon {
  font-size: 2rem;
}

.interactive-section .roles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.interactive-section .role-item {
  position: absolute;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.interactive-section .role-item:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.interactive-section .role-item:nth-child(2) {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.interactive-section .role-item:nth-child(3) {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.interactive-section .role-item:nth-child(4) {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.interactive-section .role-avatar {
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

.interactive-section .role-item:hover .role-avatar,
.interactive-section .role-item.active .role-avatar {
  transform: scale(1.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.interactive-section .role-item::before {
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

.interactive-section .role-item::after {
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

.interactive-section .role-item:hover::before,
.interactive-section .role-item:hover::after {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

@media (max-width: 768px) {
  .interactive-section .circle-interaction {
    width: 100%;
    max-width: 400px;
    height: 400px;
  }

  .interactive-section .center-child {
    width: 100px;
    height: 100px;
  }

  .interactive-section .center-child.shrink {
    width: 60px;
    height: 60px;
  }

  .interactive-section .child-icon {
    font-size: 3rem;
  }

  .interactive-section .center-child.shrink .child-icon {
    font-size: 1.5rem;
  }

  .interactive-section .role-item {
    width: 70px;
    height: 70px;
  }

  .interactive-section .role-avatar {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }

  .interactive-section .role-name {
    font-size: 0.8rem;
  }
}

/* 角色详情弹窗内容样式 */
.modal-body h3 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid #667eea;
}

.modal-body p {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  margin-bottom: 20px;
}

/* 养育成本对比 */
.modal-body .cost-comparison {
  margin: 30px 0;
}

.modal-body .cost-item h4 {
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 20px;
}

.modal-body .cost-map-container {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.modal-body .child-silhouette {
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

.modal-body .child-silhouette::before {
  content: '👶';
  font-size: 4rem;
  position: absolute;
  top: 30px;
  opacity: 0.3;
}

.modal-body .silhouette-value {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.modal-body .map-note {
  font-size: 1rem;
  color: #666;
  text-align: center;
  font-style: italic;
}

.modal-body .cost-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
}

.modal-body .legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
}

.modal-body .legend-color {
  width: 30px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-body .data-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.modal-body .data-highlight .big {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-body .formula-box {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  border-left: 6px solid #3498db;
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.1);
}

.modal-body .formula {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

.modal-body .warning {
  color: #e74c3c;
  font-weight: 700;
  margin-top: 25px;
  font-size: 1.1rem;
}

.modal-body ul {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

.modal-body li {
  padding: 12px 0 12px 35px;
  position: relative;
  font-size: 1.05rem;
  line-height: 1.7;
}

.modal-body li::before {
  content: '●';
  position: absolute;
  left: 10px;
  color: #3498db;
  font-weight: bold;
  font-size: 1.2rem;
}

.modal-body .insight-box {
  background: linear-gradient(135deg, #e8f5e9 0%, #d4edda 100%);
  padding: 25px;
  border-radius: 15px;
  margin: 25px 0;
  border-left: 5px solid #27ae60;
  box-shadow: 0 5px 15px rgba(39, 174, 96, 0.1);
}

.modal-body .penalty-box {
  background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
  padding: 30px;
  border-radius: 20px;
  margin: 30px 0;
  border-left: 6px solid #f39c12;
  box-shadow: 0 5px 20px rgba(243, 156, 18, 0.15);
}

.modal-body .penalty-box h4 {
  color: #e74c3c;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 800;
}

.modal-body .penalty-list {
  list-style: none;
  padding-left: 0;
}

.modal-body .penalty-list li {
  padding: 15px 0 15px 40px;
  position: relative;
  font-size: 1.05rem;
  line-height: 1.7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-body .penalty-list li.active .red-text {
  transform: scale(1.2);
  transition: transform .3s ease;
  display: inline-block;
}

.modal-body .penalty-list li:last-child {
  border-bottom: none;
}

.modal-body .penalty-list li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
  font-size: 1.3rem;
}

.modal-body .red-text {
  color: #e74c3c;
  font-weight: 900;
  font-size: 1.3rem;
  text-shadow: 0 1px 3px rgba(231, 76, 60, 0.2);
}

/* 销售额时间线图表 */
.modal-body .sales-timeline {
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

.modal-body .sales-timeline::before {
  content: '销售额';
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
}

.modal-body .sales-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.modal-body .sales-item:hover {
  transform: translateY(-10px);
}

.modal-body .sales-item .bar {
  width: 80%;
  background: linear-gradient(to top, #667eea 0%, #764ba2 100%);
  border-radius: 10px 10px 0 0;
  transition: all 0.3s;
  box-shadow: 0 -5px 15px rgba(102, 126, 234, 0.3);
  min-height: 20px;
}

.modal-body .sales-item:hover .bar {
  background: linear-gradient(to top, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 -10px 25px rgba(245, 87, 108, 0.5);
}

.modal-body .sales-item .date {
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.modal-body .sales-tooltip {
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

.modal-body .sales-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: white;
}

.modal-body .sales-item:hover .sales-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-20px);
}

.modal-body .sales-tooltip p {
  margin: 4px 0;
  font-size: 0.9rem;
}

/* MCN分成图表 */
.modal-body .mcn-revenue-chart {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 30px 0;
}

.modal-body .revenue-model {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.modal-body .revenue-model:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.modal-body .model-header {
  padding: 20px 25px;
  color: white;
}

.modal-body .model-header h5 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.modal-body .model-desc {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.modal-body .revenue-split {
  padding: 25px;
  background: #f8f9fa;
}

.modal-body .split-bar {
  display: flex;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modal-body .creator-share,
.modal-body .mcn-share {
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
.modal-content:not(.animate) .creator-share,
.modal-content:not(.animate) .mcn-share {
  transform: scaleX(0);
  transform-origin: left center;
}

.modal-content.animate .creator-share,
.modal-content.animate .mcn-share {
  transform: scaleX(1);
  transition: transform .6s ease;
}

.modal-body .revenue-model:hover .creator-share,
.modal-body .revenue-model:hover .mcn-share {
  filter: brightness(1.1);
}

/* 移动端优化：角色弹窗与图表高度 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 12px;
  }

  .modal-content {
    padding: 28px 18px;
    border-radius: 20px;
    max-height: 88vh;
  }

  .modal-body h3 {
    font-size: 1.4rem;
  }

  /* 覆盖内联高度，适配小屏 */
  #costMap {
    height: 320px !important;
  }

  #mcnSignupChart {
    height: 260px !important;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-content {
    padding: 22px 12px;
    border-radius: 16px;
    max-height: 86vh;
  }

  .modal-body h3 {
    font-size: 1.2rem;
  }

  #costMap {
    height: 260px !important;
  }

  #mcnSignupChart {
    height: 220px !important;
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
  .modal-body .sales-timeline {
    height: 250px;
    padding: 20px 10px 40px;
  }

  .modal-body .sales-item .bar {
    width: 90%;
  }

  .modal-body .cost-map-container {
    padding: 20px;
  }

  .modal-body .child-silhouette {
    width: 150px;
    height: 225px;
  }

  .modal-body .silhouette-value {
    font-size: 2rem;
  }

  .modal-body .data-highlight .big {
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

  .modal-body h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .modal-body p {
    font-size: 1rem;
  }

  .modal-body .child-silhouette {
    width: 120px;
    height: 180px;
  }

  .modal-body .child-silhouette::before {
    font-size: 3rem;
  }

  .modal-body .silhouette-value {
    font-size: 1.5rem;
  }

  .modal-body .cost-legend {
    gap: 10px;
  }

  .modal-body .legend-item {
    font-size: 0.8rem;
  }

  .modal-body .legend-color {
    width: 20px;
    height: 12px;
  }

  .modal-body .data-highlight {
    padding: 20px;
  }

  .modal-body .data-highlight .big {
    font-size: 1.5rem;
  }

  .modal-body .formula-box {
    padding: 20px;
  }

  .modal-body .formula {
    font-size: 1rem;
  }

  .modal-body .sales-timeline {
    height: 200px;
    padding: 15px 5px 35px;
  }

  .modal-body .sales-item .date {
    font-size: 0.75rem;
  }

  .modal-body .model-header h5 {
    font-size: 1.1rem;
  }

  .modal-body .model-desc {
    font-size: 0.85rem;
  }

  .modal-body .split-bar {
    height: 40px;
  }

  .modal-body .creator-share,
  .modal-body .mcn-share {
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