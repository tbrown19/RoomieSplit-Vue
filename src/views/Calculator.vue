<template>
    <div>
        <slide-fade-out-in>
            <div class="loading has-text-centered" v-if="loading" key="loading">
                <h1>Loading...</h1>
            </div>
    
            <el-row type="flex" justify="center" v-if="error" key="error">
                <el-col :span="14" :lg="{span:12}">
                    <b-notification type="is-danger" has-icon>
                        {{ error }}
                        <br> Please try again.
                    </b-notification>
                </el-col>
            </el-row>
    
            <div v-if="roomConfiguration && !loading && !error" key="loaded">
                {{ currentErrors }}
    
                <updatable-inputs :inputs="inputs" :roomConfiguration="roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
                <rooms-table :RoomSplitter="RoomSplitter"></rooms-table>
                <action-buttons :isSaving="savingTable" @save="save" @clearAll="clearAll"></action-buttons>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import UpdatableInputs from '../components/calculator/RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from '../components/calculator/RoomsTable/Table.vue';
import ActionButtons from '../components/calculator/Actions/ActionButtons.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { getRoomConfiguration, updateRoomConfiguration, updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { namedInputsWithoutValue } from '../config/room-configuration.js';
import RoomSplitter from '../utils/classes/RoomSplitter.js';
import { EventBus } from '../utils/event-bus.js';

export default {

    created() {
        this.handleGetRoomConfiguration();
    },

    components: {
        UpdatableInputs, RoomsTable, ActionButtons, SlideFadeOutIn
    },

    computed: {
        currentErrors() {
            return this.RoomSplitter.currentErrors;
        }
    },

    methods: {
        handleGetRoomConfiguration() {
            this.loading = true;

            getRoomConfiguration(this.id).then((roomConfiguration) => {
                this.loading = false;
                this.roomConfiguration = roomConfiguration;
                this.RoomSplitter = new RoomSplitter(roomConfiguration);
            }, (error) => {
                this.loading = false;
                this.error = error;
            });
        },

        triggerRoomConfigruationUpdate(inputKey, inputValue) {
            this.roomConfiguration[inputKey] = inputValue;
            // If the number of rooms was updated then we call the method which either creates new empty rooms, or deletes the extra rooms, before we update the database.
            if (inputKey === 'numRooms') {
                this.RoomSplitter.numberOfRoomsUpdated(inputValue);
            }
            // Update the room configruation
            updateRoomConfiguration(this.id, this.roomConfiguration);
            // Then update the rooms, in case the user hadn't clicked save, or if the nubmer of rooms changed and now is different.
            updateRoomConfigruationRooms(this.id, this.RoomSplitter.rooms);
            // Then reload the information from the database as that will also cause the page to rerender giving the table a chance to smoothly transition into the new values.
            this.handleGetRoomConfiguration();
        },

        save() {
            this.savingTable = true;
            updateRoomConfigruationRooms(this.id, this.RoomSplitter.rooms).then(() => {
                // Add a 250 ms delay to the change in save, just in case it saves so fast that they don't notice it.
                setTimeout(() => {
                    this.savingTable = false;
                }, 250);
            }, (error) => {
                this.error = error.code;
            });
        },

        clearAll() {
            this.RoomSplitter.clearRoomObjects();
            EventBus.$emit('measurementsCleared');
        },

        numberOfRoomsUpdated() {
            this.RoomSplitter.numberOfRoomsUpdated(this.roomConfiguration.numberRooms);
        }
    },

    data: function () {
        const id = this.$route.params.configId;
        const inputs = namedInputsWithoutValue();
        return {
            id,
            inputs,
            roomConfiguration: null,
            loading: false,
            error: null,
            savingTable: false
        };
    }
};
</script>

<style lang="scss">
.error {
    max-width: 50%;
}
</style>
