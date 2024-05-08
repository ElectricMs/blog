<template>
    <div class="backgroundimg"></div>
    <div class="frontimg-container">
        <img class="frontimg" src="../medias/1.png" alt="Front Image" >
        <div class="bottom-div" id="startReading"></div><!--定位用 无内容-->
    </div>
    <div class="maintitle">这是一个博客</div>
    <div class="cover-btns">
        <a @click="startReading()" class="waves-effect waves-light btn">
            <i class="fa fa-angle-double-down"></i>
            开始阅读
        </a>
        <a href="https://github.com/ElectricMs/blog" class="waves-effect waves-light btn" target="_blank">
            <i class="fab fa-github-alt"></i>
            Github
        </a>
    </div>



    <!--导航栏-->
    <header class="navbar" ref="navBar">
            <div class="left-section">
                <img src="../medias/logo.png" alt="Logo" class="navbar-logo" @click="homePage"/>
                <p  @click="homePage">这是一个博客</p>
            </div>
            <nav class="navbar-nav">
                <div class="nav-item" @click="homePage">首页</div>
                <div class="nav-item" @click="tag">标签</div>
                <div class="nav-item" @click="classify">分类</div>
                <div class="nav-item" @click="file">归档</div>
                <div class="nav-item" @click="about">关于</div>
                <div class="nav-item" @click="dashboard">后台</div>
            </nav>
    </header>

    




    <div class="container" >
        <div ></div>
        <div class="con-title">愿新的一年里我们都能更好地爱自己</div>
        <div class="con-text">
            在新的一年里，不知你会有怎样的计划和愿景。是学业上更上一层楼，是事业上开疆拓土，亦或是在平凡而温暖的生活里感受爱与被爱？
            不论你是谁，处在什么样的人生阶段，想要获得什么，但至少有一件事我想或许对于你与我或其他任何人都是相通的，那就是学会爱自己。
            很多时候我们都会渴望被爱、被接纳与宠溺，为了获取这样一份爱和肯定，或许你曾竭力地想要甩掉自身的一些缺陷，或许习惯于不断地
            鞭策自己，想要事事做到最好，又或是对曾经犯下的错误懊恼不已，不愿原谅自己。你可能认为，只有自己足够好足够优秀才值得起自己
            想要获得的爱。然而事实上，我们可能很难做到因完美而被爱，也没有任何人能做到完美。但是我们会因真实而被爱，那些或是好的或是
            令人烦恼的方方面面共同构成了完整的我们。真实自有千钧力。想要获得别人的接纳，或许我们首先需要去接纳完整的真实的自己。承认
            、欣赏并相信自己的能力，也接纳自身可能存在的局限，接纳自己的身体和外在，在负面评判前保护自己，能客观吸收，但不过分苛责。
            对自己的优点、缺点不加评判地承认，接受自己当前的样子。在这个世界上，最爱我们的人也应当是我们自己。当我们能爱自己、在意自
            己的感受、尊重自己、及时地保护自己，别人才有可能会接受到同样的讯号。因为我们珍视自己时，这份珍视才能传递，他们才会认为自
            己应当同样地对待我们。爱自己，或许会成为我们与人交往最大的底气，当得不到足够的接纳与尊重时，我们转身还会有一个自己。张开
            双臂去拥抱和关爱我们内心的小孩，使我们真正有拒绝和离开的勇气。愿新的一年里我们都能更好地爱自己。
        </div>
        <div class="con-title" style="margin-top:30px">推荐文章</div>

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
        
    </div>

    <div class="footer">
        <div>这是一个页尾</div>
        <div>Power by Vue3 + Vite</div>
    </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed, onUnmounted } from 'vue'
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

//页面跳转
const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})//返回时携带文章id
}

