<script setup lang="ts">
import { Account, useAccount } from '@/modules/account'
import Tags from './Tags.vue'
import { queryAccountCookie } from '@/modules/cookie'
import Delete28Filled from '@vicons/fluent/Delete28Filled'
import { Icon } from '@vicons/utils'
import { useDomain } from '@/modules/domain'

const props = defineProps<{
  account: Account
  active?: boolean
}>()

const click = () => {
  useAccount().switchAccount(props.account)
}
const deleteAccount = () => {
  useDomain().deleteAccount(props.account)
}
</script>

<template>
  <NListItem cursor-pointer :class="active ? 'bg-green hover-bg-green!' : ''">
    <div flex justify-between>
      <div>
        <div flex items-center @click="click">
          <div :class="active ? 'color-white' : ''">{{ account.alias || account.id }}</div>
          <div ml-8px text-10px :class="active ? 'color-light' : 'color-gray'">({{ account.id }})</div>
        </div>
        <Tags :tag-ids="account.tags" />
      </div>
      <div>
        <Icon class="hover-color-red" @click="deleteAccount">
          <Delete28Filled />
        </Icon>
      </div>
    </div>
  </NListItem>
</template>
