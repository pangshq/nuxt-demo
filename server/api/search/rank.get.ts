import { defineEventHandler, getQuery } from 'h3'

// Mock ranking data for search landing page
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const type = String(q.type || 'hot')
  const updatedAt = new Date().toISOString().slice(0, 10)
  const base = [
    ['永赢先进制造智选A', '018125'],
    ['广发多因子混合', '002943'],
    ['中欧红利优享混合A', '004814'],
    ['中航机遇领航混合', '018957'],
    ['诺安成长混合A', '320007'],
    ['永赢科技智选混合', '022365'],
    ['鹏华碳中和主题混合', '016531'],
    ['永赢半导体产业智选', '015968'],
    ['银河创新成长混合A', '519674'],
    ['嘉实中证稀土产业ETF', '011036'],
  ]
  const sign = type === 'down' ? -1 : 1
  const list = base.map(([name, code], i) => ({
    rank: i + 1,
    name,
    code,
    changePct: Number(((Math.sin(i + (type.length % 3)) * 2 + (i % 2 ? 1.2 : 0.6)) * sign).toFixed(2)),
  }))
  return { type, updatedAt, list }
})

