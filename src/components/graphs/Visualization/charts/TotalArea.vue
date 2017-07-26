<template>
    <div class="chart-container">
        <pie-chart :data="totalAreaData" :labels="totalAreaLabels" :width="420" :height="420"></pie-chart>
    </div>
</template>

<script>
import PieChart from '../../../charts/FootagePieChart.vue';
export default {
    components: {
        PieChart
    },
    computed: {
        totalAreaData() {
            // Create a copy of all the rooms and their footage, so that we aren't editing the store, and then push the total common space.
            let roomsFootageArary = [...this.$store.getters.getRoomsFootageAsArray];
            roomsFootageArary.push(this.$store.getters.totalCommonSpace);
            return roomsFootageArary;
        },
        totalAreaLabels() {
            let roomsLabelsArray = [];
            let rooms = this.$store.getters.rooms;
            rooms.forEach(function (room) {
                roomsLabelsArray.push('Room ' + room.roomNumber);
            }, this);
            roomsLabelsArray.push('Common Space');
            return roomsLabelsArray;
        }
    }
};
</script>
<style>
.chart-container {
    width: 50%;
    margin-left: 0 auto;
}
</style>

