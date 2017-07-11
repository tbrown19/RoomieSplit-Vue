<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
        <MainInputs @valueInputed="mainInputStepComplete"></MainInputs>
        <NextButton @click="proceedToNextStep" :visible="mainInputsCompleted"></NextButton>
    </div>
</template>


<script>
import MainInputs from '../components/main-inputs.vue';
import RoomsTable from '../components/RoomsTable/table.vue';
import NextButton from '../components/main-inputs-next.vue';
import { Database } from '../firebase.js';

export default {

    components: {
        MainInputs, RoomsTable, NextButton
    },

    methods: {
        mainInputStepComplete(inputsCompleted, inputs) {
            //this.roomData = inputs;
            this.mainInputsCompleted = inputsCompleted;
            this.inputs = inputs;
        },



        proceedToNextStep() {
            this.inputsToHousingInformation();
            this.addConfigurationToDB().then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } })
            });
        },

        inputsToHousingInformation() {
            let housingInformation = {}
            housingInformation.numRooms = this.inputs.numRooms.value;
            housingInformation.area = this.inputs.area.value;
            housingInformation.rent = this.inputs.rent.value;
            this.housingInformation = housingInformation;
        },

        addConfigurationToDB() {
            //Add the newly created room configuration to the database and then return its unique key
            return new Promise((resolve, reject) => {
                Database.ref('RoomConfigurations').push(this.housingInformation).then((snap) => {
                    if (snap.key.length > 0) {
                        console.log("we stored that config manye." + snap.key)
                        resolve(snap.key);
                    }
                    else {
                        reject("Failed to store room configuration in database.");
                    }
                });
            });

        },

    },


    data: function () {
        return {
            showTitleText: true,
            showRoomsTable: false,
            mainInputsCompleted: false,
            inputs: {}
        }
    }
}
</script>


<style>
#intro-text {
    margin-bottom: 2rem;
    font-size: 2rem;
}
</style>
