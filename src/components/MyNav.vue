<script setup lang="js"></script>

<template>
  <div class="main">
    <div class="main-title">MyFish</div>
    <div class="nav-wrapper">
      <ul class="nav">
        <RouterLink to="/user/home"><li>我的鱼缸</li></RouterLink>
        <RouterLink to="/user/history"><li>历史数据</li></RouterLink>
        <RouterLink to="/user/manage"><li>智能管理</li></RouterLink>
        <RouterLink to="/user/setting"><li>设置中心</li></RouterLink>
        <RouterLink to="/user/about"><li>关于</li></RouterLink>
        <a
          href="javascript:void(0);"
          @click="logout"
          ><li>退出登录</li></a
        >
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const logout = (event) => {
  event.preventDefault();
  ElMessageBox.alert("确定要退出登录吗？", "", {
    autofocus: false,
    confirmButtonText: "OK",
    callback: (action) => {
      if (action === "confirm") {
        localStorage.removeItem("token");
        router.push("/login");
      }
    },
  });
};
</script>
<style lang="less" scoped>
.main {
  flex: 0 0 200px;
  min-height: 100vh;
  background: linear-gradient(
    to right,
    rgb(10, 46, 72),
    rgba(16, 44, 65, 0.733)
  );
  .main-title {
    height: 100px;
    width: 100%;
    font-size: 50px;
    color: #4caf50;
    font-family: "华光中雅_CNKI", cursive;
    text-align: center;
  }
  .nav-wrapper {
    width: 100%;
    .nav {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      a {
        cursor: pointer;
      }
      li {
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: white;
        font-size: 25px;
        font-family: "幼圆";
      }
    }
  }
}
</style>
