<script setup lang="ts">
const route = useRoute()
const code = computed(() => String(route.params.code || ''))

type RangeKey = 'ytd' | '1m' | '3m' | '6m' | '1y'
const ranges: { key: RangeKey; label: string }[] = [
  { key: 'ytd', label: '今年来' },
  { key: '1m', label: '近1月' },
  { key: '3m', label: '近3月' },
  { key: '6m', label: '近6月' },
  { key: '1y', label: '近1年' },
]
const range = ref<RangeKey>('1y')
const showBench = ref(true)
const activeTab = ref<'trend' | 'drawdown' | 'nav' | 'volume'>('trend')
const autoRefresh = ref(false)
const REFRESH_MS = 5000

const { data, pending, refresh } = await useFetch(() => `/api/fund/${code.value}` as const, {
  query: { range },
  watch: [range, code],
})

const x = computed(() => data.value?.chart.x ?? [])
const perfSeries = computed(() => {
  const fund = data.value?.chart.fund ?? []
  const bench = data.value?.chart.bench ?? []
  const list = [
    { name: '本基金', data: fund, color: '#ff4d4f', area: true },
  ] as any[]
  if (showBench.value) list.push({ name: '沪深300', data: bench, color: '#2f88ff' })
  return list
})

const ddSeries = computed(() => [{
  name: '最大回撤',
  data: data.value?.chart.drawdown ?? [],
  color: '#ff7a45',
  area: true,
}])

const navOption = computed(() => {
  const nav = data.value?.chart.nav ?? []
  return {
    grid: { left: 12, right: 12, top: 16, bottom: 24, containLabel: true },
    tooltip: { trigger: 'axis', valueFormatter: (v: number) => v.toFixed(4) },
    xAxis: { type: 'category', boundaryGap: false, data: x.value, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#999' } },
    yAxis: { type: 'value', axisLabel: { color: '#999' }, splitLine: { lineStyle: { color: '#eee' } } },
    series: [{ type: 'line', data: nav, smooth: true, symbol: 'none', lineStyle: { width: 2, color: '#2f88ff' } }],
  }
})

const volOption = computed(() => {
  const vol = data.value?.chart.volume ?? []
  return {
    grid: { left: 12, right: 12, top: 16, bottom: 24, containLabel: true },
    tooltip: { trigger: 'axis', valueFormatter: (v: number) => `${v.toFixed(0)}k` },
    xAxis: { type: 'category', data: x.value, axisLabel: { color: '#999' }, axisTick: { show: false }, axisLine: { show: false } },
    yAxis: { type: 'value', axisLabel: { color: '#999', formatter: '{value}k' }, splitLine: { lineStyle: { color: '#eee' } } },
    series: [{ type: 'bar', data: vol, itemStyle: { color: '#91cc75' }, barMaxWidth: 10 }],
  }
})

// Back helper
const onBack = () => history.length > 1 ? history.back() : navigateTo('/')

// Auto refresh timer for hot update
let timer: any = null
const stopTimer = () => { if (timer) { clearInterval(timer); timer = null } }
watch(autoRefresh, (v) => {
  stopTimer()
  if (v) timer = setInterval(() => refresh(), REFRESH_MS)
})
onUnmounted(() => stopTimer())
</script>

<template>
  <div class="page">
    <van-nav-bar title="基金详情" left-arrow @click-left="onBack" />

    <!-- 基本信息 -->
    <div class="card header">
      <div class="title">{{ data?.info.name }}<span class="code">{{ data?.info.code }}</span></div>
      <div class="tags">
        <van-tag type="primary" plain round>场内交易</van-tag>
        <van-tag plain round>股票指数</van-tag>
      </div>
      <div class="kpis">
        <div class="kpi">
          <div class="value neg">{{ (data?.info.dayChangePct ?? 0).toFixed(2) }}%</div>
          <div class="label">日涨跌幅</div>
        </div>
        <div class="kpi">
          <div class="value">{{ (data?.info.ytdPct ?? 0).toFixed(2) }}%</div>
          <div class="label">今年以来</div>
        </div>
        <div class="kpi">
          <div class="value neg">{{ (data?.info.sinceInceptionAnnualPct ?? 0).toFixed(2) }}%</div>
          <div class="label">成立来年化</div>
        </div>
        <div class="kpi">
          <div class="value">{{ (data?.info.latestNav ?? 0).toFixed(4) }}</div>
          <div class="label">最新净值</div>
        </div>
      </div>
    </div>

    <!-- 业绩走势 -->
    <div class="card">
      <div class="tabs">
        <div class="toolbar">
          <div class="spacer"></div>
          <div class="rt">
            <span class="label">实时更新</span>
            <van-switch v-model="autoRefresh" size="20" />
          </div>
        </div>
        <van-tabs v-model:active="activeTab" shrink sticky :offset-top="46" :lazy-render="false">
          <van-tab name="trend" title="业绩走势">
            <div class="tab-head">
              <van-checkbox v-model="showBench" shape="square" icon-size="16">
                沪深300
              </van-checkbox>
            </div>
            <FundLineChart :x="x" :series="perfSeries" :height="260" :visible="activeTab === 'trend'" />
          </van-tab>
          <van-tab name="drawdown" title="回撤">
            <FundLineChart :x="x" :series="ddSeries" :height="260" :visible="activeTab === 'drawdown'" />
          </van-tab>
          <van-tab name="nav" title="净值">
            <EChartBase :option="navOption" :height="260" :visible="activeTab === 'nav'" />
          </van-tab>
          <van-tab name="volume" title="成交量">
            <EChartBase :option="volOption" :height="260" :visible="activeTab === 'volume'" />
          </van-tab>
        </van-tabs>
      </div>

      <div class="range">
        <van-button
          v-for="r in ranges"
          :key="r.key"
          size="small"
          round
          :type="range === r.key ? 'primary' : 'default'"
          plain
          @click="range = r.key"
        >
          {{ r.label }}
        </van-button>
      </div>
    </div>

    <div class="placeholder" />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.card { margin: 12px; padding: 12px; background: #fff; border-radius: 8px; }
.header .title { font-weight: 600; font-size: 18px; }
.header .code { margin-left: 8px; color: #999; font-size: 12px; }
.tags { margin-top: 6px; display: flex; gap: 6px; }
.kpis { margin-top: 10px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.kpi { text-align: center; }
.kpi .value { font-size: 16px; font-weight: 600; color: #07c160; }
.kpi .value.neg { color: #ff4d4f; }
.kpi .label { color: #888; font-size: 12px; margin-top: 2px; }
.section-title { display: flex; justify-content: space-between; align-items: center; font-weight: 600; margin-bottom: 4px; }
.tabs :deep(.van-tabs__wrap) { border-bottom: 1px solid #f0f0f0; }
.tab-head { display: flex; justify-content: flex-end; padding: 8px 0; }
.toolbar { display: flex; align-items: center; padding: 4px 0 8px; }
.toolbar .spacer { flex: 1; }
.toolbar .rt { display: flex; align-items: center; gap: 6px; color: #666; }
.toolbar .label { font-size: 12px; }
.range { display: flex; gap: 8px; justify-content: space-between; padding: 8px 0 0; }
.placeholder { height: 24px; }
</style>
