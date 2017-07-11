<template>
    <transition name="slide-fade" mode="out-in">
        <div v-show='visible'>
            <el-row type="flex" justify="center">
                <button v-on:click='click' class="button is-primary is-large">Next Step</button>
            </el-row>
        </div>
    </transition>
</template>


<script>
export default {
    props: ['visible'],

    methods: {
        click() {
            this.$emit('click');
        }
    }
}
</script>


<style>
.slide-fade-enter-active {
    transition: all .4s ease;
}

.slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
    transform: translateY(10px);
    opacity: 0;
}
</style>

