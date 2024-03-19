<script setup lang="ts">
import { Account, useAccount } from '@/modules/account'
import Tags from './Tags.vue'
import Delete28Filled from '@vicons/fluent/Delete28Filled'
import Edit20Filled from '@vicons/fluent/Edit20Filled'
import { Icon } from '@vicons/utils'
import { useDomain } from '@/modules/domain'
import { reloadCurrentTab } from '@/libs/tab'

const props = defineProps<{
  account: Account
  active?: boolean
}>()

const accountEditorVisible = ref(false)

const switchAccount = async () => {
  const isSuccess = await useAccount().switchAccount(props.account)
  // 切换完账户，刷新页面
  isSuccess && reloadCurrentTab()
}
const toEditAccount = () => (accountEditorVisible.value = true)
const confirmEdit = (account: Account) => {
  useDomain().updateAccount(account)
}
const deleteAccount = () => {
  useDomain().deleteAccount(props.account)
}
</script>

<template>
  <NListItem cursor-pointer :class="active ? 'bg-green hover-bg-green!' : ''">
    <div flex justify-between @click="switchAccount">
      <div>
        <div flex items-center>
          <div :class="active ? 'color-white' : ''">{{ account.alias || account.id }}</div>
          <div ml-8px text-10px :class="active ? 'color-light' : 'color-gray'">({{ account.id }})</div>
        </div>
        <Tags :tag-ids="account.tags" />
      </div>
      <div flex items-center>
        <Icon mr-6px hover-color-coolgray @click.stop="toEditAccount">
          <Edit20Filled />
        </Icon>
        <Icon hover-color-red @click.stop="deleteAccount">
          <Delete28Filled />
        </Icon>
      </div>
    </div>
  </NListItem>
  <AccountFormDialog v-model:visible="accountEditorVisible" :account="account" @confirm="confirmEdit" />
</template>
