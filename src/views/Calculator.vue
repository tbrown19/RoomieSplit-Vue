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
                <index :inputs="inputs" :roomConfiguration="roomConfiguration" @updateRoomConfiguration="handleUpdateRoomConfiguration" :routeId="routeId"></index>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import Index from '../components/calculator/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { getRoomConfiguration, updateRoomConfiguration, updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { namedInputsWithoutValue } from '../config/room-configuration.js';

export default {

    created() {
        this.handleGetRoomConfiguration();
    },

    components: {
        Index, SlideFadeOutIn
    },

    methods: {
        handleGetRoomConfiguration() {
            this.loading = true;
            getRoomConfiguration(this.routeId).then((roomConfiguration) => {
                this.loading = false;
                this.roomConfiguration = roomConfiguration;
            }, (error) => {
                this.loading = false;
                this.error = error;
            });
        },

        handleUpdateRoomConfiguration() {
            console.log('time to update the rooms');
            // Update the room configruation
            updateRoomConfiguration(this.routeId, this.roomConfiguration);
            // Then update the rooms, in case the user hadn't clicked save, or if the nubmer of rooms changed and now is different.
            updateRoomConfigruationRooms(this.routeId, this.RoomSplitter.rooms);
            // Then reload the information from the database as that will also cause the page to rerender giving the table a chance to smoothly transition into the new values.
            this.handleGetRoomConfiguration();
        }
    },

    data: function () {
        const routeId = this.$route.params.configId;
        const inputs = namedInputsWithoutValue();
        return {
            routeId,
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
