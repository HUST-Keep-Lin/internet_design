<script setup>
import { RouterView } from 'vue-router'
import MyNav from './components/MyNav.vue'
</script>

<template>

    <div class="wrapper">
      <MyNav/>
      
      <RouterView />
    </div>

</template>

<style>
.wrapper {
  width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
}
</style>
