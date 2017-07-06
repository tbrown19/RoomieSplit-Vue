<template>
    <el-table :data="roomData" style="width: 100%" stripe tooltip-effect="dark">
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <h1 style="font-size: 1.4rem">Extra Information:</h1>
                <div style="font-size: 1.1rem">
                    <p>Percent footage of the total: {{ scope.row.percentageTotal }}</p>
                </div>
                <div class="is-pulled-right">
                    <el-button size="large" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="large" type="danger" @click="handleClear(scope.$index, scope.row)">Clear</el-button>
                </div>
              
            </template>
        </el-table-column>

        <el-table-column label="Room" prop="room"></el-table-column>

        <el-table-column label="Length" min-width='120px'>
            <template scope="scope">
                <MeasurementInput type='length' :scope="scope"></MeasurementInput>
            </template>
        </el-table-column>

        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <MeasurementInput  type='width' :scope="scope" ></MeasurementInput>
            </template>
        </el-table-column>


        <el-table-column label="Footage">
            <template scope="scope">
               <FootageInput  :scope="scope"></FootageInput>
            </template>
        </el-table-column>


        <el-table-column label="Occupants" min-width='100px'>
            <template scope="scope">
               <OccupantsInput  :scope="scope"></OccupantsInput>
            </template>
        </el-table-column>

        <!--<el-table-column label="% Total" prop="percentageTotal"></el-table-column>-->

        <el-table-column label="Payment" prop="percentageTotal" min-width='100px'></el-table-column>
    </el-table>
</template>


<script>
let roomHelpers = require('../../helpers/room-helpers.js')
import MeasurementInput from './measurement-input.vue';
import FootageInput from './footage-input.vue';
import OccupantsInput from './occupants-input.vue';

export default {
    props: ['rooms'],

    components: {
        MeasurementInput, FootageInput, OccupantsInput
    },

    computed: {
        derp: function() {
            return 1;
        }
    },

    methods: {
       

        measurementInput(row) {
            
        },

        FootageInput(row){

        },

        handleClear(index, rowScope) {
            this.roomData[index].footage = '';
        }
    },
    data() {
        let roomData = roomHelpers.createEmptyRoomInputs(this.rooms);
        return {
            roomData,
            measurementsInputed: false,
            footageInputed: true
        }
    }

}
</script>

<style>

    td .cell{
        font-size: 1.2rem;
    }

    th{
        background-color: rgb(50, 65, 87) !important;
    }
    th .cell{
        font-family: 'Lato', sans-serif;
        font-size: 1.4rem;
        color: #dfe5ec !important;
        background-color:  rgb(50, 65, 87) !important;
    }
</style>
