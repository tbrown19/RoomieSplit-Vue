<template>
    <el-table :data="roomsData" style="width: 100%" stripe tooltip-effect="dark">
        Settings
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <ExtraInfoRow :index="currentIndex(scope)" @clearRoom="clearRoom" @recalculatePayment="recalculatePayment"></ExtraInfoRow>
            </template>
        </el-table-column>
    
        <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
        <el-table-column label="Length" min-width='120px'>
            <template scope="scope">
                <Measurement :roomsIndex="currentIndex(scope)" :measurement="currentRoom(scope).length" type='length' @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <Measurement :roomsIndex="currentIndex(scope)" :measurement="currentRoom(scope).width" type='width' @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>
    
        <el-table-column label="Area" min-width='100px'>
            <template scope="scope">
                <Footage :roomsIndex="currentIndex(scope)" @areaUpdated="areaUpdated"></Footage>
            </template>
        </el-table-column>
    
        <el-table-column label="Occupants" min-width='100px'>
            <template scope="scope">
                <Occupants :index="scope.row.roomsIndex" @occupantsUpdated="occupantsUpdated"></Occupants>
            </template>
        </el-table-column>
    
        <el-table-column label="Payment" min-width='100px'>
            <template scope="scope">
                <Payment :index="scope.row.roomsIndex"></Payment>
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
    computed: {
        roomsData() {
            console.log(this.RoomSplitter.rooms);
            return this.$store.getters.rooms;
        }
    },

    methods: {
        currentIndex(scope) {
            return scope.row.roomsIndex;
        },
        currentRoom(scope) {
            const index = scope.row.roomsIndex;
            return this.$store.getters.rooms[index];
        },
        clearRoom(room) {
            room.clear();
            this.updateARoomRelatedValues(room);
        },

        measurementUpdated(roomsIndex, type, measurementType, measurement) {
            // Update the rooms footage by calculating it with the measurement values.
            let room = this.RoomSplitter.rooms[roomsIndex];
            this.$store.dispatch(`${type}${measurementType}`, {
                roomsIndex: roomsIndex,
                value: measurement
            });
            room.updateAreaFromMeasurements();
            this.updateARoomRelatedValues(room);
        },

        areaUpdated(roomsIndex, area) {
            let room = this.RoomSplitter.rooms[roomsIndex];
            // Call the function on the room which will clear the measurement inputs and update the room's area.
            room.updateAreaFromInputs(area);
            // Then emit an event on the bus so that the measurement inputs can be aware that this input was updated manually.
            EventBus.$emit('areaUpdatedManually', room.roomNumber);
            this.updateARoomRelatedValues(room);
        },

        occupantsUpdated(roomsIndex, occupants) {
            this.$store.dispatch('occupants', {
                roomsIndex: roomsIndex,
                value: occupants
            });
            this.RoomSplitter.updatePaymentRelatedValues();
        },

        updateARoomRelatedValues(room) {
            // this.$store.commit('SET_ROOMS', this.RoomSplitter.rooms);
            // Update the total area and other related values on the room splitter.
            this.RoomSplitter.updateAreaRelatedValues();
            // Then update values related to the payment.
            this.RoomSplitter.updatePaymentRelatedValues();
        },
        recalculatePayment() {
            this.RoomSplitter.updatePaymentRelatedValues();
        }

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
