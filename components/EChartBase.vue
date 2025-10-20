<script setup lang="ts">
// Generic ECharts container. You pass full `option`.
// Handles client-only lazy import and resize.
import type { Ref } from 'vue'

const props = withDefaults(defineProps<{
  option: any
  height?: number | string
  visible?: boolean
}>(), {
  visible: true,
})

const chartEl: Ref<HTMLDivElement | null> = ref(null)
let chart: any
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
  while (chartEl.value && chartEl.value.clientWidth === 0 && tries < 30) {
    await new Promise((r) => requestAnimationFrame(r))
    tries++
  }
}

const render = async () => {
  if (!process.client || !chartEl.value) return
  if (!props.visible) return
  const echarts = await import('echarts')
  await waitForSize()
  chart = chart || echarts.init(chartEl.value)
  chart.setOption(props.option, true)
  chart.resize()
}

onMounted(() => {
  if (props.visible) {
    requestAnimationFrame(() => requestAnimationFrame(() => render()))
  }
  const onResize = () => chart && chart.resize()
  window.addEventListener('resize', onResize)
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

watch(
  () => props.option,
  () => render(),
  { deep: true }
)

watch(
  () => props.visible,
  async (v) => {
    if (!process.client) return
    if (v) {
      await nextTick()
      requestAnimationFrame(() => requestAnimationFrame(() => render()))
    }
  }
)

// Clean up on Vite HMR
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
</style>
