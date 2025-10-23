<template>
  <div class="digital-child-labor" :class="{ dark: darkMode }">
    <!-- 导航栏 -->
    <nav class="nav-bar" :class="{ 'nav-visible': showNav }">
      <div class="nav-content">
        <div class="nav-logo">屏幕里的童年</div>
        <div class="nav-links">
          <a v-for="(chapter, index) in chapters" :key="index" :href="`#chapter${index + 1}`" class="nav-link"
            :class="{ active: currentChapter === index }" @click.prevent="scrollToChapter(index)">
            {{ chapter }}
          </a>
        </div>
        <div class="nav-actions">
          <button class="mode-btn" @click="toggleDark">{{ darkMode ? '标准模式' : '暗黑模式' }}</button>
        </div>
        <div class="nav-progress">
          <div class="progress-bar" :style="{ width: scrollProgress + '%' }">
          </div>
        </div>
      </div>
    </nav>

    <!-- 开场 -->
    <section class="section opening-section" id="chapter0">
      <div class="phone-screen">
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
            你好，<br>屏幕里的童年
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>向下滚动开始</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>

    <!-- 第一章 -->
    <section class="section" id="chapter1" ref="section1">
      <h1 class="gradient-text fade-in-up">第一章 你好，屏幕里的童年</h1>

      <div class="glass-card slide-in">
        <div class="question">你每天有多少时间在和小小的手机屏幕接触？</div>
        <div class="time-options">
          <div v-for="(time, index) in timeOptions" :key="index" class="time-option"
            :class="{ selected: selectedTime === time }" :style="{ animationDelay: index * 0.1 + 's' }"
            @click="selectTime(time)">
            {{ time }}
          </div>
        </div>
      </div>

      <transition name="chart-fade">
        <div v-if="showChart1" class="chart-container">
          <div class="chart-title">全民屏幕使用时长分布</div>
          <canvas ref="chart1"></canvas>
          <div class="chart-note">你的位置已标记</div>
        </div>
      </transition>
    </section>

    <!-- 社交媒体 -->
    <section class="section" ref="section2">
      <div class="glass-card slide-in">
        <div class="question">你每天有多少时间是在和社交媒体平台度过？</div>
        <div class="time-options">
          <div v-for="(time, index) in socialOptions" :key="index" class="time-option"
            :class="{ selected: selectedSocial === time }" :style="{ animationDelay: index * 0.1 + 's' }"
            @click="selectSocial(time)">
            {{ time }}
          </div>
        </div>
      </div>

      <transition name="chart-fade">
        <div v-if="showChart2" class="chart-container platform-chart">
          <div class="data-highlight pulse">日活跃用户</div>
          <div class="platform-stats">
            <div class="platform-item" v-for="(platform, index) in platforms" :key="index"
              :style="{ animationDelay: index * 0.2 + 's' }">
              <div class="platform-icon">{{ platform.icon }}</div>
              <div class="platform-name">{{ platform.name }}</div>
              <div class="platform-users">{{ platform.users }}</div>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- 视频类型 -->
    <section class="section" ref="section3">
      <div class="question-big fade-in">这样的视频有在你的推荐列表吗？</div>
      <div class="image-grid">
        <div class="image-placeholder hover-lift" v-for="(type, index) in videoTypes" :key="index"
          :style="{ animationDelay: index * 0.15 + 's' }">
          <div class="video-icon">{{ type.icon }}</div>
          <div class="video-label">{{ type.label }}</div>
        </div>
      </div>

      <div class="stats-container">
        <div class="stat-card grow-in">
          <div class="stat-number">217%</div>
          <div class="stat-label">4-12岁网红账号年增长率</div>
        </div>
        <div class="stat-card grow-in" style="animation-delay: 0.2s;">
          <div class="stat-number">1.96亿</div>
          <div class="stat-label">未成年网民规模</div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">儿童账号数量增长趋势</div>
        <canvas ref="chartGrowth" data-chart-type="growth"></canvas>
      </div>
    </section>

    <!-- 警示 -->
    <section class="section warning-section" ref="section4">
      <div class="alert-text scale-in">
        <div class="alert-icon">⚠️</div>
        当你在刷手机时<br>真的是在进行纯粹的娱乐吗？<br><br>
        <span class="highlight-text">你有没有想过屏幕那头的儿童<br>
          或许在进行另一种看不见的劳动</span>
      </div>
    </section>

    <!-- 数字劳工定义 with 饼图动画 -->
    <section class="section definition-section" ref="section5">
      <div class="definition-container">
        <div class="definition-title fade-in-up">什么是数字劳工？</div>

        <div class="definition-content">
          <p class="fade-in-up" style="animation-delay: 0.2s;">
            数字劳工是电子媒介生存、使用以及应用这样集体劳动力中的一部分，他们不是一个确定的职业，他们服务的产业定义了他们，在这个产业中，他们受资本的剥削。
          </p>
          <p class="fade-in-up" style="animation-delay: 0.4s;">
            简单来说就是在互联网世界里，为平台创造价值却可能得不到相应报酬的"隐形打工人"。
          </p>
        </div>

        <!-- 用户年龄分布饼图 -->
        <div class="pie-chart-container" ref="pieContainer">
          <div class="chart-title">短视频用户年龄分布</div>
          <canvas ref="pieChart" data-chart-type="pie"></canvas>
        </div>

        <p class="definition-highlight fade-in-up">
          在平台上还有一个特殊群体更值得关注<br>
          那就是<span class="emphasize">儿童群体</span>
        </p>
      </div>
    </section>

    <!-- 未成年数据 -->
    <section class="section data-section" ref="section6">
      <div class="data-showcase">
        <div class="data-item pulse" style="animation-delay: 0s;">
          <div class="data-number">1.96亿</div>
          <div class="data-desc">未成年网民规模</div>
        </div>
        <div class="data-item pulse" style="animation-delay: 0.2s;">
          <div class="data-number">97.3%</div>
          <div class="data-desc">未成年人互联网普及率</div>
        </div>
        <div class="data-item pulse" style="animation-delay: 0.4s;">
          <div class="data-number">83%</div>
          <div class="data-desc">青少年最喜爱看视频</div>
        </div>
      </div>

      <div class="screen-time-info">
        <div class="info-card slide-in-left">
          <div class="age-group">12岁以下</div>
          <div class="time-value">5小时/天</div>
          <div class="time-label">平均屏幕时间</div>
        </div>
        <div class="info-card slide-in-right">
          <div class="age-group">13岁以上</div>
          <div class="time-value">7.5小时/天</div>
          <div class="time-label">平均屏幕时间</div>
        </div>
      </div>

      <div class="child-types">
        <div class="type-title fade-in-up">儿童数字劳工的类型</div>
        <div class="types-grid">
          <div class="type-card" v-for="(type, index) in childTypes" :key="index"
            :style="{ animationDelay: index * 0.15 + 's' }">
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-name">{{ type.name }}</div>
            <div class="type-desc">{{ type.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 时间轴 -->
    <section class="section timeline-section" ref="section7">
      <h2 class="gradient-text fade-in-up">一个网红儿童的诞生</h2>
      <div class="timeline-subtitle">童年与商业化的交织</div>

      <div class="timeline-container">
        <div class="timeline-line"></div>

        <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-event"
          :class="[event.side, { visible: event.visible }]" :ref="el => setTimelineRef(el, index)">
          <div class="timeline-dot" :style="{ top: (index * 20) + '%' }"></div>
          <div class="timeline-content">
            <div class="event-badge" :class="event.typeClass">
              <span class="event-icon">{{ event.icon }}</span>
            </div>
            <div class="event-title">{{ event.title }}</div>
            <div class="event-type" :class="event.typeClass">{{ event.desc }}
            </div>
            <div class="event-detail">{{ event.detail }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 经济数据 -->
    <section class="section economic-section" ref="section8">
      <div class="economic-title fade-in-up">经济压力与捷径</div>
      <div class="economic-comparison">
        <div class="comparison-item grow-in">
          <div class="comparison-label">养育成本</div>
          <div class="comparison-value">53.8万元</div>
          <div class="comparison-note">0-17岁平均</div>
        </div>
        <div class="comparison-vs">VS</div>
        <div class="comparison-item grow-in" style="animation-delay: 0.3s;">
          <div class="comparison-label">儿童博主月收入</div>
          <div class="comparison-value">85万元</div>
          <div class="comparison-note">头部账号平均</div>
        </div>
      </div>
    </section>

    <!-- 心形到金钱 -->
    <section class="section heart-section" ref="section9">
      <div class="heart-animation-container">
        <div class="heart-container" :class="{ 'heart-pulse': !heartToMoney, 'transform-money': heartToMoney }">
          <transition name="emoji-change" mode="out-in">
            <span :key="heartToMoney">{{ heartToMoney ? '💰' : '❤️' }}</span>
          </transition>
        </div>
      </div>
      <div class="heart-text fade-in">
        <p>当点赞可以换成钱</p>
        <p class="heart-highlight">会发生什么？</p>
      </div>
      <div class="heart-description">
        当"养娃"变成"养号"<br>
        爱就开始有了回报率
      </div>
    </section>

    <!-- 第二章 -->
    <section class="section" id="chapter2" ref="section10">
      <h1 class="gradient-text fade-in-up">
        第二章 童工并未消失<br>而是披上了数字的外衣
      </h1>

      <div class="chapter-intro fade-in">
        <p>自2000年以来，全球童工总数下降了约1亿，降幅近半。</p>
        <p>中国关于禁止使用童工的法律制度在2000年后经历了重要的完善。</p>
        <p class="intro-highlight">然而，传统童工数量大幅下降的同时，<br>新型童工——数字童工开始显现</p>
      </div>

      <div class="dual-chart-container">
        <div class="chart-wrapper fade-in-left">
          <div class="chart-label">传统童工 ↓</div>
          <canvas ref="chartTraditional" data-chart-type="traditional"></canvas>
        </div>
        <div class="chart-wrapper fade-in-right">
          <div class="chart-label chart-label-rise">数字童工 ↑</div>
          <canvas ref="chartDigital" data-chart-type="digital"></canvas>
        </div>
      </div>
    </section>

    <!-- 地图分布 -->
    <section class="section map-section" ref="section11">
      <div class="section-title fade-in-up">儿童在哪里？</div>

      <div class="distribution-comparison">
        <div class="dist-card grow-in">
          <div class="dist-title">村镇儿童</div>
          <div class="dist-percentage">82.3%</div>
          <div class="dist-label">过早接触短视频/直播</div>
        </div>
        <div class="dist-card grow-in" style="animation-delay: 0.2s;">
          <div class="dist-title">城市儿童</div>
          <div class="dist-percentage">51.6%</div>
          <div class="dist-label">过早接触短视频/直播</div>
        </div>
      </div>

      <div class="growth-comparison">
        <div class="growth-item slide-in-left">
          <div class="city-tier">三线城市</div>
          <div class="growth-rate">145%</div>
          <div class="growth-label">账号增长率</div>
        </div>
        <div class="growth-item slide-in-right">
          <div class="city-tier">一线城市</div>
          <div class="growth-rate">67%</div>
          <div class="growth-label">账号增长率</div>
        </div>
      </div>
    </section>

    <!-- 谁在制作 -->
    <section class="section production-section" ref="section12">
      <div class="section-title fade-in-up">谁在制作内容？</div>

      <div class="production-chain">
        <div class="chain-item" v-for="(item, index) in productionChain" :key="index"
          :style="{ animationDelay: index * 0.2 + 's' }">
          <div class="chain-icon">{{ item.icon }}</div>
          <div class="chain-name">{{ item.name }}</div>
          <div class="chain-role">{{ item.role }}</div>
        </div>
        <div class="chain-arrows"></div>
      </div>

      <div class="stats-grid">
        <div class="stat-block grow-in">
          <div class="stat-value">34%</div>
          <div class="stat-text">家长承认曾强迫孩子配合拍摄</div>
        </div>
        <div class="stat-block grow-in" style="animation-delay: 0.2s;">
          <div class="stat-value">40%</div>
          <div class="stat-text">百万粉丝账号签约MCN机构</div>
        </div>
      </div>

      <div class="mcn-formula">
        <div class="formula-title fade-in">MCN爆款公式</div>
        <div class="formula-content">
          <span class="formula-part">萌娃 40%</span>
          <span class="formula-plus">+</span>
          <span class="formula-part">冲突剧情 30%</span>
          <span class="formula-plus">+</span>
          <span class="formula-part">商品植入 30%</span>
          <span class="formula-equals">=</span>
          <span class="formula-result">爆款</span>
        </div>
      </div>
    </section>

    <!-- 谁在观看 -->
    <section class="section audience-section" ref="section13">
      <div class="section-title fade-in-up">谁在观看？</div>

      <div class="audience-groups">
        <div class="audience-card slide-in-left">
          <div class="audience-type">云养娃主力军</div>
          <div class="audience-demo">18-23岁年轻女性</div>
          <div class="audience-note">通过视频获得情感慰藉</div>
        </div>
        <div class="audience-card slide-in-right">
          <div class="audience-type">消费主力军</div>
          <div class="audience-demo">31-40岁家长</div>
          <div class="audience-note">女性占比超过65%</div>
        </div>
      </div>
    </section>

    <!-- 第三章 -->
    <section class="section" id="chapter3" ref="section14">
      <h1 class="gradient-text fade-in-up">第三章 动机溯源<br>爱与利益的罗生门</h1>

      <div class="motivation-text fade-in">
        很多账号最初可能确实是出于分享和记录的目的。<br>
        然而，一旦流量涌入，MCN机构伸出橄榄枝，商业合作接踵而至，<br>
        最初的"爱"就可能被<span class="emphasize">异化</span>。
      </div>
    </section>

    <!-- 环形结构 -->
    <section class="section circle-section" ref="section15">
      <h2 class="section-title fade-in-up">围绕孩子的四种力量</h2>

      <div class="circle-structure" :class="{ 'all-viewed': viewedPerspectives.length === 4 }">
        <div class="center-child pulse">
          <span>👶</span>
          <div class="child-label">孩子</div>
        </div>

        <div v-for="item in perspectives" :key="item.type" class="perspective-item"
          :class="[item.position, { viewed: viewedPerspectives.includes(item.type) }]"
          @click="openPerspective(item.type)">
          <div class="perspective-icon">{{ item.icon }}</div>
          <div class="perspective-label">{{ item.label }}</div>
          <div class="perspective-hint">点击查看</div>
        </div>

        <!-- 连接线 -->
        <svg class="connection-lines" viewBox="0 0 500 500">
          <line x1="250" y1="250" x2="250" y2="40" class="connect-line" />
          <line x1="250" y1="250" x2="460" y2="250" class="connect-line" />
          <line x1="250" y1="250" x2="250" y2="460" class="connect-line" />
          <line x1="250" y1="250" x2="40" y2="250" class="connect-line" />
        </svg>
      </div>

      <p class="view-progress" v-if="viewedPerspectives.length > 0">
        已查看 {{ viewedPerspectives.length }}/4 个视角
      </p>
    </section>

    <!-- 弹窗 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="perspectiveOpen" class="modal-overlay" @click="closePerspective">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closePerspective">×</button>

            <div v-if="perspectiveOpen === 'parents'" class="modal-inner">
              <div class="modal-icon">👨‍👩‍👧</div>
              <h3 class="modal-title">父母视角</h3>
              <div class="modal-stat">34%</div>
              <p class="modal-text">
                的家长承认曾强迫孩子配合拍摄<br><br>
                <span class="modal-quote">"他们说这只是温情的陪伴<br>
                  可陪伴我的其实是冷冰冰的镜头"</span>
              </p>
            </div>

            <div v-if="perspectiveOpen === 'mcn'" class="modal-inner">
              <div class="modal-icon">🏢</div>
              <h3 class="modal-title">MCN机构视角</h3>
              <div class="modal-flow">
                剧本 → 包装 → 带货 → 涨粉 → 循环
              </div>
              <p class="modal-text">
                <span class="modal-quote">"他们不培养孩子<br>他们孵化账号"</span><br><br>
                提供从人设定位、剧本编写到拍摄剪辑、商业变现的全套服务
              </p>
            </div>

            <div v-if="perspectiveOpen === 'algorithm'" class="modal-inner">
              <div class="modal-icon">🤖</div>
              <h3 class="modal-title">算法视角</h3>
              <div class="algorithm-visual">
                <div class="algo-arrow">热度 ↑</div>
                <div class="algo-target">萌娃内容</div>
              </div>
              <p class="modal-text">
                平台推流机制偏好萌娃类内容<br>
                平均流量是普通内容的3-5倍<br><br>
                <span class="modal-quote">"算法没有偏好<br>它只想放大你想看的"</span>
              </p>
            </div>

            <div v-if="perspectiveOpen === 'audience'" class="modal-inner">
              <div class="modal-icon">👥</div>
              <h3 class="modal-title">观众视角</h3>
              <div class="audience-breakdown">
                <div class="breakdown-item">18-23岁年轻女性 (云养娃)</div>
                <div class="breakdown-item">31-40岁家长 (消费者)</div>
              </div>
              <p class="modal-text">
                <span class="modal-quote">"他们不是在看娃<br>
                  是在看自己失去的纯真"</span><br><br>
                每一次点赞、评论、打赏<br>都在强化这条产业链
              </p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- 第四章 -->
    <section class="section" id="chapter4" ref="section16">
      <h1 class="gradient-text fade-in-up">第四章 被剥削的童年</h1>

      <div class="impact-grid">
        <div class="impact-card grow-in" v-for="(impact, index) in impacts" :key="index"
          :style="{ animationDelay: index * 0.15 + 's' }">
          <div class="impact-icon">{{ impact.icon }}</div>
          <div class="impact-stat">{{ impact.stat }}</div>
          <div class="impact-desc">{{ impact.desc }}</div>
        </div>
      </div>

      <div class="case-highlight">
        <div class="case-icon">⚠️</div>
        <div class="case-title">典型案例</div>
        <div class="case-content">
          3岁"吃播"女童体重被喂至<span class="case-number">70斤</span><br>
          过早暴露于商业直播的儿童：<br>
          <span class="case-number">68%</span> 存在注意力缺陷<br>
          <span class="case-number">52%</span> 对镜头产生病态依赖
        </div>
      </div>
    </section>

    <!-- 第五章 -->
    <section class="section" id="chapter5" ref="section17">
      <h1 class="gradient-text fade-in-up">
        第五章 如何划定边界<br>把童年还给孩子
      </h1>

      <div class="solutions-wrapper">
        <div class="solution-card" v-for="(solution, index) in solutions" :key="index"
          :style="{ animationDelay: index * 0.1 + 's' }">
          <div class="solution-number">{{ index + 1 }}</div>
          <div class="solution-title">{{ solution.title }}</div>
          <div class="solution-text">{{ solution.content }}</div>
        </div>
      </div>

      <!-- 法律时间线 -->
      <div class="law-timeline">
        <div class="law-title">中国网红儿童权益保护法律政策演进</div>
        <div class="law-events">
          <div class="law-event" v-for="(law, index) in laws" :key="index"
            :style="{ animationDelay: index * 0.1 + 's' }">
            <div class="law-year">{{ law.year }}</div>
            <div class="law-content">{{ law.content }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 明信片 -->
    <section class="section postcard-section" ref="section18">
      <h2 class="section-title fade-in-up">给未来的孩子写一张明信片</h2>

      <div class="postcard-container">
        <div class="postcard-design">
          <div class="postcard-stamp">📮</div>
          <textarea v-model="postcardText" placeholder="写下你对未来孩子的寄语..." class="postcard-textarea"
            maxlength="300"></textarea>
          <div class="postcard-counter">{{ postcardText.length }}/300</div>
        </div>
        <button class="postcard-btn" @click="generatePostcard">
          <span>生成明信片</span>
          <span class="btn-icon">✉️</span>
        </button>

        <transition name="postcard-result-fade">
          <div v-if="showPostcard" class="postcard-result">
            <div class="result-stamp">📬</div>
            <div class="result-title">你的明信片</div>
            <div class="result-content">{{ postcardText }}</div>
            <div class="result-date">{{ currentDate }}</div>
          </div>
        </transition>
      </div>
    </section>

    <!-- 结尾 -->
    <section class="section ending-section" ref="section19">
      <div class="ending-animation">
        <div class="ending-icon fade-in">🌟</div>
        <div class="ending-main fade-in" style="animation-delay: 0.3s;">
          让我们一起<br>
          <span class="ending-highlight">把童年还给孩子</span><br>
          <span class="ending-highlight">让爱回到现实</span>
        </div>
        <div class="ending-thanks fade-in" style="animation-delay: 0.6s;">
          感谢你的阅读与关注
        </div>
        <div class="ending-divider"></div>
        <div class="ending-footer fade-in" style="animation-delay: 0.9s;">
          <p>数据来源：《中国未成年人互联网使用情况调查报告》</p>
          <p>《中国未成年人网络权益保护报告》等</p>
        </div>
      </div>
    </section>

    <!-- 结尾手机关闭动画 -->
    <section class="section phone-close-section" ref="phoneCloseSection">
      <div class="phone-close-container">
        <div class="close-phone-screen" :class="{ 'screen-off': phoneScreenOff }">
          <div class="close-phone-notch">
            <div class="close-notch-camera"></div>
            <div class="close-notch-speaker"></div>
          </div>
          <div class="close-btn-left close-volume-up"></div>
          <div class="close-btn-left close-volume-down"></div>
          <div class="close-btn-right close-power"></div>
          <div class="close-screen-content">
            <div class="close-text">再见 👋</div>
          </div>
        </div>
        <div class="scroll-hint">继续向下滑动...</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import Chart from 'chart.js/auto'
// 可选：加载 annotation 插件（如果项目中已安装 chartjs-plugin-annotation）
// import annotationPlugin from 'chartjs-plugin-annotation'
// Chart.register(annotationPlugin)

// 导航数据
const chapters = ['开始', '第一章', '第二章', '第三章', '第四章', '第五章']
const showNav = ref(false)
const currentChapter = ref(0)
const scrollProgress = ref(0)

// 数据
const timeOptions = ['1-3小时', '3-5小时', '5-7小时', '7小时以上']
const socialOptions = ['0-1小时', '1-3小时', '3-5小时', '5小时以上']

const platforms = [
  { icon: '🎵', name: '抖音', users: '6亿+' },
  { icon: '🎬', name: '快手', users: '3.8亿+' },
  { icon: '📕', name: '小红书', users: '2.6亿+' }
]

const videoTypes = [
  { icon: '👶', label: '儿童萌娃\n搞笑日常' },
  { icon: '🎭', label: '儿童才艺\n表演展示' },
  { icon: '👨‍👩‍👧', label: '亲子互动\n温馨时刻' }
]

const childTypes = [
  { icon: '👁️', name: '媒介接触型', desc: '作为观众浏览内容' },
  { icon: '🎬', name: '内容生产型', desc: '主动创作发布内容' },
  { icon: '🎪', name: '身体参与型', desc: '被动参与拍摄表演' },
  { icon: '👔', name: '童模型', desc: '从事商业代言活动' }
]

const productionChain = [
  { icon: '👨‍👩‍👧', name: '家长', role: '运营者/经纪人' },
  { icon: '🏢', name: 'MCN机构', role: '包装孵化' },
  { icon: '📱', name: '平台', role: '流量分发' },
  { icon: '💰', name: '广告主', role: '商业变现' }
]

const impacts = [
  { icon: '😢', stat: '49.6%', desc: '青少年想成为网红' },
  { icon: '😰', stat: '45%', desc: '抑郁发生率提高' },
  { icon: '😔', stat: '38%', desc: '焦虑发生率提高' },
  { icon: '👁️', stat: '68%', desc: '存在注意力缺陷' }
]

const solutions = [
  { title: '平台监管', content: '建立量化标准识别分享与牟利，从儿童出镜频率、账号收益、商业化内容占比等维度严格审核。' },
  { title: '法律完善', content: '探索出台未成年人网络保护实施细则，禁止0-8岁儿童参与带营销性质的内容生产。' },
  { title: '收益保护', content: '参考法国模式，要求儿童网红获取执照，收入存入专门账户供其成年后使用。' },
  { title: '算法优化', content: '减少对可能损害儿童权益内容的流量倾斜，建立更负责任的推荐机制。' },
  { title: '家长自律', content: '警惕动机异化，分享可以但不应为盈利。眼睛和心灵才是记录童年的最好相机。' }
]

const laws = [
  { year: '2019年10月', content: '《儿童个人信息网络保护规定》网信办首部儿童网络保护专门规章' },
  { year: '2020年11月', content: '《网络直播营销管理办法（试行）》国家互联网信息办公室等七部委联合发布' },
  { year: '2021年6月', content: '《未成年人保护法》修订 明确网络游戏电子身份认证' },
  { year: '2021年7月', content: '《关于进一步减轻义务教育阶段学生作业负担和校外培训负担的意见》防止未成年人沉迷网络游戏' },
  { year: '2021年9月', content: '《关于开展文娱领域综合治理工作的通知》抵制泛娱乐化、流量至上等不良倾向' },
  { year: '2022年10月', content: '《未成年人网络保护条例》提出未成年人个人信息保护措施' },
  { year: '2023年1月', content: '《未成年人网络保护条例》明确网络欺凌及防治措施' },
  { year: '2023年5月', content: '未成年人网络环境专项治理 整治儿童软色情等违法不良信息' },
  { year: '2024年至今', content: '清朗专项行动常态化强化监管与执法' }
]

const selectedTime = ref(null)
const selectedSocial = ref(null)
const showChart1 = ref(false)
const showChart2 = ref(false)
const heartToMoney = ref(false)
const perspectiveOpen = ref(null)
const viewedPerspectives = ref([])
const postcardText = ref('')
const showPostcard = ref(false)
const phoneScreenOff = ref(false)
const phoneCloseSection = ref(null)

// 模式状态 - 默认暗黑模式
const darkMode = ref(true)

const toggleDark = () => {
  darkMode.value = !darkMode.value

  // 重新创建所有图表以更新颜色
  nextTick(() => {
    if (showChart1.value && chart1.value) createChart1()
    if (chartGrowth.value) createGrowthChart()
    if (pieChart.value) createPieChart()
    if (chartTraditional.value) createTraditionalChart()
    if (chartDigital.value) createDigitalChart()
  })
}

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
    title: '粉丝破百万',
    desc: '童年变成了流量',
    detail: '爱有了回报率',
    typeClass: 'warning',
    visible: false
  },
  {
    side: 'right',
    icon: '📺',
    title: '直播带货',
    desc: '商业化: 成为家庭收入来源',
    detail: '每天固定时间开播，完成销售任务',
    typeClass: 'commercial',
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
const chartGrowth = ref(null)
const pieChart = ref(null)
const chartTraditional = ref(null)
const chartDigital = ref(null)
const timelineRefs = ref([])

let chartInstances = []
let scrollObserver = null
let timelineObserver = null
const createdCharts = new Set() // 追踪已创建的图表

// 计算属性
const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN')
})

// 方法
const scrollToChapter = (index) => {
  const element = document.getElementById(`chapter${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const selectTime = (time) => {
  // 添加点击动画效果
  const options = document.querySelectorAll('.time-option')
  options.forEach(option => {
    option.style.transform = 'scale(0.95)'
    setTimeout(() => {
      option.style.transform = ''
    }, 150)
  })

  selectedTime.value = time
  setTimeout(() => {
    showChart1.value = true
    nextTick(() => {
      createChart1()
    })
  }, 400)
}

const selectSocial = (time) => {
  // 添加点击动画效果
  const options = document.querySelectorAll('.time-option')
  options.forEach(option => {
    option.style.transform = 'scale(0.95)'
    setTimeout(() => {
      option.style.transform = ''
    }, 150)
  })

  selectedSocial.value = time
  setTimeout(() => {
    showChart2.value = true
  }, 400)
}

const openPerspective = (type) => {
  perspectiveOpen.value = type
  if (!viewedPerspectives.value.includes(type)) {
    viewedPerspectives.value.push(type)
  }
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
  const ctx = chart1.value
  if (!ctx) return

  // 检查并销毁已存在的图表
  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  // 根据当前模式设置颜色
  const textColor = darkMode.value ? '#fff' : '#333'
  const gridColor = darkMode.value ? '#333' : '#ddd'

  const average = 22
  const chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-1h', '1-3h', '3-5h', '5-7h', '7h+'],
      datasets: [
        {
          label: '用户占比 (%)',
          data: [12, 28, 35, 18, 7],
          backgroundColor: function (context) {
            const index = context.dataIndex
            const value = context.dataset.data[index]
            return value >= average ? '#7c3aed' : '#3b82f6'
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor, font: { size: 14 } }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff'
        },
        annotation: {
          annotations: {
            avgLine: {
              type: 'line',
              yMin: average,
              yMax: average,
              borderColor: '#f59e0b',
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                enabled: true,
                content: '平均值',
                backgroundColor: darkMode.value ? '#111' : '#fff',
                color: '#f59e0b'
              }
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        y: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      },
      onClick: (evt, elements) => {
        if (!elements.length) return
        const el = elements[0]
        const i = el.index
        const ds = chartInstance.data.datasets[0]
        const value = ds.data[i]
        ds.data[i] = value >= average ? average - 3 : average + 3
        chartInstance.update()
      }
    }
  })

  chartInstances.push(chartInstance)
}

const createGrowthChart = () => {
  const ctx = chartGrowth.value
  if (!ctx) return

  // 检查并销毁已存在的图表
  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  // 根据当前模式设置颜色
  const textColor = darkMode.value ? '#fff' : '#333'
  const gridColor = darkMode.value ? '#333' : '#ddd'

  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        label: '儿童账号数量指数',
        data: [100, 145, 217, 317, 450],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor, font: { size: 14 } }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        y: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    }
  })

  chartInstances.push(chartInstance)
}

const createPieChart = () => {
  const ctx = pieChart.value
  if (!ctx) return

  // 检查并销毁已存在的图表
  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  // 根据当前模式设置颜色
  const textColor = darkMode.value ? '#fff' : '#333'

  const chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['成年用户', '未成年用户'],
      datasets: [{
        data: [75, 25],
        backgroundColor: ['#666', '#667eea'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor, font: { size: 14 }, padding: 20 }
        }
      }
    }
  })

  chartInstances.push(chartInstance)
}

const createTraditionalChart = () => {
  const ctx = chartTraditional.value
  if (!ctx) return

  // 检查并销毁已存在的图表
  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  // 根据当前模式设置颜色
  const textColor = darkMode.value ? '#fff' : '#333'
  const gridColor = darkMode.value ? '#333' : '#ddd'

  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2023'],
      datasets: [{
        label: '传统童工数量',
        data: [100, 85, 70, 55, 45, 40],
        borderColor: '#888',
        backgroundColor: 'rgba(136, 136, 136, 0.1)',
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
          labels: { color: textColor }
        }
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } }
      }
    }
  })

  chartInstances.push(chartInstance)
}

const createDigitalChart = () => {
  const ctx = chartDigital.value
  if (!ctx) return

  // 检查并销毁已存在的图表
  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  // 根据当前模式设置颜色
  const textColor = darkMode.value ? '#fff' : '#333'
  const gridColor = darkMode.value ? '#333' : '#ddd'

  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2023'],
      datasets: [{
        label: '数字童工数量',
        data: [5, 8, 15, 35, 80, 150],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
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
          labels: { color: textColor }
        }
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } }
      }
    }
  })

  chartInstances.push(chartInstance)
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

          // 查找所有 canvas 元素
          const canvases = entry.target.querySelectorAll('canvas[data-chart-type]')

          canvases.forEach((canvas) => {
            const chartType = canvas.getAttribute('data-chart-type')

            // 检查是否已创建过该图表
            if (createdCharts.has(chartType)) {
              return
            }

            // 根据类型创建对应的图表
            nextTick(() => {
              switch (chartType) {
                case 'chart1':
                  if (showChart1.value) {
                    createChart1()
                    createdCharts.add('chart1')
                  }
                  break
                case 'growth':
                  createGrowthChart()
                  createdCharts.add('growth')
                  break
                case 'pie':
                  createPieChart()
                  createdCharts.add('pie')
                  break
                case 'traditional':
                  createTraditionalChart()
                  createdCharts.add('traditional')
                  break
                case 'digital':
                  createDigitalChart()
                  createdCharts.add('digital')
                  break
              }
            })
          })
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
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        // 显示导航栏
        showNav.value = scrolled > windowHeight / 2

        // 滚动进度
        scrollProgress.value = (scrolled / (documentHeight - windowHeight)) * 100

        // 当前章节
        const chapterElements = document.querySelectorAll('[id^="chapter"]')
        chapterElements.forEach((el, index) => {
          const rect = el.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentChapter.value = index
          }
        })

        // 心形转换
        if (scrolled > 4500) {
          heartToMoney.value = true
        }

        // 结尾手机关闭动画
        if (phoneCloseSection.value) {
          const rect = phoneCloseSection.value.getBoundingClientRect()
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
          if (progress > 0.1) {
            phoneScreenOff.value = true
          } else {
            phoneScreenOff.value = false
          }
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
    chartInstances.forEach(chart => chart.destroy())
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
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 标准模式（非 dark） */
.digital-child-labor:not(.dark) {
  background: linear-gradient(to bottom, #f3f4f6, #e5e7eb) !important;
  color: #111 !important;
}

.digital-child-labor:not(.dark) .section {
  background: transparent !important;
  color: #111 !important;
}

.digital-child-labor:not(.dark) .gradient-text,
.digital-child-labor:not(.dark) .ending-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.digital-child-labor:not(.dark) .question,
.digital-child-labor:not(.dark) .question-big {
  color: #667eea !important;
}

.digital-child-labor:not(.dark) .glass-card,
.digital-child-labor:not(.dark) .chart-container,
.digital-child-labor:not(.dark) .stat-card,
.digital-child-labor:not(.dark) .platform-item,
.digital-child-labor:not(.dark) .timeline-content,
.digital-child-labor:not(.dark) .modal-content,
.digital-child-labor:not(.dark) .postcard-design,
.digital-child-labor:not(.dark) .perspective-item,
.digital-child-labor:not(.dark) .data-item,
.digital-child-labor:not(.dark) .chain-item,
.digital-child-labor:not(.dark) .solution-card,
.digital-child-labor:not(.dark) .law-content {
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(102, 126, 234, 0.3) !important;
  color: #111 !important;
}

.digital-child-labor:not(.dark) .time-option,
.digital-child-labor:not(.dark) .type-card,
.digital-child-labor:not(.dark) .impact-card,
.digital-child-labor:not(.dark) .audience-card {
  color: #111 !important;
  border-color: rgba(102, 126, 234, 0.3) !important;
}

.digital-child-labor:not(.dark) .opening-text,
.digital-child-labor:not(.dark) .scroll-indicator span,
.digital-child-labor:not(.dark) .scroll-hint,
.digital-child-labor:not(.dark) .alert-text,
.digital-child-labor:not(.dark) .highlight-text {
  color: #333 !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.digital-child-labor:not(.dark) .scroll-arrow {
  color: #667eea !important;
}

.digital-child-labor:not(.dark) .nav-bar {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(18px) saturate(140%) !important;
}

.digital-child-labor:not(.dark) .nav-logo,
.digital-child-labor:not(.dark) .nav-link {
  color: #111 !important;
}

.digital-child-labor:not(.dark) .mode-btn {
  color: #111 !important;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)) !important;
  border-color: rgba(102, 126, 234, 0.3) !important;
}


/* 暗黑模式 */
.digital-child-labor.dark {
  --primary: #8b5cf6;
  --accent: #22d3ee;
  --warning: #f59e0b;
  background: #000 !important;
}

.digital-child-labor.dark .section {
  background: transparent !important;
}

.digital-child-labor.dark .glass-card,
.digital-child-labor.dark .chart-container,
.digital-child-labor.dark .stat-card,
.digital-child-labor.dark .platform-item,
.digital-child-labor.dark .timeline-content,
.digital-child-labor.dark .modal-content,
.digital-child-labor.dark .postcard-design,
.digital-child-labor.dark .perspective-item,
.digital-child-labor.dark .data-item,
.digital-child-labor.dark .chain-item,
.digital-child-labor.dark .solution-card,
.digital-child-labor.dark .law-content {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

.digital-child-labor.dark .gradient-text,
.digital-child-labor.dark .ending-highlight {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.digital-child-labor.dark .question,
.digital-child-labor.dark .question-big,
.digital-child-labor.dark .platform-users,
.digital-child-labor.dark .stat-number,
.digital-child-labor.dark .dist-percentage,
.digital-child-labor.dark .growth-rate {
  color: var(--accent);
}

.digital-child-labor.dark .opening-text,
.digital-child-labor.dark .scroll-indicator span,
.digital-child-labor.dark .scroll-hint {
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 0 4px 30px rgba(255, 255, 255, 0.3) !important;
}

.digital-child-labor.dark .scroll-arrow {
  color: var(--primary) !important;
}

/* 导航栏 */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5), transparent) 1;
  transform: translateY(-100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-bar.nav-visible {
  transform: translateY(0);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.nav-logo {
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {

  0%,
  100% {
    filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.3));
  }

  50% {
    filter: drop-shadow(0 0 15px rgba(118, 75, 162, 0.6));
  }
}

.nav-links {
  display: flex;
  gap: 30px;
  padding: 15px 0;
  overflow-x: auto;
  scrollbar-width: none;
  justify-content: center;
}

.nav-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.mode-btn {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  color: #fff;
  border: 1px solid rgba(102, 126, 234, 0.5);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mode-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  border-color: rgba(118, 75, 162, 0.8);
}

.mode-btn:hover::before {
  width: 300px;
  height: 300px;
}

.mode-btn:active {
  transform: translateY(0);
}

.nav-links::-webkit-scrollbar {
  display: none;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #fff;
  background: rgba(102, 126, 234, 0.15);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-link:hover::after {
  width: 60%;
}

.nav-link.active {
  color: #fff;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5));
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.6),
    inset 0 0 10px rgba(102, 126, 234, 0.3);
  font-weight: 600;
  transform: scale(1.05);
}

.nav-link.active::after {
  width: 80%;
}

.nav-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s linear;
}

/* 通用section */
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;
}

.section::after {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  pointer-events: none;
  animation: floatingOrb 15s ease-in-out infinite;
  z-index: 0;
}

@keyframes floatingOrb {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }

  25% {
    transform: translate(-30%, -30%) scale(1.2);
    opacity: 0.3;
  }

  50% {
    transform: translate(-70%, -50%) scale(0.8);
    opacity: 0.6;
  }

  75% {
    transform: translate(-50%, -70%) scale(1.1);
    opacity: 0.4;
  }
}

.section.visible>* {
  animation-play-state: running !important;
}

/* 动画定义 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes growIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes hoverLift {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}

.slide-in {
  animation: slideIn 0.8s ease-out both;
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out both;
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out both;
}

.grow-in {
  animation: growIn 0.6s ease-out both;
}

.scale-in {
  animation: scaleIn 0.6s ease-out both;
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

.hover-lift {
  animation: hoverLift 0.6s ease-out both;
  transition: transform 0.3s;
}

.hover-lift:hover {
  transform: translateY(-10px) !important;
}

.fade-in {
  animation: fadeInUp 0.8s ease-out both;
}

/* 开场动画 */
@keyframes phoneAppear {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(100px) rotateX(30deg) rotateY(-15deg);
  }

  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-10px) rotateX(0deg) rotateY(5deg);
  }

  80% {
    transform: scale(0.98) translateY(5px) rotateX(0deg) rotateY(-2deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0) rotateX(0deg) rotateY(0deg);
  }
}

@keyframes phoneFloat {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes phonePulse {

  0%,
  100% {
    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.3),
      0 0 0 0 rgba(102, 126, 234, 0.4);
  }

  50% {
    box-shadow: 0 35px 90px rgba(102, 126, 234, 0.5),
      0 0 0 20px rgba(102, 126, 234, 0);
  }
}

@keyframes screenOn {
  0% {
    opacity: 0;
    background: #000;
    transform: scale(0.9);
  }

  50% {
    opacity: 0.5;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%);
    transform: scale(1.02);
  }

  100% {
    opacity: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scale(1);
  }
}

@keyframes textFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    filter: blur(10px);
  }

  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1.02);
    filter: blur(0px);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}

@keyframes textGlow {

  0%,
  100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  50% {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
      0 0 40px rgba(102, 126, 234, 0.4);
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

.opening-section {
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000 100%);
  perspective: 1000px;
}

.phone-screen {
  width: 300px;
  height: 600px;
  background: linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 60%, #1e1e1e 100%);
  border-radius: 52px;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 30px 80px rgba(102, 126, 234, 0.35),
    inset 0 0 0 2px rgba(255, 255, 255, 0.03),
    0 0 0 6px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  animation: phoneAppear 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
    phoneFloat 4s ease-in-out 2s infinite,
    phonePulse 3s ease-in-out 2s infinite;
  transform-style: preserve-3d;
}

/* iPhone style notch */
.phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 28px;
  background: linear-gradient(180deg, #111, #000);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.notch-speaker {
  width: 60px;
  height: 6px;
  background: linear-gradient(180deg, #222, #111);
  border-radius: 3px;
}

.notch-camera {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle at 30% 30%, #3af, #003);
  border-radius: 50%;
  box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.2);
}

/* Side buttons */
.btn-right,
.btn-left {
  position: absolute;
  width: 3px;
  background: linear-gradient(180deg, #6c6c6c, #2e2e2e);
  border-radius: 2px;
  z-index: 11;
}

.btn-right.power {
  right: -2px;
  top: 110px;
  height: 70px;
}

.btn-left.volume-up {
  left: -2px;
  top: 120px;
  height: 55px;
}

.btn-left.volume-down {
  left: -2px;
  top: 185px;
  height: 55px;
}

.screen-content {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 60px;
  background: #000;
  border-radius: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  animation: screenOn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

/* Home indicator */
.screen-content::after {
  content: '';
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
  border-radius: 2px;
  opacity: 0.9;
}

.screen-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  animation: screenPulse 2s ease-out 0.8s;
}

@keyframes screenPulse {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.opening-text {
  font-size: 32px;
  text-align: center;
  line-height: 1.6;
  font-weight: 700;
  animation: textFadeIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s both;
  text-shadow: 0 4px 30px rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
}

.scroll-indicator {
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: fadeInUp 1s ease-out 3.5s both,
    bounce 2s ease-in-out 4.5s infinite;
}

.scroll-indicator span {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.scroll-arrow {
  font-size: 24px;
  color: #667eea;
  animation: arrowPulse 1.5s ease-in-out infinite;
}

@keyframes arrowPulse {

  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }

  50% {
    transform: translateY(8px);
    opacity: 0.6;
  }
}

/* 渐变文字 */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.3;
  animation: gradientShift 6s ease-in-out infinite;
  position: relative;
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

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 50px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }

  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.question {
  font-size: 26px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 500;
}

.question-big {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
}

.time-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.time-option {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out both;
}

.time-option::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.4s;
}

.time-option:hover::before {
  opacity: 0.2;
}

.time-option:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.time-option.selected {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #764ba2;
  transform: scale(1.05);
  box-shadow: 0 12px 36px rgba(102, 126, 234, 0.5);
}

/* 图表 */
.chart-container {
  width: 100%;
  max-width: 900px;
  height: 450px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  margin: 40px auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.chart-container canvas {
  flex: 1;
  width: 100% !important;
  height: 100% !important;
  display: block;
  max-height: 350px;
  border-radius: 12px;
}

.chart-title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.chart-note {
  text-align: center;
  margin-top: 20px;
  opacity: 0.6;
  font-size: 14px;
}

.chart-fade-enter-active,
.chart-fade-leave-active {
  transition: all 0.6s ease-out;
}

.chart-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.chart-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 平台统计 */
.platform-chart {
  height: auto;
}

.platform-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
}

.platform-item {
  text-align: center;
  padding: 30px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  animation: growIn 0.6s ease-out both;
  transition: transform 0.3s;
}

.platform-item:hover {
  transform: translateY(-5px);
  background: rgba(102, 126, 234, 0.15);
}

.platform-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.platform-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.platform-users {
  font-size: 28px;
  color: #667eea;
  font-weight: bold;
}

/* 图片网格 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 40px auto;
  width: 100%;
}

.image-placeholder {
  aspect-ratio: 9/16;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.video-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.video-label {
  font-size: 16px;
  text-align: center;
  white-space: pre-line;
  font-weight: 500;
}

/* 统计卡片 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 900px;
  width: 100%;
  margin: 60px auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
}

.stat-number {
  font-size: 56px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 15px;
}

.stat-label {
  font-size: 18px;
  opacity: 0.9;
}

/* 警示文本 */
.warning-section {
  background: radial-gradient(circle at 50% 50%, rgba(255, 59, 48, 0.1) 0%, #000 70%);
}

.alert-text {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  line-height: 1.8;
  max-width: 900px;
  padding: 60px;
  background: rgba(255, 59, 48, 0.1);
  border: 2px solid rgba(255, 59, 48, 0.3);
  border-radius: 24px;
  box-shadow: 0 0 60px rgba(255, 59, 48, 0.2);
}

.alert-icon {
  font-size: 72px;
  margin-bottom: 30px;
  animation: pulse 2s infinite;
}

.highlight-text {
  color: #ff6b6b;
  display: inline-block;
  margin-top: 20px;
}

/* 定义部分 */
.definition-section {
  background: radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.05) 0%, #000 70%);
}

.definition-container {
  max-width: 1000px;
  width: 100%;
}

.definition-title {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  color: #667eea;
}

.definition-content {
  max-width: 900px;
  margin: 0 auto 60px;
}

.definition-content p {
  font-size: 20px;
  line-height: 2;
  margin-bottom: 30px;
  text-align: center;
}

.pie-chart-container {
  max-width: 500px;
  height: 400px;
  margin: 60px auto;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.pie-chart-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.pie-chart-container canvas {
  flex: 1;
  width: 100% !important;
  height: 100% !important;
  display: block;
  max-height: 300px;
  border-radius: 12px;
}

.definition-highlight {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-top: 60px;
  line-height: 1.8;
}

.emphasize {
  color: #764ba2;
  font-size: 1.2em;
  display: inline-block;
  animation: pulse 2s infinite;
}

/* 数据展示 */
.data-section {
  background: radial-gradient(circle at 70% 50%, rgba(118, 75, 162, 0.05) 0%, #000 70%);
}

.data-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 80px;
}

.data-item {
  text-align: center;
  padding: 50px 30px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.data-number {
  font-size: 64px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.data-desc {
  font-size: 18px;
  opacity: 0.9;
}

.screen-time-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 900px;
  width: 100%;
  margin: 60px auto;
}

.info-card {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  animation: slideInLeft 0.8s ease-out both;
}

.info-card:nth-child(2) {
  animation-name: slideInRight;
}

.age-group {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #667eea;
}

.time-value {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 15px;
}

.time-label {
  font-size: 16px;
  opacity: 0.8;
}

.child-types {
  max-width: 1200px;
  width: 100%;
  margin-top: 80px;
}

.type-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #764ba2;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.type-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
  transition: all 0.3s;
}

.type-card:hover {
  transform: translateY(-8px);
  border-color: #667eea;
  box-shadow: 0 12px 36px rgba(102, 126, 234, 0.3);
}

.type-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.type-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #667eea;
}

.type-desc {
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.6;
}

/* 时间轴 */
.timeline-section {
  min-height: 150vh;
  background: radial-gradient(ellipse at 50% 30%, rgba(102, 126, 234, 0.08) 0%, #000 60%);
}

.timeline-subtitle {
  text-align: center;
  font-size: 20px;
  opacity: 0.7;
  margin-bottom: 80px;
}

.timeline-container {
  max-width: 1200px;
  width: 100%;
  position: relative;
  padding: 80px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2, #667eea);
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

.timeline-event {
  display: flex;
  align-items: center;
  margin: 80px 0;
  opacity: 0;
  transition: opacity 0.8s, transform 0.8s;
}

.timeline-event.visible {
  opacity: 1;
}

.timeline-event.left {
  justify-content: flex-end;
  transform: translateX(-50px);
}

.timeline-event.left.visible {
  transform: translateX(0);
}

.timeline-event.right {
  justify-content: flex-start;
  transform: translateX(50px);
}

.timeline-event.right.visible {
  transform: translateX(0);
}

.timeline-content {
  width: 45%;
  padding: 35px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.timeline-content:hover {
  transform: scale(1.02);
  border-color: #667eea;
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.3);
}

.timeline-event.left .timeline-content {
  margin-right: 5%;
}

.timeline-event.right .timeline-content {
  margin-left: 5%;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
  border: 4px solid #000;
  z-index: 10;
}

.event-badge {
  position: absolute;
  top: -15px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.event-badge.share {
  background: linear-gradient(135deg, #90EE90, #32CD32);
}

.event-badge.commercial {
  background: linear-gradient(135deg, #FFA500, #FF8C00);
}

.event-badge.warning {
  background: linear-gradient(135deg, #FF6B6B, #FF4444);
}

.event-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #667eea;
  margin-top: 40px;
}

.event-type {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
}

.event-type.share {
  color: #90EE90;
}

.event-type.commercial {
  color: #FFA500;
}

.event-type.warning {
  color: #FF6B6B;
}

.event-detail {
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.6;
}

/* 经济数据 */
.economic-section {
  background: radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.05) 0%, #000 70%);
}

.economic-title {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  color: #FFA500;
}

.economic-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
}

.comparison-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px;
  text-align: center;
  min-width: 300px;
  animation: growIn 0.8s ease-out both;
}

.comparison-label {
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 20px;
}

.comparison-value {
  font-size: 64px;
  font-weight: bold;
  color: #FFA500;
  margin-bottom: 15px;
}

.comparison-note {
  font-size: 16px;
  opacity: 0.6;
}

.comparison-vs {
  font-size: 48px;
  font-weight: bold;
  color: #667eea;
}

/* 心形动画 */
.heart-section {
  background: radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.1) 0%, #000 60%);
  min-height: 100vh;
}

.heart-animation-container {
  margin: 60px 0;
}

.heart-container {
  font-size: 150px;
  text-align: center;
  transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.heart-pulse {
  animation: heartPulse 2s infinite;
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

.transform-money {
  animation: transformToMoney 1s ease-out;
}

@keyframes transformToMoney {
  0% {
    transform: scale(1) rotate(0deg);
    filter: hue-rotate(0deg);
  }

  50% {
    transform: scale(1.5) rotate(180deg);
    filter: hue-rotate(180deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
    filter: hue-rotate(360deg);
  }
}

.emoji-change-enter-active,
.emoji-change-leave-active {
  transition: all 0.5s ease;
}

.emoji-change-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-180deg);
}

.emoji-change-leave-to {
  opacity: 0;
  transform: scale(0) rotate(180deg);
}

.heart-text {
  text-align: center;
  margin-top: 40px;
  font-size: 28px;
  line-height: 1.8;
}

.heart-highlight {
  font-size: 36px;
  font-weight: bold;
  color: #FF1493;
  margin-top: 20px;
}

.heart-description {
  text-align: center;
  font-size: 24px;
  line-height: 1.8;
  margin-top: 60px;
  opacity: 0.9;
}

/* 第二章 */
.chapter-intro {
  max-width: 900px;
  text-align: center;
  font-size: 20px;
  line-height: 2;
  margin-bottom: 80px;
}

.chapter-intro p {
  margin-bottom: 20px;
}

.intro-highlight {
  font-size: 28px;
  font-weight: bold;
  color: #667eea;
  margin-top: 40px;
}

.dual-chart-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  margin-top: 60px;
}

.chart-wrapper {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 400px;
  animation: fadeInUp 0.8s ease-out both;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.chart-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.chart-wrapper canvas {
  flex: 1;
  width: 100% !important;
  height: 100% !important;
  display: block;
  max-height: 300px;
  border-radius: 12px;
}

.chart-label {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #888;
}

.chart-label-rise {
  color: #ff6b6b;
}

/* 地图分布 */
.map-section {
  background: radial-gradient(circle at 30% 70%, rgba(102, 126, 234, 0.05) 0%, #000 70%);
}

.section-title {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.distribution-comparison {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 900px;
  width: 100%;
  margin-bottom: 60px;
}

.dist-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
}

.dist-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #667eea;
}

.dist-percentage {
  font-size: 72px;
  font-weight: bold;
  color: #FFA500;
  margin-bottom: 20px;
}

.dist-label {
  font-size: 16px;
  opacity: 0.8;
}

.growth-comparison {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 900px;
  width: 100%;
}

.growth-item {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  animation: slideInLeft 0.8s ease-out both;
}

.growth-item:nth-child(2) {
  animation-name: slideInRight;
}

.city-tier {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  opacity: 0.9;
}

.growth-rate {
  font-size: 64px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 15px;
}

.growth-label {
  font-size: 16px;
  opacity: 0.7;
}

/* 生产链 */
.production-section {
  background: radial-gradient(circle at 70% 30%, rgba(118, 75, 162, 0.05) 0%, #000 70%);
}

.production-chain {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin: 60px auto;
  position: relative;
}

.chain-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
  transition: all 0.3s;
}

.chain-item:hover {
  transform: translateY(-10px);
  border-color: #667eea;
  box-shadow: 0 12px 36px rgba(102, 126, 234, 0.4);
}

.chain-icon {
  font-size: 56px;
  margin-bottom: 20px;
}

.chain-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #667eea;
}

.chain-role {
  font-size: 14px;
  opacity: 0.8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 900px;
  width: 100%;
  margin: 80px auto;
}

.stat-block {
  background: rgba(255, 59, 48, 0.1);
  border: 2px solid rgba(255, 59, 48, 0.3);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
}

.stat-value {
  font-size: 72px;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 20px;
}

.stat-text {
  font-size: 18px;
  line-height: 1.6;
}

.mcn-formula {
  max-width: 1000px;
  margin: 80px auto;
}

.formula-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #764ba2;
}

.formula-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.formula-part {
  font-size: 24px;
  font-weight: 600;
  padding: 20px 30px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.formula-plus,
.formula-equals {
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
}

.formula-result {
  font-size: 32px;
  font-weight: bold;
  padding: 20px 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  color: #fff;
}

/* 观众部分 */
.audience-section {
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, #000 70%);
}

.audience-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  max-width: 1000px;
  width: 100%;
}

.audience-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  animation: slideInLeft 0.8s ease-out both;
}

.audience-card:nth-child(2) {
  animation-name: slideInRight;
}

.audience-type {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #667eea;
}

.audience-demo {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #FFA500;
}

.audience-note {
  font-size: 16px;
  opacity: 0.8;
  line-height: 1.6;
}

/* 第三章 */
.motivation-text {
  max-width: 900px;
  text-align: center;
  font-size: 22px;
  line-height: 2;
  margin: 60px auto;
}

/* 环形结构 */
.circle-section {
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.08) 0%, #000 60%);
  min-height: 120vh;
}

.circle-structure {
  width: 600px;
  height: 600px;
  position: relative;
  margin: 80px auto;
  transition: all 0.6s;
}

.circle-structure.all-viewed {
  animation: celebrate 1s ease-out;
}

@keyframes celebrate {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.05) rotate(5deg);
  }
}

.center-child {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  z-index: 10;
  box-shadow: 0 0 60px rgba(102, 126, 234, 0.6);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.child-label {
  font-size: 16px;
  margin-top: 8px;
  font-weight: 600;
}

.connection-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.connect-line {
  stroke: rgba(102, 126, 234, 0.3);
  stroke-width: 2;
  stroke-dasharray: 5, 5;
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

.perspective-item {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 3px solid #667eea;
  border-radius: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.perspective-item:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.15);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.5);
  border-color: #764ba2;
}

.perspective-item.viewed {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border-color: #764ba2;
}

.perspective-icon {
  font-size: 36px;
  margin-bottom: 5px;
}

.perspective-label {
  font-size: 14px;
  font-weight: 600;
}

.perspective-hint {
  font-size: 10px;
  opacity: 0.6;
  margin-top: 3px;
}

.perspective-item.top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.perspective-item.top:hover {
  transform: translateX(-50%) scale(1.15);
}

.perspective-item.right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.perspective-item.right:hover {
  transform: translateY(-50%) scale(1.15);
}

.perspective-item.bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.perspective-item.bottom:hover {
  transform: translateX(-50%) scale(1.15);
}

.perspective-item.left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.perspective-item.left:hover {
  transform: translateY(-50%) scale(1.15);
}

.view-progress {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #667eea;
  font-weight: 600;
}

/* 弹窗 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(0, 0, 0, 0.98));
  border: 2px solid #667eea;
  border-radius: 32px;
  padding: 60px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 20px 80px rgba(102, 126, 234, 0.5);
  animation: modalSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 28px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.modal-close:hover {
  background: rgba(255, 59, 48, 0.8);
  transform: rotate(90deg);
}

.modal-inner {
  text-align: center;
}

.modal-icon {
  font-size: 80px;
  margin-bottom: 30px;
  animation: modalIconBounce 0.6s ease-out 0.2s;
}

@keyframes modalIconBounce {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.modal-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-stat {
  font-size: 64px;
  font-weight: bold;
  color: #667eea;
  margin: 30px 0;
}

.modal-text {
  font-size: 20px;
  line-height: 1.8;
  opacity: 0.9;
  color: white;
}

.modal-quote {
  display: block;
  font-style: italic;
  color: #FFA500;
  margin: 20px 0;
  padding: 20px;
  background: rgba(255, 165, 0, 0.1);
  border-radius: 12px;
  border-left: 4px solid #FFA500;
}

.modal-flow {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0;
  padding: 30px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  color: white;
}

.algorithm-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.algo-arrow {
  font-size: 28px;
  font-weight: bold;
  color: #ff6b6b;
}

.algo-target {
  font-size: 28px;
  font-weight: bold;
  color: #667eea;
  padding: 15px 30px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 12px;
}

.audience-breakdown {
  margin: 30px 0;
}

.breakdown-item {
  font-size: 20px;
  padding: 20px;
  margin: 15px 0;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  color: #667eea;
}

/* 第四章 */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin: 60px auto;
}

.impact-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  animation: growIn 0.6s ease-out both;
  transition: all 0.3s;
}

.impact-card:hover {
  transform: translateY(-8px);
  border-color: #ff6b6b;
  box-shadow: 0 12px 36px rgba(255, 107, 107, 0.3);
}

.impact-icon {
  font-size: 56px;
  margin-bottom: 20px;
}

.impact-stat {
  font-size: 48px;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 15px;
}

.impact-desc {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

.case-highlight {
  max-width: 800px;
  margin: 80px auto;
  padding: 60px;
  background: rgba(255, 59, 48, 0.1);
  border: 2px solid rgba(255, 59, 48, 0.3);
  border-radius: 24px;
  text-align: center;
}

.case-icon {
  font-size: 72px;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

.case-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #ff6b6b;
}

.case-content {
  font-size: 20px;
  line-height: 2;
}

.case-number {
  font-size: 32px;
  font-weight: bold;
  color: #FFA500;
  margin: 0 8px;
}

/* 第五章 */
.solutions-wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 60px auto;
}

.solution-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  margin: 30px 0;
  display: flex;
  gap: 30px;
  align-items: flex-start;
  animation: slideIn 0.6s ease-out both;
  transition: all 0.3s;
}

.solution-card:hover {
  transform: translateX(10px);
  border-color: #667eea;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.solution-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-shrink: 0;
}

.solution-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #667eea;
  width: 105px;
}

.solution-text {
  font-size: 18px;
  line-height: 1.8;
  opacity: 0.9;
}

.law-timeline {
  max-width: 1200px;
  margin: 100px auto;
  padding: 80px 60px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.law-timeline::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  animation: floatingLight 20s ease-in-out infinite;
}

@keyframes floatingLight {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-30%, 30%);
  }
}

.law-title {
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 6s ease-in-out infinite;
  position: relative;
  z-index: 1;
  letter-spacing: 1px;
}

.law-events {
  position: relative;
  padding-left: 80px;
  z-index: 1;
}

.law-events::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom,
      #667eea 0%,
      #764ba2 50%,
      #f093fb 100%);
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  animation: timelineGlow 3s ease-in-out infinite;
}

@keyframes timelineGlow {

  0%,
  100% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  }

  50% {
    box-shadow: 0 0 40px rgba(118, 75, 162, 0.8);
  }
}

.law-event {
  position: relative;
  margin-bottom: 50px;
  padding: 25px 30px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  animation: slideInRight 0.8s ease-out both;
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.law-event:hover {
  transform: translateX(10px);
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.law-event::before {
  content: '';
  position: absolute;
  left: -56px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  border: 4px solid #000;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2),
    0 0 20px rgba(102, 126, 234, 0.6);
  transition: all 0.4s ease;
  animation: pulsePoint 2s ease-in-out infinite;
}

@keyframes pulsePoint {

  0%,
  100% {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2),
      0 0 20px rgba(102, 126, 234, 0.6);
  }

  50% {
    box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.1),
      0 0 30px rgba(118, 75, 162, 0.8);
  }
}

.law-event:hover::before {
  transform: translateY(-50%) scale(1.2);
  background: linear-gradient(135deg, #764ba2, #f093fb);
}

.law-event::after {
  content: '';
  position: absolute;
  left: -42px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, transparent);
  transition: width 0.4s ease;
}

.law-event:hover::after {
  width: 40px;
}

.law-year {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  display: inline-block;
  letter-spacing: 0.5px;
}

.law-content {
  font-size: 17px;
  line-height: 1.8;
  opacity: 0.9;
  color: white;
  font-weight: 400;
  transition: all 0.3s ease;
}

.law-event:hover .law-content {
  opacity: 1;
  color: #fff;
}

/* 明信片 */
.postcard-section {
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.08) 0%, #000 60%);
}

.postcard-container {
  max-width: 700px;
  width: 100%;
}

.postcard-design {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.postcard-stamp {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 48px;
  opacity: 0.6;
  transform: rotate(15deg);
}

.postcard-textarea {
  width: 100%;
  min-height: 250px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 25px;
  color: #fff;
  font-size: 18px;
  font-family: inherit;
  line-height: 1.8;
  resize: vertical;
  transition: all 0.3s;
}

.postcard-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
}

.postcard-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.postcard-counter {
  text-align: right;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.6;
}

.postcard-btn {
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: all 0.4s;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.postcard-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(102, 126, 234, 0.6);
}

.btn-icon {
  font-size: 24px;
}

.postcard-result-fade-enter-active,
.postcard-result-fade-leave-active {
  transition: all 0.6s ease;
}

.postcard-result-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.postcard-result {
  margin-top: 50px;
  padding: 50px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border: 2px solid #667eea;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.4);
}

.result-stamp {
  position: absolute;
  top: -20px;
  right: 30px;
  font-size: 64px;
  animation: stampDrop 0.6s ease-out;
}

@keyframes stampDrop {
  from {
    transform: translateY(-100px) rotate(-180deg);
    opacity: 0;
  }

  to {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}

.result-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #667eea;
}

.result-content {
  font-size: 18px;
  line-height: 2;
  white-space: pre-wrap;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  margin-bottom: 20px;
}

.result-date {
  text-align: right;
  font-size: 16px;
  opacity: 0.7;
  font-style: italic;
}

/* 结尾 */
.ending-section {
  min-height: 80vh;
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1) 0%, #000 60%);
}

.ending-animation {
  text-align: center;
  max-width: 800px;
}

.ending-icon {
  font-size: 80px;
  margin-bottom: 40px;
}

.ending-main {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.6;
  margin-bottom: 60px;
}

.ending-highlight {
  display: block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 20px 0;
}

.ending-thanks {
  font-size: 24px;
  opacity: 0.8;
  margin-bottom: 60px;
}

.ending-divider {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  margin: 60px auto;
}

.ending-footer {
  font-size: 16px;
  opacity: 0.6;
  line-height: 1.8;
}

.ending-footer p {
  margin: 10px 0;
}

/* 结尾手机关闭动画 */
.phone-close-section {
  min-height: 100vh;
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, #000 80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.phone-close-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.close-phone-screen {
  width: 300px;
  height: 600px;
  background: linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 60%, #1e1e1e 100%);
  border-radius: 52px;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 30px 80px rgba(102, 126, 234, 0.35),
    inset 0 0 0 2px rgba(255, 255, 255, 0.03),
    0 0 0 6px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  transition: all 5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: phoneIdle 4s ease-in-out infinite;
}

@keyframes phoneIdle {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.close-phone-screen.screen-off {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8),
    inset 0 0 0 2px rgba(255, 255, 255, 0.01),
    0 0 0 6px rgba(0, 0, 0, 0.9);
  animation: none;
}

.close-phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 28px;
  background: linear-gradient(180deg, #111, #000);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.close-notch-speaker {
  width: 60px;
  height: 6px;
  background: linear-gradient(180deg, #222, #111);
  border-radius: 3px;
}

.close-notch-camera {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle at 30% 30%, #3af, #003);
  border-radius: 50%;
  box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.2);
  transition: all 5s ease;
}

.close-phone-screen.screen-off .close-notch-camera {
  background: radial-gradient(circle at 30% 30%, #111, #000);
  box-shadow: none;
}

.close-btn-right,
.close-btn-left {
  position: absolute;
  width: 3px;
  background: linear-gradient(180deg, #6c6c6c, #2e2e2e);
  border-radius: 2px;
  z-index: 11;
}

.close-btn-right.close-power {
  right: -2px;
  top: 110px;
  height: 70px;
}

.close-btn-left.close-volume-up {
  left: -2px;
  top: 120px;
  height: 55px;
}

.close-btn-left.close-volume-down {
  left: -2px;
  top: 185px;
  height: 55px;
}

.close-screen-content {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 60px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
  border-radius: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  overflow: hidden;
  position: relative;
  transition: all 5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.1);
}

.close-screen-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 1;
  transition: opacity 5s ease;
}

.close-phone-screen.screen-off .close-screen-content {
  background: #000;
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 1);
}

.close-phone-screen.screen-off .close-screen-content::before {
  opacity: 0;
}

.close-screen-content::after {
  content: '';
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
  border-radius: 2px;
  opacity: 0.9;
  transition: opacity 5s ease;
}

.close-phone-screen.screen-off .close-screen-content::after {
  opacity: 0;
}

.close-text {
  font-size: 32px;
  text-align: center;
  line-height: 1.6;
  font-weight: 700;
  text-shadow: 0 4px 30px rgba(255, 255, 255, 0.5);
  transition: all 5s ease;
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}

.close-phone-screen.screen-off .close-text {
  opacity: 0;
  transform: scale(0.3);
  filter: blur(10px);
}

.scroll-hint {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  animation: fadeInOut 2s ease-in-out infinite;
  transition: color 0.3s ease;
}

@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }
}

/* 响应式 */
@media (max-width: 1024px) {

  .types-grid,
  .production-chain,
  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .circle-structure {
    width: 500px;
    height: 500px;
  }
}

@media (max-width: 768px) {

  /* 移动端隐藏导航栏 */
  .nav-bar {
    display: none !important;
  }

  .gradient-text {
    font-size: 32px;
    margin-bottom: 40px;
  }

  .section {
    padding: 60px 15px;
  }

  .glass-card {
    padding: 30px 20px;
  }

  .question {
    font-size: 20px;
  }

  .question-big {
    font-size: 24px;
  }

  .time-options {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .chart-container {
    height: 350px;
    padding: 25px 15px;
  }

  .platform-stats {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 48px;
  }

  .alert-text {
    font-size: 24px;
    padding: 40px 25px;
  }

  .alert-icon {
    font-size: 56px;
  }

  .definition-title,
  .section-title {
    font-size: 28px;
  }

  .definition-content p {
    font-size: 16px;
  }

  .data-showcase {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .data-number {
    font-size: 48px;
  }

  .screen-time-info {
    grid-template-columns: 1fr;
  }

  .types-grid {
    grid-template-columns: 1fr;
  }

  .timeline-container {
    padding: 40px 0;
  }

  .timeline-content {
    width: 85%;
    padding: 25px;
  }

  .timeline-event.left .timeline-content,
  .timeline-event.right .timeline-content {
    margin: 0 7.5%;
  }

  .event-title {
    font-size: 18px;
  }

  .economic-comparison {
    flex-direction: column;
    gap: 30px;
  }

  .comparison-item {
    padding: 40px;
    min-width: auto;
  }

  .comparison-value {
    font-size: 48px;
  }

  .comparison-vs {
    font-size: 36px;
    transform: rotate(90deg);
  }

  .heart-container {
    font-size: 100px;
  }

  .heart-text {
    font-size: 22px;
  }

  .heart-highlight {
    font-size: 28px;
  }

  .dual-chart-container {
    grid-template-columns: 1fr;
  }

  .distribution-comparison,
  .growth-comparison,
  .stats-grid,
  .audience-groups {
    grid-template-columns: 1fr;
  }

  .production-chain {
    grid-template-columns: repeat(2, 1fr);
  }

  .formula-content {
    flex-direction: column;
    padding: 30px;
  }

  .formula-part {
    font-size: 18px;
  }

  .circle-structure {
    width: 350px;
    height: 350px;
  }

  .center-child {
    width: 90px;
    height: 90px;
    font-size: 40px;
  }

  .child-label {
    font-size: 14px;
  }

  .perspective-item {
    width: 80px;
    height: 80px;
  }

  .perspective-icon {
    font-size: 28px;
  }

  .perspective-label {
    font-size: 12px;
  }

  .modal-content {
    padding: 40px 30px;
    max-width: 90%;
  }

  .modal-icon {
    font-size: 64px;
  }

  .modal-title {
    font-size: 28px;
  }

  .modal-stat {
    font-size: 48px;
  }

  .modal-text {
    font-size: 16px;
    color: white;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }

  .case-highlight {
    padding: 40px 25px;
  }

  .case-title {
    font-size: 24px;
  }

  .case-content {
    font-size: 16px;
  }

  .case-number {
    font-size: 24px;
  }

  .solution-card {
    flex-direction: column;
    padding: 30px;
  }

  .law-timeline {
    padding: 50px 30px;
  }

  .law-title {
    font-size: 28px;
  }

  .law-events {
    padding-left: 50px;
  }

  .law-event {
    padding: 20px;
    margin-bottom: 35px;
  }

  .law-event::before {
    left: -42px;
    width: 16px;
    height: 16px;
  }

  .law-event::after {
    display: none;
  }

  .law-year {
    font-size: 18px;
  }

  .law-content {
    font-size: 15px;
  }

  .postcard-design {
    padding: 30px 20px;
  }

  .postcard-textarea {
    min-height: 200px;
    font-size: 16px;
    padding: 20px;
  }

  .postcard-btn {
    font-size: 18px;
    padding: 18px;
  }

  .postcard-result {
    padding: 30px 20px;
  }

  .result-title {
    font-size: 22px;
  }

  .result-content {
    font-size: 16px;
    padding: 20px;
  }

  .ending-main {
    font-size: 32px;
  }

  .ending-thanks {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .phone-screen {
    width: 250px;
    height: 500px;
  }

  .opening-text {
    font-size: 22px;
  }

  .gradient-text {
    font-size: 28px;
  }

  .question {
    font-size: 18px;
  }

  .time-option {
    font-size: 16px;
    padding: 18px;
  }

  .chart-container {
    padding: 20px 10px;
    height: 300px;
  }

  .data-number {
    font-size: 40px;
  }

  .stat-number {
    font-size: 40px;
  }

  .alert-text {
    font-size: 20px;
    padding: 30px 20px;
  }

  .heart-container {
    font-size: 80px;
  }

  .circle-structure {
    width: 280px;
    height: 280px;
  }

  .center-child {
    width: 70px;
    height: 70px;
    font-size: 32px;
  }

  .perspective-item {
    width: 60px;
    height: 60px;
  }

  .perspective-icon {
    font-size: 20px;
  }

  .perspective-label {
    font-size: 10px;
  }

  .modal-content {
    padding: 30px 20px;
  }

  .modal-title {
    font-size: 24px;
  }

  .ending-main {
    font-size: 24px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
}

/* 打印样式 */
@media print {

  .nav-bar,
  .scroll-indicator,
  .postcard-btn {
    display: none;
  }

  .section {
    page-break-inside: avoid;
    min-height: auto;
  }

  * {
    animation: none !important;
    transition: none !important;
  }
}

/* 性能优化 */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {

  .glass-card,
  .chart-container,
  .modal-content {
    border-width: 3px;
  }

  .time-option,
  .perspective-item {
    border-width: 3px;
  }
}

/* 暗色主题强化 */
@media (prefers-color-scheme: dark) {
  .digital-child-labor {
    background: #000;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.08);
  }
}
</style>