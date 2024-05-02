
<!--本页的设计和原理参照文档：https://www.naiveui.com/zh-CN/light/components/form  -->
<template>
    <div class="login-panel">
        <n-card title="管理后台登录">
            <n-form :rules="rules" :model="admin"><!--规则验证-->
                <n-form-item path="account" label="账号">
                    <n-input v-model:value="admin.account" placeholder="请输入账号" />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button @click="login">登录</n-button>
            </template>
        </n-card>
    </div>
</template>


<script setup>

import { ref, reactive,inject} from 'vue'

const axios =inject("axios")

/**验证表单规则 */
let rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
    ],
};

/**管理员登录数据 */
const admin = reactive({
    account: "",
    password:  "",
    rember: false
})

const login=async()=>{
    let result = await axios.post("/admin/login", {/**返回值 */
        account: admin.account,/**参照AdminRouter */
        password: admin.password
    });
    console.log(result)
}

</script>

<style lang="scss" scoped>
    .login-panel{
        width:500px;
        margin:0 auto;
        margin-top:130px;
    }
</style>