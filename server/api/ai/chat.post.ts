import { defineEventHandler, readBody } from 'h3'

// Simple mock AI reply for local dev (no external network)
export default defineEventHandler(async (event) => {
  const body = await readBody<{ text: string }>(event)
  const q = (body?.text || '').trim()
  if (!q) return { reply: '请描述您的问题～' }

  const lower = q.toLowerCase()
  let reply = ''
  if (/[回撤|drawdown]/.test(q)) {
    reply = '回撤指净值从历史高点回落的幅度。页面“回撤”页签展示了近区间的最大回撤曲线，可切换不同时间范围查看。'
  } else if (/[净值|nav]/.test(q)) {
    reply = '净值为每份基金单位的价值，单位净值曲线在“净值”页签中展示，支持区间切换。'
  } else if (/[成交量|volume]/.test(q)) {
    reply = '成交量表示交易活跃度，示例数据以 k 为单位显示在“成交量”页签。'
  } else if (/(怎么|如何).*?切换.*?(区间|时间)/.test(q)) {
    reply = '在图表下方有区间按钮：今年来、近1月、近3月、近6月、近1年，点击即可切换。'
  } else if (/客服|人工/.test(q)) {
    reply = '目前为示例智能客服，暂不支持转人工。如果需要更多功能我可以继续为你开发喔。'
  } else {
    reply = `你说的是：“${q}”。我已记录你的问题，当前为本地示例服务，返回的是演示答案。`
  }
  return { reply }
})

