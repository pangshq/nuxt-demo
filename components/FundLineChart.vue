<script setup lang="ts">
// Lightweight ECharts wrapper that only runs on client.
// Props: x-axis labels and multiple numeric series (as percentages).
import type { Ref } from 'vue'

type LineSeries = {
  name: string
  data: number[]
  color?: string
  area?: boolean
}

const props = withDefaults(defineProps<{
  x: string[]
  series: LineSeries[]
  height?: number | string
  // When used inside tabs, tell the chart whether it is currently visible
  visible?: boolean
}>(), {
  visible: true,
})

const chartEl: Ref<HTMLDivElement | null> = ref(null)
let chart: any // typed lazily after dynamic import
let ro: ResizeObserver | null = null

const dispose = () => {
  if (chart) {
    chart.dispose()
    chart = null
  }
}

const waitForSize = async () => {
  if (!process.client || !chartEl.value) return
  let tries = 0
  // Wait until element has layout width (avoid 0-width init)
  while (chartEl.value && chartEl.value.clientWidth === 0 && tries < 30) {
    await new Promise((r) => requestAnimationFrame(r))
    tries++
  }
}

const render = async () => {
  if (!process.client) return
  if (!chartEl.value) return
  if (!props.visible) return

  // Lazy import on client to avoid SSR issues
  const echarts = await import('echarts')

  // Init or reuse
  await waitForSize()
  chart = chart || echarts.init(chartEl.value, undefined, { renderer: 'canvas' })

  const colors = props.series.map((s) => s.color).filter(Boolean) as string[]
  const option = {
    color: colors.length ? colors : undefined,
    grid: { left: 12, right: 12, top: 16, bottom: 24, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      valueFormatter: (v: number) => `${v.toFixed(2)}%`,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.x,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%', color: '#999' },
      splitLine: { lineStyle: { color: '#eee' } },
    },
    series: props.series.map((s) => ({
      type: 'line',
      name: s.name,
      data: s.data,
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 2 },
      areaStyle: s.area
        ? {
            opacity: 0.15,
          }
        : undefined,
    })),
    legend: {
      top: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: '#666' },
    },
  }

  chart.setOption(option, true)
  chart.resize()
}

onMounted(() => {
  // Only render when visible to avoid 0-width init
  if (props.visible) {
    // ensure layout is ready
    requestAnimationFrame(() => requestAnimationFrame(() => render()))
  }
  const onResize = () => chart && chart.resize()
  window.addEventListener('resize', onResize)
  // Observe element size changes
  if ('ResizeObserver' in window && chartEl.value) {
    ro = new ResizeObserver(() => chart && chart.resize())
    ro.observe(chartEl.value)
  }
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    if (ro) ro.disconnect()
    dispose()
  })
})

// Re-render when props change
watch(
  () => ({ x: props.x, s: props.series }),
  () => render(),
  { deep: true }
)

// When becoming visible (e.g., switching tabs), trigger a deferred resize
watch(
  () => props.visible,
  async (v) => {
    if (!process.client) return
    if (v) {
      await nextTick()
      // Double rAF ensures layout after Vant tab transitions
      requestAnimationFrame(() => requestAnimationFrame(() => render()))
    }
  }
)

// Clean up on Vite HMR to avoid duplicate instances
if (import.meta && (import.meta as any).hot) {
  ;(import.meta as any).hot.dispose(() => dispose())
}
</script>

<template>
  <client-only>
    <div ref="chartEl" :style="{ height: (height ?? 260) + 'px', width: '100%' }" />
  </client-only>
  
</template>

<style scoped>
/* container takes the given height */
</style>
