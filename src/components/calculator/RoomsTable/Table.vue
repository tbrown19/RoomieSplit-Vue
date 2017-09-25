<template>
    <el-table :data="roomsData" style="width: 100%" stripe tooltip-effect="dark">
        
        <el-table-column label="Actions" type="expand">
            <template scope="scope">
                <ExtraInfoRow :index="currentIndex(scope)" @clearRoom="clearRoom" @recalculatePayment="recalculatePayment"></ExtraInfoRow>
            </template>
        </el-table-column>

        <el-table-column label="Room" prop="roomNumber"></el-table-column>

        <el-table-column label="Length" min-width='120px'>
            <template scope="scope">
                <Measurement :roomsIndex="currentIndex(scope)" type='length' @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>

        <el-table-column label="Width" min-width='120px'>
            <template scope="scope">
                <Measurement :roomsIndex="currentIndex(scope)" type='width' @measurementUpdated="measurementUpdated"></Measurement>
            </template>
        </el-table-column>

        <el-table-column label="Area" min-width='100px'>
            <template scope="scope">
                <Footage :roomsIndex="currentIndex(scope)" @areaUpdated="areaUpdated"></Footage>
            </template>
        </el-table-column>

        <el-table-column label="Occupants" min-width='100px'>
            <template scope="scope">
                <Occupants :roomsIndex="currentIndex(scope)" @occupantsUpdated="occupantsUpdated"></Occupants>
            </template>
        </el-table-column>

        <el-table-column label="Payment" min-width='100px'>
            <template scope="scope">
                <Payment :roomsIndex="currentIndex(scope)"></Payment>
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

export default {
    name: 'Rooms-Table',

    props: ['RoomSplitter'],

    components: {
        Measurement, Footage, Occupants, Payment, ExtraInfoRow
    },

    computed: {
        roomsData() {
            return this.$store.getters.rooms;
        }
    },

    methods: {
        currentIndex(scope) {
            return scope.row.roomsIndex;
        },

        currentRoom(roomsIndex) {
            return this.RoomSplitter.rooms[roomsIndex];
        },

        clearRoom(roomsIndex) {
            const room = this.RoomSplitter.rooms[roomsIndex];
            room.clear();
        },

        measurementUpdated(roomsIndex, type, measurementUnit, measurement) {
            const room = this.RoomSplitter.rooms[roomsIndex];
            room.updateAreaFromMeasurements(type, measurementUnit, measurement);
            this.updateARoomRelatedValues(room);
        },

        areaUpdated(roomsIndex, area) {
            const room = this.RoomSplitter.rooms[roomsIndex];
            room.updateAreaFromInputs(area);
            this.updateARoomRelatedValues(room);
        },

        occupantsUpdated(roomsIndex, occupants) {
            const room = this.RoomSplitter.rooms[roomsIndex];
            room.updateOccupants(occupants);
            this.RoomSplitter.updatePaymentRelatedValues();
        },

        updateARoomRelatedValues(room) {
            this.RoomSplitter.updateAreaRelatedValues();
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
