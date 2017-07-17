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
    
            <div v-if="roomConfiguration.numRooms != 0 && !loading && !error" key="loaded">
                <index :inputs="inputs" :roomConfiguration="roomConfiguration" @updateRoomConfiguration="handleUpdateRoomConfiguration" :routeId="routeId"></index>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import Index from '../components/calculator/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { updateRoomConfiguration, updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { namedInputsWithoutValue } from '../config/room-configuration.js';
import { mapGetters, mapActions } from 'vuex';

export default {

    created() {
        this.$store.dispatch('loadRoomConfiguration', this.$route.params.configId);
    },

    components: {
        Index, SlideFadeOutIn
    },
    computed: {
        ...mapGetters({
            loading: 'isLoadingFromDatabase',
            error: 'getFirebaseActionErrors',
            roomConfiguration: 'roomConfiguration'
        })
    },

    methods: {
        ...mapActions([
            'loadRoomConfiguration'
        ]),

        handleUpdateRoomConfiguration() {
            console.log('time to update the rooms');
            // Update the room configruation
            updateRoomConfiguration(this.routeId, this.$store.getters.roomConfiguration);
            // Then update the rooms, in case the user hadn't clicked save, or if the nubmer of rooms changed and now is different.
            updateRoomConfigruationRooms(this.routeId, this.$store.getters.getRooms);
            // Then reload the information from the database as that will also cause the page to rerender giving the table a chance to smoothly transition into the new values.
            this.handleGetRoomConfiguration();
        }
    },

    data: function () {
        const routeId = this.$route.params.configId;
        const inputs = namedInputsWithoutValue();
        return {
            routeId,
            inputs
        };
    }
};
</script>

<style lang="scss">
.error {
    max-width: 50%;
}
</style>
