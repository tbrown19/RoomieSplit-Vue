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
                    </b-notification>
                </el-col>
            </el-row>
    
            <div v-if="roomConfiguration" key="loaded">
                <updatable-inputs :inputs="inputs" :roomConfiguration="roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
                <rooms-table :RoomSplitter="RoomSplitter"></rooms-table>
                <action-buttons @save="save" @clearAll="clearAll"></action-buttons>
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

    methods: {
        handleGetRoomConfiguration() {
            const id = this.$route.params.configId;
            this.loading = true;

            getRoomConfiguration(id).then((roomConfiguration) => {
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
            const id = this.$route.params.configId;
            console.log(this.roomConfiguration);
            updateRoomConfiguration(id, this.roomConfiguration);
        },

        save() {
            const id = this.$route.params.configId;
            console.log(this.RoomSplitter.rooms[0]);
            updateRoomConfigruationRooms(id, this.RoomSplitter.rooms);
        },

        clearAll() {
            this.RoomSplitter.clearRoomObjects();
            EventBus.$emit('measurementsCleared');
        }
    },

    data: function () {
        // Get the inputs object from the configuration
        const inputs = namedInputsWithoutValue();
        return {
            inputs,
            roomConfiguration: null,
            loading: false,
            error: null
        };
    }
};
</script>

<style lang="scss">
.error {
    max-width: 50%;
}
</style>
