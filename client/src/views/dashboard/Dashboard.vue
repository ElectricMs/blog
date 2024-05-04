<template>
    <div class="main-panel">
        
        <div class="menus">
            <div style="height:125px"></div><!--为了好看而加的空白 治疗强迫症-->
            <div v-for="(menu, index) in menus" @click="toPage(menu)"><!--循环遍历渲染  点击事件-->
                {{ menu.name }}
            </div>
        </div>
        <div style="padding:20px;width:100%">
            <router-view></router-view>
        </div>
        <div class="title" v-if="!isMobile">Blog Dashboard</div>
    </div>
</template>

<script setup>
    import { AdminStore } from '../../stores/AdminStore'
    import { ref, reactive, inject } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const message = inject("message")
    const axios = inject("axios")

    const adminStore = AdminStore()

    //菜单
let menus = [
    { name: "文章管理", href: "/dashboard/article" },
    { name: "分类管理", href: "/dashboard/category" },
    { name: "退出", href: "logout" },
];

//路由跳转 二级路由
const toPage = (menu) => {//看点了什么
    if (menu.href == 'logout') {
        router.push("/login")
    } else {
        router.push(menu.href)//转到对应文章
    }
}

//响应式逻辑实现根据网页宽度动态渲染底部文字
import {onMounted, onBeforeUnmount } from 'vue';
const isMobile = ref(window.innerWidth < 1000);

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

function updateIsMobile() {
  isMobile.value = window.innerWidth < 1000;
}

</script>

<style lang="scss" scoped>
   
    .main-panel {
        display: flex;
        color: #64676a;
        max-width: 1500px;
        height:100vh;
        margin: 0 auto;
    }

    .menus {//真神奇 为什么不居中 行内和块级都不行
        padding: 0 auto;
        margin:0 auto;
        box-sizing: border-box;
        line-height: 60px;
        text-align: center;
        width: 200px;
        height: 100vh;
        border-right: 1px solid #dadada;//这个线怎么延申的刚刚好
        //position:absolute;

        div {
            cursor: pointer;
            &:hover {//划过去变色
                color: #fd760e;
            }
        }
    }

    .title{
        font-size: 60px;
        font-weight: bold;
        text-align: right;
        position: fixed;
        color: rgba(0, 0, 0, 20%);
        right: 50px;
        bottom: 20px;
    }

    
</style>

