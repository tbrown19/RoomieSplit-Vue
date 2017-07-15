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
                <rooms-table :rooms="roomsData"></rooms-table>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import UpdatableInputs from '../components/calculator/RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from '../components/calculator/RoomsTable/Table.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { getRoomConfiguration, updateRoomConfiguration } from '../services/firebase-actions.js';
import { namedInputsWithoutValue } from '../config/room-configuration.js';
import Rooms from '../utils/classes/Rooms.js';

export default {

    created() {
        this.handleGetRoomConfiguration();
    },

    components: {
        UpdatableInputs, RoomsTable, SlideFadeOutIn
    },

    methods: {
        handleGetRoomConfiguration() {
            const id = this.$route.params.configId;
            this.loading = true;

            getRoomConfiguration(id).then((roomConfiguration) => {
                this.loading = false;
                console.log(roomConfiguration);
                this.roomConfiguration = roomConfiguration;
                this.testRooms = new Rooms(roomConfiguration);
                this.roomsData = this.testRooms.rooms;
                this.rooms = roomConfiguration.rooms;
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
