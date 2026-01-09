<script setup lang="ts">
  import { showLoadingToast } from 'vant'
  import Head from '@/assets/public/Head.png'
  import fjm from '@/assets/public/vejivnfnvn.png'
  import { useAppImgStyle } from '@/hooks/useAppImgStyle'
  import { detailId } from '@/hooks/useDetail'
  import { useJump } from '@/hooks/useJump'
  import { useWindow } from '@/hooks/useWindow'
  import { useUserStore } from '@/stores'

  defineOptions({
    name: 'other-home'
  })

  const {
    otherHomeAddIcon,
    otherHomeMessageIcon,
    otherHomeLikeIcon
  } = useAppImgStyle()
  const { queryId, jumpToDetail, appParams, jumpToPrivateChat } =
    useJump()
  const { winUserListData, winDynamicData, winChatListData, winPublishImageListData } = useWindow()
  const useData = useUserStore()

  // 举报弹框
  const isReport = ref(false)
  const userInfo = ref<UserInfo>(null)
  const bottomList = ref<DynamicInfo[]>([])
  const loading = ref(true)
  /** 是否显示关注 */
  const isShowFollow = ref(false)
  const allUserList = ref<UserInfo[]>(winUserListData)

  const getDynamicTitleName = (type: number) => {
    const item = winPublishImageListData.find(item => item.value === type)
    return item ? item.name : ''
  }

  const getData = () => {
    userInfo.value = winUserListData.find(v => v.userId === queryId.value)

    detailId.value = userInfo.value.userId

    bottomList.value = winDynamicData.filter(
      v => v.userId === userInfo.value.userId
    )
    console.log(bottomList.value, '====')
    isShowFollow.value = useData.userInfo.follow.includes(
      userInfo.value.userId
    )
    loading.value = false
  }

  const onGoDetail = (item: DynamicInfo) => {
    jumpToDetail(item.dynamicId, item.dynamicType, queryId.value)
  }

  const onFollow = () => {
    useData.userInfo.follow.push(userInfo.value.userId)
    userInfo.value.fans.push(useData.userInfo.userId)
    allUserList.value.forEach(v => {
      if (v.userId === useData.userInfo.userId) {
        v.follow = useData.userInfo.follow
      }
      if (v.userId === userInfo.value.userId) {
        v.fans = userInfo.value.fans
      }
    })
    isShowFollow.value = true
    appParams({ key: 'updateUser', value: allUserList.value, state: 1 })
  }

  const getCurrentDateTime = (): string => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // getMonth() 是 0-11
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const onAddChat = () => {
    const chatItem = winChatListData.find(v => {
      return (
        v.chatUserIds.includes(userInfo.value.userId) &&
        v.chatUserIds.includes(useData.userInfo.userId)
      )
    })
    if (chatItem) {
      jumpToPrivateChat(chatItem.chatId, queryId.value)
    } else {
      // 时间戳
      const item: ChatInfo = {
        chatId: `${Date.now()}_chatId`,
        chatUserIds: [userInfo.value.userId, useData.userInfo.userId],
        lastSendContent: '',
        lastSendTime: getCurrentDateTime(),
        unreadMsgCount: 0,
        lastSendUserId: useData.userInfo.userId
      }
      window?.chatListJson.push(item)

      showLoadingToast({
        message: 'Loading...',
        forbidClick: true,
        onClose: () => {
          appParams({
            key: 'uploadChat',
            value: window?.chatListJson,
            state: 1
          })
          jumpToPrivateChat(item.chatId, queryId.value)
        }
      })
    }
  }

  onMounted(() => {
    getData()
  })

  const shouldShowReport = (item) => {
    // 不显示自己
    return item.userId !== useData.userInfo.userId
  }
</script>

<template>
  <div v-if="!loading" class="other-home_box">
    <div class="top-user-info" :style="{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%), url(${userInfo.avator || Head})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
>
      <div class="avatar-info">
        <van-image
          round
          ai-avatar
          :src="userInfo.avator || Head"
          fit="cover"
          class="user-head"
        />
        <div h-2 w-20 relative>
          <van-image
            v-if="!isShowFollow && shouldShowReport(userInfo)"
            round
            bottom-2
            left-14
            absolute
            :src="otherHomeAddIcon"
            fit="cover"
            :style="{
              width: 'var(--other-home-follow-width)',
              height: 'var(--other-home-follow-height)'
            }"
            @click="onFollow"
          />
        </div>
        <span mt-1 ai-user-name>{{ userInfo.name }}</span>
      </div>
      <ul text-white flex justify-around class="number-box">
        <li>
          <span>{{ bottomList.length }}</span>
          <span>Posts</span>
        </li>
        <li>
          <span>{{ userInfo.fans.length }}</span>
          <span>Fans</span>
        </li>
        <li>
          <span>{{ userInfo.follow.length }}</span>
          <span>Follow</span>
        </li>
      </ul>
      <ul px-layout-padding class="bottom-box">
        <li>{{ userInfo.about }}</li>
        <li
          v-if="shouldShowReport(userInfo)"
        >
          <van-image :src="otherHomeMessageIcon" class="icon-box"
            :style="{
              width: 'var(--other-home-chat-width)',
              height: 'var(--other-home-chat-height)'
            }"
