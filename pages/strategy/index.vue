<script setup lang="ts">
import { showToast } from 'vant'
// 策略详情页（示例 UI，静态数据 + 可扩展占位）
type TabKey = 'recommend' | 'contrarian' | 'trend'
const active = ref<TabKey>('trend')

// 简单偏好存储：订阅与自选（Cookie 持久化）
const subscribed = useCookie<string[]>('subscribedStrategies', { default: () => [] })
const watchlist = useCookie<string[]>('watchlistStrategies', { default: () => [] })
const isSubscribed = (id: string) => subscribed.value.includes(id)
const isWatchlisted = (id: string) => watchlist.value.includes(id)
const toggleSubscribe = (id: string) => {
  const idx = subscribed.value.indexOf(id)
  if (idx >= 0) {
    subscribed.value.splice(idx, 1)
    showToast('已取消订阅')
  } else {
    subscribed.value.push(id)
    showToast('订阅成功')
  }
}
const toggleWatchlist = (id: string) => {
  const idx = watchlist.value.indexOf(id)
  if (idx >= 0) {
    watchlist.value.splice(idx, 1)
    showToast('已从自选移除')
  } else {
    watchlist.value.push(id)
    showToast('已加入自选')
  }
}

const strategies = ref([
  {
    id: 'overseas-plus',
    title: '海外Plus恐贪定投·第二期',
    tag: { text: '逆向', type: 'danger' as const },
    kpis: [
      { label: '本期收益率', value: '+5.23%', cls: 'pos' },
      { label: '往期最高收益率', value: '8.39%', cls: '' },
      { label: '近3年累计收益', value: '42.10%', cls: 'pos' },
      { label: '夏普比', value: '1.05', cls: '' },
      { label: '波动率', value: '16.2%', cls: '' },
      { label: '2025-10-15(最新)', value: '', cls: 'muted' },
    ],
    gauge: { value: 23, label: '极度恐惧' },
    invest: { progress: 10, total: 50, weekCount: 4 },
    intro:
      '恐贪定投海外版和恐贪定投类似，是结合美股恐惧贪婪指数，按周定投的长期投资计划...',
  },
  {
    id: 'robot',
    title: '机器人',
    tag: { text: '趋势', type: 'primary' as const },
    badge: 'V限免',
    kpis: [
      { label: '全部超额', value: '+84.67%', cls: 'pos' },
      { label: '近1年最大回撤', value: '-9.15%', cls: 'neg' },
      { label: '近3年累计收益', value: '58.22%', cls: 'pos' },
      { label: '夏普比', value: '0.86', cls: '' },
      { label: '波动率', value: '22.4%', cls: '' },
      { label: '2025-10-16(最新)', value: '', cls: 'muted' },
    ],
    gauge: { value: 13, label: '恐贪值' },
    intro:
      '趋势策略回测：T日第一次大于50，T+1日收盘价买入；(T日第一次大于90，T+1日收盘价卖出 或者 T日第一次小于50，T+1日收盘价卖出)',
  },
])

const progressPct = (p: number, t: number) => Math.min(100, Math.round((p / t) * 100))
</script>

