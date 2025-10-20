<script setup lang="ts">
const username = ref('')
const password = ref('')
const loading = ref(false)
const route = useRoute()
const token = useCookie<string | null>('token', { maxAge: 60 * 60 * 24 * 7 })

const onSubmit = async () => {
  loading.value = true
  try {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 300))
    token.value = 'demo-token'
    const redirect = (route.query.redirect as string) || '/'
    await navigateTo(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="登录" />
    <div class="content">
      <van-cell-group inset>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          clearable
        />
        <van-field
          v-model="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          clearable
        />
      </van-cell-group>
      <div class="actions">
        <van-button type="primary" round block :loading="loading" @click="onSubmit">
          登录
        </van-button>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding: 16px; }
.actions { margin: 24px 16px 0; }
</style>

