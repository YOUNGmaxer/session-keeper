<script setup lang="ts">
import { RouterName } from '@/router'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useRouter } from 'vue-router'

interface Tab {
  name: string
  value: RouterName
}

const tabs: Tab[] = [
  {
    name: '账户',
    value: RouterName.Domain,
  },
  {
    name: '标签',
    value: RouterName.Tag,
  },
]
const router = useRouter()

const onUpdateValue = (name: string) => {
  const tabVal = tabs.find((tab) => tab.name === name)?.value
  router.push({ name: tabVal })
}
</script>

<template>
  <NTabs class="entry" mt-8px type="card" size="small" :default-value="tabs[0].name" @update-value="onUpdateValue">
    <NTabPane v-for="tab in tabs" :key="tab.value" :name="tab.name"></NTabPane>
    <template #prefix>
      <div font-100 ml-12px>Session Keeper</div>
    </template>
  </NTabs>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style>
/** 组件样式优化 */
.entry .n-tabs-nav__prefix {
  flex: 1 !important;
}
.entry .n-tabs-nav-scroll-wrapper {
  flex: none;
}
.entry .n-tabs-nav-scroll-content {
  margin-right: 12px;
}
.entry.n-tabs.n-tabs--top .n-tab-pane {
  padding: 0;
}
</style>
