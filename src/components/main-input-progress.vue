<template>
    <el-collapse-transition>
        <div v-show='visible'>
            <hr>
            <el-row type="flex" justify="center">
                <progress class="progress is-primary" :value="inputProgress" max="100">{{ inputProgress }}%</progress>
            </el-row>
            <hr>
        </div>
    </el-collapse-transition>
</template>


<script>
export default {
    props: ['visible', 'inputProgress'],

    data: function () {
        return {
        }
    }
}
</script>


