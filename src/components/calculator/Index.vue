<template>
    <div>
        <updatable-inputs :inputs="inputs" :roomConfiguration="this.$store.getters.roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>

        <errors-on-table></errors-on-table>

        <rooms-table :RoomSplitter="roomSplitter"></rooms-table>

        <action-buttons :isSaving="savingTable" :showRentGraph="roomSplitter.allRoomsValid" @save="save" @clearAll="clearAll" @updateRoomConfiguration="triggerRoomConfigruationUpdate"></action-buttons>
    </div>
</template>


<script>
import UpdatableInputs from './RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from './RoomsTable/Table.vue';
import ActionButtons from './Actions/ActionButtons.vue';
import ErrorsOnTable from './RoomsTable/Other/TableErrors.vue';
import RoomSplitter from '../../utils/classes/RoomSplitter.js';
// import { EventBus } from '../../utils/event-bus.js';
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
            } else {
                this.roomSplitter.updateAreaRelatedValues();
                this.roomSplitter.updatePaymentRelatedValues();
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
            this.$store.commit('SET_RENT', inputValue);
            this.roomSplitter.updatePaymentRelatedValues();
        },
        save() {
            this.$emit('saveRooms');
        },

        clearAll() {
            const rooms = this.roomSplitter.rooms;
            rooms.map((room) => {
                this.$store.commit('RESET_A_ROOM', {
                    roomsIndex: room.roomsIndex
                });
            });
        }
    },

    data: function() {
        let roomConfiguration = this.$store.getters.roomConfiguration;
        let roomSplitter = new RoomSplitter(this.$store.getters.roomConfiguration);
        return {
            roomConfiguration,
            roomSplitter
        };
    }
};
</script>
