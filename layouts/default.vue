<script setup lang="ts">
// Global layout with a bottom Tabbar
</script>

<template>
  <div class="app-layout">
    <slot />
    <ChatWidget />
    <van-tabbar route fixed placeholder safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/strategy" icon="bulb-o">策略</van-tabbar-item>
      <van-tabbar-item replace to="/tools" icon="apps-o">工具</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<style scoped>
.app-layout { min-height: 100vh; background: #f7f8fa; }
</style>
