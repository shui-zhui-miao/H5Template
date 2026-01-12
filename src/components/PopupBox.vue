<script setup lang="ts">
console.log('输入框')

const show = defineModel<boolean>('show', {
  type: Boolean,
  required: true,
  default: false
})
</script>

<template>
  <van-popup v-model:show="show" safe-area-inset-bottom round position="bottom" class="c">
    <slot />
  </van-popup>
</template>

<style lang="less" scoped>
  .c{
    background: url('@/assets/public/svhbdvjneibs.png');
    background-size: 100% 100%;
    background-position: center top;
    background-repeat: no-repeat;
  }
</style>
