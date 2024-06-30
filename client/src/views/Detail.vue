<!-- 这是个挂载到body的div上的页面组件！ -->
<template>

    <body>
        <header>
            <n-button @click="back" style="width:150px;margin-top:30px;">返回</n-button>
            <h1>{{ blogInfo.title }}</h1>
        </header>
        <div class='content' v-html="blogInfo.content"></div>
    </body>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()//跳转用
const route = useRoute()//获取数据
const blogInfo = ref({})
const axios = inject("axios")

onMounted(() => {
    loadBlog()
})

/**
 * 读取文章详情
 */
const loadBlog = async () => {
    console.log(router)
    console.log(route)
    let res = await axios.get("/blog/detail?id=" + route.query.id)
    blogInfo.value = res.data.rows[0];
}

const back = () => {
    router.push("/")
}

</script>

<style lang="scss" scoped>
body {
    font-family: Arial, sans-serif;
    /* 设置字体 */
    font-size: 16px;
    /* 设置字体大小 */
    font-weight: bold;
    /* 设置字体粗细 */

    text-transform: uppercase;
    /* 文字转换为大写 */
    color: #333;
    /* 设置文字颜色 */
    letter-spacing: 1px;
    /* 设置字母间距 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    margin: 0;
    padding: 0;
}

body {
    position: relative;
    background-image:
        linear-gradient(to top right, green 40%, yellow 45%, red 50%, grey 50%);
    background-position: 0 0px;
    background-size: 100% calc(100% - 100vh + 165px);
    z-index: -1;
}

header,
.content {
    padding: 0 10%;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    width: 100%;
    height: 150px;
    background-image: linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url(../medias/background.jpg);
    z-index: -1;
}

body::after {
    content: '';
    position: fixed;
    width: 100%;
    top: 160px;
    bottom: 0;
    background-image: linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url(../medias/background.jpg);
    z-index: -1;
}

header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 150px;
    background-image: linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url(../medias/background.jpg);
}

.content {
    line-height: 0.5pm;
    margin-top: 160px;
}
</style>