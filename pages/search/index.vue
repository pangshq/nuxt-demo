<script setup lang="ts">
const keyword = ref('')
type TabKey = 'hot' | 'add' | 'rise' | 'down'
const active = ref<TabKey>('hot')

const { data, refresh, pending } = await useFetch(() => '/api/search/rank', {
  query: { type: active },
  watch: [active],
})

const onCancel = () => navigateTo('/')
</script>

<template>
  <div class="page">
    <!-- 顶部搜索 + 取消 -->
    <div class="search-bar">
      <van-search v-model="keyword" placeholder="请输入需要搜索的关键词" shape="round" autofocus show-action :action-text="'取消'" @cancel="onCancel" />
    </div>

    <!-- 榜单卡片 -->
    <div class="card">
      <div class="card-hd">
        <div class="title">基金热度榜🔥</div>
        <div class="sub">更新于: {{ data?.updatedAt }}</div>
      </div>
      <van-tabs v-model:active="active" shrink>
        <van-tab title="热度榜" name="hot" />
        <van-tab title="加仓榜" name="add" />
        <van-tab title="实时涨幅榜" name="rise" />
        <van-tab title="实时跌幅榜" name="down" />
      </van-tabs>

      <div class="table">
        <div class="thead">
          <div class="th rank">排名</div>
          <div class="th name">基金名称</div>
          <div class="th chg">日涨跌</div>
        </div>
        <div class="tbody">
          <!-- 行可点击，跳转到基金详情页 -->
          <div
            class="row clickable"
            v-for="item in data?.list"
            :key="item.code"
            role="button"
            @click="navigateTo(`/fund/${item.code}`)"
          >
            <div class="td rank">{{ item.rank }}</div>
            <div class="td name">
              <div class="n">{{ item.name }}</div>
              <div class="c">{{ item.code }}</div>
            </div>
            <div class="td chg" :class="{ pos: item.changePct > 0, neg: item.changePct < 0 }">
              {{ item.changePct > 0 ? '+' : '' }}{{ item.changePct.toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
      <div v-if="pending" class="loading"><van-loading type="spinner" size="20" /> 加载中...</div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.search-bar { padding: 8px 12px; background: #fff; }
.card { margin: 12px; padding: 12px; background: #fff; border-radius: 10px; }
.card-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.title { font-size: 18px; font-weight: 700; }
.sub { color: #999; font-size: 12px; }
.table { margin-top: 8px; }
.thead, .row { display: grid; grid-template-columns: 48px 1fr 80px; align-items: center; }
.thead { color: #999; font-size: 12px; padding: 6px 0; border-bottom: 1px solid #f5f5f5; }
.row { padding: 10px 0; border-bottom: 1px solid #f7f7f7; }
.clickable { cursor: pointer; }
.clickable:active { background: #fafafa; }
.n { font-weight: 600; }
.c { color: #999; font-size: 12px; margin-top: 2px; }
.chg { text-align: right; font-weight: 600; }
.chg.pos { color: #ff4d4f; }
.chg.neg { color: #07c160; }
.loading { display: flex; align-items: center; gap: 8px; color: #999; justify-content: center; padding: 12px 0; }
</style>
