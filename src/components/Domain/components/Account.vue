<script setup lang="ts">
import { Account, useAccount } from '@/modules/account'
import Tags from './Tags.vue'
import { queryAccountCookie } from '@/modules/cookie'

const props = defineProps<{
  account: Account
  active?: boolean
}>()

const click = () => {
  useAccount().switchAccount(props.account)
}
</script>

<template>
  <NListItem cursor-pointer :class="active ? 'bg-green hover-bg-green!' : ''">
    <div flex items-center @click="click">
      <div :class="active ? 'color-white' : ''">{{ account.alias || account.id }}</div>
      <div ml-8px text-10px :class="active ? 'color-light' : 'color-gray'">({{ account.id }})</div>
    </div>
    <Tags :tag-ids="account.tags" />
  </NListItem>
</template>

<style scoped></style>
