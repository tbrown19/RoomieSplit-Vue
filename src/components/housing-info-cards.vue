<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <InfoCard name="rooms" :value="housingInformation.rooms" minVal="1" maxVal="10">
                    <div slot="name">Rooms</div>
            </InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard name="area" :value="housingInformation.area" minVal="1" maxVal="20000">
                <div slot="name">Area</div>
            </InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard name="rent" :value="housingInformation.rent" minVal="1" maxVal="50000">
                <div slot="name">Rent</div>
            </InfoCard>
        </el-col>
    </el-row>
</template>


<script>
import InfoCard from './info-card.vue';

export default {
    props: ['housingInformation'],

    components:{
        InfoCard
    },
}
</script>


<style>
    .content{
        font-family: 'Lato', sans-serif;
        font-size: 2rem;
    }
</style>
