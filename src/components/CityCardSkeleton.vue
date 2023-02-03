<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md">
        <div class="flex flex-col flex-1 gap-2">
            <AnimationPlaceholder class="max-w-[50%]" />
            <AnimationPlaceholder class="max-w-[40%]" />
        </div>

        <div class="flex flex-col items-end flex-1 gap-2">
            <AnimationPlaceholder class="max-w-[50px] w-full" />
            <AnimationPlaceholder class="max-w-[75px] w-full" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AnimationPlaceholder from './AnimationPlaceholder.vue';

</script>