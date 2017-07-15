<template>
    <el-table :data="roomsData" style="width: 100%" stripe tooltip-effect="dark">
    
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <ExtraInfoRow :RoomSplitter="RoomSplitter" :room="scope.row"></ExtraInfoRow>
            </template>
        </el-table-column>
    
        <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
        <el-table-column label="Length" min-width='120px'>
            <template scope="scope">
                <Measurement type='length' :scope="scope" @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <Measurement type='width' :scope="scope" @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Area" min-width='100px'>
            <template scope="scope">
                <Footage :room="scope.row" :area="scope.row.area" @areaUpdated="areaUpdated"></Footage>
            </template>
        </el-table-column>
    
        <el-table-column label="Occupants" min-width='100px'>
            <template scope="scope">
                <Occupants v-if="scope.row.area > 0" :scope="scope" @occupantsUpdated="occupantsUpdated"></Occupants>
            </template>
        </el-table-column>
    
        <el-table-column label="Payment" min-width='100px'>
            <template scope="scope">
                <Payment :occupants="scope.row.occupants" :payment="scope.row.payment"></Payment>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import Measurement from './inputs/Measurement.vue';
import Footage from './inputs/Footage.vue';
import Occupants from './inputs/Occupants.vue';
import Payment from './other/Payment.vue';
import ExtraInfoRow from './ExtraInfoRow.vue';
import { EventBus } from '../../../utils/event-bus.js';

export default {
    name: 'Rooms-Table',

    props: ['RoomSplitter'],

    components: {
        Measurement, Footage, Occupants, Payment, ExtraInfoRow
    },

    methods: {
        measurementUpdated(room) {
            room.updateAreaFromMeasurements();
            this.RoomSplitter.updateARoomsPercentOfTotalSpace(room);
        },

        areaUpdated(room, area) {
            // Emit an event on the bus so that the measurement inputs can be aware that this input was updated manually.
            EventBus.$emit('areaUpdatedManually');
            // Then call the function on the room which will clear the measurement inputs and update the room's area.
            room.updateAreaFromInputs(area);
            console.log(room);
            this.RoomSplitter.updateARoomsPercentOfTotalSpace(room);
            this.RoomSplitter.calculateAreaRelatedValues();
            this.RoomSplitter.updateARoomsPercentOfPrivateSpace(room);
        },

        occupantsUpdated() {
            this.RoomSplitter.calculateAreaRelatedValues();
            this.RoomSplitter.calculatePaymentRelatedValues();
        }
    },

    data: function () {
        console.log(this.RoomSplitter);
        return {
            roomsData: this.RoomSplitter.rooms
        };
    }
};
</script>

<style lang="scss">
.cell {
    td & {
        font-size: 1rem;
    }
    text-align: center;
}

th {
    background-color: rgb(50, 65, 87) !important;
    .cell {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 1.2rem;
        color: #dfe5ec !important;
        background-color: inherit !important;
    }
}
</style>
