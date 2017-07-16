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
                <Measurement type='length' :row="scope.row" @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <Measurement type='width' :row="scope.row" @measurementUpdated="measurementUpdated"></Measurement>
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
import ExtraInfoRow from './other/ExtraInfoRow.vue';
import { EventBus } from '../../../utils/event-bus.js';

export default {
    name: 'Rooms-Table',

    props: ['RoomSplitter'],

    components: {
        Measurement, Footage, Occupants, Payment, ExtraInfoRow
    },
    watch: {
        'RoomSplitter.rooms': {
            handler: function (newValue) {
                console.log(this.roomsData);
                console.log('the rooms data has changed.');
            },
            deep: true
        }
    },
    computed: {
        roomsData() {
            return this.RoomSplitter.rooms;
        }
    },

    methods: {
        measurementUpdated(room) {
            // Update the rooms footage by calculating it with the measurement values.
            room.updateAreaFromMeasurements();
            // Update the total area and other related values on the room splitter.
            this.RoomSplitter.updateAreaRelatedValues();
            // Update values on the room object that are related to the other rooms, such as percent of common space.
            this.RoomSplitter.updateARoomsValues(room);
            this.RoomSplitter.updatePaymentRelatedValues();
        },

        areaUpdated(room, area) {
            // Emit an event on the bus so that the measurement inputs can be aware that this input was updated manually.
            EventBus.$emit('areaUpdatedManually', room.roomNumber);
            // Then call the function on the room which will clear the measurement inputs and update the room's area.
            room.updateAreaFromInputs(area);
            // Update the total area and other related values on the room splitter.
            this.RoomSplitter.updateAreaRelatedValues();
            // Update values on the room object that are related to the other rooms, such as percent of common space.
            this.RoomSplitter.updateARoomsValues(room);
            this.RoomSplitter.updatePaymentRelatedValues();
        },

        occupantsUpdated() {
            this.RoomSplitter.updatePaymentRelatedValues();
        }
    },

    data: function () {
        console.log(this.RoomSplitter);
        return {
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
