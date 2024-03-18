<script setup lang="ts">
import { logger } from '@/modules/logger'
import { Tag, createTag, useTag } from '@/modules/tag'
import { FormInst, FormRules } from 'naive-ui'

const emit = defineEmits<{
  (e: 'confirm', form: Tag): void
}>()
const visible = defineModel<boolean>('visible')
const form = reactive<Tag>(createTag())
const formRef = ref<FormInst | null>(null)
const tagStore = useTag()
const rules: FormRules = {
  name: {
    required: true,
    validator(_, value: string) {
      if (tagStore.tags.find((tag) => tag.name === value)) {
        return new Error('已有同名标签')
      }
      return true
    },
  },
  color: {
    required: false,
  },
}
const confirm = async () => {
  try {
    await formRef.value?.validate()
    // 构造标签ID
    form.id = form.name
    emit('confirm', { ...toRaw(form) })
    visible.value = false
  } catch (err) {
    logger.error('confirm err', err)
  }
}
const reset = () => Object.assign(form, createTag())
</script>

<template>
  <NModal v-model:show="visible" preset="card" title="添加标签" mx-20px @after-leave="reset">
    <NForm ref="formRef" :model="form" :rules="rules">
      <NFormItem path="name" label="名称">
        <NInput v-model:value="form.name" />
      </NFormItem>
      <NFormItem path="color" label="颜色">
        <NInput v-model:value="form.color" />
      </NFormItem>
    </NForm>
    <template #footer>
      <div flex flex-row-reverse>
        <NButton @click="confirm">确定</NButton>
      </div>
    </template>
  </NModal>
</template>
