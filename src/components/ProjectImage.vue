<script lang="ts" setup>
    import { API_URL } from '@/config/config';
    import { useImagesStore } from '@/stores/images';
    import { ref } from 'vue';
    const emit = defineEmits<
        { (e: "selectImage", path: string): void }
    >();

    const imagesStore = useImagesStore();
    const isShowImages = ref(false)
    const showImages = () => {
        imagesStore.initImages();
        isShowImages.value = !isShowImages.value;
        console.log(imagesStore.images)
    }
    const selectImagePath = (path: string) => {
        emit('selectImage', path)
    }
</script>

<template>
    <TransitionGroup name="fade">

        <div class="images" @click="showImages">Show images</div>
        <div class="images__show" v-if="isShowImages">
            <img class="images__item" v-for="path, key in imagesStore.images" :key="key" :src="API_URL + path"
                @click="selectImagePath(path)">
        </div>
    </TransitionGroup>
</template>