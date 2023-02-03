<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-show="modalActive" @click.self="$emit('close-modal')" class="absolute top-0 left-0 w-full h-screen flex justify-center bg-black bg-opacity-30 px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="max-w-screen-md bg-white mt-32 p-4 self-start">
                        <slot/>
                        <button @click="$emit('close-modal')" class="text-white bg-weather-primary px-6 py-2 mt-8">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
defineEmits([ 'close-modal' ]);
defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})


</script>

<style scoped>
.modal-enter-from,
.modal-leave-to{
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active{
    transition: all 0.3s ease;
}

.modal-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to{
    transform: scale(0.8);
}

.modal-inner-enter-active{
    transition: all 0.3s ease 0.15s;
}

.modal-inner-leave-active{
    transition: all 0.3s ease;
}


</style>