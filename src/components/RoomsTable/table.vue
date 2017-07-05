<template>
    <el-table :data="roomData" style="width: 100%">
        <el-table-column label="Actions" type="expand">

            <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleClear(scope.$index, scope.row)">Clear</el-button>
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

        <el-table-column label="% Total" prop="percentageTotal"></el-table-column>



        <el-table-column>
            <template scope="scope">
                {{ scope.row.length.feet }}
                - 
                {{ scope.row.footage }}
            </template>
        </el-table-column>

    </el-table>
</template>


<script>
import MeasurementInput from './measurement-input.vue';
import FootageInput from './footage-input.vue';

export default {
    props: ['rooms'],

    components: {
        MeasurementInput, FootageInput
    },

    computed: {
        derp: function() {
            return 1;
        }
    },

    methods: {
        createEmptyRoomInputs(rooms) {
            let roomData = [];
            for (let i = 1; i <= rooms; i++) {
                roomData.push({
                    room: i,
                    length: {
                        feet: '',
                        inches: ''
                    },
                    width: {
                        feet: '',
                        inches: ''
                    },
                    footage: '',
                    occupants: 0,
                    percentageTotal: 0,
                    payment: 0
                });
            }
            return roomData;
        },

        measurementInput(row) {
            
        },

        FootageInput(row){

        },

        handleClear(index, rowScope) {
            this.roomData[index].footage = '';
        }
    },
    data() {
        let roomData = this.createEmptyRoomInputs(this.rooms);
        return {
            roomData,
            measurementsInputed: false,
            footageInputed: true
        }
    }

}
</script>