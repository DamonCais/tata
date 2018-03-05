<template>
  <div id="app">
    <l-header/>
    <tab/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <mini-dict/>
  </div>
</template>

<script>
import LHeader from '@/public/Header'
import Tab from '@/public/Tab'
import MiniDict from '@/public/MiniDict'
export default {
  name: 'App',
  components:{
    LHeader,
    Tab,
    MiniDict
  }
}
</script>

<style lang="scss">
</style>
