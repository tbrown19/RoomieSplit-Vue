<template>
    <el-table :data="roomData" style="width: 100%">
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleClear(scope.$index, scope.row)">Clear</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Room" prop="room">
        </el-table-column>
        <el-table-column label="Footage">
            <template scope="scope">
                <MeasurementInput type='feet' :scope="scope"></MeasurementInput>
            </template>
        </el-table-column>
        <el-table-column>
    
        </el-table-column>
    </el-table>
</template>


<script>
import MeasurementInput from './measurement-input.vue';
export default {
    props: ['rooms'],

    components: {
        MeasurementInput
    },

    methods: {
        createEmptyRoomInputs(rooms) {
            let roomData = [];
            for (let i = 1; i <= rooms; i++) {
                roomData.push({
                    room: i,
                    length: [],
                    width: [],
                    footage: '',
                    occupants: 0,
                    percentageTotal: 0,
                    payment: 0
                });
            }
            return roomData;
        },

        handleDelete(test, test2) {
            console.log(test);
            console.log(test2);
        },

        handleClear(index, rowScope) {
            this.roomData[index].footage = 0;
        }
    },
    data() {
        console.log(this.rooms);
        let roomData = this.createEmptyRoomInputs(this.rooms);
        console.log(roomData);
        return {
            roomData
        }
    }

}
</script>