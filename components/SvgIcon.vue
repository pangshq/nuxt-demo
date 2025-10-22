<script setup lang="ts">
// Simple SVG icon wrapper that loads assets from /public/icons
// Keep all icons at 24x24 viewBox, rendered at size (default 28)
const props = withDefaults(defineProps<{ name: string; size?: number; alt?: string }>(), {
  size: 28,
  alt: '',
})
const src = computed(() => `/icons/${props.name}.svg`)
</script>

<template>
  <img :src="src" :width="size" :height="size" :alt="alt || name" loading="lazy" />
</template>

<style scoped>
img { display: block; }
</style>

