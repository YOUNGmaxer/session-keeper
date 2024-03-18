<script setup lang="ts">
import { Icon } from '@vicons/utils'
import AddCircle20Regular from '@vicons/fluent/AddCircle20Regular'
import { Tag, useTag } from '@/modules/tag'

const visible = ref(false)
const tagStore = useTag()

const clickAdd = () => {
  visible.value = true
}
const confirmAdd = (tag: Tag) => {
  tagStore.addTag(tag)
}

tagStore.syncTags()
</script>

<template>
  <NCollapse mx-12px my-16px w-a default-expanded-names="common">
    <NCollapseItem title="全局标签" name="common">
      <template #header-extra>
        <Icon size="20" mr-4px hover-color-sky @click.stop="clickAdd">
          <AddCircle20Regular />
        </Icon>
        <TagFormDialog v-model:visible="visible" @confirm="confirmAdd" />
      </template>
      <NSpace size="small">
        <NTag v-for="tag in tagStore.tags">{{ tag.name }}</NTag>
      </NSpace>
    </NCollapseItem>
  </NCollapse>
</template>
