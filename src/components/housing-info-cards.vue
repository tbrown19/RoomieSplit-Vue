<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <InfoCard @validInput="infoUpdated" name="numRooms" :value="housingInformation.numRooms" minVal="1" maxVal="10">
                    <div slot="name">Rooms</div>
            </InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard @validInput="infoUpdated" name="area" :value="housingInformation.area" minVal="1" maxVal="20000">
                <div slot="name">Area</div>
            </InfoCard>
        </el-col>
        <el-col :span="8">
            <InfoCard @validInput="infoUpdated" name="rent" :value="housingInformation.rent" minVal="1" maxVal="50000">
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
    methods: {
        infoUpdated(name, value ){
            this.housingInformation[name] = value;
            this.$emit("infoUpdated");
        }
    }
}
</script>


<style>
    .content{
        font-family: 'Lato', sans-serif;
        font-size: 1.4rem;
    }
</style>