/>
          <span class="c" @click="onAddChat">
            Chat
          </span>
        </li>
      </ul>
    </div>

    <div p-layout-padding class="bottom-card">
      <div
        v-for="(item, index) in bottomList"
        :key="index"
        class="card-item"
        @click="onGoDetail(item)"
      >
        <div class="background-container">
          <div class="row-container">
            <div class="avatar-wrapper">
              <van-image
                round
                ai-avatar
                :src="userInfo.avator || Head"
                fit="cover"
                class="avatar-img"
              />
            </div>
            <div class="text-container">
              <span class="username">{{ userInfo.name }}</span>
            </div>
            <div
              v-if="shouldShowReport(item)"
              class="report-icon"
              @click.stop="
                () => {
                  isReport = true
                  detailId = item.userId
                }
              "
            >
              <van-image
                :src="fjm"
                style="width: 24px; height: 24px;"
              />
            </div>
          </div>
          <div class="dynamic-container">
            <van-image
              rounded-2
              h-50
              w-full
              overflow-hidden
              :src="item.dynamicPic[0] || Head"
              fit="cover"
              position="top"
              class="dynamic-image"
            />
            <div class="stats-container">
              <div class="stat-item">
                <div class="stat-item-inner">
                  <img
                    :src="otherHomeLikeIcon"
                    class="stat-icon"
                  />
                  <span class="stat-number">{{ item.dynamicLikeCount }}</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-item-inner">
                  <img
                    src="@/assets/public/rguyvsfbmuieyhbgvsfdjvknuyhsefdvhjc.png"
                    class="stat-icon"
                  />
                  <span class="stat-number">{{ item.dynamicCommentCount }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.dynamicType === 0" class="theme-tag">
            <span>{{ getDynamicTitleName(item.dynamicTitleType) }}</span>
          </div>
        </div>
      </div>
    </div>
    <report-box v-model:show="isReport" />
  </div>
</template>

<style lang="less" scoped>
.background-container {
  width: 100%;
  height: 272px;
  background-image: url('@/assets/public/reuygwbfvmsklvhjdbfiuehrgvnvfoeiuwvhjvnf.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 16px 12px 6px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.row-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
  width: 35px;
  height: 35px;
  background: linear-gradient(180deg, #6BD0FF 0%, #19FBC1 100%);
  border-radius: 50%;
  padding: 1px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  object-fit: cover;
}

.text-container {
  flex: 1;
  padding: 0 10px;
  min-width: 0;
}

.username {
  color: white;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.report-icon {
  padding-right: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.report-icon .van-image {
  color: white;
  font-size: 24px;
}

.dynamic-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
}

.dynamic-image-wrapper {
  width: 100%;
  height: 100%;
}

.dynamic-image {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  object-fit: cover;
}

.stats-container {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  gap: 10px;
}

.stat-item {
  height: 22px;
  background: linear-gradient(90deg, #6BD0FF 0%, #19FBC1 100%);
  border-radius: 11px;
  padding: 1px;
  box-sizing: border-box;
}

.stat-item-inner {
  height: 100%;
  background-color: black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 2px;
}

.stat-icon {
  width: 16px;
  height: 16px;
  object-fit: cover;
}

.stat-number {
  color: white;
  font-size: 14px;
  font-weight: normal;
}

.theme-tag {
  color: white;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 10px;
  flex-shrink: 0;
}
  .c {
    display: inline-block;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    background: linear-gradient(90deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .other-home_box {
    min-height: 100vh;
    background: var(--ai-other-home-bg-color);
  }

  .top-user-info {
    // background: url('@/assets/public/top-home.png');
    padding-bottom: 16px;
    background-size: cover;
    width: 100%;
    height: 346px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bottom-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        color: var(--ai-other-home-right-desc-text-color);
        font-size: var(--ai-other-home-right-desc-text-weight);
        font-weight: var(--ai-other-home-right-desc-text-size);

        &:nth-child(2) {
          margin-left: 10px;
          width: var(--ai-other-home-right-btn-style-width);
          height: var(--ai-other-home-right-btn-style-height);
          flex-shrink: 0;
          border-radius: var(
            --ai-other-home-right-btn-style-border-radius
          );
          background: var(--ai-other-home-right-btn-style-bg-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .number-box {
      margin: 6px 0;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          font-size: var(--ai-other-home-top-data-desc-text-size);
          font-weight: var(--ai-other-home-top-data-desc-text-weight);
          color: var(--ai-other-home-top-data-desc-text-color);

          &:nth-child(2) {
            font-size: var(--ai-other-home-top-data-text-text-size);
            font-weight: var(--ai-other-home-top-data-text-text-weight);
            color: var(--ai-other-home-top-data-text-text-color);
          }
        }
      }
    }
  }

  .avatar-info {
    padding: 80px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-head {
      width: 83px;
      height: 83px;
      border: 2px solid #19FBC1;
    }
  }

  .bottom-card {
    .card-item + .card-item {
      margin-top: 20px;
    }
  }
</style>
