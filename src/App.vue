<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation/>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <Component :is="Component"></Component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import SiteNavigation from '@/components/SiteNavigation.vue';


</script>

<style scoped>
.page-enter-from,
.page-leave-to{
  opacity: 0;
}

.page-enter-active,
.page-leave-active{
  transition: all 0.5s ease;
}


</style>