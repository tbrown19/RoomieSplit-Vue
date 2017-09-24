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
                <index :inputs="inputs" @updateRoomConfiguration="handleUpdateRoomConfiguration" @saveRooms="saveRooms"></index>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import Index from '../components/calculator/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { namedInputsWithoutValue } from '../config/room-configuration.js';
import { mapGetters, mapActions } from 'vuex';

export default {
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

    created() {
        if (this.$store.getters.rooms.length === 0) {
            this.loadRoomConfiguration(this.$route.params.configId);
        }
    },

    methods: {
        ...mapActions([
            'loadRoomConfiguration',
            'updateRoomConfiguration',
            'updateRooms'
        ]),

        // Called if the user changed one of the three primary inputs.
        handleUpdateRoomConfiguration() {
            this.updateRoomConfiguration(this.routeId);
            this.updateRooms(this.routeId);
        },

        saveRooms() {
            this.updateRooms(this.routeId);
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
