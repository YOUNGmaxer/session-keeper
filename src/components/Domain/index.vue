<script setup lang="ts">
import { useDomain } from '@/modules/domain'
import AccountList from './components/AccountList.vue'
import { useTag } from '@/modules/tag'

// 初始化
useDomain().syncDomain()
useTag().syncTags()
</script>

<template>
  <DomainBar />
  <AccountList :accounts="useDomain().currentAccounts" />
</template>
