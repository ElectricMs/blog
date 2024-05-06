<template>
    <img class="frontimg"src="../medias/1.png"/>

    <!--导航栏-->
    <div class="container">
        <header class="navbar">
            <div class="left-section">
                <img src="../medias/logo.png" alt="Logo" class="navbar-logo" />
                <p>这是一个博客</p>
            </div>
            <nav class="navbar-nav">
                <div class="nav-item" @click="homePage">首页</div>
                <div class="nav-item" @click="tag">标签</div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categortyOptions" trigger="click">
                    <div>分类<span>{{ categoryName }}</span></div>
                </n-popselect>
                <div class="nav-item" @click="file">归档</div>
                <div class="nav-item" @click="about">关于</div>
                <div class="nav-item" @click="dashboard">后台</div>
            </nav>
        </header>
        
        <n-divider />
        <!--查询框-->
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
            <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
        </n-space>
        <!--文章列表-->
        <div v-for="(blog, index) in blogListInfo" style="margin-bottom:15px;cursor: pointer;">
            <n-card :title="blog.title" @click="toDetail(blog)">
                <div v-html="blog.content"></div>

                <template #footer>
                    <n-space align="center">
                        <div>发布时间：{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <!--分页-->
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>这是一个页尾</div>
            <div>Power by ElectricM</div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 路由
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

// 选中的分类
const selectedCategory = ref(0)
// 分类选项
const categortyOptions = ref([])
// 文章列表
const blogListInfo = ref([])

// 查询和分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0,
})

onMounted(() => {
    loadCategorys();
    loadBlogs()
})

//获取博客列表
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
    let temp_rows = res.data.data.rows;
    // 处理获取的文章列表数据
    for (let row of temp_rows) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    pageInfo.count = res.data.data.count;
    //计算分页大小
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res)
}

const categoryName = computed(() => {
    //获取选中的分类 find
    let selectedOption = categortyOptions.value.find((option) => { return option.value == selectedCategory.value })
    //返回分类的名称 如果找的到的话
    return selectedOption ? selectedOption.label : ""
})

//获取分类列表
const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    console.log(categortyOptions.value)
}

//选中分类
const searchByCategory = (categoryId)=>{
    pageInfo.categoryId = categoryId ;
    loadBlogs()
}

//页面跳转
const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})//返回时携带文章id
}

const homePage = () => {
    router.push("/")
}

const tag = () => {
    router.push("/tag")
}

const file = () => {
    router.push("/file")
}

const about = () => {
    router.push("/about")
}

const dashboard = () => {
    router.push("/login")
}


</script>

<style lang="scss" scoped>

.search{
    margin-bottom: 15px;
}
.container {
    width: 1200px;
    margin: 0 auto;
}



.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between; /* 使元素两端对齐 */
    align-items: center; /* 垂直居中对齐 */
    background-color: #ffffff; /* 根据需要调整背景色 */
    padding: 0 15px; /* 可选，内外边距调整 */
    height: 60px; /* 根据需要调整高度 */
    z-index: 100; /* 确保导航栏在最顶层 */
    border-bottom:2px solid grey;
}

/* 调整navbar内部元素 */
.navbar-logo {
    height: 40px; /* 保持logo大小调整 */
    object-fit: cover;
}



/* 新增样式，用于将图标和文字视为一组，靠左显示 */
.left-section {
    display: flex;
    align-items: center; /* 保证图标和文字垂直居中 */
}

.left-section p{
    margin-left:20px;
    font-size:20px;
}

/* 保证导航项在一行内显示 */
.navbar-nav {
    display: flex;
    justify-content: space-around; /* 或space-between根据需要调整间距 */
    align-items: center;
    height: 60px; /* 根据需要调整高度 */
}

.nav-item {
    cursor: pointer; /* 改变鼠标样式，提升交互体验 */
    padding: 0 15px; /* 为导航项之间提供一些间距 */
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333; /* 文字颜色 */
}

/* 你可以根据需要调整更多细节，如字体大小、悬停效果等 */
.nav-item:hover {
    color: #007bff; /* 示例：悬停颜色变化 */
}

.nav {
    
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: #f60;
        }

        span {//查询的类别字就小一点
            font-size: 12px;
        }
    }
}

.frontimg{
    width:100%;
    height:auto;
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>