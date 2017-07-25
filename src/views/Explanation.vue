<template>
    <div class="content has-text-centered">
        <h1>Detailed explanation coming soon.</h1>
        <div class="section">
            <h2>Total Apartment Area</h2>
            <commit-chart stlye="width:300px"></commit-chart>    
        </div>
    </div>
</template>

<script>
// CommitChart.js
import CommitChart from '../components/charts/FootagePieChart.vue';
export default {
    components: {
        CommitChart
    }
};
</script>

<style>
.section{
    max-height: 400px;
}
.section{
    max-height: 400px;
    max-width: 400px;
}
</style>

