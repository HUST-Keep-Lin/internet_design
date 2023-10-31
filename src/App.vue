<script setup>
import { RouterView } from "vue-router";
import MyNav from "./components/MyNav.vue";
</script>

<template>
  <div class="wrapper">
    <MyNav />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  display: flex;
  .content {
    flex: 1;
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>
