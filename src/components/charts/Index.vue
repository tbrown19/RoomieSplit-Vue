<template>
    <div>
        <el-row :gutter="40">
            <div class="has-text-centered">
                <h1 class="is-title">Graphs Related To Area</h1>
            </div>
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
    }
};
</script>

<style scoped>
h1 {
    font-size: 2rem;
    font-weight: 300;
}
hr{
    margin-top: .2rem;
}
</style>

