<template>
    <div id="app">
        <navbar></navbar>

        <el-row type="flex" justify="center">
            <el-col :span="24" :lg="{span:18}" id="main-content">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Navbar from './components/layout/NavBar.vue';

export default {
    name: 'app',

    components: {
        Navbar
    }
};

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
@import url('https://fonts.googleapis.com/css?family=Righteous');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    margin: 0 !important;
    padding-bottom: 5rem;
}


#app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#main-content {
    padding-top: 2%;
}


</style>
