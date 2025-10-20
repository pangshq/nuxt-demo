<script setup lang="ts">
const token = useCookie<string | null>('token')
const logout = async () => {
  token.value = null
  await navigateTo('/login')
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="首页" />
    <!-- 顶部搜索框：聚焦即进入搜索页 -->
    <div class="search-wrap">
      <van-search
        placeholder="请输入需要搜索的关键词"
        shape="round"
        readonly
        @focus="navigateTo('/search')"
        @click-input="navigateTo('/search')"
      />
    </div>
    <div class="content">
      <van-cell-group inset>
        <van-cell title="欢迎" value="已登录" />
        <van-cell title="示例" label="这是一个受保护的页面" />
        <van-cell
          title="基金详情演示"
          label="跳转到示例基金详情（含 ECharts 折线图）"
          is-link
          @click="navigateTo('/fund/515720')"
        />
      </van-cell-group>
      <div class="actions">
        <van-button type="danger" block round @click="logout">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.search-wrap { padding: 10px 12px 0; background: #f7f8fa; }
.content { padding: 16px; }
.actions { margin: 24px 16px 0; }
</style>
