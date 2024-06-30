<template>
  <router-view></router-view>

</template>

<script setup>
import { onMounted } from 'vue';
import { startSakura } from './common/Sakura';
onMounted(() => {
  startSakura();
})
</script>

<style scoped>

</style>
