<template>
    <div>
        <updatable-inputs :inputs="inputs" :roomConfiguration="roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
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
            // Update the value we just changed on the room splitter class.
            // this.roomSplitter[inputKey] = inputValue;
            // If the number of rooms was updated then we call the method which either creates new empty rooms, or deletes the extra rooms,
            // before we update the database.
            let mutationName = 'SET_' + inputKey.toUpperCase();
            this.$store.commit(mutationName, inputValue);
            if (inputKey === 'numRooms') {
                this.roomSplitter.numberOfRoomsUpdated();
            }
            this.$emit('updateRoomConfiguration');
        },

        save() {
            console.log('ghmmmm');
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
