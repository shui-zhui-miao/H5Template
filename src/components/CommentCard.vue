<script setup lang="ts">
  import Head from '@/assets/public/Head.png'
  import gi from '@/assets/public/vejivnfnvn.png'
  import { detailId } from '@/hooks/useDetail'
  import { useUserStore } from '@/stores'

  const { userInfo } = useUserStore()

  const props = withDefaults(
    defineProps<{
      list?: CommentInfo[]
    }>(),
    {
      list: () => []
    }
  )

  // 举报弹框
  const isReport = ref(false)
</script>

<template>
  <div safe-area-inset-bottom>
    <empty v-if="props.list.length === 0" />
    <div
      v-for="(item, index) in props.list"
      :key="index"
      p-4
      ai-fill-bg
      ai-rounded
      class="card-comment c"
    >
      <ul flex items-center justify-between>
        <li flex items-center>
          <div class="avatar-border-wrapper">
            <van-image
              round
              ai-avatar
              :src="item?.avator || Head"
              fit="cover"
              class="avatar-img"
            />
          </div>
          <span ml-3 ai-user-name>{{ item?.name || '' }}</span>
        </li>
        <li v-if="userInfo.userId !== item.userId" flex items-center>
          <van-image
            :src="gi"
            :style="{
              width: '24px',
              height: '24px'
            }"
            @click="
              () => {
                isReport = true
                detailId = item.userId
              }
            "
          />
        </li>
      </ul>
      <span mt-2 ai-text-desc>{{ item?.content || '' }}</span>
    </div>

    <report-box v-model:show="isReport" />
  </div>
</template>

<style lang="less" scoped>
  .avatar-border-wrapper {
    display: inline-block;
    position: relative;
    border-radius: 50%;
    padding: 1px;
    background: linear-gradient(135deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%);
    box-sizing: border-box;
  }

  .avatar-img {
    display: block;
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }
  .card-comment + .card-comment {
    margin-top: 12px;

  }
  .c{
    background-color: rgba(134, 134, 134, 0.16);
  }
</style>
