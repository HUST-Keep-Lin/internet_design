<script setup lang="js"></script>

<template>
  <div class="main">
    <div class="main-title">MyFish</div>
    <div class="nav-wrapper">
      <ul class="nav">
        <RouterLink to="/"><li>我的鱼缸</li></RouterLink>
        <RouterLink to="/history"><li>历史数据</li></RouterLink>
        <RouterLink to="/manage"><li>智能管理</li></RouterLink>
        <RouterLink to="/setting"><li>设置中心</li></RouterLink>
        <RouterLink to="/about"><li>关于</li></RouterLink>
      </ul>
    </div>
  </div>
</template>

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
