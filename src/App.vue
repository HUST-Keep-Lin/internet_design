<script setup>
</script>

<template>
  <div class="wrapper">
    <router-view />
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
