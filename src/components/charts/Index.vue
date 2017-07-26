<template>
    <div>
        <el-row>
            <el-col :span="4">
                <a id="calculatorLink" @click="backToCalculator">
                    Back to calculator
                </a>
            </el-col>
            <el-col :span="16" class="has-text-centered">
                <h1 class="is-title">Graphs Related To Area</h1>
            </el-col>
        </el-row>
        <hr>
        <el-row :gutter="40">
            <el-col :xs="24" :sm="24" :md="12">
                <total-area-chart></total-area-chart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
                <private-area-chart></private-area-chart>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import TotalAreaChart from './Visualization/TotalArea.vue';
import PrivateAreaChart from './Visualization/PrivateArea.vue';

export default {
    props: ['inputs'],
    components: {
        TotalAreaChart, PrivateAreaChart
    },
    methods: {
        backToCalculator() {
            let configId = this.$route.params.configId;
            this.$router.push({ name: 'calculator', params: { configId: configId } });
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 2rem;
    font-weight: 300;
}

hr {
    margin-top: .2rem;
}
</style>

