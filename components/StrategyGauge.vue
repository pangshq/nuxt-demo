<script setup lang="ts">
// ECharts Gauge with segmented color, ticks and optional pointer
// Keep it small and mobile-friendly.
const props = defineProps<{
  value: number
  label?: string
  height?: number
  // Custom color stops for the ring. Each item: [ratio(0-1), color]
  stops?: [number, string][]
  showTicks?: boolean
  showNeedle?: boolean
}>()

const clamp = (v: number) => Math.max(0, Math.min(100, v))

const ticks = [0, 25, 50, 75, 100]
const stopsDefault: [number, string][] = [
  [0.3, '#07c160'], // safe
  [0.6, '#ffb300'], // warn
  [1, '#ff4d4f'],   // danger
]

const option = computed(() => {
  const v = clamp(props.value)
  const stops = props.stops ?? stopsDefault
  const showTicks = props.showTicks !== false
  const base = {
    type: 'gauge',
    min: 0,
    max: 100,
    startAngle: 220,
    endAngle: -40,
    radius: '95%',
    axisLine: { lineStyle: { width: 12, color: stops } },
    splitLine: { show: false },
    axisTick: {
      show: showTicks,
      length: 4,
      splitNumber: 4,
      lineStyle: { color: '#ddd', width: 1 },
      distance: -10,
    },
    axisLabel: {
      show: showTicks,
      distance: -26,
      color: '#aaa',
      fontSize: 10,
      formatter: (val: number) => (ticks.includes(val) ? String(val) : ''),
    },
    pointer: { show: false },
    progress: { show: false },
    detail: {
      formatter: (num: number) => `${Math.round(num)}`,
      fontSize: 22,
      color: '#2b2b2b',
      offsetCenter: [0, '0%'],
    },
    anchor: { show: false },
    title: {
      show: !!props.label,
      offsetCenter: [0, '40%'],
      color: '#666',
      fontSize: 12,
    },
    data: [{ value: v, name: props.label ?? '' }],
  } as any

  // Optional needle overlay serie
  const needle = {
    type: 'gauge',
    min: 0,
    max: 100,
    startAngle: 220,
    endAngle: -40,
    radius: '100%',
    axisLine: { lineStyle: { width: 0 } },
    splitLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    pointer: { show: true, length: '60%', width: 2, itemStyle: { color: '#2f88ff' } },
    anchor: { show: true, size: 6, itemStyle: { color: '#2f88ff' } },
    detail: { show: false },
    title: { show: false },
    data: [{ value: v }],
    silent: true,
    animation: false,
    z: 10,
  } as any

  return { series: [base, ...(props.showNeedle === false ? [] : [needle])] }
})
</script>

<template>
  <div class="gauge">
    <EChartBase :option="option" :height="height ?? 140" />
  </div>
  
</template>

<style scoped>
.gauge { width: 140px; text-align: center; }
</style>
