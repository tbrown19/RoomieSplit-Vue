<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
        <primary-inputs @inputEntered="inputsUpdated"></primary-inputs>
        <slide-fade>
            <el-row type="flex" justify="center" v-if="mainInputsCompleted">
                <button @click='nextStepClicked' class="button is-primary is-large">Next Step</button>
            </el-row>
        </slide-fade>
    
    </div>
</template>

<script>
import PrimaryInputs from '../components/home/PrimaryInputs.vue';
import SlideFade from '../components/transitions/SlideFade.vue';

export default {
    components: {
        PrimaryInputs, SlideFade
    },

    methods: {
        inputsUpdated(inputs, status) {
            // this.roomData = inputs;
            console.log(status);
            this.inputs = inputs;
            this.mainInputsCompleted = status;
        },

        nextStepClicked() {

        }
    },

    data: function () {
        return {
            mainInputsCompleted: false
        };
    }
};
</script>

<style lang="scss">

</style>
