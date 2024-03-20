<script setup lang="ts">
import { TagId, useTag } from '@/modules/tag'

const props = defineProps<{
  tagIds: TagId[]
  /** 在激活账户下需要适应样式 */
  active?: boolean
}>()
const tags = computed(() => useTag().tags.filter((tag) => props.tagIds.includes(tag.id)))
</script>

<template>
  <NSpace size="small">
    <NTag v-for="tag in tags" size="small" :type="tag.color" :class="active ? 'bg-black' : ''">{{ tag.name }}</NTag>
  </NSpace>
</template>
