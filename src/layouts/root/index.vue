<template>
  <div class="root">
    <header class="header">
      <div>logo</div>
      <div><router-link to="/login">login</router-link></div>
    </header>
    <main class="main">
      <aside class="aside">
        <div>
          <router-link to="/dashboard">dashboard</router-link>
        </div>
        <div>
          <router-link to="/system">system</router-link>
        </div>
        <div>
          <router-link to="/about">about</router-link>
        </div>
      </aside>
      <section class="main-router-view">
        <div class="page-wrapper">
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade-slide'" mode="out-in" appear>
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </router-view>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
  .root {
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 60px;
    background-color: #f5f5f5;
  }
  .header {
    height: 60px;
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: #ddeeee;
  }
  .main {
    display: flex;
    height: calc(100vh - 60px);
  }
  .aside {
    width: 200px;
    min-width: 200px;
    overflow-x: hidden;
    background-color: #fff;
  }
  .main-router-view {
    flex-grow: 1;
    padding: 16px;
    box-sizing: border-box;
  }
  .page-wrapper {
    height: 100%;
    background-color: #fff;
  }
</style>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* fade-slide */
  .fade-slide-leave-active,
  .fade-slide-enter-active {
    transition: all 0.3s;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
