<template>
    <card>
        <div slot="content" class="has-text-centered">
            <h3 class="is-title">Rooms Area</h3>
            <pie-chart :data="roomsAreaData" :labels="roomsAreaLabels" :width="600" :height="420"></pie-chart>
        </div>
    </card>
</template>

<script>
import Card from '../../generic/Card.vue';
import PieChart from './PieChart.vue';
export default {
    name: 'TotalAreaChart',

    components: {
        Card, PieChart
    },
    computed: {
        roomsAreaData() {
            // Create a copy of all the rooms and their footage, so that we aren't editing the store, and then push the total common space.
            let roomsFootageArary = [...this.$store.getters.getRoomsFootageAsArray];
            return roomsFootageArary;
        },
        roomsAreaLabels() {
            let roomsLabelsArray = [];
            let rooms = this.$store.getters.rooms;
            rooms.forEach(function (room) {
                roomsLabelsArray.push('Room ' + room.roomNumber);
            }, this);
            return roomsLabelsArray;
        }
    }
};
</script>
<style>
.chart-container {
    margin-left: 10px;
}
</style>

