<template>
    <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    
        <el-menu-item index="/">
            <router-link to="/" exact> Home </router-link>
        </el-menu-item>

        <el-menu-item index="about">
            <router-link to="/about" exact> About </router-link>
        </el-menu-item>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>

    </el-menu>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.$router.push(key);
        }
    }
}
</script>