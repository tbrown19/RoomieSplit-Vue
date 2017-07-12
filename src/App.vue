<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
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

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
@import url('https://fonts.googleapis.com/css?family=Righteous');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    margin: 0 !important;
    padding-bottom: 5rem;
    font-family: 'Lato', sans-serif;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
