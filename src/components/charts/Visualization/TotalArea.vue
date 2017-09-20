<template>
    <card>
        <div slot="content" class="has-text-centered">
            <h3 class="is-title">Total Area</h3>
            <pie-chart :data="totalAreaData" :labels="totalAreaLabels" :width="600" :height="420"></pie-chart>
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
        totalAreaData() {
            // Create a copy of all the rooms and their footage, so that we aren't editing the store, and then push the total common space.
            const roomsFootageArary = [...this.$store.getters.getRoomsFootageAsArray];
            roomsFootageArary.push(this.$store.getters.totalCommonSpace);
            return roomsFootageArary;
        },
        totalAreaLabels() {
            const rooms = this.$store.getters.rooms;
            const roomsLabelsArray = rooms.map((room) => `Room ${room.roomNumber}`);
            roomsLabelsArray.push('Common Space');
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

