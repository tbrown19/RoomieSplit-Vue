<template>
    <div id="app">
        <el-row type="flex" justify="center">
            <el-col>
                <NavBar></NavBar>
            </el-col>
        </el-row>
    
        <el-row type="flex" justify="center">
            <el-col :span="24" :lg="{span:17}" id="main-content">
                <router-view></router-view>
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
import NavBar from '../components/nav-bar.vue';

export default {
    // empty

    components: {
        NavBar
    }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
@import url('https://fonts.googleapis.com/css?family=Righteous');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    margin: 0 !important;
    padding-bottom: 5rem;
    font-family: 'Lato', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 400;
}

.is-active{
    color: #00d1b2 !important;
}

.box-card {
    min-height: 75vh;
}

#main-content{
    padding-top: 2%;
}
</style>
