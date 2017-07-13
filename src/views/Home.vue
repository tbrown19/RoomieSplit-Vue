<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
        <primary-inputs @inputEntered="inputsUpdated"></primary-inputs>
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
import { addRoomConfiguration } from '../services/firebase-actions.js';

export default {
    components: {
        PrimaryInputs, SlideFade
    },

    methods: {
        inputsUpdated(inputs, status) {
            // this.roomData = inputs;
            this.inputs = inputs;
            this.mainInputsCompleted = status;
        },

        proceedToNextStep() {
            this.inputsToHousingInformation(this.inputs);
            addRoomConfiguration(this.roomConfigruation).then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } });
            });
        },

        inputsToHousingInformation(inputs) {
            this.roomConfigruation = {
                'numRooms': inputs.rooms.value,
                'area': inputs.area.value,
                'rent': inputs.rent.value
            };
        }
    },

    data: function () {
        return {
            inputs: {},
            roomConfigruation: {},
            mainInputsCompleted: false
        };
    }
};
</script>

<style lang="scss">

</style>
