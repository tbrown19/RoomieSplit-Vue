<template>
    <div>
        <updatable-inputs :inputs="inputs" :roomConfiguration="roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
        <errors-on-table v-if="this.RoomSplitter.currentErrors.size > 0" :tableErrors="this.RoomSplitter.currentErrors"></errors-on-table>
        <rooms-table :RoomSplitter="RoomSplitter"></rooms-table>
        <action-buttons :isSaving="savingTable" @save="save" @clearAll="clearAll"></action-buttons>
    </div>
</template>


<script>
import UpdatableInputs from './RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from './RoomsTable/Table.vue';
import ActionButtons from './Actions/ActionButtons.vue';
import ErrorsOnTable from './RoomsTable/Other/TableErrors.vue';
import RoomSplitter from '../../utils/classes/RoomSplitter.js';
import { updateRoomConfigruationRooms } from '../../services/firebase-actions.js';
import { EventBus } from '../../utils/event-bus.js';

export default {
    props: ['inputs', 'roomConfiguration', 'routeId'],

    components: {
        UpdatableInputs, RoomsTable, ActionButtons, ErrorsOnTable
    },

    created() {
        console.log(this.$store);
        this.RoomSplitter = new RoomSplitter(this.roomConfiguration);
    },

    watch: {
        'RoomSplitter.currentErrors': function () {
            console.log('we detected an error change in index.');
        }
    },
    computed: {
        tableErrors() {
            console.log(this.RoomSplitter.currentErrors.size > 0);
            return this.RoomSplitter.currentErrors > 0;
        }
    },

    methods: {
        triggerRoomConfigruationUpdate(inputKey, inputValue) {
            this.roomConfiguration[inputKey] = inputValue;
            // If the number of rooms was updated then we call the method which either creates new empty rooms, or deletes the extra rooms,
            // before we update the database.
            if (inputKey === 'numRooms') {
                this.RoomSplitter.numberOfRoomsUpdated(inputValue);
            }
            this.$emit('updateRoomConfiguration');
        },

        save() {
            this.savingTable = true;
            updateRoomConfigruationRooms(this.routeId, this.RoomSplitter.rooms).then(() => {
                this.savingTable = false;
            }, (error) => {
                this.error = error.code;
            });
        },

        clearAll() {
            this.RoomSplitter.clearRoomObjects();
            EventBus.$emit('measurementsCleared');
        }
    },

    data: function () {
        return {
            savingTable: false
        };
    }
};
</script>
