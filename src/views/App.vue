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
@import url('https://fonts.googleapis.com/css?family=Lato:300');
@import url('https://fonts.googleapis.com/css?family=Righteous');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    margin: 0 !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Lato', sans-serif;
}

.box-card {
    min-height: 75vh;
}


/* Enter and leave animations can use different */


/* durations and timing functions.              */

.slide-fade-enter-active {
    transition: all .3s;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
    transform: translateX(10px);
}
</style>
