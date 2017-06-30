<template>
    <div id="app">
        <NavBar></NavBar>

        <router-view></router-view>
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