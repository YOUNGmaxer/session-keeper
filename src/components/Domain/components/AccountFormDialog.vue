<script setup lang="ts">
import { Account, useAccount } from '@/modules/account'
import { useDomain } from '@/modules/domain'
import { logger } from '@/libs/logger'
import { useTag } from '@/modules/tag'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { cloneDeep } from 'lodash-es'

const emit = defineEmits<{
  (e: 'confirm', form: Account): void
}>()
const props = defineProps<{
  account?: Account
}>()
const visible = defineModel<boolean>('visible')
const isEdit = computed(() => Boolean(props.account))
const form = reactive<Account>(
  props.account
    ? cloneDeep(toRaw(props.account))
    : {
        id: useAccount().currentCookieAccountId,
        alias: '',
        tags: [],
      }
)
const formRef = ref<FormInst | null>(null)
const domainStore = useDomain()
const tagStore = useTag()
const rules: FormRules = {
  id: [
    {
      required: true,
      validator(_: FormItemRule, value: string) {
        // 编辑场景不做 id 重复校验
        if (isEdit.value) return true
        if (domainStore.currentAccounts.find((item) => item.id === value)) {
          return new Error('该账户已存在')
        }
        return true
      },
    },
  ],
  alias: {
    required: false,
  },
  tags: {
    required: false,
  },
}
const tagOptions = computed(() =>
  tagStore.tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }))
)
const confirm = async () => {
  try {
    await formRef.value?.validate()
    emit('confirm', toRaw(form))
    visible.value = false
  } catch (err) {
    logger.error('confirm err', err)
  }
}
</script>

<template>
  <NModal v-model:show="visible" preset="card" :title="isEdit ? '修改账户' : '添加账户'" mx-20px>
    <NForm ref="formRef" :model="form" :rules="rules">
      <NFormItem path="id" label="ID">
        <NInput v-model:value="form.id" :disabled="isEdit" />
      </NFormItem>
      <NFormItem path="alias" label="别名">
        <NInput v-model:value="form.alias" />
      </NFormItem>
      <NFormItem path="tags" label="标签">
        <NSelect v-model:value="form.tags" multiple :options="tagOptions" />
      </NFormItem>
    </NForm>
    <template #footer>
      <div flex flex-row-reverse>
        <NButton @click="confirm">确定</NButton>
      </div>
    </template>
  </NModal>
</template>
