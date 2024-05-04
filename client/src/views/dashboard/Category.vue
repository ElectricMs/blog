<template>
  <div>
      <div class="title" >分类管理</div>
      <n-button @click="showAddModel = true"style="margin-bottom:10px;width: 150px; ">添加分类</n-button><!--这个按钮不好看 但不知道怎么改-->
      <n-table :bordered="false" :single-line="false">
          <thead>
              <tr>
                  <th>编号</th>
                  <th>名称</th>
                  <th>操作</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(category, index) in categoryList">
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td>
                      <n-space>
                          <n-button @click="toUpdate(category)">修改</n-button>
                          <n-button @click="deleteCategory(category)">删除</n-button>
                      </n-space>
                  </td>
              </tr>

          </tbody>
      </n-table>

      <!--添加分类的模态框-->
      <n-modal v-model:show="showAddModel" preset="dialog" title="Dialog">
          <template #header>
              <div>添加分类</div>
          </template>
          <div>
              <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称" />
          </div>
          <template #action>
              <div>
                  <n-button @click="add">提交</n-button>
              </div>
          </template>
      </n-modal>

      <n-modal v-model:show="showUpdateModel" preset="dialog" title="Dialog">
          <template #header>
              <div>修改分类</div>
          </template>
          <div>
              <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称" />
          </div>
          <template #action>
              <div>
                  <n-button @click="update">提交</n-button>
              </div>
          </template>
      </n-modal>


  </div>
</template>

<script setup>

import { AdminStore } from '../../stores/AdminStore'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

const adminStore = AdminStore()

const showAddModel = ref(false)
const showUpdateModel = ref(false)

const categoryList = ref([])
const addCategory = reactive({
  name: ""
})

const updateCategory = reactive({
  id:0,
  name: ""
})

onMounted(() => {
  loadDatas()
})

const loadDatas = async () => {//加载和刷新数据
  let res = await axios.get("/category/list")
  categoryList.value = res.data.rows
}

const add = async () => {//token已经通过拦截器传入
  let res = await axios.post("/category/_token/add", { name: addCategory.name })//调用对应接口
  if (res.data.code == 200) {
      loadDatas()
      message.info(res.data.msg)
  } else {
      message.error(res.data.msg)
  }
  //不管成功失败都关掉窗口
  showAddModel.value = false;
}

const toUpdate = async (category) =>{//这些数据要传给服务端
  showUpdateModel.value = true 
  updateCategory.id = category.id
  updateCategory.name = category.name
}

const update = async ()=>{
  let res = await axios.put("/category/_token/update", { id:updateCategory.id, name: updateCategory.name })//服务端的更新操作
  if (res.data.code == 200) {
      loadDatas()
      message.info(res.data.msg)
  } else {
      message.error(res.data.msg)
  }
  showUpdateModel.value = false;
}

const deleteCategory = async (category) => {
  const categoryName = category.name; // 获取category的name属性并存储到变量中
  dialog.warning({
      title: '警告',
      content: `你确定要删除 ${categoryName} 吗?`, // 使用模板字面量插入变量值
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
          let res = await axios.delete(`/category/_token/delete?id=${category.id}`)//模板写法
          if (res.data.code == 200) {
              loadDatas()
              message.info(res.data.msg)
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

</style>