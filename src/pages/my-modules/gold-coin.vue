<script setup lang="ts">
  import MasonryIcon from '@/assets/public/masonry-icon.png'
  import MyIcon from '@/assets/public/my-icon.png'
  import { useJump } from '@/hooks/useJump'
  import { useWindow } from '@/hooks/useWindow'
  import { useUserStore } from '@/stores'

  defineOptions({
    name: 'GoldCoin'
  })

  const { userInfo } = useUserStore()
  const { winCoinData } = useWindow()
  const { appParams } = useJump()

  const formData = reactive({
    radio: winCoinData[0]?.key
  })

  const onRecharge = () => {
    appParams({ key: 'Recharge', value: formData.radio, state: 1 })
  }
</script>

<template>
  <div safe-area-inset-top class="gold-coin_box">
    <div p-layout-padding>
<div class="top-container">
      <div class="background-box">
        <span class="diamonds-title" style="padding-left: 17px;">My diamonds</span>
        <div class="white-box" />
      </div>
      <div class="coins-box">
        <div class="coins-inner">
          <img class="coin-icon" src="@/assets/public/my-icon.png" alt="" />
          <span class="coins-count">
            {{ userInfo.coins }}
          </span>
        </div>
      </div>
      <div class="masonry-icon">
        <van-image :src="MasonryIcon" fit="cover" />
      </div>
    </div>

      <!-- <ul class="top-box">
        <li>
          <van-image h-20 w-20 :src="MasonryIcon" fit="cover" />
        </li>
        <li ml-8 flex flex-col>
          <span ai-user-name>My diamonds</span>
          <span text-6 text-white font-medium>
            {{ userInfo.coins }}
          </span>
        </li>
      </ul> -->

      <div style="height: 30px;" />
      <div class="bottom-select">
        <div
          v-for="item in winCoinData"
          :key="item.key"
          class="option-item"
          :class="{ selected: formData.radio === item.key }"
          @click="formData.radio = item.key"
        >
          <div class="option-content">
            <div class="left-section">
              <van-image class="icon" :src="MyIcon" fit="cover" />
              <span class="coin-amount">{{ item.cions }}</span>
            </div>
            <div class="right-section">
              <span class="price">${{ item.meney }}</span>
              <div class="indicator" />
            </div>
          </div>
        </div>
      </div>

      <!-- 选项数据 -->
      <!-- <ul class="bottom-selsect">
        <li
          v-for="item in winCoinData"
          :key="item.key"
          :class="{ 'on-active': formData.radio === item.key }"
          @click="formData.radio = item.key"
        >
          <p>
            <van-image h-4 w-5 :src="MyIcon" fit="cover" />
            <span ml-1 ai-user-name>{{ item.cions }}</span>
          </p>
          <span ai-text-desc>{{ item.meney }}$</span>
        </li>
      </ul> -->

      <!-- 按钮 -->
      <div mt-6 flex justify-center>
        <div ai-gradient-btn @click="onRecharge">
          <div class="c">Recharge</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-container {
  position: relative;
  width: 100%;
  height: 103px;
}

.background-box {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/public/rebhinkbm.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 7px 0 0 0;
}

.diamonds-title {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.white-box {
  width: 100%;
  height: 73px;
  background-color: white;
  border-radius: 20px;
}

.coins-box {
  position: absolute;
  left: 12px;
  bottom: 16px;
  min-width: 116px;
  height: 40px;
  background: linear-gradient(135deg, #6BD0FF 0%, #19FBC1 100%);
  border-radius: 20px;
  padding: 2px;
}

.coins-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: black;
  border-radius: 20px;
  padding: 0 20px;
  gap: 8px;
}

.coin-icon {
  width: 26px;
  height: 22px;
  object-fit: cover;
}

.coins-count {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.masonry-icon {
  position: absolute;
  right: 13px;
  bottom: 6px;
  width: 130px;
  height: 130px;
}

  .bottom-select {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  .option-item {
    width: 100%;
    height: 64px;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
  }
  .option-item.selected {
    position: relative;
    padding: 2px;
    background: linear-gradient(90deg, #6BD0FF 0%, #19FBC1 100%);
    border-radius: 20px;
  }
  .option-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 20px;
    background-color: white;
  }
  .option-item.selected .option-content {
    background-color: #333333;
    border-radius: 18px; /* 20 - 2 */
  }
  .left-section {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .icon {
    width: 26px;
    height: 22px;
  }
  .coin-amount {
    font-size: 16px;
    font-weight: 700;
    color: #0E1C42;
  }
  .option-item.selected .coin-amount {
    color: white;
  }
  .right-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .price {
    font-size: 14px;
    font-weight: 400;
    color: #3B465C;
  }
  .option-item.selected .price {
    color: white;
  }
  .indicator {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #576073;
  }
  .option-item.selected .indicator {
    background: linear-gradient(180deg, #6BD0FF 0%, #19FBC1 100%);
    border: 1px solid white;
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
  .gold-coin_box {
    padding-top: calc(
      var(--van-nav-bar-height) + var(--ai-view-padding-top)
    );
    min-height: 100vh;
    background: var(--ai-coin-bg-color);
  }

  // .top-box {
  //   border-radius: 20px;
  //   background: url(https://img.js.design/assets/img/691aed6ab5e8b987e5484ce3.png#e628c21f3eda4f689fb2344148e7f297);
  //   border: 4px solid rgba(255, 255, 255, 0.09);
  //   display: flex;
  //   align-items: center;
  //   padding: 20px;
  //   padding-bottom: 10px;
  // }

  .bottom-selsect {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* 每行 3 列，每列等宽 */
    gap: 10px;
    /* 可选：设置子项之间的间距 */

    li {
      width: var(--ai-coin-select-style-width);
      height: var(--ai-coin-select-style-height);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: var(--ai-coin-select-style-border-radius);
      background: var(--ai-coin-select-style-bg-color);

      p {
        margin-bottom: 8px;
        display: flex;
        align-items: baseline;
      }
    }

    .on-active {
      background: var(--ai-coin-select-style-selected-color);
    }
  }
</style>
