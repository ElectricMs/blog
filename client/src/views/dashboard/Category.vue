<template>
    <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Abandon</th>
        <th>Abnormal</th>
        <th>Abolish</th>
        <th>...</th>
        <th>万事开头难</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>反常的</td>
        <td>彻底废除</td>
        <td>...</td>
        <td>干！我刚才背的是啥</td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup>
    import { AdminStore } from '../../stores/AdminStore'
    import { ref, reactive, inject, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const message = inject("message")
    const axios = inject("axios")

    const adminStore = AdminStore()

    onMounted(() => {
        loadDatas()
    })

    const toUpdate = async (category) =>{
        showUpdateModel.value = true 
        updateCategory.id = category.id
        updateCategory.name = category.name
    }
</script>

<style lang="scss" scoped>

</style>