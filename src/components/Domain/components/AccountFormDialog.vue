<script setup lang="ts">
import { Account } from '@/modules/account';
import { FormInst, FormRules } from 'naive-ui';

const emit = defineEmits<{
  (e: 'confirm', form: Account): void
}>();
const visible = defineModel<boolean>('visible');
const form = reactive<Account>({
  id: '',
  alias: '',
  tags: []
});
const formRef = ref<FormInst | null>(null);
const rules: FormRules = {
  id: {
    required: true
  },
  alias: {
    required: false
  },
  tags: {
    required: false
  }
}
const confirm = async () => {
  try {
    await formRef.value?.validate();
    emit('confirm', toRaw(form));
    visible.value = false;
  } catch (err) {
    console.log('confirm err', err);
  }
}
</script>

<template>
  <NModal v-model:show="visible" preset="card" title="添加账户" mx-20px>
    <NForm ref="formRef" :model="form" :rules="rules">
      <NFormItem path="id" label="ID">
        <NInput v-model:value="form.id" />
      </NFormItem>
      <NFormItem path="alias" label="别名">
        <NInput v-model:value="form.alias" />
      </NFormItem>
      <NFormItem path="tags" label="标签">
        <NSelect v-model:value="form.tags" multiple />
      </NFormItem>
    </NForm>
    <template #footer>
      <div flex flex-row-reverse>
        <NButton @click="confirm">确定</NButton>
      </div>
    </template>
  </NModal>
</template>@/modules/type