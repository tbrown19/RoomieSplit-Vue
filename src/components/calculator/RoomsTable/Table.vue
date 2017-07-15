<template>
    <el-table :data="rooms" style="width: 100%" stripe tooltip-effect="dark">
    
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <RoomExtraInfo :room="scope.row"></RoomExtraInfo>
            </template>
        </el-table-column>
    
        <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
        <el-table-column label="Length" min-width='120px'>
            <template scope="scope">
                <Measurement type='length' :scope="scope" @areaUpdated="calculateArea"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <Measurement type='width' :scope="scope" @areaUpdated="calculateArea"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Area" min-width='100px'>
            <template scope="scope">
                <Footage :row="scope.row" :area="scope.row.area" @areaUpdated="areaUpdated"></Footage>
            </template>
        </el-table-column>
    
        <el-table-column label="Occupants" min-width='100px'>
            <template scope="scope">
                <Occupants v-if="scope.row.area > 0" :scope="scope" @occupantsUpdated="occupantsUpdated"></Occupants>
            </template>
        </el-table-column>
    
        <el-table-column label="Payment" min-width='100px'>
            <template scope="scope">
                <span v-if="scope.row.payment > 0">
                    {{ scope.row.payment }}
                </span>
            </template>
        </el-table-column>
    </el-table>
    <!--<el-table-column label="% Total" prop="percentageTotal"></el-table-column>-->
</template>


<script>
import Measurement from './inputs/Measurement.vue';
import Footage from './inputs/Footage.vue';
import Occupants from './inputs/Occupants.vue';
import ExtraInfoRow from './ExtraInfoRow.vue';
import { EventBus } from '../../../utils/event-bus.js';

export default {
    name: 'Rooms-Table',

    props: ['rooms'],

    components: {
        Measurement, Footage, Occupants, ExtraInfoRow
    },

    methods: {
        calculateArea() {
            console.log('derp');
        },
        areaUpdated(room, area) {
            EventBus.$emit('areaUpdatedManually');
            console.log(room);
            room.updateAreaFromInputs(area);
            console.log(room);
            console.log('new area is : ' + area);
        },
        occupantsUpdated() {
            console.log('derp');
        }
    },

    data: function () {
        console.log(this.rooms);
        return {
        };
    }
};
</script>
