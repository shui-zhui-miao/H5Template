<script setup lang="ts">
  import { closeToast, showLoadingToast, showSuccessToast } from 'vant'
  import { detailId } from '@/hooks/useDetail'
  import { useJump } from '@/hooks/useJump'
  import { useWindow } from '@/hooks/useWindow'
  import { useUserStore } from '@/stores'

  const router = useRouter()
  const route = useRoute()
  const show = defineModel<boolean>('show', {
    type: Boolean,
    required: true,
    default: false
  })

  const { winUserListData } = useWindow()
  const { userInfo } = useUserStore()
  const { appParams } = useJump()

  const allUserList = ref<UserInfo[]>(winUserListData)

  const onReport = () => {
    router
      .replace({
        path: '/report-index',
        query: { cid: route.query?.id, url: route.path }
      })
      .then(() => {
        show.value = false
      })
  }

  const onShield = async () => {
    // 1. 显示 Loading（手动关闭）
    showLoadingToast({
      message: 'Blocking...',
      forbidClick: true,
      duration: 0
    })

    try {
      // 2. 模拟异步（如果你后面接接口，这里直接 await 接口）
      await new Promise(resolve =>
        setTimeout(resolve, Math.floor(Math.random() * (2000 - 500 + 1)) + 500)
      )

      const userInfoId = detailId.value
      userInfo.blockList.push(userInfoId)
      userInfo.blockList = Array.from(new Set(userInfo.blockList))

      allUserList.value.forEach(v => {
        if (v.userId === userInfo.userId) {
          v.blockList = userInfo.blockList
        }
      })

      // 3. 关闭 Loading
      closeToast()

      // 4. 成功提示
      showSuccessToast('Blocked successfully')

      // 5. 延迟执行后续逻辑
      setTimeout(() => {
        appParams({
          key: 'updateUser',
          value: allUserList.value,
          state: 0
        })
        show.value = false
      }, 1000)
    } catch {
      closeToast()
    }
  }
</script>

<template>
  <van-popup v-model:show="show" round position="bottom">
    <div class="popup-container">
      <div class="action-btn report-btn" @click="onReport">
        <span class="btn-text">Report</span>
      </div>
      <div class="action-btn shield-btn" @click="onShield">
        <span class="btn-text">Shield</span>
      </div>
      <div class="action-btn cancel-btn" @click="show = false">
        <div class="cancel-btn-inner">
          <span class="cancel-text">Cancel</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
  .popup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0 30px;
  background-color: #EBECED;
  gap: 16px;
}

.action-btn {
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.report-btn, .shield-btn {
  height: 46px;
  background-color: white;
  border-radius: 23px;
  box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.1);
}

.btn-text {
  color: black;
  font-size: 16px;
  font-weight: normal;
}

.cancel-btn {
  height: 58px;
  margin-top: 5px;
  background: linear-gradient(135deg, #6BD0FF 0%, #19FBC1 100%);
  border-radius: 29px;
  padding: 3px;
  box-sizing: border-box;
}

.cancel-btn-inner {
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cancel-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
  .report-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 30px;
    background-color: #EBECED;

    li + li {
      margin-top: 16px;
    }

    li {
      p {
        width: var(--ai-report-btn-select-style-width);
        height: var(--ai-report-btn-select-style-height);
        line-height: var(--ai-report-btn-select-style-height);
      }

      &:last-child {
        margin-top: 32px;

        p {
          width: var(--ai-report-btn-cancel-style-width);
          height: var(--ai-report-btn-cancel-style-height);
          line-height: var(--ai-report-btn-cancel-style-height);
        }
      }
    }
  }
</style>
