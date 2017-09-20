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

            <div v-if="!loading && !error" key="loaded">
                <index></index>
            </div>
        </slide-fade-out-in>

    </div>
</template>

<script>
import Index from '../components/charts/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
// import { updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { mapGetters, mapActions } from 'vuex';

export default {

    created() {
        // Load the room configuration from the database if it is not already loaded - if they are visitng the room configuration for the first time via the charts page.
        if (this.$store.getters.rooms.length === 0) {
            this.loadRoomConfiguration(this.$route.params.configId);
        }
    },

    components: {
        Index, SlideFadeOutIn
    },
    computed: {
        ...mapGetters({
            loading: 'isLoadingFromDatabase',
            error: 'getFirebaseActionErrors'
        })
    },

    methods: {
        ...mapActions([
            'loadRoomConfiguration'
        ])
    }
};
</script>

<style lang="scss">
.error {
    max-width: 50%;
}
</style>
