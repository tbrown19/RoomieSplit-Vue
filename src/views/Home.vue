<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
        <primary-inputs @valueInputed="mainInputStepComplete"></primary-inputs>
        <!-- <NextButton @click="proceedToNextStep" :visible="mainInputsCompleted"></NextButton>  -->
    </div>
</template>

<script>
import PrimaryInputs from '../components/home/PrimaryInputs.vue';
export default {
    components: {
        PrimaryInputs
    },

    methods: {
        mainInputStepComplete(inputs, status) {
            // this.roomData = inputs;
            this.inputs = inputs;
            this.mainInputsCompleted = status;
        }
    },

    data: function () {
        return {

        };
    }
};
</script>

<style lang="scss">

</style>
