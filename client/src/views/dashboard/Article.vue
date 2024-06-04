<template>
    <div class="title" >文章管理</div>
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
        <n-tab-pane name="list" tab="文章列表">
            <div v-for="(blog, index) in blogListInfo" style="margin-bottom:15px">
                <n-card :title="blog.title">
                    <div v-html="blog.content"></div>

                    <template #footer>
                        <n-space align="center">
                            <div>发布时间：{{ blog.create_time }}</div>
                            <n-button @click="toUpdate(blog)">修改</n-button>
                            <n-button @click="toDelete(blog)">删除</n-button>
                        </n-space>
                    </template>
                </n-card>
            </div>

            <n-space>
                <div class="pagination-item" @click="toPage(pageNum)" v-for="pageNum in  pageInfo.pageCount">
                    <div :style="'color:' + (pageNum == pageInfo.page ? 'blue' : '')">{{ pageNum }}</div>
                </div>
            </n-space>

        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">

            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="addArticle.categoryId" :options="categortyOptions" />
                </n-form-item>
                <n-form-item label="标签">
                    <n-dynamic-tags v-model:value="addArticleTags" :max="5" />
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="addArticle.content"></rich-text-editor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="add">提交</n-button>
                </n-form-item>
            </n-form>

        </n-tab-pane>
        <n-tab-pane name="update" tab="修改">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="updateArticle.categoryId" :options="categortyOptions" />
                </n-form-item>
                <n-form-item label="标签">
                    <n-dynamic-tags v-model:value="updateArticleTags" :max="5" />
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="update">提交</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
//2024.5.4
import { AdminStore } from '../../stores/AdminStore'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RichTextEditor from '../../components/RichTextEditor.vue'//直接用富文本的主页展示 减少麻烦
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

const adminStore = AdminStore()

//文章添加数据
const addArticle = reactive({
    categoryId:null,//怎么搞
    title: "",
    content: "",
})

const addArticleTags=ref([])

//文章修改数据
const updateArticle = reactive({
    id: 0,
    categoryId: 0,
    title: "",
    content: "",
})

const updateArticleTags= ref([])

//分类选项
const categortyOptions = ref([])
const blogListInfo = ref([])
//标签页
const tabValue = ref("list")

//分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
})

onMounted(() => {
    loadBlogs()
    loadCategorys()
})

//读取博客列表
const loadBlogs = async () => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
    let temp_rows = res.data.data.rows;
    for (let row of temp_rows) {
        //服务端只传过来最多50个字符
        row.content += "..."
        //服务端传过来的是时间戳 需要转换
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    //传过来总数 计算分页数
    pageInfo.count = res.data.data.count;
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res)
}

//读取分类
const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {//转换形式
        return {
            label: item.name,
            value: item.id
        }
    })
    console.log(categortyOptions.value)
}

const add = async () => {
    let res = await axios.post("/blog/_token/add", addArticle)
    let newId=null
    if (res.data.code == 200) {
        message.info(res.data.msg)
        addArticle.categoryId=null
        addArticle.content=""
        addArticle.title=""
        newId = res.data.data.id; // 从响应中提取id
    } else {
        message.error(res.data.msg)
    }

    for (const tagName of addArticleTags.value) {
        try {
            console.log(newId)
            const response = await axios.post('/tags/_token/add', { id:newId, name: tagName });
            if (response.data.code === 200) {
                console.log(`标签 "${tagName}" 添加成功`);
                //message.info(response.data.msg)
            } else {
                console.error(`标签 "${tagName}" 添加失败`);
            }
        } catch (error) {
            console.error(`请求错误: ${error.message}`);
        }
    }

    updateArticleTags.value = []; // 清空updateArticleTags的值
    loadBlogs()
}

//点击事件
const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()
}

const toUpdate = async (blog) => {
    tabValue.value = "update"
    let res = await axios.get("/blog/detail?id=" + blog.id)
    //console.log(res)
    //读取文章内容并显示
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.categoryId = res.data.rows[0].category_id

    try {
        let res2 = await axios.get(`/tags/queryname?id=${blog.id}`);
        if (res2.data.code === 200) {
        // 从响应数据中提取name属性，映射到新数组
        const tags = res2.data.rows.map(row => row.name);
        updateArticleTags.value = tags; // 将提取的标签名数组赋值给updateArticleTags
        } else {
        console.error(res2.data.msg);
        }
    } catch (error) {
    console.error('获取标签时出现错误：', error);
    }
    console.log(updateArticleTags.value)

}

const update = async () => {//文章管理里的修改按钮操作
    let res = await axios.put("/blog/_token/update", updateArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        tabValue.value = "list"
    } else {
        message.error(res.data.msg)
    }

    let res2 = await axios.delete(`/tags/_token/delete?id=${updateArticle.id}`)//模板写法
    if (res2.data.code == 200) {
        console.log("标签删除成功")
    } else {
        message.error(res.data.msg)
    }

    for (const tagName of updateArticleTags.value) {
        try {
        const response = await axios.post('/tags/_token/add', { id:updateArticle.id, name: tagName });
        if (response.data.code === 200) {
            console.log(`标签 "${tagName}" 添加成功`);
            //message.info(response.data.msg)
        } else {
            console.error(`标签 "${tagName}" 添加失败`);
        }
        } catch (error) {
        console.error(`请求错误: ${error.message}`);
        }
    }

    loadBlogs()
}

const toDelete = async (blog) => {//文章管理里的删除按钮操作
    
    const blogTitle = blog.title; 
    dialog.warning({
        title: '警告',
        content: `你确定要删除 ${blogTitle} 吗?`, 
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            let res = await axios.delete("/blog/_token/delete?id="+blog.id)
            if (res.data.code == 200) {
                message.info(res.data.msg)
                let res2 = await axios.delete("/tags/_token/delete?id="+blog.id)
                if (res2.data.code == 200) {
                    loadBlogs()
                } else {
                    message.error(res2.data.msg)
                }
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => { }
  })
}

</script>


<style lang="scss" scoped>
    .title{
        font-size: 60px;
        font-weight: bold;
        text-align: left;
        margin-bottom:20px;
        margin-left:30px;
        //position: fixed;
        color: rgba(0, 0, 0, 40%);
        
    }

    .pagination-item {
        margin-left: 20px;
        font-size:20px
    }
</style>