<template>
  <div class="page">
    <van-nav-bar title="策略详情" />
    <div class="tabs">
      <van-tabs v-model:active="active" shrink>
        <van-tab name="recommend" title="推荐" />
        <van-tab name="contrarian" title="逆向" />
        <van-tab name="trend" title="趋势" />
      </van-tabs>
    </div>

    <div class="list">
      <!-- Card A -->
      <div class="card" v-for="s in strategies" :key="s.id">
        <div class="hd">
          <div class="lt">
            <div class="title">
              {{ s.title }}
              <van-icon name="arrow" />
            </div>
            <div class="tags">
              <van-tag v-if="s.badge" type="warning" size="small" plain>{{ s.badge }}</van-tag>
              <van-tag :type="s.tag.type" plain round size="small">{{ s.tag.text }}</van-tag>
            </div>
          </div>
          <!-- <div class="rt">
            <StrategyGauge :value="s.gauge.value" :label="s.gauge.label" />
          </div> -->
        </div>

        <div class="kpis">
          <div v-for="k in s.kpis" :key="k.label" class="kpi">
            <div class="val" :class="k.cls">{{ k.value }}</div>
            <div class="lab">{{ k.label }}</div>
          </div>
        </div>

        <!-- <div v-if="s.invest" class="invest">
          <div class="cell">
            <span class="bold">定投进度：</span>
            <span class="pill">{{ s.invest.progress }}/{{ s.invest.total }}</span>
            <van-progress
              class="bar"
              :percentage="progressPct(s.invest.progress, s.invest.total)"
              :stroke-width="8"
              track-color="#eee"
              color="#2f88ff"
              :show-pivot="false"
            />
          </div>
          <div class="cell">
            <span class="link">往期收益</span>
            <van-icon name="arrow" />
          </div>
          <div class="cell right">
            <span class="bold">本周已投{{ s.invest.weekCount }}份</span>
            <div class="coins">
              <van-icon name="gold-coin-o" v-for="i in s.invest.weekCount" :key="i" color="#f5c646" />
            </div>
          </div>
        </div> -->

        <div class="intro">
          <div class="quote">“</div>
          <div class="text">{{ s.intro }} <span class="link">查看全文</span></div>
        </div>

        <div class="ops">
          <van-button
            size="small"
            round
            :type="isSubscribed(s.id) ? 'primary' : 'danger'"
            @click="toggleSubscribe(s.id)"
          >{{ isSubscribed(s.id) ? '已订阅' : '订阅' }}</van-button>
          <van-button
            size="small"
            round
            plain
            :icon="isWatchlisted(s.id) ? 'star' : 'star-o'"
            @click="toggleWatchlist(s.id)"
          >{{ isWatchlisted(s.id) ? '已在自选' : '加自选' }}</van-button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.tabs :deep(.van-tabs__wrap) { background: #fff; }
.list { padding: 12px; }
.card { background: #fff; border-radius: 10px; padding: 12px; margin-bottom: 12px; }
.hd { display: flex; gap: 12px; }
.lt { flex: 1; }
.title { font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
.tags { margin-top: 6px; display: flex; gap: 6px; align-items: center; }
.rt { display: flex; align-items: center; }
.kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 0; margin-top: 12px; }
.kpi { padding: 6px 0; }
.kpi .val { font-size: 18px; font-weight: 700; }
.kpi .val.pos { color: #ff4d4f; }
.kpi .val.neg { color: #07c160; }
.kpi .val.muted { color: #999; font-weight: 400; font-size: 12px; }
.kpi .lab { color: #888; font-size: 12px; margin-top: 2px; }
.invest { display: grid; grid-template-columns: 1.3fr 1fr 1.4fr; align-items: center; gap: 10px; background: #fafafa; border-radius: 8px; padding: 10px; margin-top: 8px; }
.invest .cell { display: flex; align-items: center; gap: 6px; }
.invest .cell.right { justify-content: flex-end; gap: 8px; }
.invest .bar { width: 100%; max-width: 180px; }
.bold { font-weight: 700; }
.pill { background: #2f88ff; color: #fff; border-radius: 12px; padding: 1px 8px; font-size: 12px; }
.coins { display: flex; gap: 6px; }
.link { color: #2f88ff; font-size: 12px; }
.intro { display: grid; grid-template-columns: 20px 1fr; gap: 8px; background:#f7f8fa; border-radius:8px; padding: 10px; margin-top: 10px; color:#666; }
.intro .quote { font-size: 20px; color:#ccc; line-height: 1; }
.intro .text { font-size: 13px; }
.ops { display: flex; gap: 8px; justify-content: flex-end; margin-top: 10px; }
</style>
