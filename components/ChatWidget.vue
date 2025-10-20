<script setup lang="ts">
// Floating chat widget + bottom popup (50% height)
type Msg = { role: 'user' | 'assistant'; text: string; time: number }

const open = ref(false)
const input = ref('')
const loading = ref(false)
const messages = ref<Msg[]>([
  { role: 'assistant', text: '您好，我是智能客服。可以问我关于页面功能、基金指标等问题~', time: Date.now() },
])

const send = async () => {
  const text = input.value.trim()
  if (!text) return
  input.value = ''
  messages.value.push({ role: 'user', text, time: Date.now() })
  loading.value = true
  try {
    const res = await $fetch<{ reply: string }>('/api/ai/chat', {
      method: 'POST',
      body: { text },
      headers: { 'content-type': 'application/json' },
    })
    messages.value.push({ role: 'assistant', text: res.reply, time: Date.now() })
  } catch (e) {
    messages.value.push({ role: 'assistant', text: '抱歉，服务暂时不可用，请稍后再试。', time: Date.now() })
  } finally {
    loading.value = false
    // scroll to bottom next tick
    await nextTick()
    const pane = document.querySelector('.ai-chat-pane .list') as HTMLElement | null
    pane && pane.scrollTo({ top: pane.scrollHeight })
  }
}

const onToggle = () => (open.value = !open.value)
</script>

<template>
  <client-only>
    <div>
      <van-floating-bubble axis="xy" icon="chat-o" :offset="{ x: 20, y: 100 }" teleport="body" @click="onToggle" />

      <van-popup v-model:show="open" position="bottom" class="ai-chat-pane" :style="{ height: '50vh' }" round safe-area-inset-bottom>
        <div class="hd">
          <div class="title">AI 智能客服</div>
          <van-icon name="cross" size="18" @click="open = false" />
        </div>
        <div class="list">
          <div v-for="m in messages" :key="m.time" class="msg" :class="m.role">
            <div class="bubble">{{ m.text }}</div>
          </div>
          <van-loading v-if="loading" size="20" class="loading" />
        </div>
        <div class="input">
          <van-field v-model="input" placeholder="请输入问题，例如：近1年回撤多少？" clearable @keyup.enter="send" />
          <van-button type="primary" size="small" :loading="loading" @click="send">发送</van-button>
        </div>
      </van-popup>
    </div>
  </client-only>
</template>

<style scoped>
.ai-chat-pane { display: flex; flex-direction: column; padding: 8px 8px 12px; }
.hd { display: flex; align-items: center; justify-content: space-between; padding: 6px 4px 8px; }
.title { font-weight: 600; }
.list { flex: 1; overflow-y: auto; padding: 8px 4px; }
.msg { display: flex; margin: 6px 0; }
.msg.user { justify-content: flex-end; }
.msg .bubble { max-width: 80%; padding: 8px 10px; border-radius: 12px; line-height: 1.3; }
.msg.user .bubble { background: #1989fa; color: #fff; border-bottom-right-radius: 4px; }
.msg.assistant .bubble { background: #f5f5f5; color: #333; border-bottom-left-radius: 4px; }
.input { display: flex; gap: 8px; align-items: center; padding-top: 6px; }
.input :deep(.van-field) { flex: 1; background: #f7f8fa; border-radius: 8px; }
.loading { display: flex; justify-content: center; padding: 8px 0; }
</style>
