<script setup lang="ts">
import { Account as IAccount, useAccount } from '@/modules/account'
import Account from './Account.vue'

defineProps<{
  accounts: IAccount[]
}>()

const accountStore = useAccount()
const isActive = (account: IAccount) => account.id === accountStore.currentAccount?.id
</script>

<template>
  <NList hoverable>
    <Account v-for="account in accounts" :key="account.id" :account="account" :active="isActive(account)" />
  </NList>
</template>
