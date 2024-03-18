<script setup lang="ts">
import { TagColor } from '@/modules/tag'

interface ColorOption {
  value: TagColor
}

const color = defineModel<string>('color')
const colorOptions: ColorOption[] = [
  {
    value: 'default',
  },
  {
    value: 'primary',
  },
  {
    value: 'info',
  },
  {
    value: 'success',
  },
  {
    value: 'warning',
  },
  {
    value: 'error',
  },
]

const clickColor = (value: string) => (color.value = value)
const checked = (value: string) => color.value === value
</script>

<template>
  <NSpace>
    <NTag
      cursor-pointer
      w-30px
      v-for="option in colorOptions"
      :bordered="checked(option.value)"
      :type="option.value"
      @click="clickColor(option.value)"
    ></NTag>
  </NSpace>
</template>
