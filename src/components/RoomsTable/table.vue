<template>
    <div>
        <button @click="testAddToDB"> submit </button>
        <hr>
        <el-table :data="roomData" style="width: 100%" stripe tooltip-effect="dark">
    
            <el-table-column label="Actions" type="expand">
                <template scope="scope">
                    <h1 style="font-size: 1.4rem">Extra Information:</h1>
                    <div style="font-size: 1.1rem">
                        <p>Percent of the total space: {{ readablePercent(scope.row.percentOfTotalSpace) }}</p>
                        <p>Percent of the private space: {{ readablePercent(scope.row.percentOfPrivateSpace) }}</p>
                        <p>Private Payment: {{ roundToTwoDecimalPlaces(scope.row.privatePayment) }}</p>
                    </div>
                    <div class="is-pulled-right">
                        <el-button size="large" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="large" type="danger" @click="handleClear(scope.$index, scope.row)">Clear</el-button>
                    </div>
                </template>
            </el-table-column>
    
            <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
            <el-table-column label="Length" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='length' :scope="scope" @footageUpdated="calculateFootage"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Width" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='width' :scope="scope" @footageUpdated="calculateFootage"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Footage" min-width='100px'>
                <template scope="scope">
                    <FootageInput :scope="scope" @footageUpdated="footageUpdated"></FootageInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Occupants" min-width='100px'>
                <template scope="scope">
                    <OccupantsInput v-if="scope.row.footage > 0" :scope="scope" @occupantsUpdated="occupantsUpdated"></OccupantsInput>
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

import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB7z8iU-By9Yy752NpUlSdu5eyKgOQweyc",
    authDomain: "roomie-split.firebaseapp.com",
    databaseURL: "https://roomie-split.firebaseio.com",
    projectId: "roomie-split",
    storageBucket: "",
    messagingSenderId: "170608881412"
};
let app = Firebase.initializeApp(config)
let db = app.database()

let RoomConfigurations = db.ref('RoomConfigurations');



import MeasurementInput from './measurement-input.vue';
import FootageInput from './footage-input.vue';
import OccupantsInput from './occupants-input.vue';
import RoomSplitter from '../../helpers/RoomSplitter.js';

export default {

    components: {
        MeasurementInput, FootageInput, OccupantsInput
    },

    computed: {
        paymentValue: function () {

        }
    },

    methods: {
        testAddToDB() {
            console.log("test add to firebase.")
            this.newRoomConfiguration = { "rooms": { "value": 3, "valid": false }, "footage": { "value": 5000, "valid": false }, "rent": { "value": 500, "valid": false } };
            RoomConfigurations.push(this.newRoomConfiguration);
        },
        //Break these out to some helper class maybe? would have been nice as filters..
        readablePercent(percent) {
            const decimalToPercent = percent * 100;
            return this.roundToTwoDecimalPlaces(decimalToPercent);
        },

        roundToTwoDecimalPlaces(value) {
            return parseFloat(value).toFixed(2);
        },


        handleClear(index, rowScope) {
            // helper for rounding. use later. = parseFloat(footage).toFixed(2);
            this.roomData[index].footage = 0;
        },

        calculateFootage(room) {
            console.log(room);
            room.calculateFootage();
            //calculationHelpers.updateFootageValuesInRow(method, row, this.$store);
            //this.roomCalculations = calculationHelpers.calculateRoomsInformation(this.roomData, this.$store);
        },

        footageUpdated() {
            room.footageUpdated();
            roomSplitter.rooms.calculateCommonSpace();
            console.log("implement this method");
        },

        occupantsUpdated() {
            this.rooms.calculateFootageRelatedValues();
            this.rooms.calculatePaymentRelatedValues();
        }

    },

    data() {
        const roomSplitter = new RoomSplitter(this.$store);
        let rooms = roomSplitter.rooms;
        let roomData = rooms.roomData;
        console.log(roomData);
        return {
            rooms,
            roomData,
            roomCalculations: {},
            basePayment: 0,
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
