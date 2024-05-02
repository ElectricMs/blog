<!--测试用-->
<template>
    <div>
       This is Dashboard.vue !
       {{adminStore}}
    </div>
</template>

<script setup>
    import { AdminStore } from '../../stores/AdminStore';
    const adminStore=AdminStore()
</script>

<style lang="scss" scoped>

</style>