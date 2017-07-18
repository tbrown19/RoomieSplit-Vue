<template>
    <div>
        <updatable-inputs :inputs="inputs" :roomConfiguration="this.$store.getters.roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
        <errors-on-table></errors-on-table>
        <rooms-table :RoomSplitter="roomSplitter"></rooms-table>
        <action-buttons :isSaving="savingTable" @save="save" @clearAll="clearAll"></action-buttons>
    </div>
</template>


<script>
import UpdatableInputs from './RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from './RoomsTable/Table.vue';
import ActionButtons from './Actions/ActionButtons.vue';
import ErrorsOnTable from './RoomsTable/Other/TableErrors.vue';
import RoomSplitter from '../../utils/classes/RoomSplitter.js';
import { EventBus } from '../../utils/event-bus.js';
import { mapGetters } from 'vuex';
export default {
    props: ['inputs'],

    components: {
        UpdatableInputs, RoomsTable, ActionButtons, ErrorsOnTable
    },

    computed: {
        ...mapGetters({
            savingTable: 'isSavingRoomsToDatabase'
        })
    },

    methods: {
        triggerRoomConfigruationUpdate(inputKey, inputValue) {
            if (inputKey === 'numRooms') {
                this.updateNumRooms(inputValue);
            } else if (inputKey === 'area') {
                this.updateArea(inputValue);
            } else if (inputKey === 'rent') {
                this.updateRent(inputValue);
            }
            this.$emit('updateRoomConfiguration');
        },

        updateNumRooms(inputValue) {
            this.$store.commit('SET_NUM_ROOMS', inputValue);
            this.roomSplitter.numberOfRoomsUpdated();
        },
        updateArea(inputValue) {
            this.$store.commit('SET_AREA', inputValue);
            this.roomSplitter.updateAreaRelatedValues();
        },
        updateRent(inputValue) {
            console.log(inputValue);
            this.$store.commit('SET_RENT', inputValue);
            console.log('rent here is : ' + this.$store.getters.rent);
            this.roomSplitter.updatePaymentRelatedValues();
        },
        save() {
            this.$emit('updateRooms');
        },

        clearAll() {
            this.RoomSplitter.clearRoomObjects();
            EventBus.$emit('measurementsCleared');
        }
    },

    data: function () {
        let roomConfiguration = this.$store.getters.roomConfiguration;
        let roomSplitter = new RoomSplitter(this.$store.getters.roomConfiguration);
        return {
            roomConfiguration,
            roomSplitter
        };
    }
};
</script>
