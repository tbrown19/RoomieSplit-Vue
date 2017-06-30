<template>
    <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
    
        <el-row type="flex">
            <el-col :span="24" :md="{span:22, offset:1}" :lg="{span:16, offset:4}">
                <li id="site-header">
                    Roomie Split
                </li>
    
                <el-menu-item index="/">
                    Home
                </el-menu-item>
    
                <el-menu-item index="explanation">
                    Explanation
                </el-menu-item>
    
                <el-menu-item index="about">
                    About
                </el-menu-item>
            </el-col>
        </el-row>
    
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
            //this.$router.push(key);
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Righteous');
@import url('https://fonts.googleapis.com/css?family=Roboto');

#site-header {
    color: #dfe5ec;
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    padding: 0 20px;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
    font-family: 'Righteous', cursive;
    font-size: 1.75rem;
}

.el-menu-item {
    font-size: 1.25rem;
    font-family: 'Roboto', sans-serif;
}
</style>
