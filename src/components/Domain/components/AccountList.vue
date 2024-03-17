<script setup lang="ts">
import { Account as IAccount } from '@/modules/account'
import Account from './Account.vue'

defineProps<{
  accounts: IAccount[]
}>()
</script>

<template>
  <NList hoverable>
    <NListItem v-for="account in accounts" :key="account.id">
      <Account :account="account" />
    </NListItem>
  </NList>
</template>
