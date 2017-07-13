<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
        <primary-inputs :inputs="inputs" @inputEntered="inputsUpdated"></primary-inputs>
        <slide-fade>
            <el-row type="flex" justify="center" v-if="mainInputsCompleted">
                <button id="nextStepButton" @click='proceedToNextStep' class="button is-primary is-large">Next Step</button>
            </el-row>
        </slide-fade>
    
    </div>
</template>

<script>
import PrimaryInputs from '../components/home/PrimaryInputs.vue';
import SlideFade from '../components/transitions/SlideFade.vue';
// import { addRoomConfiguration } from '../services/firebase-actions.js';

export default {
    components: {
        PrimaryInputs, SlideFade
    },

    methods: {
        inputsUpdated(inputs, status) {
            console.log(inputs);
            // this.roomData = inputs;
            this.inputs = inputs;
            this.mainInputsCompleted = status;
        },

        proceedToNextStep() {
            let roomConfigruation = this.inputsToroomConfigruation(this.inputs);
            console.log(roomConfigruation);
            // addRoomConfiguration(roomConfigruation).then((configId) => {
            //     this.$router.push({ name: 'calculator', params: { configId: configId } });
            // });
        },

        inputsToroomConfigruation(inputs) {
            console.log(inputs);
            let roomConfigruation = {
                'numRooms': inputs.rooms.value,
                'area': inputs.area.value,
                'rent': inputs.rent.value
            };
            return roomConfigruation;
        }
    },

    data: function () {
        return {
            inputs: {
                'rooms': {
                    'value': 0,
                    'min': 1,
                    'max': 5,
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
            roomConfigruation: {},
            mainInputsCompleted: false
        };
    }
};
</script>

<style lang="scss">

</style>
