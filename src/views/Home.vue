<template>
    <div>
    
        <!--<div style="margin-top: 20px; height: 200px;">
                <el-collapse-transition>
                    <div v-show="showTitleText">
                        <el-row type="flex" justify="center">
                            <h1>Calculate a fair way to split the cost of rent.</h1>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <h1>Start by filling out the information below</h1>
                        </el-row>
                    </div>
                </el-collapse-transition>
            </div>
        -->
        <MainInputs></MainInputs>
    </div>
</template>


<script>
import MainInputs from '../components/main-inputs.vue'

export default {

    components: {
        MainInputs
    },

    data: function () {
        return {
            showTitleText: true,
        }
    }
}
</script>


<style>

</style>
