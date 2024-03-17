<script setup lang="ts">
import { Account } from '@/modules/account'
import Tags from './Tags.vue'

defineProps<{
  account: Account
}>()
</script>

<template>
  <div flex items-center>
    <div>{{ account.alias }}</div>
    <div ml-8px color-gray text-10px>({{ account.id }})</div>
  </div>
  <Tags :tag-ids="account.tags" />
</template>
