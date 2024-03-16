<script setup lang="ts">
import { Account } from '@/modules/account';

const visible = ref(false);

const clickAdd = () => visible.value = true;
const confirmAdd = (account: Account) => {
  console.log('confirmAdd', account);
}
</script>

<template>
  <div flex justify-between items-center px-12px py-8px>
    <div>domain</div>
    <NButton size="small" @click="clickAdd">添加</NButton>
    <AccountFormDialog v-model:visible="visible" @confirm="confirmAdd" />
  </div>
</template>
