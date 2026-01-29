<script setup lang="ts">
  import { computed, onUnmounted } from 'vue'
  import HangIcon from '@/assets/public/hang-icon.png'
  import Head from '@/assets/public/Head.png'
  import { detailId } from '@/hooks/useDetail'
  import { useJump } from '@/hooks/useJump'
  import { useWindow } from '@/hooks/useWindow'

  defineOptions({
    name: 'CallIndex'
  })

  const router = useRouter()
  const route = useRoute()
  const { queryId } = useJump()
  const { winUserListData } = useWindow()
  const userData = ref<UserInfo>(null)
  const loading = ref(true)
  const isReport = ref(false)

  // 添加定时器变量
  const autoReturnTimer = ref<NodeJS.Timeout | null>(null)

  const getData = () => {
    userData.value = winUserListData.find(v => v.userId === queryId.value)
    loading.value = false
  }

  const onBack = () => {
    // 清理定时器
    if (autoReturnTimer.value) {
      clearTimeout(autoReturnTimer.value)
      autoReturnTimer.value = null
    }

    router.replace({
      path: `/private-chat`,
      query: { id: route.query.cid as string }
    })
  }

  // 设置自动返回的定时器
  const setupAutoReturn = () => {
    // 随机生成5-6秒的时间
    const delay = Math.floor(Math.random() * 1000) + 5000 // 5000-6000ms

    autoReturnTimer.value = setTimeout(() => {
      console.log('自动返回私聊界面')
      onBack()
    }, delay)
  }

  onMounted(() => {
    getData()

    // 数据加载完成后设置自动返回
    if (!loading.value) {
      setupAutoReturn()
    } else {
      // 如果数据还在加载，等待一下再设置
      const checkDataLoaded = setInterval(() => {
        if (!loading.value) {
          clearInterval(checkDataLoaded)
          setupAutoReturn()
        }
      }, 100)
    }
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (autoReturnTimer.value) {
      clearTimeout(autoReturnTimer.value)
    }
  })

  const backgroundStyle = computed(() => {
    const avatarUrl = userData.value?.avator || Head
    return {
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(25, 251, 193, 1) 100%), url(${avatarUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  })
</script>

<template>
  <div class="call-box" :style="backgroundStyle">
    <van-image
      src="https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_report.png"
      h-10
      w-10
      class="report-btn"
      @click="
        () => {
          detailId = userData.userId
          isReport = true
        }
      "
    />
    <div v-if="!loading" flex flex-col justify-center items-center>
      <div flex flex-col justify-center items-center>
        <div class="multi-circle-avatar">
          <div class="circle-layer layer-outer">
            <div class="circle-layer layer-middle">
              <div class="circle-layer layer-inner">
                <div class="gradient-border">
                  <van-image
                    round
                    ai-avatar
                    :src="userData.avator || Head"
                    fit="cover"
                    class="avatar-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="call-info-container">
        <div class="call-info-box">
          <div class="text-info">
            <div class="name">{{ userData.name }}</div>
            <div class="status">Calling...</div>
          </div>
          <div class="hangup-btn" @click="onBack">
            <van-image round :src="HangIcon" fit="cover" />
          </div>
        </div>
      </div>
    </div>
    <report-box v-model:show="isReport" />
  </div>
</template>

<style lang="less" scoped>
  .call-info-container {
    padding: 0 30px;
    margin-top: 26vh;
    width: 48vh;
  }

.call-info-box {
  width: 100%;
  height: 80px;
  background-color: white;
  border-radius: 40px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.text-info {
  flex: 1;
  padding-right: 20px;
  overflow: hidden;
}

.name {
  color: black;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status {
  color: black;
  font-size: 14px;
  font-weight: normal;
}

.hangup-btn {
  width: 60px;
  height: 60px;
  background-color: #FF1C64;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.hangup-btn :deep(img) {
  width: 28px;
  height: 28px;
  object-fit: cover;
}
  .multi-circle-avatar {
    margin-top: 14vh;
    width: 204px;
    height: 204px;
  }
  .circle-layer {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .layer-outer {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  .layer-middle {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
  .layer-inner {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 18px;
    overflow: hidden;
  }
  .gradient-border {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%);
    padding: 1px;
    box-sizing: border-box;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .call-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .report-btn {
    position: absolute;
    top: 55px;
    right: 15px;
    z-index: 10;
  }
</style>
