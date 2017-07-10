<template>
    <div>
        <hr>
        <el-table :data="roomsArray" style="width: 100%" stripe tooltip-effect="dark">
    
            <el-table-column label="Actions" type="expand">
                <template scope="scope">
                   <RoomExtraInfo :room="scope.row"></RoomExtraInfo>
                </template>
            </el-table-column>
    
            <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
            <el-table-column label="Length" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='length' :scope="scope" @areaUpdated="calculateArea"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Width" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='width' :scope="scope" @areaUpdated="calculateArea"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Area" min-width='100px'>
                <template scope="scope">
                    <FootageInput :scope="scope" @areaUpdated="areaUpdated"></FootageInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Occupants" min-width='100px'>
                <template scope="scope">
                    <OccupantsInput v-if="scope.row.area > 0" :scope="scope" @occupantsUpdated="occupantsUpdated"></OccupantsInput>
                </template>
            </el-table-column>
    
            <!--<el-table-column label="% Total" prop="percentageTotal"></el-table-column>-->
    
            <el-table-column label="Payment" min-width='100px'>
                <template scope="scope">
                    <span v-if="scope.row.payment > 0">
                        {{ scope.row.payment }}
                    </span>
                </template>
            </el-table-column>
    
        </el-table>
    </div>
</template>

<script>
import MeasurementInput from './measurement-input.vue';
import FootageInput from './footage-input.vue';
import OccupantsInput from './occupants-input.vue';
import RoomSplitter from '../../helpers/RoomSplitter.js';
import RoomExtraInfo from './room-extra-info.vue';

export default {
    props: ['housingInformation'],

    components: {
        MeasurementInput, FootageInput, OccupantsInput, RoomExtraInfo
    },

    computed: {
        paymentValue: function () {

        }
    },

    methods: {

        getRoomsData() {
            return this.generateRoomSplitter(this.store.getters.housingInformation)

        },

        generateRoomSplitter(housingInformation) {

        },

        calculateArea(room) {
            room.calculateArea();
            //calculationHelpers.updateFootageValuesInRow(method, row, this.$store);
            //this.roomCalculations = calculationHelpers.calculateRoomsInformation(this.roomData, this.$store);
        },

        areaUpdated() {
            // room.calculateArea();
            // roomSplitter.rooms.calculateCommonSpace();
            // console.log("implement this method");
        },

        occupantsUpdated() {
            this.rooms.calculateAreaRelatedValues();
            this.rooms.calculatePaymentRelatedValues();
        }

    },

    data: function () {
        let roomSplitter = new RoomSplitter(this.housingInformation);
        let roomData = roomSplitter.roomData;
        let roomsArray = roomData.rooms;

        return {
            roomsArray
        }

    }

}
</script>

<style>
td .cell {
    font-size: 1.2rem;
}

th {
    background-color: rgb(50, 65, 87) !important;
}

th .cell {
    font-family: 'Lato', sans-serif;
    font-size: 1.4rem;
    color: #dfe5ec !important;
    background-color: rgb(50, 65, 87) !important;
}
</style>
