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
                <index :inputs="inputs" :roomConfiguration="roomConfiguration" @updateRoomConfiguration="handleUpdateRoomConfiguration" @updateRooms="handleUpdateRooms"></index>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import Index from '../components/calculator/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
// import { updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { namedInputsWithoutValue } from '../config/room-configuration.js';
import { mapGetters, mapActions } from 'vuex';

export default {

    created() {
        this.loadRoomConfiguration(this.$route.params.configId);
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
            'loadRoomConfiguration',
            'updateRoomConfiguration',
            'updateRooms'
        ]),

        handleUpdateRoomConfiguration() {
            this.updateRoomConfiguration(this.routeId);
            this.updateRooms(this.routeId);
        },
        handleUpdateRooms() {
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
