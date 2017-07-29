<template>
    <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" router>
        <el-row type="flex">
            <el-col :span="24" :md="{span:22, offset:1}" :lg="{span:16, offset:4}">
                <li id="site-header">
                    Roomie Split
                </li>
    
                <el-menu-item index="/">
                    <a>Home</a>
                </el-menu-item>
    
                <el-menu-item index="/explanation">
                    Explanation
                </el-menu-item>
    
                <el-menu-item index="/about">
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
            activeIndex: this.$router.currentRoute.path
        };
    }
};

</script>

<style>
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
    font-size: 1.5rem;
}

.el-menu-item {
    font-size: 1.1rem !important;
    font-family: 'Roboto', sans-serif;
    color: #dfe5ec !important;
}

.is-active{
    color: #00d1b2 !important;
}
</style>
