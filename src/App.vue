<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>

<style>
  body,
  html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  /* 进度条样式 */
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 2px;
    background-color: #66ccff;
    opacity: 0.9;
  }
</style>
