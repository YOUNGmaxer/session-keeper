<script setup lang="ts">
import { Account } from '@/modules/account'
import { useDomain } from '@/modules/domain'
import { Icon } from '@vicons/utils'
import AddCircle20Regular from '@vicons/fluent/AddCircle20Regular'

const visible = ref(false)
const domainStore = useDomain()

const clickAdd = () => (visible.value = true)
const confirmAdd = (account: Account) => {
  domainStore.addAccount(account)
}
</script>

<template>
  <div flex justify-between items-center px-12px py-8px>
    <div>{{ domainStore.currentDomain }}</div>
    <Icon size="20" cursor-pointer hover-color-sky mr-5px @click="clickAdd">
      <AddCircle20Regular />
    </Icon>
    <AccountFormDialog v-model:visible="visible" @confirm="confirmAdd" />
  </div>
</template>

<style></style>
