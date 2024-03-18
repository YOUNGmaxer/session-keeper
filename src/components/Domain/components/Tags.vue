<script setup lang="ts">
import { TagId, useTag } from '@/modules/tag'

const props = defineProps<{
  tagIds: TagId[]
}>()
const tags = computed(() => useTag().tags.filter((tag) => props.tagIds.includes(tag.id)))
</script>

<template>
  <NSpace size="small">
    <NTag v-for="tag in tags" size="small" :type="tag.color">{{ tag.name }}</NTag>
  </NSpace>
</template>
