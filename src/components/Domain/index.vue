<script setup lang="ts">
import { Account } from '@/modules/account'
import { useDomain } from '@/modules/domain'
import AccountList from './components/AccountList.vue'

const visible = ref(false)
const domainStore = useDomain()

domainStore.syncDomain()

const clickAdd = () => (visible.value = true)
const confirmAdd = (account: Account) => {
  domainStore.addAccount(account)
}
</script>

<template>
  <div flex justify-between items-center px-12px py-8px>
    <div>{{ domainStore.currentDomain }}</div>
    <NButton size="small" @click="clickAdd">添加</NButton>
    <AccountFormDialog v-model:visible="visible" @confirm="confirmAdd" />
  </div>
  <AccountList :accounts="domainStore.currentAccounts" />
</template>
