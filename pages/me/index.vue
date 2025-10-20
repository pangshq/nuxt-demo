<script setup lang="ts">
const token = useCookie<string | null>('token')
const logout = async () => {
  token.value = null
  await navigateTo('/login')
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="我的" />
    <div class="content">
      <van-cell-group inset>
        <van-cell title="账号" :value="token ? '已登录' : '未登录'" />
        <van-cell title="意见反馈" is-link to="/me/feedback" />
        <van-cell title="关于" value="Nuxt + Vant 示例" />
      </van-cell-group>
      <div class="actions">
        <van-button type="danger" block round @click="logout">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding: 16px; }
.actions { margin: 24px 16px 0; }
</style>
