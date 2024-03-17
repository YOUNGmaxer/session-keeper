<script setup lang="ts">
import { TagId } from '@/modules/tag'

defineProps<{
  tagIds: TagId[]
}>()
</script>

<template>
  <NSpace size="small">
    <NTag v-for="tag in tagIds" size="small">{{ tag }}</NTag>
  </NSpace>
</template>
