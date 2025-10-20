<script setup lang="ts">
import { showToast } from 'vant'
const contact = ref('')
const category = ref('功能建议')
const content = ref('')
const loading = ref(false)

const categories = ['功能建议', '数据问题', 'Bug反馈', '其他']

const onSubmit = async () => {
  if (!content.value.trim()) {
    return showToast('请填写问题描述')
  }
  loading.value = true
  try {
    const res = await $fetch<{ ok: boolean; id: string }>(
      '/api/feedback',
      {
        method: 'POST',
        body: { contact: contact.value, category: category.value, content: content.value },
        headers: { 'content-type': 'application/json' },
      }
    )
    if (res.ok) {
      showToast('已提交，感谢反馈！')
      await new Promise((r) => setTimeout(r, 300))
      history.length > 1 ? history.back() : navigateTo('/me')
    }
  } finally {
    loading.value = false
  }
}

const onBack = () => history.length > 1 ? history.back() : navigateTo('/me')
</script>

<template>
  <div class="page">
    <van-nav-bar title="意见反馈" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell-group inset>
        <van-field v-model="category" label="类型">
          <template #input>
            <van-radio-group v-model="category" direction="horizontal">
              <van-radio v-for="c in categories" :key="c" :name="c">{{ c }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-model="content" type="textarea" rows="5" label="描述" placeholder="请详细描述你的问题或建议" />
        <van-field v-model="contact" label="联系方式" placeholder="选填：手机号/微信/邮箱" />
      </van-cell-group>
      <div class="actions">
        <van-button type="primary" block round :loading="loading" @click="onSubmit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding: 16px; }
.actions { margin: 24px 16px 0; }
</style>
