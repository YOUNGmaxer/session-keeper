<script setup lang="ts">
import { TagId } from '@/modules/tag'

defineProps<{
  tagIds: TagId[]
}>()
</script>

<template>
  <NSpace size="small">
    <NTag size="small">tag</NTag>
  </NSpace>
</template>
