<template>
    <div>
        <transition name="slide-fade" mode="out-in">
    
            <div class="loading has-text-centered" v-if="loading" key="loading">
                <h1>Loading...</h1>
            </div>
    
            <div class="error" v-if="error" key="error">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>
                            <strong>Error</strong>!
                        </p>
                    </div>
                    <div class="message-body">
                        {{ error }}
                    </div>
                </article>
            </div>
            <div v-if="housingInformation" key="loaded">
                <updatable-inputs :inputs="inputs" @inputChangeSaved="triggerRoomConfigruationUpdate"></updatable-inputs>
            </div>
    
        </transition>
    
    </div>
</template>


<script>
import UpdatableInputs from '../components/calculator/RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from '../components/calculator/RoomsTable/Table.vue';
import { getRoomConfiguration, updateRoomConfiguration } from '../services/firebase-actions.js';

export default {

    created() {
        this.handleGetRoomConfiguration();
    },

    components: {
        UpdatableInputs, RoomsTable
    },

    methods: {
        handleGetRoomConfiguration() {
            const id = this.$route.params.configId;
            this.loading = true;

            getRoomConfiguration(id).then((roomConfiguration) => {
                this.loading = false;
                console.log(roomConfiguration);
            }, (error) => {
                this.loading = false;
                this.error = error;
            });
        },

        triggerRoomConfigruationUpdate() {
            const id = this.$route.params.configId;
            updateRoomConfiguration(id, this.roomConfiguration);
        }
    },

    data: function () {
        return {
            inputs: {
                'rooms': {
                    'value': 0,
                    'min': 1,
                    'max': 10,
                    'tooltip': 'The total number of rooms.'
                },
                'area': {
                    'value': 0,
                    'min': 1,
                    'max': 10000,
                    'tooltip': 'The total area of the entire living space.'
                },
                'rent': {
                    'value': 0,
                    'min': 1,
                    'max': 100000,
                    'tooltip': 'The cost of rent.'
                }
            },
            roomConfiguration: {},
            loading: false,
            error: null
        };
    }
};
</script>

<style lang="scss">

</style>
