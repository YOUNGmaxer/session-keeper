<script setup lang="ts">
import { Icon } from '@vicons/utils'
import Tag16Filled from '@vicons/fluent/Tag16Filled'
</script>

<template>
  <div flex items-center justify-between h-50px bg-blueGray px-12px>
    <div font-100>Session Keeper</div>
    <div flex items-center mr-8px>
      <Icon cursor-pointer hover-color-green title="标签管理">
        <Tag16Filled></Tag16Filled>
      </Icon>
    </div>
  </div>
</template>
