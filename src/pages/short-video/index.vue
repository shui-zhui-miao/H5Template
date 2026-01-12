<script setup lang="ts">
  import Head from '@/assets/public/Head.png'
  import { useAppImgStyle } from '@/hooks/useAppImgStyle'
  import { useDetail } from '@/hooks/useDetail'
  import { useUserStore } from '@/stores'

  defineOptions({
    name: 'ShortVideo'
  })

  const { addIcon, messageIcon, detailLikeIcon, likeIcon } =
    useAppImgStyle()
  const { userInfo } = useUserStore()
  const {
    loding,
    dynamicInfo,
    commentList,
    isVideoLike,
    isFollow,
    onAvator,
    onFollow,
    onSend,
    onVideoLike
  } = useDetail()

  const videoRef = ref(null)
  const isPlaying = ref(false)
  const isPopup = ref(false)
  // 举报弹框
  const isReport = ref(false)

  const togglePlay = async () => {
    if (!videoRef.value) return

    if (isPlaying.value) {
      videoRef.value.pause()

      // videoRef.value.play().catch((err) => {
      //   console.error('播放失败:', err)
      // })

      isPlaying.value = false
    } else {
      try {
        await videoRef.value.play()
        isPlaying.value = true
      } catch (error) {
        console.warn('自动播放被阻止:', error)
      }
    }
  }
</script>

<template>
  <div v-if="!loding" class="video-box">
    <video
      ref="videoRef"
      :src="dynamicInfo?.dynamicVideo"
      :poster="dynamicInfo?.dynamicPic[0]"
      webkit-playsinline
      playsinline
      x5-playsinline
      width="100%"
      height="100%"
      @click="togglePlay"
    />
    <van-icon
      v-if="!isPlaying"
      :name="isPlaying ? 'pause-circle' : 'play-circle'"
      class="play-box"
      @click="togglePlay"
    />
    <div p-layout-padding class="bottom-box">
    <ul class="bottom-btn">
      <div class="vertical-btn-group">
        <li class="btn-container" @click="onVideoLike">
          <div class="btn-inner">
            <van-image
              :src="isVideoLike ? likeIcon : detailLikeIcon"
              class="icon-box"
              :style="{
                width: 'var(--unlike-image-width)',
                height: 'var(--unlike-image-height)'
              }"
            />
            <div style="height: 4px;" />
            <span class="public-number">
              {{ dynamicInfo?.dynamicLikeCount }}
            </span>
          </div>
        </li>
        <div class="btn-spacing" />
        <li class="btn-container" @click="isPopup = true">
          <div class="btn-inner">
            <van-image
              :src="messageIcon"
              class="icon-box"
              :style="{
                width: 'var(--video-details-comment-width)',
                height: 'var(--video-details-comment-height)'
              }"
            />
            <div style="height: 4px;" />
            <span class="public-number">
              {{ dynamicInfo?.dynamicCommentCount }}
            </span>
          </div>
        </li>
      </div>
    </ul>
      <div mb-5 flex>
        <div h-12 w-12 relative>
          <div class="avatar-wrapper">
            <van-image
              round
              ai-avatar
              :src="dynamicInfo?.avator || Head"
              fit="cover"
              class="user-head"
              @click="onAvator"
            />
          </div>
          <van-image
            v-if="!isFollow && userInfo.userId !== dynamicInfo?.userId"
            round
            right-3
            top-9.5
            absolute
            :src="addIcon"
            fit="cover"
            :style="{
              width: 'var(--video-details-follow-width)',
              height: 'var(--video-details-follow-height)'
            }"
            @click="onFollow"
          />
        </div>
        <ul ml-3 shrink w-full>
          <li flex justify-between>
            <span ai-user-name>{{ dynamicInfo?.name }}</span>
          </li>
          <li>
            <span mt-1 ai-text-desc>
              {{ dynamicInfo?.dynamicDesc }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <popup-box v-model:show="isPopup">
      <div p-layout-padding>
        <van-divider content-position="left">Comments</van-divider>
        <div class="h-[56vh] overflow-y-auto">
          <comment-card
            :list="commentList"
            class="video-comment-card_box"
          />
        </div>
        <input-box @send="v => onSend(v, 1)" />
      </div>
    </popup-box>

    <report-box v-model:show="isReport" />
  </div>
</template>

<style lang="less" scoped>
  .avatar-wrapper {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    padding: 1px;
    background: linear-gradient(135deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%);
    box-sizing: border-box;
  }

  .avatar-wrapper .user-head {
    display: block;
    border-radius: 50%;
  }

  .avatar-wrapper :deep(.van-image__img) {
    border-radius: 50%;
  }

  .video-comment-card_box {
    padding-bottom: calc(60px + var(--ai-view-padding-bottom));
  }
  .video-box {
    width: 100%;
    height: 100vh;
    position: relative;

    video {
      width: 100%;
      height: 100%;
      background: var(--ai-short-video-bg-color);
      object-fit: cover;
    }

    .play-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 64px;
      color: rgba(255, 255, 255, 1);
    }

    .bottom-box {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      // background: linear-gradient(180deg, rgba(14, 8, 15, 0.8) 0%, rgba(14, 8, 15, 0) 100%);
    }

    .user-head {
      width: var(--ai-short-video-avatar-width);
      height: var(--ai-short-video-avatar-height);
    }

.bottom-btn {
  display: flex;
  justify-content: flex-end; /* 对应 MainAxisAlignment.end */
  align-items: center;
}

.vertical-btn-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-container {
  position: relative;
  width: 44px;
  height: 66px;
  background: linear-gradient(180deg, #6BD0FF 0%, #19FBC1 100%);
  border-radius: 50px;
  padding: 1px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-inner {
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-spacing {
  height: 18px; /* 对应 SizedBox(height: 18) */
}

.icon-box {
  position: relative;
  z-index: 1;
  margin-bottom: 4px;
}

.public-number {
  font-size: 20px !important;
  color: white;
}
  }
</style>
