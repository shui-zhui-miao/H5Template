<script setup lang="ts">
  import ChatBack from '@/assets/public/chat-index.png'
  import bkd from '@/assets/public/gerhibhsdkbn.png'
  import MasonryIcon from '@/assets/public/my-icon.png'
  import bk from '@/assets/public/rklgojhbksjnfib.png'
  import { useAppImgStyle } from '@/hooks/useAppImgStyle'
  import { useJump } from '@/hooks/useJump'
  import { useWindow } from '@/hooks/useWindow'
  import { useUserStore } from '@/stores'

  defineOptions({
    name: 'ChatView'
  })

  const { chatBgImage } = useAppImgStyle()
  const { winUserData, winUserListData, winChatBotDesc } = useWindow()
  const { userInfo } = useUserStore()
  const { jumpToRecharge, appParams, jumpToChatDetail } = useJump()

  /** 弹框  */
  const show = ref(false)

  const onSubmit = () => {
    show.value = !(userInfo.coins >= winChatBotDesc.points)
    if (userInfo.coins >= winChatBotDesc.points) {
      const data = {
        ...winUserData,
        coins: userInfo.coins - winChatBotDesc.points
      }

      const list = winUserListData.map(v => {
        if (v.userId === data.userId) {
          v.coins = data.coins
        }
        return v
      })
      appParams({ key: 'updateUser', value: list, state: 1 })
      jumpToChatDetail()
    }
  }
</script>

<template>
  <div relative class="chat-view_box">
    <van-image :src="ChatBack" fit="contain" class="top-back" height="32vh" />
    <div class="text-center w-full top-34vh">
      <ul p-layout-padding>
        <div class="c1">
          <li ai-input-title>{{ winChatBotDesc.title }}</li>
          <van-image :src="bk" class="c2" />
        </div>
        <li
          ai-text-desc
          class="mt-2 !text-[var(--ai-chat-view-text-color)] content_box"
        >
          {{ winChatBotDesc.content }}
        </li>
        <li flex justify-center class="public-btoom-btn">
          <div
            ai-gradient-btn
            class="bottom-btn public_btn"
            @click="onSubmit"
          >
          <div class="c">
            <van-image h-12 w-12 :src="MasonryIcon" fit="cover" width="45px" height="39px" />
            <span text-5 font-700 ml-1>
              X {{ winChatBotDesc.points }}
            </span>
            <span text-4 font-400 ml-8 mr-1>Chat</span>
            <!-- <van-image
              :src="chatBtnIcon"
              fit="cover"
              :style="{
                width: 'var(--ai-btn-arr-image-width)',
                height: 'var(--ai-btn-arr-image-height)'
              }"
            /> -->
          </div>
</div>
        </li>
      </ul>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div flex h-full justify-center>
        <div class="block" @click.stop>
          <div
            :style="{ background: `url(${chatBgImage})` }"
            class="content"
            style="background-size: cover"
          >
            <van-image :src="bkd" width="170px" height="30px" />

            <div class="balance-container">
              <div class="balance-text sorry-text">Sorry</div>
              <div class="balance-text insufficient-text">your current balance is insufficient</div>
            </div>
            <div mt-8 flex justify-center style="width: 200px;">
              <div ai-gradient-btn @click="jumpToRecharge()">
                <div class="c">Recharge</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="less" scoped>
  .balance-container {
    width: 212px;
    height: 192px;
    background-image: url('@/assets/public/vyakbvnkjanfv.png');
    background-size: cover;
    padding: 0 26px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 18px;
  }

  .sorry-text {
    margin-top: 86px;
    color: #0E1C42;
    font-size: 20px;
    font-weight: bold;
  }

  .insufficient-text {
    margin-top: 10px;
    color: #576073;
    font-size: 16px;
    font-weight: normal;
    width: 100%;
    text-align: center;
  }
  .c2{
    width: 24px;
    height: 26px;
    transform: translateY(-10px);
  }
  .c1{
    display: flex;
    justify-content: center;
  }
  .c {
    background: #000000;
    border-radius: 26px;
    margin: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .chat-view_box {
    background: var(--ai-chat-view-bg-color);
    height: 100vh;
    overflow-y: auto;
    .content_box {
      background: var(--ai-chat-view-bg-color);
      padding-bottom: calc(50px + var(--ai-view-padding-bottom));
      text-align: center;
      font-size: 20px;
      font-weight: 400;
    }
  }

  .top-back {
    width: 100%;
    height: 510px;
    margin-top: 35px;
  }

  .bottom-btn {
    width: var(--ai-chat-view-btn-width);
    height: var(--ai-chat-view-btn-height);
    color: var(--ai-chat-view-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .block {
    // margin-top: 20vh;
    height: 300px;

    .content {
      width: var(--ai-chat-view-popup-bg-img-width);
      height: var(--ai-chat-view-popup-bg-img-height);
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center ;
      padding-bottom: 20px;
    }
  }
</style>
