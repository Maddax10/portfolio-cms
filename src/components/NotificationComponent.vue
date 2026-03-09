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
