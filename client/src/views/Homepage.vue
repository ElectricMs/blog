<template>
    <div class="backgroundimg"></div>
    <div class="frontimg-container">
        <img class="frontimg" src="../medias/1.png" alt="Front Image" >
        <div class="bottom-div" id="startReading"></div><!--定位用 无内容-->
    </div>
    <div class="maintitle">克服己身，叫身服我</div>
    <div class="cover-btns">
        <a @click="startReading()">
            <n-icon size="25"class="icon-maximize"><ArrowDownCircle/></n-icon>
            开始阅读
        </a>
        <a href="https://github.com/ElectricMs/blog"  target="_blank">
            <n-icon size="25"class="icon-maximize"><LogoGithub/></n-icon>
            Github
        </a>
    </div>



    <!--导航栏-->
    <header class="navbar" ref="navBar">
            <div class="left-section">
                <img src="../medias/logo.png" alt="Logo" class="navbar-logo" @click="homePage"/>
                <p  @click="homePage">所念皆星河</p>
            </div>
            <nav class="navbar-nav">
                <div class="nav-item" @click="homePage">
                    <n-icon size="18"class="icon-maximize"><HomeSharp/></n-icon>
                    首页
                </div>
                <div class="nav-item" @click="tag">
                    <n-icon size="18"class="icon-maximize"><PricetagsSharp/></n-icon>
                    标签
                </div>
                <div class="nav-item" @click="classify">
                    <n-icon size="18"class="icon-maximize"><BookmarkSharp/></n-icon>
                    分类
                </div>
                <div class="nav-item" @click="file">
                    <n-icon size="18"class="icon-maximize"><ArchiveSharp/></n-icon>
                    归档
                </div>
                <div class="nav-item" @click="about">
                    <n-icon size="18"class="icon-maximize"><PersonCircleSharp/></n-icon>
                    关于
                </div>
                <div class="nav-item" @click="dashboard">
                    <n-icon size="18"class="icon-maximize"><LogInSharp/></n-icon>
                    后台
                </div>
            </nav>
    </header>

    




    <div class="container" >
        
        <div class="con-title">
            <n-icon size="26"class="icon-maximize"><BulbOutline/></n-icon>
            愿新的一年里我们都能更好地爱自己
        </div>
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
        <div class="con-title" style="margin-top:30px">
            <n-icon size="26"class="icon-maximize"><ThumbsUpOutline/></n-icon>
            推荐文章
        </div>

        <div class="articlecard">
           <div class="card-content">
                <h3 class="card-title">Python面向对象</h3>
                <p class="card-text">Python从设计之初就已经是一门面向对象的语言，正因为如此，在Python中创建一个类和对象是很容易的。
                    本章节我们将详细介绍Python的面向对象编程。
                    如果你以前没有接触过面向对象的编程语言，那你可能需要先了解一些面向对象语言的一些基本特征，
                    在头脑里头形成一个基本的面向对象的概念，这样有助于你更容易的学习Python的面向对象编程。
                </p>
           </div>

        </div>
        <div class="articlecard2">
            <div class="articlecard3" id="card-left">
                <div class="card-content">
                    
                 
                    <h3 class="card-title">Java TCP通信详解</h3>
                    
                    <p class="card-text">TCP（Transmission Control Protocol）是一种面向连接的、可靠的网络传输协议，它提供了端到端的数据传输和可靠性保证。
                        TCP通信适用于对数据传输的可靠性和完整性要求较高的场景，如文件传输、网页浏览等。
                        本文将详细介绍Java中如何使用TCP协议进行网络通信，包括TCP套接字、服务器和客户端的创建、数据传输等。
                    </p>
                </div>

            </div>

            <div class="articlecard3" id="card-right">
                <div class="card-content">
                    <h3 class="card-title">C++编程规范</h3>
                    <p class="card-text">注释虽然写起来很痛苦, 但对保证代码可读性至关重要. 下面的规则描述了如何注释以及在哪儿注释. 当然也要记住: 注释固然很重要, 
                        但最好的代码应当本身就是文档. 有意义的类型名和变量名, 要远胜过要用注释解释的含糊不清的名字.
                    </p>
                </div>

            </div>
        </div>
        <!--文章列表-->
        <div v-for="(blog) in blogListInfo" >
            <n-card :title="blog.title" @click="toDetail(blog)">
                    

                <div v-html="blog.content"></div>

                <template #footer>
                    <n-space align="center">
                        <div>发布时间：{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>

        <n-divider />
            <!--分页-->
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />
    </div>

    
    <!--
        <div class="cocontainer">
        <div class="article_container">
            <img src="../medias/articlebackground/0.jpg" alt="Image 1" class="grid-image">
            <img src="../medias/articlebackground/2.jpg" alt="Image 2" class="grid-image">
            <img src="../medias/articlebackground/12.jpg" alt="Image 3" class="grid-image">

            <img src="../medias/articlebackground/0.jpg" alt="Image 1" class="grid-image">
            <img src="../medias/articlebackground/2.jpg" alt="Image 2" class="grid-image">
            <img src="../medias/articlebackground/12.jpg" alt="Image 3" class="grid-image">
            
            <img src="../medias/articlebackground/0.jpg" alt="Image 1" class="grid-image">
            <img src="../medias/articlebackground/2.jpg" alt="Image 2" class="grid-image">
            <img src="../medias/articlebackground/12.jpg" alt="Image 3" class="grid-image">

            <img src="../medias/articlebackground/0.jpg" alt="Image 1" class="grid-image">
            <img src="../medias/articlebackground/2.jpg" alt="Image 2" class="grid-image">
            <img src="../medias/articlebackground/12.jpg" alt="Image 3" class="grid-image">
        </div>
    </div>
    -->
    


    <div class="footer">
        <div>这是一个页尾</div>
        <div>Power by Vue3 + Vite</div>
    </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// 各种小图标的实现
import { LogoGithub,ArrowDownCircle } from '@vicons/ionicons5'
import { HomeSharp,PricetagsSharp,BookmarkSharp,ArchiveSharp,PersonCircleSharp,LogInSharp } from '@vicons/ionicons5'
import { BulbOutline,ThumbsUpOutline } from '@vicons/ionicons5'
// 路由
const router = useRouter()

const axios = inject("axios")

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


//实现导航栏在网页最上方和向下滚动时的不同效果
const navBar = ref('navbar');

onMounted(() => {
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
    font-size:65px;
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
    display: inline-flex; /* 保持按钮内容水平排列，并允许图标和文本在同一行 */
    align-items: center; /* 垂直居中对齐按钮内的内容 */
    justify-content: center; 
}

.cover-btns a {
    margin: 10px 15px;
    padding: 10px 40px;
    height: 45px;
    line-height: 45px;
    font-size: 1rem;
    color: #fff;
    border: 1px solid #fff;
    background-color: transparent;
    border-radius: 30px;
    box-shadow: none;
    text-decoration: none;
    display: flex; 
    align-items: center; 
    justify-content: center;
    transition: background-color 0.3s ease;
}

.cover-btns a:hover {
    background-color: #db3f44; /* 您希望在鼠标悬停时变为的颜色，这里以绿色为例 */
    border: 1px solid #db3f44;
}

.icon-maximize{
    margin-right: 5px;
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
    max-width: 900px;
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

.articlecard{
    background-image: url("../medias/articlebackground/9.jpg");
    width: 95%;
    height: 280px;
    margin:0 auto;
    margin-bottom: 30px;
    background-size: cover; /* 图片将被缩放以适应内容区域，保持原图宽高比且填充整个容器 */
    background-position: center center; 
    background-repeat: no-repeat; 
    border-radius: 10px;
    
    /* 确保articlecard是一个块级元素或者设置了固定/最大宽度，以便子元素能居中 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 使子元素在主轴上居中，对于column方向就是垂直居中 */
    justify-content: center; /* 可选，如果希望内容也垂直居中的话 */
    text-align: center; /* 用于内部文本元素的水平居中 */
}

.card-content{
    display: flex;
    flex-direction: column;
    align-items: center; /* 使子元素在主轴上居中，对于column方向就是垂直居中 */
    justify-content: center; /* 可选，如果希望内容也垂直居中的话 */
    text-align: center; /* 用于内部文本元素的水平居中 */
    filter: brightness(1);
}

.card-title{
    margin-top:0px;
    margin-bottom: 0px;
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.7rem;
    color: white;
    max-width: 60%;
}

.card-text{
    color: white;
    margin-top:30px;
    max-width: 70%;
}

.articlecard2{
    width: 95%;
    height: 280px;
    margin:0 auto;
    margin-bottom: 30px;
    margin-top: 30px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}

.articlecard3{
    width: 49%;
    height: 280px;
    margin:0 0;
    margin-bottom: 30px;
    background-size: cover; /* 图片将被缩放以适应内容区域，保持原图宽高比且填充整个容器 */
    background-position: center center; 
    background-repeat: no-repeat; 
    border-radius: 10px;
    z-index: 0;
    position: relative; 
    /* 确保articlecard是一个块级元素或者设置了固定/最大宽度，以便子元素能居中 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 使子元素在主轴上居中，对于column方向就是垂直居中 */
    justify-content: center; /* 可选，如果希望内容也垂直居中的话 */
    text-align: center; /* 用于内部文本元素的水平居中 */
}

#card-left::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url('../medias/articlebackground/68.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: brightness(0.8);
    z-index: -1;
}

#card-right::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url('../medias/articlebackground/25.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: brightness(0.8);
    z-index: -1;
}

.cocontainer{
    max-width: 900px;
    margin: 20px auto;
    background-color:white;
    padding-left: 10px;
    padding-right: 10px;
}

.article_container {
 
    

    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 默认三列布局 */
    grid-auto-rows: calc(25% - 10px); /* 调整行高以适应两行布局，减去间距 */
    gap: 10px; /* 图片之间的间距 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    max-width: 100%;
    margin: 0 auto; /* 自动水平居中容器 */
}


@media (max-width: 768px) {
    .article_container {
    grid-template-columns: repeat(2, 1fr); 
    grid-auto-rows: calc(16.666% - 10px); 
  }
}


@media (max-width: 480px) {
    .article_container {
    grid-template-columns: 1fr; 
    grid-auto-rows: calc(8.333% - 10px); 
  }
}

.grid-image{
    width: 100%; /* 图片宽度充满格子 */
    height: 100%;
    max-width: 100%; /* 限制图片最大宽度为容器宽度 */
    max-height: 100%; /* 可选：限制图片最大高度，依据需求设置 */
    object-fit: cover; /* 保持图片宽高比并填充容器，可能会裁剪 */
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