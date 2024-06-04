
<template>
    <div class="backgroundimg"></div>
    <div class="frontimg-container">
        <img class="frontimg" src="../medias/4.jpg" alt="Front Image" >
        <div class="bottom-div" id="startReading"></div><!--定位用 无内容-->
    </div>
    <div class="maintitle">这是一个博客</div>
   
    <div class="futitle">（标签页）</div>



    <!--导航栏-->
    <header class="navbar" ref="navBar">
            <div class="left-section">
                <img src="../medias/logo.png" alt="Logo" class="navbar-logo" @click="homePage"/>
                <p  @click="homePage">这是一个博客</p>
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
            <n-icon size="26"class="icon-maximize"><AlbumsSharp/></n-icon>
            文章标签
        </div>
        <div class="tag-chips">
            <a href="/tags/%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B/" title="碰撞检测: 1">
                    <span class="chip waves-effect
                             chip-default chip-hover " data-tagname="碰撞检测" style="background-color: #F9EBEA;">碰撞检测
                        <span class="tag-length">1</span>
                    </span>
            </a>
            <a href="/tags/%E9%9A%90%E5%BC%8F%E8%A1%A8%E7%A4%BA/" title="隐式表示: 19">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="隐式表示" style="background-color: #F5EEF8;">隐式表示
                        <span class="tag-length">19</span>
                    </span>
            </a>
            <a href="/tags/3D-Gaussian-Splatting/" title="3D Gaussian Splatting: 9">
                    <span class="chip waves-effect 
                             chip-default chip-hover" data-tagname="3D Gaussian Splatting" style="background-color: #D5F5E3;">3D Gaussian Splatting
                        <span class="tag-length">9</span>
                    </span>
            </a>
            <a href="/tags/%E7%BB%8F%E9%AA%8C%E5%88%86%E4%BA%AB/" title="经验分享: 5">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="经验分享" style="background-color: #E8F8F5;">经验分享
                        <span class="tag-length">5</span>
                    </span>
            </a>
            <a href="/tags/%E7%BB%8F%E9%AA%8C%E5%88%86%E4%BA%AB/" title="经验分享: 5">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="经验分享" style="background-color: #E8F8F5;">经验分享
                        <span class="tag-length">5</span>
                    </span>
            </a>
            <a href="/tags/MAVROS/" title="MAVROS: 1">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="MAVROS" style="background-color: #F8F9F9;">MAVROS
                        <span class="tag-length">1</span>
                    </span>
            </a>
            <a href="/tags/Gazebo/" title="Gazebo: 1">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="Gazebo" style="background-color: #D7BDE2;">Gazebo
                        <span class="tag-length">1</span>
                    </span>
            </a>
            <a href="/tags/Gazebo/" title="Gazebo: 1">
                    <span class="chip waves-effect 
                             chip-default chip-hover" data-tagname="Gazebo" style="background-color: #D7BDE2;">Gazebo
                        <span class="tag-length">1</span>
                    </span>
            </a>
            <a href="/tags/PIXHAWK/" title="PIXHAWK: 1">
                    <span class="chip waves-effect
                             chip-default chip-hover" data-tagname="PIXHAWK" style="background-color: #A3E4D7;">PIXHAWK
                        <span class="tag-length">1</span>
                    </span>
            </a>
            <a href="/tags/APM/" title="APM: 1">
                    <span class="chip waves-effect
                             " data-tagname="APM" style="background-color: #85C1E9;">APM
                        <span class="tag-length">1</span>
                    </span>
            </a>
        </div>
     
    </div>
    <div class="container2">
        
        <div class="bestsellers-container">
            <chart-word-cloud :options="state.chartOptions"></chart-word-cloud>
        </div>
        
    </div>

    <div class="footer">
        <div>这是一个页尾</div>
        <div>Power by Vue3 + Vite</div>
    </div>

</template>

<script setup>
import ChartWordCloud from './ChartWordCloud.vue'
import { ref, reactive, inject, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// 各种小图标的实现
import { LogoGithub,ArrowDownCircle, AlbumsOutline, AlbumsSharp } from '@vicons/ionicons5'
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
    router.push("/")
    // location.reload(true);
    //问题1：首页转换
    // router.push("/homepage")
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

const state = reactive({
      chartOptions: {
        series: [
          {
            gridSize: 20,
            data: [
              {
                name: '娜娜米',
                value: 30,
                // textStyle: {
                //   color: 'rgba(0, 0, 0, .4)',
                // },
              },
              {name: '五条悟',value: 30},
              { name: '狗卷', value: 28 },
              { name: 'Shoto', value: 28 },
              { name: 'Vox', value: 25 },
              { name: "Aza", value: 23 },
              { name: 'Mysta', value: 20 },
              { name: 'Uki', value: 18 },
              { name: 'Luca', value: 15 },
              { name: 'Shu', value: 10 },
              { name: 'Ike', value: 10 },
              { name: "Fulgun", value: 10 }
            ],
          },
        ],
      },
    })
   
    onMounted(() => {})
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
.futitle{
    color:white;
    position:absolute;
    font-size:60px;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    max-width: 1000px;
    margin: 20px auto;
    background-color:white;
    padding:20px 30px;
    border-radius: 20px; 
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
}
.tag-chips{
    margin: 1rem auto 0.5rem;
    max-width: 850px;
    text-align: center;
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
a{
    text-decoration: none;
    color:#34495e;;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
}
.tag-length {
    color: #e91e63;
    margin-top: 1px;
    margin-left: 5px;
    margin-right: -2px;
    font-size: 0.5rem;
}
.chip{
    margin: 10px 10px;
    padding: 19px 14px;
    display: inline-flex;
    line-height: 0;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
    z-index: 0; 
}
.container .chip:default {
    color: #34495e;
}
.chip:active{
    color: white;
    box-shadow: 2px 5px 10px #aaa !important;
    background: linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%) !important;
}
.chip:hover{
    color: white;
    box-shadow: 2px 5px 10px #aaa !important;
    background: linear-gradient(to bottom right,rgb(113, 206, 113) 0%, rgb(2, 165, 2) 100%) !important
}
.waves-effect{
    transition: 0.3s ease-out;
}
.container {
    margin-top: -60px;
}
.container2{
    
    max-width: 1000px;
    margin: 20px auto;
    background-color:white;
    padding:20px 30px;
    border-radius: 20px; 
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);

}
.bestsellers-container {
      height: 18.56rem;
      background: white;
   
      #charts-content {
        /* 需要设置宽高后才会显示 */
        width: 100%;
        height: 100%;
      }
    }

</style>