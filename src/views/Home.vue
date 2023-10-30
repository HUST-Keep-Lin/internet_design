<script setup>
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { login } from "../utils/api/admin";
import { getCurrent } from "../utils/api/main";

const curDay = ref("");
const curTime = ref("");
const data = ref(null);
const router = useRouter();

const goToManagePage = () => {
  router.push("/manage");
};

// 界面初始化函数
const init = async () => {
  const res = await getCurrent();
  const {
    current_temperature,
    water_quality,
    automatic_water_change,
    target_temperature,
    oxygen_supply,
    feed,
    filed1,
  } = res.data;
  data.value = {
    current_temperature,
    water_quality,
    automatic_water_change,
    target_temperature,
    oxygen_supply,
    feed,
    filed1,
  }
};
onMounted(() => {
  // 展示当前时间
  let timer = setInterval(() => {
    const date = dayjs(new Date());
    curDay.value = date.format("YYYY-MM-DD");
    curTime.value = date.format("HH:mm:ss");
  }, 1000);
  init();
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
      <div class="left" @click="goToManagePage">
        <p style="font-size: 20px">当前水温</p>
        <p style="font-size: 40px">26℃</p>
        <p style="font-size: 20px">预定水温：</p>
      </div>
      <div class="right" @click="goToManagePage">
        <p style="font-size: 20px">水质状况</p>
        <p style="font-size: 40px">良好</p>
        <p style="font-size: 20px">自动换水：已关闭</p>
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
        <span class="show">已开启</span>
        <span class="btn" @click="goToManagePage">设置灯光方案</span>
      </div>
      <div class="set-item">
        <img
          src="../assets/img/oxygen.jpg"
          alt="氧气"
          style="width: 30px; height: 30px"
        />
        <span class="show">已关闭</span>
        <span class="btn" @click="goToManagePage">设置供氧方案</span>
      </div>
      <div class="set-item">
        <img
          src="../assets/img/feed.jpg"
          alt="投喂"
          style="width: 30px; height: 30px"
        />
        <span class="show">已开启</span>
        <span class="btn" @click="goToManagePage">设置投喂方案</span>
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
      }
    }
  }
}
</style>
