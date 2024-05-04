<template>
    <div class="title" >文章管理</div>
    <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦">
        七里香
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>

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