const homePage = () => {
    //router.push("/")
    location.reload(true);
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

const classify = () => {
    router.push("/classify")
}



const navBar = ref('navbar');

onMounted(() => {//实现导航栏在网页最上方和向下滚动时的不同效果
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//适配不同浏览器
    navBar.value.style.background = scrollTop > 0 ? 'linear-gradient(to right, #ffb6c1, #b3ebeb)' : 'transparent';
    navBar.value.style.boxShadow = scrollTop > 0 ? '0px 4px 15px rgba(0, 0, 0, 0.3)' : '0px 0px 0px rgba(0, 0, 0, 0)';

  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

function startReading() {
    var element = document.getElementById("startReading");
    if(element) {
        element.scrollIntoView({behavior: "smooth"}); // 平滑滚动
    } else {
        console.error('未找到ID为 "startReading" 的元素');
    }
}

</script>

<style lang="scss" scoped>

.frontimg-container {
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    width: 100vw;
    overflow: hidden; /* 防止内容溢出 */
}

.frontimg {
    object-fit: cover; /* 保持图片填充容器并保持宽高比 */
    width: 100%; 
    height: 100vh; 
    position: absolute; 
    top: 0;
    left: 0;
    z-index: -1; /* 确保图片在底部div后面 */
}

.bottom-div {
    position: absolute; 
    bottom: 0; 
    left: 0;
    right: 0; 
    height: 60px; /* 高度和nav一致 用于定位 */
   
}

.backgroundimg{
    width:100%;
    height:100%;
    position:fixed;
    background-image: 
        linear-gradient(to right, #f9ccc4, #a1ecf5), /* 渐变层 */
        url("../medias/background.jpg"); /* 图片层 */
    background-repeat: no-repeat; /* 防止图片平铺 */
    background-position: center; /*图片居中显示 */
    background-size: cover; /* 图片填充整个背景，保持宽高比并剪裁边缘 */
    background-attachment: fixed; /* 让背景固定不动 */
    z-index:-10;
    background-blend-mode: multiply; /* 使用multiply模式，你可以根据需要选择其他混合模式 */
}

.maintitle{
    color:white;
    position:absolute;
    font-size:80px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*font-family:serif;*/
}

.cover-btns{
    position:absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cover-btns a {
    margin: 10px 15px;
    padding: 20px 40px;
    height: 45px;
    line-height: 45px;
    font-size: 1rem;
    color: #fff;
    border: 1px solid #fff;
    background-color: transparent;
    border-radius: 30px;
    box-shadow: none;
    text-decoration: none;
}

.search{
    margin-bottom: 15px;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    background-color:transparent; 
    padding: 0 15px; /* 可选，内外边距调整 */
    height: 60px; /* 根据需要调整高度 */
    z-index: 100; /* 确保导航栏在最顶层 */
    /*border-bottom:2px solid grey;*/
    transition: background-color 0.1s ease; /* 变化持续0.1秒，过渡效果为ease    这一行已经没用了 还有实现的方法吗 */

}

/* 调整navbar内部元素 */
.navbar-logo {
    height: 30px; /* 保持logo大小调整 */
    object-fit: cover;
}



/* 新增样式，用于将图标和文字视为一组，靠左显示 */
.left-section {
    display: flex;
    align-items: center; /* 保证图标和文字垂直居中 */
    margin-left:10%;
}

.left-section p{
    margin-left:20px;
    font-size:23px;
    color:white;
}

/* 保证导航项在一行内显示 */
.navbar-nav {
    display: flex;
    justify-content: space-around; /* 或space-between根据需要调整间距 */
    align-items: center;
    height: 60px; /* 根据需要调整高度 */
    margin-right:8%;
    font-weight: 600;
}

.nav-item {
    cursor: pointer; /* 改变鼠标样式，提升交互体验 */
    padding: 0 15px; /* 为导航项之间提供一些间距 */
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white; /* 文字颜色 */
    font-size:15px;
}

/* 你可以根据需要调整更多细节，如字体大小、悬停效果等 */
.nav-item:hover {
    color: #007bff; /* 示例：悬停颜色变化 */
}

.container {
    max-width: 1000px;
    margin: 20px auto;
    background-color:white;
    padding:20px 30px;
    border-radius: 20px; 
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
}

.con-title{
    text-align:center;
    color:#34495e;
    margin-bottom: 20px;
    border-top:20px;
    font-size: 2rem;
    font-weight: 700;
}

.con-text{
    margin:0 auto;
    font-size: 14px;
    line-height: 1.6;
    text-align:center;
    width:68%;
    color:#85929e;
    font-size:18px;
}

.footer {
    
    line-height: 25px;
    color:white;
    background:linear-gradient(to right, #ffb6c1, #b3ebeb);
    height:70px;
    display:flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;

}
</style>