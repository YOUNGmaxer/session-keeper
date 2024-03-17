<script setup lang="ts">
import { useDomain } from '@/modules/domain'
import AccountList from './components/AccountList.vue'
</script>

<template>
  <DomainBar />
  <AccountList :accounts="useDomain().currentAccounts" />
</template>
