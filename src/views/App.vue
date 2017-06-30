<template>
    <div id="app">
        <el-row type="flex" justify="center">
            <el-col>
                <NavBar></NavBar>
            </el-col>
        </el-row>
    
        <el-row type="flex" justify="center">
            <el-col :span="20" :lg="{span:15}">
                <router-view></router-view>    
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
import NavBar from '../components/nav-bar.vue'

export default {
    // empty

    components: {
        NavBar
    }
}
</script>


<style>
body {
    margin: 0px !important;
}

.box-card {
    min-height: 75vh;
}
</style>
