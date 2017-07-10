<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <InfoCard name="Rooms" :value="housingInformation.rooms" minVal="1" maxVal="10"></InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard name="Feet" :value="housingInformation.footage"></InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard name="$" :value="housingInformation.rent" :reversed="true"></InfoCard>
        </el-col>
    </el-row>
</template>


<script>
import InfoCard from './info-card.vue';

export default {
    props: ['housingInformation'],

    computed: {
        rent:function(){
            return "$" + this.housingInformation.rent.toString();
        }
    },

    components:{
        InfoCard
    }
    
}
</script>


<style>
    .content{
            font-family: 'Lato', sans-serif;
        font-size: 2rem;
    }
</style>
