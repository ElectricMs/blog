<!--富文本组件-->
<!--看不懂 好在大部分可以直接抄-->
<!--https://stackblitz.com/edit/vue3-wangeditor-demo?file=src%2Fcomponents%2FBasicEditor.vue-->
<template>
    <div>
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
            style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive, inject, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const server_url = inject("server_url")
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = { excludeKeys:["uploadVideo"] };//屏蔽掉上传视频的功能 真的一点也装不下了
const editorConfig = { placeholder: '请输入内容...' };
//上传图片要求
//https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87
//这个上传图片的模块依赖于组件的支持 很多地方有问题但不知道怎么改
//比如只能支持常用格式的图片 最大只能上传2MB的文件
//Uncaught (in promise) Error: 1N8A1401.png exceeds maximum allowed size of 2 MB
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 10 * 1024, // 小于10kb的图片直接保存为base64
    server: server_url+'/upload/rich_editor_upload',//要求完整服务端地址
}
editorConfig.MENU_CONF['insertImage'] ={
    parseImageSrc:(src) =>{//在插入图片前执行 路径是否包含http
        if(src.indexOf("http") !==0){
            console.log(1)
            console.log(`${server_url}${src}`)
            return `${server_url}${src}`//拼装为完整可读的地址
        }
        console.log(2)
        console.log(src)
        return src
    }
}

const mode = ref("default")
const valueHtml = ref("")

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})

const emit = defineEmits(["update:model-value"])
let initFinished = false

onMounted(() => {//人为延迟 这个方法不是很好 网上找的
    setTimeout(() => {//可以实现自定义初始化内容
        valueHtml.value = props.modelValue;
        initFinished = true;
    }, 200);
});

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
    console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
    if (initFinished) {//得先初始化完
        emit("update:model-value", valueHtml.value)//修改后 外抛事件
    }
};

</script>

<style lang="scss" scoped>
</style>