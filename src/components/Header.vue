<template>
    <header :on-mouseenter="showWidget" :on-mouseleave="hideWidget">
        <nav>
            <li v-for="(value, index) in props.Navlinks" :key="index">
                <router-link :to="value" />
            </li>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    Navlinks: {
        type: Array as () => string[],
        required: true
    },
});

const isWidgetVisible = ref(true);

function showWidget() {
    isWidgetVisible.value = true;
}

function hideWidget() {
    isWidgetVisible.value = false;
}

</script>

<style scoped>
.floating-widget {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 100px;
    height: 100px;
    background-color: #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    opacity: 0.8;
    cursor: pointer;
}

.floating-widget:hover {
    opacity: 1;
}
</style>