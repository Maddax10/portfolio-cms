<script setup lang="ts">

    const props = defineProps({
        message: {
            type: String,
            required: true
        },
        error: {
            type: Boolean,
            required: true
        }
    })

</script>

<template>

    <div class="notification" :class="props.error ? 'notification__error' : 'notification__ok'">{{ props.message }}
    </div>

</template>

<style lang="scss">
    @use "../styles/variables" as *;

    .notification {
        display: flex;
        position: fixed;
        justify-self: center;
        z-index: 10000;
        border-radius: 12px;
        backdrop-filter: blur(4px);
        font-weight: 700;
        top: 100px;
        box-shadow: 0 0 12px 0 black;
        overflow: hidden;
        width: 80%;
        justify-content: center;
        font-size: 18px;

        &__error {
            background-color: #FF0000BB;
            color: #ffe1e1;
            padding: 16px;
        }

        &__ok {
            background-color: #00ac00BB;
            color: #e1FFe1;
            padding: 16px;
        }
    }
</style>