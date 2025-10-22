<script setup lang="ts">
import { showToast } from 'vant'

type Tool = {
  name: string
  icon?: string
  theme: 'red' | 'blue'
  to?: string
  badge?: string // 如 new / PK 等
}

const bannerOpen = ref(true)
const onBannerClose = () => (bannerOpen.value = false)
const onBannerClick = () => navigateTo('/strategy')

const onClickTool = (t: Tool) => {
  if (t.to) return navigateTo(t.to)
  showToast('敬请期待')
}

const pickFunds: Tool[] = [
  { name: 'ETF', theme: 'red', icon: 'etf', to: '/search' },
  { name: '灵感基金池', theme: 'red', icon: 'bulb' },
  { name: '基金筛选', theme: 'red', icon: 'filter' },
  { name: '基金排行', theme: 'red', icon: 'medal' },
  { name: '牛股选基', theme: 'red', icon: 'fire' },
  { name: '基金投顾', theme: 'red', icon: 'service' },
  { name: '基金诊断', theme: 'red', icon: 'plus' },
  { name: '目标寻基', theme: 'red', icon: 'target' },
  { name: '基金PK', theme: 'red', icon: 'pk', badge: 'PK' },
  { name: '相似基金', theme: 'red', icon: 'search' },
]

const planStrategy: Tool[] = [
  { name: '恐贪指数', theme: 'blue', icon: 'smile', to: '/strategy' },
  { name: '情绪面板', theme: 'blue', icon: 'comment' },
  { name: '指数估值', theme: 'blue', icon: 'bar' },
  { name: '股债性价', theme: 'blue', icon: 'balance' },
  { name: '军工PH值', theme: 'blue', icon: 'shield' },
  { name: '券商PH值', theme: 'blue', icon: 'coin' },
  { name: '新能车TF', theme: 'blue', icon: 'apps' },
  { name: '光伏TF', theme: 'blue', icon: 'apps' },
  { name: '电池TF', theme: 'blue', icon: 'battery' },
  { name: '行业恐贪', theme: 'blue', icon: 'apps' },
  { name: '铜油比', theme: 'blue', icon: 'balance' },
  { name: '创50恐贪', theme: 'blue', icon: 'medal' },
  { name: '美股恐贪', theme: 'blue', icon: 'apps' },
  { name: 'A500恐贪', theme: 'blue', icon: 'gem' },
  { name: 'AH溢价', theme: 'blue', icon: 'exchange' },
  { name: '汇股比', theme: 'blue', icon: 'tv', badge: 'new' },
]
</script>

<template>
  <div class="page">
    <van-nav-bar title="更多工具" />

    <div v-if="bannerOpen" class="banner">
      <div class="lt">
        <div class="title">加入 Pro 会员带你告别亏损</div>
      </div>
      <div class="rt">
        <van-button size="small" type="danger" round @click="onBannerClick">去看看</van-button>
        <van-icon name="cross" class="close" @click="onBannerClose" />
      </div>
    </div>

    <div class="section">
      <div class="section-title">挑选基金</div>
      <van-grid :column-num="5" :gutter="10" clickable>
        <van-grid-item v-for="t in pickFunds" :key="t.name" @click="onClickTool(t)">
          <template #icon>
            <div class="tool-icon" :class="t.theme">
              <div class="badge" v-if="t.badge">{{ t.badge }}</div>
              <SvgIcon :name="t.icon || 'apps'" :size="28" />
            </div>
          </template>
          <template #text>
            <div class="tool-text">{{ t.name }}</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="section">
      <div class="section-title">制定策略</div>
      <van-grid :column-num="5" :gutter="10" clickable>
        <van-grid-item v-for="t in planStrategy" :key="t.name" @click="onClickTool(t)">
          <template #icon>
            <div class="tool-icon" :class="['blue', t.theme]">
              <div class="badge" v-if="t.badge">{{ t.badge }}</div>
              <SvgIcon :name="t.icon || 'apps'" :size="28" />
            </div>
          </template>
          <template #text>
            <div class="tool-text">{{ t.name }}</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #fff; }
.banner {
  margin: 12px; padding: 12px; background: #f7f8ff; border-radius: 10px;
  display: flex; align-items: center; justify-content: space-between;
}
.banner .title { font-weight: 700; }
.banner .close { margin-left: 8px; color: #999; }

.section { padding: 6px 12px 0; }
.section-title { font-size: 18px; font-weight: 800; margin: 8px 0 6px; }

.tool-icon { position: relative; width: 52px; height: 52px; border-radius: 16px; display:flex; align-items:center; justify-content:center; color: #fff; }
.tool-icon.red { background: linear-gradient(135deg, #ff9ea0, #ff4d4f); box-shadow: 0 6px 14px rgba(255,77,79,.25); }
.tool-icon.blue { background: linear-gradient(135deg, #9db6ff, #5f87ff); box-shadow: 0 6px 14px rgba(47,136,255,.22); }
.tool-text { margin-top: 6px; font-size: 12px; color: #333; }
.badge { position: absolute; top: -6px; right: -6px; background: #ff4d4f; color:#fff; font-size:10px; padding: 1px 4px; border-radius: 999px; }

/* Vant grid tweaks */
:deep(.van-grid-item__content) { padding: 12px 2px; }
</style>
