import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ contact?: string; category?: string; content?: string }>(event)
  const id = Date.now().toString(36)
  // In real app, write to DB or send to a webhook
  console.log('[feedback]', { id, ...body })
  return { ok: true, id }
})

