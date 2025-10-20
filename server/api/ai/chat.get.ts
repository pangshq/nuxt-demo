import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler((event) => {
  const q = getQuery(event)
  const text = (q.text as string || '').trim()
  if (!text) return { reply: '请通过参数 text 传入问题，例如 /api/ai/chat?text=你好' }
  return { reply: `你说的是：“${text}”。当前为本地示例服务，返回的是演示答案。` }
})

