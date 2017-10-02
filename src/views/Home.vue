<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">See how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>

        <primary-inputs :inputs="inputs" @inputsValidnessChanged="inputsValidnessChanged"></primary-inputs>

        <el-row type="flex" justify="center" v-if="mainInputsCompleted">
            <slide-fade>
                <button @click='proceedToNextStep' class="button is-primary is-large is-outlined">Next Step</button>
            </slide-fade>
        </el-row>

        <div id="example-text" class="has-text-centered">
            <h1 class="title"> Or
                <a href="https://roomiesplit.com/calculator/-KpuPGVGGs9DbehcO4xV"> check out an example.</a>
            </h1>
        </div>

    </div>
</template>

<script>
import PrimaryInputs from '../components/home/PrimaryInputs.vue';
import SlideFade from '../components/transitions/SlideFade.vue';
import { addRoomConfiguration } from '../services/firebase-actions.js';

export default {
    created() {
        // Clear the stores rooms, so that it doesnt have a reference to any previous calculations and will get the new ones from server.
        this.$store.commit('SET_ROOMS', []);
    },
    components: {
        PrimaryInputs, SlideFade
    },

    methods: {
        inputsValidnessChanged(currentValidness) {
            this.mainInputsCompleted = currentValidness;
        },

        proceedToNextStep() {
            let roomConfigruation = this.inputsToroomConfigruation(this.inputs);
            addRoomConfiguration(roomConfigruation).then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } });
            });
        },

        inputsToroomConfigruation({ rooms, area, rent }) {
            return {
                'numRooms': rooms.value,
                'area': area.value,
                'rent': rent.value,
                'commonSpaceValueModifier': 1.5
            };
        }
    },

    data: function() {
        return {
            inputs: {
                'rooms': {
                    'value': '',
                    'min': 1,
                    'max': 10,
                    'tooltip': 'The total number of rooms.'
                },
                'area': {
                    'value': '',
                    'min': 1,
                    'max': 10000,
                    'tooltip': 'The total area of the entire living space.'
                },
                'rent': {
                    'value': '',
                    'min': 1,
                    'max': 100000,
                    'tooltip': 'The cost of rent.'
                }
            },
            roomConfigruation: {},
            mainInputsCompleted: false
        };
    }
};
</script>

<style lang="scss">
#example-text {
    padding-top: 2rem;
}
</style>
