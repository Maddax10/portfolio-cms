<script lang="ts" setup>
    import { useImagesStore } from '@/stores/images';
    import { ref } from 'vue';
    import AddImageModal from './modals/AddImageModal.vue';
    const emit = defineEmits<
        { (e: "selectImage", path: string): void }
    >();

    const imagesStore = useImagesStore();
    const isShowImages = ref(false)
    const isShowAddModal = ref(false)
    const showImages = () => {
        imagesStore.initImages();
        isShowImages.value = !isShowImages.value;
        console.log(imagesStore.images)
    }
    const selectImagePath = (path: string) => {
        emit('selectImage', path)
    }

    const showAddImage = () => {
        isShowAddModal.value = !isShowAddModal.value;
    }
</script>

<template>
    <TransitionGroup name="fade">

        <button class="images" aria-label="sélectionner une image" @click="showImages">Sélectionner une image</button>
        <div class="images__show" v-if="isShowImages">
            <button class="images__add" @click="showAddImage">+</button>
            <AddImageModal v-if="isShowAddModal"></AddImageModal>
            <div class="images__items">
                <img class="images__item" v-for="(path, key) in imagesStore.images" :key="key" :src="path"
                    @click="selectImagePath(path)">
            </div>
        </div>
    </TransitionGroup>
</template>