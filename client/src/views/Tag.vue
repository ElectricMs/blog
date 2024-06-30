
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
            <div class="item" v-for="(tag, index) in tagListInfo" :key="index">
                <n-button class="chip waves-effect ":style="{backgroundColor:colors[index%colors.length]}">{{ tag.name }}
                    <span class="tag-length">{{ tag.count_id }}</span>
                </n-button>
            </div>
        </div>
     
    </div>
    <div class="container2">
        
        <div class="bestsellers-container">
            <chart-word-cloud :options="state.chartOptions":key="tagKey"></chart-word-cloud>
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
import { AlbumsSharp } from '@vicons/ionicons5'
import { HomeSharp,PricetagsSharp,BookmarkSharp,ArchiveSharp,PersonCircleSharp,LogInSharp } from '@vicons/ionicons5'
// 路由

const router = useRouter()

const axios = inject("axios")

const tagListInfo=ref([])

const state = reactive({
  chartOptions: {
    series: [
      {
        gridSize: 30,
        data: []
      },
    ],
  },
});

const tagKey=ref(0);




const loadTags = async () => {
    try {
        let res = await axios("/tags/listname"); // 使用 await 等待 axios 请求完成
        const tags = res.data.rows;
        tagListInfo.value = tags; // 将提取的标签名数组赋值给 updateArticleTags
        state.chartOptions.series[0].data = tagListInfo.value.map(tag => ({ name: tag.name, value: tag.count_id }));
        console.log(state.chartOptions.series[0].data)
        
        tagKey.value += 1;
    } catch (error) {
        console.error("Error loading tags:", error);
    }
};

onMounted(() => {

    loadTags();
})

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

//颜色列表
const colors=ref(['#F9EBEA', '#F5EEF8','#D5F5E3','#E8F8F5','#FEF9E7','#F8F9F9','#82E0AA','#D7BDE2','#A3E4D7','#85C1E9']);

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
    display:flex;
    justify-content: flex-start;
    margin: 1rem auto 0.5rem;
    max-width: 850px;
    margin-left: 90px;

    flex-wrap:wrap;//允许换行
    
}
.con-title{
    text-align:center;
    color:#34495e;
    margin-bottom: 20px;
    border-top:20px;
    font-size: 2rem;
    font-weight: 700;
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

.tag-length {
    color: #e91e63;
    margin-top: 1px;
    margin-left: 5px;
    margin-right: -2px;
    font-size: 0.5rem;
}
.chip{
    text-decoration: none;
    color:#34495e;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;

    margin: 10px 10px;
    padding: 19px 14px;
    display: inline-flex;
    line-height: 0;
    font-size: 1rem;
    
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
    z-index: 0; 
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
.item{
    margin-right:20px;
    margin-bottom: 10px;
}

</style>