<script setup>
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCurrent } from "../utils/api/main";

const curDay = ref("");
const curTime = ref("");
const data = ref({
  id: true,
  time: '',
  current_temperature: 0,
  target_temperature: 0,
  water_quality: 123,
  automatic_water_change: true,
  oxygen_supply: true,
  feed: true,
  light: false
});
const router = useRouter();

const goToManagePage = () => {
  router.push("/user/manage");
};

// 界面初始化函数
const init = async () => {
  const res = await getCurrent();
  data.value = res.data.body[0]
};
onMounted(async () => {
  // 展示当前时间
  const date = dayjs(new Date());
  curDay.value = date.format("YYYY-MM-DD");
  curTime.value = date.format("HH:mm:ss");

  let timer = setInterval(() => {
    const date = dayjs(new Date());
    curDay.value = date.format("YYYY-MM-DD");
    curTime.value = date.format("HH:mm:ss");
  }, 1000);
  await init();
  console.log(data);
});
</script>

<template>
  <div class="home">
    <!-- <RouterLink to="/history">点我去History</RouterLink> -->
    <!-- 鱼缸 -->
    <div class="state">
      <div class="left">
        <img
          src="../assets/img/fish-tank.jpg"
          alt="鱼缸图片"
          style="height: 200px"
        />
      </div>
      <div class="right">
        <div class="fish-state">鱼缸状态良好</div>
        <div class="day">日期：{{ curDay }} {{ curTime }}</div>
        <div class="weather">天气：</div>
      </div>
    </div>
    <!-- 鱼缸的详情信息 -->
    <div class="detail">
      <!-- 当前水温 -->
      <div
        class="left"
        @click="goToManagePage"
      >
        <p style="font-size: 20px">当前水温</p>
        <p style="font-size: 40px">{{ data.current_temperature }}</p>
        <p style="font-size: 20px">预定水温：{{ data.target_temperature }}</p>
      </div>
      <div
        class="right"
        @click="goToManagePage"
      >
        <p style="font-size: 20px">水质状况</p>
        <p style="font-size: 40px">{{ data.water_quality }}</p>
        <p style="font-size: 20px">自动换水：{{ data.automatic_water_change?'已开启':'已关闭' }}</p>
      </div>
    </div>
    <!-- 设置信息 -->
    <div class="set">
      <div class="set-item">
        <img
          src="../assets/img/light.jpg"
          alt="灯光"
          style="width: 30px; height: 30px"
        />
        <span class="show">{{ data.light?'已开启':'已关闭' }}</span>
        <span
          class="btn"
          @click="goToManagePage"
          >设置灯光方案</span
        >
      </div>
      <div class="set-item">
        <img
          src="../assets/img/oxygen.jpg"
          alt="氧气"
          style="width: 30px; height: 30px"
        />
        <span class="show">{{ data.oxygen_supply?'已开启':'已关闭' }}</span>
        <span
          class="btn"
          @click="goToManagePage"
          >设置供氧方案</span
        >
      </div>
      <div class="set-item">
        <img
          src="../assets/img/feed.jpg"
          alt="投喂"
          style="width: 30px; height: 30px"
        />
        <span class="show">{{ data.feed?'已开启':'已关闭' }}</span>
        <span
          class="btn"
          @click="goToManagePage"
          >设置投喂方案</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  flex: 1;
  .state {
    display: flex;
    justify-content: space-around;
    .right {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .fish-state {
        color: #4caf50;
        font-size: 50px;
      }

      .day {
        color: #000000;
        font-size: 30px;
      }

      .weather {
        color: #000000;
        font-size: 30px;
      }
    }
  }

  .detail {
    display: flex;
    justify-content: space-around;
    margin: 20px 10px;
    padding: 10px;
    .left,
    .right {
      width: 35%;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(
        to top,
        rgba(51, 153, 255, 0.8),
        rgba(51, 153, 255, 0.1)
      );
      color: #004c99;
      p {
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }

  .set {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    .set-item {
      line-height: 35px;
      font-size: 20px;
      .show {
        padding-left: 10px;
        padding-right: 10px;
      }
      .btn {
        color: white;
        background-color: rgb(92, 164, 237);
        border-radius: 8px;
        padding-left: 10px;
        padding-right: 10px;
        box-shadow: 0px 5px 0px 0px rgb(0, 102, 204);
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
          background: #66b2ff;
        }
        &:active {
          transform: translate(0, 4px);
          box-shadow: 0px 0px 0px 0px rgb(0, 102, 204);
        }
      }
    }
  }
}
</style>
