<template>
    <div class="container">


        <el-affix target=".container">
            <div class="navbar" @mouseover="expandNavbar" @mouseout="collapseNavbar">
                <nav class="scene_nav" :class="{ 'collapsed': isCollapsed }">
                    <ol class="scene_nav_list">
                        <li class="scene_nav_item" v-for="(router, index) in MyTabs" :key="index">
                            <router-link :to="router.path" class="scene_nav_button"
                                :class="{ 'o-active': router.name === useRouter().currentRoute.value.name }">
                                <!-- 按钮内容 -->
                            </router-link>
                        </li>
                    </ol>
                </nav>
            </div>
        </el-affix>



        <div v-if="isLoading" class="loading-overlay">
            <!-- 加载动画 -->
        </div>
        <router-view v-if="!isLoading" />

        <el-backtop :right="100" :bottom="100" />

    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { MyTabs } from '@/assets/data'
import { ref, onMounted, onUnmounted } from 'vue';

//控制加载动画
const isLoading = ref(false);
//控制导航栏收缩
const isCollapsed = ref(true);

function expandNavbar() {
    isCollapsed.value = false;
}

function collapseNavbar() {
    isCollapsed.value = true;
}


</script>

<style lang="scss" scoped>
$keyColor: rgba(100, 250, 250, 1);
$buttonColor: rgba(10, 120, 150, 1);
$buttonSize: 50px;
$buttonActiveSize: 160px;
$buttonMargin: -8px;


.container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
}


.navbar {
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    top: 0;
    /* 导航栏高度 */

}

.scene_nav.collapsed {
    opacity: 0;
    /* 隐藏时的不透明度 */
    transition: opacity 0.3s ease;
    /* 不透明度过渡效果 */
}

.scene_nav {
    opacity: 1;
    /* 初始不透明度 */
    transition: opacity 0.3s ease;
    /* 不透明度过渡效果 */

    &_list {
        display: flex;
        margin: 0;
        padding: 0;
        transform: scaleY(0.6);
    }

    &_item {
        display: block;

        &:nth-child(even) {
            transform: scaleY(-1);
        }

        &:not(:first-child) {
            margin-left: $buttonMargin;
        }
    }

    &_button {
        display: block;
        width: $buttonSize;
        height: $buttonSize;
        margin: 0;
        padding: 0;
        border: none;
        background: $buttonColor;
        outline: none;
        cursor: pointer;
        transition: 500ms;
        clip-path: polygon(calc($buttonSize / 2) 0,
            calc(100% - #{calc($buttonSize / 2)}) 0,
            100% 100%,
            0 100%);

        &.o-active {
            width: $buttonActiveSize;
            background: $keyColor;
        }

        &:hover {
            background: $keyColor;
        }
    }
}
</style>