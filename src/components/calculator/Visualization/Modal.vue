<template>
    <modal>
        <a @click="$emit('close')">
            <b-icon icon="close"></b-icon>
        </a>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="24">
                <div class="has-text-centered">
                    <h2 class="is-title chart-header">Total Area</h2>
                    <total-area :data="totalAreaData" :labels="totalAreaLabels"></total-area>
                </div>
    
            </el-col>
        </el-row>
    </modal>
</template>

<script>
import Modal from '../../Generic/Modal.vue';
import TotalArea from '../../charts/FootagePieChart.vue';
export default {
    name: 'VisualizationModal',
    components: {
        Modal, TotalArea
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

<style lang="scss" scoped>
.chart-header{
    font-size: 1.4rem;
}
</style>
